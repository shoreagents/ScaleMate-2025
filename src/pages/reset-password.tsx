import React from 'react';
import ResetPassword from '@/components/auth/ResetPassword';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
`;

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleSuccess = () => {
    // The ResetPassword component will handle the redirect to login
  };

  const handleError = (error: string) => {
    console.error('Reset password error:', error);
  };

  return (
    <PageContainer>
      <ResetPassword 
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </PageContainer>
  );
} 