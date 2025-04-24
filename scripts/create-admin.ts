import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Please make sure you have:');
  console.error('1. NEXT_PUBLIC_SUPABASE_URL');
  console.error('2. NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY (not the anon key)');
  console.error('\nTo get the service role key:');
  console.error('1. Go to https://app.supabase.com');
  console.error('2. Select your project');
  console.error('3. Go to Project Settings > API');
  console.error('4. Copy the "service_role key" (not the anon key)');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser(email: string, password: string, fullName: string) {
  console.log('Creating admin user...');
  
  try {
    // 1. Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName
      }
    });

    if (authError) {
      console.error('❌ Error creating user:', authError.message);
      return;
    }

    const userId = authData.user.id;
    console.log('✅ User created in Auth:', userId);

    // 2. Create user record in users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        full_name: fullName,
        is_active: true
      });

    if (userError) {
      console.error('❌ Error creating user record:', userError.message);
      return;
    }

    console.log('✅ User record created');

    // 3. Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        username: email.split('@')[0],
        first_name: fullName.split(' ')[0],
        last_name: fullName.split(' ').slice(1).join(' ')
      });

    if (profileError) {
      console.error('❌ Error creating user profile:', profileError.message);
      return;
    }

    console.log('✅ User profile created');

    // 4. Assign admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      });

    if (roleError) {
      console.error('❌ Error assigning admin role:', roleError.message);
      return;
    }

    console.log('✅ Admin role assigned');
    console.log('🎉 Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullName);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

// Get admin details from command line arguments
const email = process.argv[2];
const password = process.argv[3];
const fullName = process.argv[4];

if (!email || !password || !fullName) {
  console.error('Usage: npx ts-node scripts/create-admin.ts <email> <password> <fullName>');
  process.exit(1);
}

createAdminUser(email, password, fullName); 