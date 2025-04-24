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

async function setupAdminUser() {
  try {
    // Get the user
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    const adminUser = users.find(user => user.email === 'dev.shoreagents@gmail.com');
    
    if (!adminUser) {
      console.error('Admin user not found');
      process.exit(1);
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: adminUser.id,
        first_name: 'Admin',
        last_name: 'User',
        username: 'admin',
        profile_picture_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_password_change: new Date().toISOString()
      });

    if (profileError) {
      throw profileError;
    }

    // Create admin role
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: adminUser.id,
        role: 'admin',
        created_at: new Date().toISOString()
      });

    if (roleError) {
      throw roleError;
    }

    console.log('Admin user setup completed successfully');
  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

setupAdminUser(); 