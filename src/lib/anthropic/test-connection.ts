import { ClaudeService } from './claude-service';

async function testClaudeConnection() {
  // This function should only be used server-side for direct testing
  // For client-side testing, use the API route instead
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY is not set in environment variables');
    return { success: false, message: 'ANTHROPIC_API_KEY is not set', lastChecked: new Date() };
  }

  try {
    console.log('🔌 Testing Claude connection...');

    const claude = new ClaudeService(apiKey);

    const response = await claude.createChatCompletion({
      messages: [
        {
          role: 'user',
          content: 'Hello, this is a connection test. Please respond with "Connection successful".'
        }
      ]
    });

    if (response.error) {
      console.error('❌ Claude connection failed:', response.error.message);
      return { success: false, message: response.error.message, lastChecked: new Date() };
    }

    console.log('✅ Claude connection successful!');
    console.log('Response:', response.data.content);
    return { success: true, message: 'Connection successful', lastChecked: new Date() };

  } catch (error) {
    console.error('❌ Claude connection failed:', error);
    return { success: false, message: (error as Error).message, lastChecked: new Date() };
  }
}

if (require.main === module) {
  testClaudeConnection();
}

export { testClaudeConnection }; 