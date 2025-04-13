import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { supabase } from '@/lib/supabase';
import AuthForm from '@/components/auth/AuthForm';

const AdminPage = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AuthForm />
  );
};

export default AdminPage; 