const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function checkUserRoles() {
  try {
    // Get the user
    const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    const devUser = users.find(user => user.email === 'dev.shoreagents@gmail.com');
    
    if (!devUser) {
      console.error('Dev user not found');
      process.exit(1);
    }

    // Get user roles
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('*')
      .eq('user_id', devUser.id);

    if (rolesError) {
      throw rolesError;
    }

    console.log('User Roles:', roles);
  } catch (error) {
    console.error('Error checking user roles:', error);
    process.exit(1);
  }
}

checkUserRoles(); 