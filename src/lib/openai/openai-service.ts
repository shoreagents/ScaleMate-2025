import OpenAI from 'openai';
import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  OpenAIError,
  OpenAIResponse,
  OpenAIStreamResponse,
  ChatCompletionResult,
} from '../types/openai';

export class OpenAIService {
  private client: OpenAI;
  private defaultModel = 'gpt-3.5-turbo';
  private defaultOptions = {
    temperature: 0.7,
    max_tokens: 1000,
  };

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.client = new OpenAI({ apiKey });
  }

  async createChatCompletion(
    request: ChatCompletionRequest
  ): Promise<OpenAIResponse<ChatCompletionResponse>> {
    try {
      const { messages, options } = request;
      const completion = await this.client.chat.completions.create({
        model: options?.model || this.defaultModel,
        messages,
        temperature: options?.temperature || this.defaultOptions.temperature,
        max_tokens: options?.max_tokens || this.defaultOptions.max_tokens,
        stream: options?.stream || false,
      }) as ChatCompletionResult;

      const response = completion.choices[0]?.message;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      return {
        data: {
          content: response.content || '',
          role: response.role,
          finish_reason: completion.choices[0]?.finish_reason,
        },
      };
    } catch (error) {
      const openAIError = error as OpenAIError;
      return {
        data: {
          content: '',
          role: 'assistant',
        },
        error: {
          name: 'OpenAIError',
          message: openAIError.message || 'An error occurred with OpenAI',
          status: openAIError.status,
          code: openAIError.code,
        },
      };
    }
  }

  async createStreamingChatCompletion(
    request: ChatCompletionRequest
  ): Promise<AsyncGenerator<OpenAIStreamResponse, void, unknown>> {
    try {
      const { messages, options } = request;
      const stream = await this.client.chat.completions.create({
        model: options?.model || this.defaultModel,
        messages,
        temperature: options?.temperature || this.defaultOptions.temperature,
        max_tokens: options?.max_tokens || this.defaultOptions.max_tokens,
        stream: true,
      });

      return (async function* () {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            yield {
              content,
              role: 'assistant',
              finish_reason: chunk.choices[0]?.finish_reason || null,
            };
          }
        }
      })();
    } catch (error) {
      const openAIError = error as OpenAIError;
      throw {
        name: 'OpenAIError',
        message: openAIError.message || 'An error occurred with OpenAI streaming',
        status: openAIError.status,
        code: openAIError.code,
      };
    }
  }
} 