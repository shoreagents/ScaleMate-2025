import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Get the project root directory (2 levels up from the script)
const projectRoot = path.resolve(__dirname, '..');
const envPath = path.join(projectRoot, '.env.local');

console.log('Project root:', projectRoot);
console.log('.env.local path:', envPath);
console.log('.env.local exists:', fs.existsSync(envPath));

// Load environment variables from .env.local
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env.local:', result.error);
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

console.log('Environment variables loaded:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Present' : '❌ Missing');
console.log('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Present' : '❌ Missing');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  console.error('Please make sure your .env.local file contains:');
  console.error('NEXT_PUBLIC_SUPABASE_URL');
  console.error('NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
  try {
    // First, run the migration
    console.log('Running storage migration...');
    const migrationPath = path.join(__dirname, '../supabase/migrations/0002_storage.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Execute each statement
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      if (error) {
        console.error('Error executing migration statement:', error);
        console.error('Statement:', statement);
        process.exit(1);
      }
    }

    console.log('✅ Storage setup completed successfully');
  } catch (error) {
    console.error('Error setting up storage:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

setupStorage(); 