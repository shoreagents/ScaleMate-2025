import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import * as path from 'path';
import * as fs from 'fs';

// Debug: Print current working directory
console.log('Current working directory:', process.cwd());

// Debug: Check if .env.local exists
const envLocalPath = path.resolve(process.cwd(), '.env.local');
console.log('\nChecking .env.local file:');
console.log('Path:', envLocalPath);
console.log('Exists:', fs.existsSync(envLocalPath));

// Load environment variables
console.log('\nLoading environment from:', envLocalPath);
const result = dotenv.config({ path: envLocalPath });
console.log('Dotenv result:', result);

// Debug: Print all environment variables
console.log('\nEnvironment variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  console.error('Missing Supabase URL');
  process.exit(1);
}

async function pingTest() {
  try {
    console.log('\nEnvironment Check:');
    console.log('------------------');
    console.log('Supabase URL:', supabaseUrl);
    console.log('URL type:', typeof supabaseUrl);
    console.log('URL length:', supabaseUrl?.length ?? 0);
    
    console.log('\nTesting connection...');
    console.log('------------------');
    
    // Try to fetch the health check endpoint
    const response = await fetch(`${supabaseUrl}/rest/v1/health`);
    
    if (response.ok) {
      console.log('✅ Connection successful!');
      console.log('Status:', response.status);
    } else {
      console.error('❌ Connection failed');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
    }
  } catch (error) {
    console.error('\n❌ Connection error:', error);
    console.log('\nTroubleshooting steps:');
    console.log('1. Check your internet connection');
    console.log('2. Verify the Supabase URL is correct');
    console.log('3. Check if Supabase is down (https://status.supabase.com)');
    console.log('4. Check if your IP is blocked by Supabase');
    console.log('\nCurrent URL being used:', supabaseUrl);
  }
}

// Run the test
pingTest(); 