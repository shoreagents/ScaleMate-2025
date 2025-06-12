import Anthropic from '@anthropic-ai/sdk';
import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  AnthropicError,
  AnthropicResponse,
  AnthropicStreamResponse,
} from '../types/anthropic';

export class ClaudeService {
  private client: Anthropic;
  private defaultModel = 'claude-3-haiku-20240307';
  private defaultOptions = {
    temperature: 0.7,
    max_tokens: 1000,
  };

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Anthropic API key is required');
    }
    this.client = new Anthropic({ apiKey });
  }

  async createChatCompletion(
    request: ChatCompletionRequest
  ): Promise<AnthropicResponse<ChatCompletionResponse>> {
    try {
      const { messages, options } = request;
      
      // Convert messages to Claude format
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages
        .filter(m => m.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const,
          content: msg.content
        }));
      
      const response = await this.client.messages.create({
        model: options?.model || this.defaultModel,
        max_tokens: options?.max_tokens || this.defaultOptions.max_tokens,
        temperature: options?.temperature || this.defaultOptions.temperature,
        system: systemMessage?.content || '',
        messages: conversationMessages,
      });

      const content = response.content[0];
      if (!content || content.type !== 'text') {
        throw new Error('No text response from Claude');
      }

      return {
        data: {
          content: content.text,
          role: 'assistant',
          finish_reason: response.stop_reason,
        },
      };
    } catch (error) {
      const anthropicError = error as AnthropicError;
      return {
        data: {
          content: '',
          role: 'assistant',
        },
        error: {
          name: 'AnthropicError',
          message: anthropicError.message || 'An error occurred with Claude',
          status: anthropicError.status,
          code: anthropicError.code,
        },
      };
    }
  }

  async createStreamingChatCompletion(
    request: ChatCompletionRequest
  ): Promise<AsyncGenerator<AnthropicStreamResponse, void, unknown>> {
    try {
      const { messages, options } = request;
      
      // Convert messages to Claude format
      const systemMessage = messages.find(m => m.role === 'system');
      const conversationMessages = messages
        .filter(m => m.role !== 'system')
        .map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' as const : 'user' as const,
          content: msg.content
        }));
      
      const stream = await this.client.messages.create({
        model: options?.model || this.defaultModel,
        max_tokens: options?.max_tokens || this.defaultOptions.max_tokens,
        temperature: options?.temperature || this.defaultOptions.temperature,
        system: systemMessage?.content || '',
        messages: conversationMessages,
        stream: true,
      });

      return (async function* () {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            yield {
              content: event.delta.text || '',
              role: 'assistant',
              finish_reason: null,
            };
          } else if (event.type === 'message_stop') {
            yield {
              content: '',
              role: 'assistant',
              finish_reason: 'stop',
            };
          }
        }
      })();
    } catch (error) {
      const anthropicError = error as AnthropicError;
      throw {
        name: 'AnthropicError',
        message: anthropicError.message || 'An error occurred with Claude streaming',
        status: anthropicError.status,
        code: anthropicError.code,
      };
    }
  }
} 