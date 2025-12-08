import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PageLoader from '../Layouts/PageLoader';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({ children, redirectTo = '/' }: PublicRouteProps) {
  const { authStatus } = useAuth();

  if (authStatus === 'Loading') {
    return <PageLoader />;
  }

  if (authStatus === 'Authenticated') {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

