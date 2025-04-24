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
  console.log('Checking database tables...');
  
  const tables = [
    'users',
    'user_profiles',
    'user_roles',
    'teams',
    'team_members'
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .single();
      
      if (error) {
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          console.error(`❌ Table '${table}' does not exist`);
        } else {
          console.error(`❌ Error checking table '${table}':`, error.message);
        }
      } else {
        console.log(`✅ Table '${table}' exists`);
      }
    } catch (error) {
      console.error(`❌ Error checking table '${table}':`, error);
    }
  }
}

main().catch(console.error); 