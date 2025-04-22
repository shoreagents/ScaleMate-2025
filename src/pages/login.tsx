import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import AuthForm from '@/components/auth/AuthForm';

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get user's role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (roles && roles.length > 0) {
          const userRoles = roles.map(r => r.role);
          if (userRoles.includes('admin') || userRoles.includes('moderator')) {
            router.push('/admin/dashboard');
          } else if (userRoles.includes('user')) {
            router.push('/user/dashboard');
          }
        }
      }
    };

    checkAuth();
  }, [router]);

  return (
    <AuthForm />
  );
};

export default LoginPage; 