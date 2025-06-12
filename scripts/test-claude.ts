#!/usr/bin/env ts-node

import { testClaudeConnection } from '../src/lib/anthropic/test-connection';

async function main() {
  console.log('🚀 Starting Claude connection test...\n');
  
  try {
    await testClaudeConnection();
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

main(); 