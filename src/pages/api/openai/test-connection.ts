import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '@/lib/openai/openai-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured',
        lastChecked: new Date(),
      });
    }

    const openai = new OpenAIService(apiKey);
    const response = await openai.createChatCompletion({
      messages: [
        {
          role: 'user',
          content: 'Test connection',
        },
      ],
    });

    if (response.error) {
      return res.status(500).json({
        success: false,
        message: response.error.message || 'Connection failed',
        lastChecked: new Date(),
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Connection healthy',
      lastChecked: new Date(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Connection failed',
      lastChecked: new Date(),
    });
  }
} 