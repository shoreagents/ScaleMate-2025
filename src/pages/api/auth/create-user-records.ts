import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      userId,
      email,
      username,
      firstName,
      lastName,
      fullName
    } = req.body;

    if (!userId || !email || !username || !firstName || !lastName || !fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // First check if user already exists in database
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking existing user:', checkError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (existingUser) {
      // Check if profile exists
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('user_profiles')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (profileCheckError && profileCheckError.code !== 'PGRST116') {
        console.error('Error checking existing profile:', profileCheckError);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Check if role exists
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') {
        console.error('Error checking existing role:', roleCheckError);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // If profile or role is missing, create them
      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: userId,
            username: username.toLowerCase(),
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

      if (!existingRole) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'user',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (roleError) {
          console.error('Error creating role:', roleError);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

      return res.status(200).json({ 
        success: true,
        message: 'User records updated successfully'
      });
    }

    // If user doesn't exist, create all records
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email.toLowerCase(),
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      });

    if (userError) {
      console.error('Error creating user:', userError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        username: username.toLowerCase(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (roleError) {
      console.error('Error creating role:', roleError);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json({ 
      success: true,
      message: 'User records created successfully'
    });
  } catch (error) {
    console.error('Error in create-user-records API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 