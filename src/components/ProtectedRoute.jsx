import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { PageLoader } from '@/components/LoadingSpinner';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      router.push('/unauthorized');
      return;
    }

    setIsAuthorized(true);
  }, [user, role, loading, router, allowedRoles]);

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthorized) {
    return <PageLoader />;
  }

  return children;
}