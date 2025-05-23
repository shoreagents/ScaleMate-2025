const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function cleanupUserRoles() {
  try {
    // Get the user
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    const devUser = users.find(user => user.email === 'dev.shoreagents@gmail.com');
    
    if (!devUser) {
      console.error('Dev user not found');
      process.exit(1);
    }

    // Remove the 'user' role
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', devUser.id)
      .eq('role', 'user');

    if (deleteError) {
      throw deleteError;
    }

    console.log('Successfully removed redundant user role');
  } catch (error) {
    console.error('Error cleaning up user roles:', error);
    process.exit(1);
  }
}

cleanupUserRoles(); 