import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getDashboardPath } from '@/lib/authRouting';

type Props = { children: React.ReactNode };

export default function AuthRedirect({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" /></div>;
  }

  if (user) {
    const from = (location.state as any)?.from?.pathname as string | undefined;
    if (from) return <Navigate to={from} replace />;
    const path = getDashboardPath(user as any);
    return <Navigate to={path} replace />;
  }
  return <>{children}</>;
}
