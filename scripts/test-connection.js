require('dotenv').config({ path: '.env.local' });
const { testSupabaseConnection } = require('../src/lib/test-connection');

async function main() {
  console.log('Testing Supabase connection...');
  const result = await testSupabaseConnection();
  console.log('Test result:', result);
}

main().catch(console.error); 