import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { getDashboardPath, isAdmin } from '@/lib/authRouting';
import { getAuthMode, getSupabase } from '@/lib/customSupabaseClient';

type Props = { children: React.ReactNode; role: 'admin' | 'client'; };

const ProtectedRoute = ({ children, role }: Props) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { clientId } = useParams();
  const [clientOwnerId, setClientOwnerId] = useState<string | null>(null);
  const [clientLoading, setClientLoading] = useState(role === 'client');
  const [clientExists, setClientExists] = useState(true);

  const mode = getAuthMode();

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (role !== 'client' || !clientId) { setClientLoading(false); return; }
      setClientLoading(true);
      if (mode === 'supabase') {
        const supabase = await getSupabase();
        const { data } = await supabase!.from('book_clients').select('user_id').eq('id', clientId).maybeSingle();
        if (!active) return;
        if (!data) { setClientExists(false); setClientOwnerId(null); } else { setClientExists(true); setClientOwnerId(data.user_id); }
      } else {
        if (clientId === 'demo-client-1') { setClientExists(true); setClientOwnerId('demo-client-1'); }
        else { setClientExists(false); setClientOwnerId(null); }
      }
      setClientLoading(false);
    };
    run();
    return () => { active = false; };
  }, [role, clientId, mode]);

  if (loading || clientLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-900"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" /></div>;

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  if (role === 'admin') {
    if (!isAdmin(user as any)) return <Navigate to={getDashboardPath(user as any) || '/'} replace />;
    return <>{children}</>;
  }

  if (role === 'client') {
    if (!clientExists) return <Navigate to={getDashboardPath(user as any) + '?missing=client'} replace />;
    if ((user as any).user_metadata?.role !== 'client') return <Navigate to={getDashboardPath(user as any)} replace />;
    if (!clientId || !clientOwnerId || (user as any).id !== clientOwnerId) return <Navigate to={getDashboardPath(user as any)} replace />;
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};
export default ProtectedRoute;
