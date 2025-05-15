import { supabase } from './supabase';
import { createClient } from '@supabase/supabase-js';
import { OpenAIService } from './openai/openai-service';

export async function testSupabaseConnection() {
  try {
    const response = await fetch('/api/database/status');
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
      lastChecked: new Date(),
    };
  }
}

export async function testOpenAIConnection(): Promise<{ success: boolean; message: string; lastChecked: Date }> {
  try {
    const response = await fetch('/api/openai/status', { method: 'GET' });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
      lastChecked: new Date(),
    };
  }
} 