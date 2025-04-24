import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    
    // Try to fetch a single row from a table
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection test failed:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log('Data:', data);
  } catch (error) {
    console.error('❌ Connection error:', error);
  }
}

// Run the test
testConnection(); 