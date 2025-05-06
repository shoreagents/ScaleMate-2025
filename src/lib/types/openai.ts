import { ChatCompletionMessageParam, ChatCompletionChunk } from 'openai/resources/chat';

export interface OpenAIError extends Error {
  status?: number;
  code?: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionRequest {
  messages: ChatCompletionMessageParam[];
  options?: ChatCompletionOptions;
}

export interface ChatCompletionResponse {
  content: string;
  role: string;
  finish_reason?: string | null;
}

export interface OpenAIResponse<T> {
  data: T;
  error?: OpenAIError;
}

export interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface OpenAIStreamResponse {
  content: string;
  role: string;
  finish_reason?: string | null;
  usage?: OpenAIUsage;
}

export type ChatCompletionResult = {
  choices: Array<{
    message: {
      content: string | null;
      role: string;
    };
    finish_reason: string | null;
  }>;
}; 