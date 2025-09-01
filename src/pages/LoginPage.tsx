import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fn = isLogin ? signIn : signUp;
      const { error } = await fn({ email, password, options: { data: { role: 'client', client_id: 'demo-client-1' } } as any });
      if (error) toast({ title: 'Auth failed', description: error.message || 'Try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <Helmet><title>{isLogin ? 'Login' : 'Sign Up'} • Client Portal</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="px-4 py-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
              <p className="text-slate-400 mt-2 text-sm">{isLogin ? 'Enter your credentials to continue.' : 'Fill the fields below to get started.'}</p>
            </div>
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <Label htmlFor="email" className="mb-1 block">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="mb-1 block">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /> : (isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />)}
                <span>{loading ? 'Processing…' : isLogin ? 'Log In' : 'Sign Up'}</span>
              </Button>
              <div className="text-center pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsLogin(v => !v)}>
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </Button>
              </div>
            </form>
          </div>
          <div className="mt-6 text-center text-xs text-slate-400">
            <p>Demo mode: any email/password works. Use +admin in the email for admin.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
