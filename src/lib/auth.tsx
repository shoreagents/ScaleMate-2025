import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from './supabase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface User {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

interface WithAuthProps {
  user: User;
}

export const withAuth = (WrappedComponent: React.ComponentType<WithAuthProps>, requiredRole?: string) => {
  return function WithAuthComponent(props: any) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error || !session) {
            router.push('/login');
            return;
          }

          const { data: userData, error: userError } = await supabase
            .from('user_roles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (userError || !userData) {
            router.push('/login');
            return;
          }

          if (requiredRole && userData.role !== requiredRole) {
            router.push('/unauthorized');
            return;
          }

          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: userData.role,
            permissions: userData.permissions || []
          });
        } catch (error) {
          console.error('Auth error:', error);
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}; 