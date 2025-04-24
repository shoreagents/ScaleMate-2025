import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Testing Supabase connection...');
  console.log('Using Supabase URL:', supabaseUrl);
  
  try {
    // Simple health check query that doesn't require any tables
    const { data, error } = await supabase
      .from('_tables')
      .select('*');
    
    if (error) {
      if (error.message.includes('relation "public._tables" does not exist')) {
        // This is actually a good sign - it means we can connect to the database
        // The error is just because the table doesn't exist
        console.log('✅ Database connection successful (no tables exist yet)');
        return { 
          success: true, 
          message: 'Connection successful - database is empty',
        };
      }
      
      console.error('❌ Database connection failed:', error.message);
      return { 
        success: false, 
        message: `Connection failed: ${error.message}`,
        error 
      };
    }
    
    console.log('✅ Database connection successful');
    console.log('Tables:', data);
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

main().catch(console.error); 