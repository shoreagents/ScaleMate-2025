import { PostgrestError } from '@supabase/supabase-js';

export type ApiResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
  status: number;
  message?: string;
};

export const handleApiResponse = async <T>(
  promise: Promise<{ data: T | null; error: PostgrestError | null }>
): Promise<ApiResponse<T>> => {
  try {
    const { data, error } = await promise;
    
    if (error) {
      return {
        data: null,
        error,
        status: error.code === 'PGRST116' ? 404 : 500,
        message: error.message
      };
    }

    return {
      data,
      error: null,
      status: 200
    };
  } catch (err) {
    const error = err as Error;
    return {
      data: null,
      error: {
        message: error.message,
        details: '',
        hint: '',
        code: 'UNKNOWN_ERROR'
      } as PostgrestError,
      status: 500,
      message: 'An unexpected error occurred'
    };
  }
}; 