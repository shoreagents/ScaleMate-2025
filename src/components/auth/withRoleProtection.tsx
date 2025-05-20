import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface WithRoleProtectionProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const WithRoleProtection: React.FC<WithRoleProtectionProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const { role, isLoading } = useAuth();

  useEffect(() => {
    // Only check if we have a role and it's not loading
    if (!isLoading && role && !allowedRoles.includes(role)) {
      // Log unauthorized access attempt (for analytics)
      console.warn(`Unauthorized access attempt: User with role ${role} tried to access a page requiring roles: ${allowedRoles.join(', ')}`);
      
      // Redirect to appropriate dashboard
      const redirectUrl = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      router.replace({
        pathname: redirectUrl,
        query: { error: 'You do not have permission to access this page' }
      });
    }
  }, [role, isLoading, allowedRoles, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Don't render anything if role check fails
  // The middleware will handle the redirect
  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

export default WithRoleProtection; 