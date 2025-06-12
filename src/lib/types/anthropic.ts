import { MessageParam } from '@anthropic-ai/sdk/resources/messages';

export interface AnthropicError extends Error {
  status?: number;
  code?: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ScaleMateMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  messages: ScaleMateMessage[];
  options?: ChatCompletionOptions;
}

export interface ChatCompletionResponse {
  content: string;
  role: string;
  finish_reason?: string | null;
}

export interface AnthropicResponse<T> {
  data: T;
  error?: AnthropicError;
}

export interface AnthropicUsage {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
}

export interface AnthropicStreamResponse {
  content: string;
  role: string;
  finish_reason?: string | null;
  usage?: AnthropicUsage;
}

export type ClaudeCompletionResult = {
  content: Array<{
    text: string;
    type: string;
  }>;
  stop_reason: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}; 