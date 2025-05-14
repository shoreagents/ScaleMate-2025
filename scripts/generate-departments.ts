import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local instead of .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Validate environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

// Check for missing environment variables
const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables in .env.local: ${missingEnvVars.join(', ')}\n` +
    'Please ensure these are set in your .env.local file'
  );
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Department {
  name: string;
  description: string;
  icon: 'briefcase' | 'users' | 'gears';
}

const generateDepartmentsPrompt = `
Generate a list of modern business departments that would be relevant for a company building an AI-powered role builder tool.
For each department, provide:
1. A clear, concise name
2. A brief description of the department's scope and responsibilities
3. An appropriate icon (choose from: briefcase, users, or gears)

Format the response as a JSON array of objects with these fields:
{
  "departments": [
    {
      "name": string,
      "description": string,
      "icon": "briefcase" | "users" | "gears"
    }
  ]
}

Focus on departments that would benefit from AI-powered role building and automation.
Include both traditional departments and emerging roles in tech/AI companies.
Ensure each department has a clear purpose and scope.
`;

async function validateDepartment(dept: Department): Promise<boolean> {
  // Validate department name
  if (!dept.name || dept.name.length < 2 || dept.name.length > 50) {
    console.error(`Invalid department name: ${dept.name}`);
    return false;
  }

  // Validate description
  if (!dept.description || dept.description.length < 10 || dept.description.length > 200) {
    console.error(`Invalid description for department ${dept.name}: ${dept.description}`);
    return false;
  }

  // Validate icon
  if (!['briefcase', 'users', 'gears'].includes(dept.icon)) {
    console.error(`Invalid icon for department ${dept.name}: ${dept.icon}`);
    return false;
  }

  return true;
}

async function generateDepartments() {
  try {
    console.log('Generating departments using OpenAI...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates business department data in JSON format."
        },
        {
          role: "user",
          content: generateDepartmentsPrompt
        }
      ],
      response_format: { type: "json_object" }
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from OpenAI');

    const parsedResponse = JSON.parse(response);
    if (!parsedResponse.departments || !Array.isArray(parsedResponse.departments)) {
      throw new Error('Invalid response format from OpenAI');
    }

    const departments = parsedResponse.departments as Department[];
    console.log(`Generated ${departments.length} departments`);

    // Validate all departments
    const validDepartments = departments.filter(dept => validateDepartment(dept));
    if (validDepartments.length === 0) {
      throw new Error('No valid departments generated');
    }

    console.log(`Validated ${validDepartments.length} departments`);

    // Insert departments into database
    const { data, error } = await supabase
      .from('departments')
      .insert(
        validDepartments.map(dept => ({
          ...dept,
          is_ai_generated: true,
          ai_generation_prompt: generateDepartmentsPrompt
        }))
      )
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Successfully inserted departments:', data);
    return data;

  } catch (error) {
    console.error('Error generating departments:', error);
    throw error;
  }
}

// Run the generation
generateDepartments()
  .then(() => console.log('Department generation complete'))
  .catch(error => {
    console.error('Failed to generate departments:', error);
    process.exit(1);
  }); 