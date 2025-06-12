import { ClaudeService } from '@/lib/anthropic/claude-service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'ANTHROPIC_API_KEY is not configured',
      lastChecked: new Date().toISOString()
    });
  }

  try {
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
      return res.status(500).json({
        success: false,
        message: response.error.message,
        lastChecked: new Date().toISOString()
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Connection successful',
      response: response.data.content,
      lastChecked: new Date().toISOString()
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: (error as Error).message,
      lastChecked: new Date().toISOString()
    });
  }
} 