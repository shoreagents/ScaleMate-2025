import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
`;

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to user dashboard
    router.push('/user/dashboard');
  }, [router]);

  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
} 