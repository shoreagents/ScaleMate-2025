import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

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

async function assignRoles() {
  try {
    // Get all users
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      throw userError;
    }

    // Find the admin user
    const adminUser = users.find(user => user.email === 'testadmin@gmail.com');
    if (!adminUser) {
      console.error('Admin user (testadmin@gmail.com) not found');
      process.exit(1);
    }

    // Find the regular user
    const regularUser = users.find(user => user.email === 'testuser@gmail.com');
    if (!regularUser) {
      console.error('Regular user (testuser@gmail.com) not found');
      process.exit(1);
    }

    // Assign admin role
    const { error: adminRoleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: adminUser.id,
        role: 'admin',
        created_at: new Date().toISOString()
      });

    if (adminRoleError) {
      throw adminRoleError;
    }

    // Assign user role
    const { error: userRoleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: regularUser.id,
        role: 'user',
        created_at: new Date().toISOString()
      });

    if (userRoleError) {
      throw userRoleError;
    }

    console.log('✅ Roles assigned successfully:');
    console.log('- testadmin@gmail.com: admin role');
    console.log('- testuser@gmail.com: user role');
  } catch (error) {
    console.error('Error assigning roles:', error);
    process.exit(1);
  }
}

// Run the script
assignRoles(); 