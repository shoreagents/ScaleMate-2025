import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkUser(email: string) {
  console.log('Checking user...');
  
  try {
    // 1. Check if user exists in Auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error checking auth:', authError.message);
      return;
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found in Auth');
      return;
    }

    console.log('✅ User found in Auth:', user.id);

    // 2. Check if user exists in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) {
      console.error('❌ Error checking users table:', userError.message);
    } else if (!userData) {
      console.log('❌ User not found in users table');
    } else {
      console.log('✅ User found in users table');
    }

    // 3. Check if user has a profile
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('❌ Error checking user profile:', profileError.message);
    } else if (!profileData) {
      console.log('❌ User profile not found');
    } else {
      console.log('✅ User profile found');
    }

    // 4. Check if user has roles
    const { data: rolesData, error: rolesError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', user.id);

    if (rolesError) {
      console.error('❌ Error checking user roles:', rolesError.message);
    } else if (!rolesData || rolesData.length === 0) {
      console.log('❌ User has no roles assigned');
    } else {
      console.log('✅ User roles:', rolesData.map(r => r.role).join(', '));
    }

  } catch (error) {
    console.error('❌ Error checking user:', error);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('Usage: npx ts-node scripts/check-user.ts <email>');
  process.exit(1);
}

checkUser(email); 