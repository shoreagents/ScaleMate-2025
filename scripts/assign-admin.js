const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

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

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function assignAdminRole() {
  try {
    // Get the user email from command line argument
    const userEmail = process.argv[2];
    
    if (!userEmail) {
      console.error('Please provide a user email as an argument');
      console.error('Usage: node assign-admin.js <user-email>');
      process.exit(1);
    }

    // Get the user
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    const targetUser = users.find(user => user.email === userEmail);
    
    if (!targetUser) {
      console.error(`User with email ${userEmail} not found`);
      process.exit(1);
    }

    // Create admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: targetUser.id,
        role: 'admin',
        created_at: new Date().toISOString()
      });

    if (roleError) {
      throw roleError;
    }

    console.log(`Admin role added successfully for ${userEmail}`);
  } catch (error) {
    console.error('Error adding admin role:', error);
    process.exit(1);
  }
}

assignAdminRole(); 