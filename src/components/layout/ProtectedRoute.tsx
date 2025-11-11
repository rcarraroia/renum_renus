import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    // Simple loading state while checking auth
    return <div className="flex items-center justify-center h-screen text-lg">Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect unauthorized users (e.g., client trying to access admin)
    return <Navigate to={role === 'client' ? '/dashboard/client' : '/'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;