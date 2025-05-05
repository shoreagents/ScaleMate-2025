import { config } from 'dotenv';
import { resolve } from 'path';
import { testOpenAIConnection } from '../src/lib/openai/test-connection';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
  try {
    await testOpenAIConnection();
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

main(); 