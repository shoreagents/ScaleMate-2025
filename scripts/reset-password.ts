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

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function resetPassword(email: string, newPassword: string) {
  console.log('Resetting password...');
  
  try {
    // 1. Get user by email
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error finding user:', authError.message);
      return;
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found:', user.id);

    // 2. Reset password
    const { error: resetError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (resetError) {
      console.error('❌ Error resetting password:', resetError.message);
      return;
    }

    console.log('✅ Password reset successfully');
    console.log('New password:', newPassword);

  } catch (error) {
    console.error('❌ Error resetting password:', error);
  }
}

// Get email and new password from command line arguments
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.error('Usage: npx ts-node scripts/reset-password.ts <email> <new-password>');
  process.exit(1);
}

resetPassword(email, newPassword); 