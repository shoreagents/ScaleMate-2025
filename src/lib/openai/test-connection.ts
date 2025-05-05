import { OpenAIService } from './openai-service';

async function testOpenAIConnection() {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ NEXT_PUBLIC_OPENAI_API_KEY is not set in environment variables');
    process.exit(1);
  }

  try {
    console.log('🔌 Testing OpenAI connection...');
    
    const openai = new OpenAIService(apiKey);
    
    const response = await openai.createChatCompletion({
      messages: [
        {
          role: 'user',
          content: 'Hello! This is a test message. Please respond with "Connection successful!"',
        },
      ],
    });

    if (response.error) {
      console.error('❌ OpenAI connection failed:', response.error.message);
      process.exit(1);
    }

    console.log('✅ OpenAI connection successful!');
    console.log('Response:', response.data.content);
    
  } catch (error) {
    console.error('❌ OpenAI connection failed:', error);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testOpenAIConnection();
}

export { testOpenAIConnection }; 