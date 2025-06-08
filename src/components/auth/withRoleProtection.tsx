import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

interface WithRoleProtectionProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const WithRoleProtection: React.FC<WithRoleProtectionProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const { role, isLoading } = useAuth();

  useEffect(() => {
    // Handle error parameter in URL
    if (router.query.error) {
      // Show error message using toast and remove it immediately
      toast.error(router.query.error as string, {
        duration: 4000,
        position: 'top-center',
      });
      
      // Remove error parameter from URL without refreshing the page
      const { error, ...query } = router.query;
      router.replace(
        { pathname: router.pathname, query },
        undefined,
        { shallow: true }
      ).catch(console.error);
    }
  }, [router.query.error, router]);

  useEffect(() => {
    // Only check if we have a role and it's not loading
    if (!isLoading && role && !allowedRoles.includes(role)) {
      // Log unauthorized access attempt (for analytics)
      console.warn(`Unauthorized access attempt: User with role ${role} tried to access a page requiring roles: ${allowedRoles.join(', ')}`);
      
      // Redirect to appropriate dashboard with a more user-friendly error message
      const redirectUrl = role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      const errorMessage = 'You do not have permission to access this page. Redirecting to your dashboard...';
      
      // Use toast for immediate feedback
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-center',
      });
      
      // Redirect without adding error to URL
      router.replace(redirectUrl).catch(console.error);
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