import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthMode, getSupabase } from '@/lib/customSupabaseClient';

type User = { id: string; user_metadata?: any } | null;

type AuthCtx = {
  user: User;
  loading: boolean;
  signIn: (args: { email?: string; password?: string }) => Promise<{ error?: any }>;
  signUp: (args: { email?: string; password?: string; options?: { data?: any } }) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>(null as any);
export const useAuth = () => useContext(Ctx);

const DEMO_KEY = 'demo_auth_user';

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const mode = getAuthMode();

  useEffect(() => {
    (async () => {
      if (mode === 'supabase') {
        const supabase = await getSupabase();
        const { data } = await supabase!.auth.getUser();
        setUser((data?.user as any) || null);
        supabase!.auth.onAuthStateChange((_event, session) => {
          setUser((session?.user as any) || null);
        });
      } else {
        const raw = localStorage.getItem(DEMO_KEY);
        setUser(raw ? JSON.parse(raw) : null);
      }
      setLoading(false);
    })();
  }, [mode]);

  const api = useMemo<AuthCtx>(() => ({
    user,
    loading,
    signIn: async ({ email, password }) => {
      if (mode === 'supabase') {
        const supabase = await getSupabase();
        const { error } = await supabase!.auth.signInWithPassword({ email: email!, password: password! });
        return { error };
      } else {
        const isAdmin = email?.includes('+admin');
        const demoUser = {
          id: 'demo-' + (isAdmin ? 'admin' : 'client'),
          user_metadata: { role: isAdmin ? 'admin' : 'client', client_id: isAdmin ? null : 'demo-client-1' }
        };
        localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser));
        setUser(demoUser as any);
        return {};
      }
    },
    signUp: async ({ email, password, options }) => {
      if (mode === 'supabase') {
        const supabase = await getSupabase();
        const { error } = await supabase!.auth.signUp({ email: email!, password: password!, options });
        return { error };
      } else {
        const demoUser = { id: 'demo-client-1', user_metadata: { role: 'client', client_id: 'demo-client-1', ...options?.data } };
        localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser));
        setUser(demoUser as any);
        return {};
      }
    },
    signOut: async () => {
      if (mode === 'supabase') {
        const supabase = await getSupabase();
        await supabase!.auth.signOut();
      } else {
        localStorage.removeItem(DEMO_KEY);
        setUser(null);
      }
    }
  }), [user, loading, mode]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
