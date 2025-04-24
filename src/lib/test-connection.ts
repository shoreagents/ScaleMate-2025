import { supabase } from './supabase';

export async function testSupabaseConnection() {
  try {
    // Basic connection test
    const { data, error } = await supabase.from('user_roles').select('count').single();
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return { 
        success: false, 
        message: `Connection failed: ${error.message}`,
        error 
      };
    }
    
    console.log('✅ Database connection successful');
    return { 
      success: true, 
      message: 'Connection successful',
      data 
    };
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error',
      error 
    };
  }
} 