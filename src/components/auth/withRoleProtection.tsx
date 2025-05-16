import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface WithRoleProtectionProps {
  requiredRole: 'admin' | 'user';
}

export const withRoleProtection = (WrappedComponent: React.ComponentType<any>, requiredRole: 'admin' | 'user') => {
  return function WithRoleProtectionComponent(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkRole = async () => {
        try {
          // Get current user
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !user) {
            router.push('/login');
            return;
          }

          // Get user's roles
          const { data: roles, error: rolesError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);

          if (rolesError || !roles || roles.length === 0) {
            router.push('/login');
            return;
          }

          const userRoles = roles.map(r => r.role);

          // Check if user has the required role
          if (userRoles.includes(requiredRole)) {
            setIsAuthorized(true);
          } else {
            // Redirect to appropriate dashboard based on highest role
            if (userRoles.includes('admin')) {
              router.push('/admin/dashboard');
            } else if (userRoles.includes('moderator')) {
              router.push('/admin/dashboard');
            } else if (userRoles.includes('user')) {
              router.push('/user/dashboard');
            } else {
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Error checking role:', error);
          router.push('/login');
        } finally {
          setIsLoading(false);
        }
      };

      checkRole();
    }, [router]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}; 