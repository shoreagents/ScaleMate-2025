import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (requiredRole && role !== requiredRole) {
        // Redirect to appropriate dashboard based on role
        if (role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/dashboard');
        }
      }
    }
  }, [user, role, isLoading, requiredRole, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Only render children if user is authenticated and has required role
  if (!user || (requiredRole && role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
} 