import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Test the connection by making a simple completion request
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 5
    });

    return res.status(200).json({
      success: true,
      message: 'OpenAI connection healthy',
      lastChecked: new Date().toISOString()
    });
  } catch (error) {
    console.error('OpenAI status check error:', error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to check OpenAI status',
      lastChecked: new Date().toISOString()
    });
  }
} 