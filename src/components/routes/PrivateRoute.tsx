import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PageLoader from '../Layouts/PageLoader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { authStatus } = useAuth();
  const location = useLocation();

  if (authStatus === 'Loading') {
    return <PageLoader />;
  }

  if (authStatus === 'Unauthenticated') {
    // Preserva a rota original para redirecionar após login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

