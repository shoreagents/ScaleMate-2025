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

async function addDevAdmin() {
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

    // Create admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: devUser.id,
        role: 'admin',
        created_at: new Date().toISOString()
      });

    if (roleError) {
      throw roleError;
    }

    console.log('Admin role added successfully for dev.shoreagents@gmail.com');
  } catch (error) {
    console.error('Error adding admin role:', error);
    process.exit(1);
  }
}

addDevAdmin(); 