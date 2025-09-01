// No top-level imports from '@supabase/supabase-js' to keep demo builds dependency-free.

export function getAuthMode() {
  return import.meta.env.VITE_AUTH_MODE || 'demo'; // 'supabase' | 'demo'
}

// Dynamically import Supabase only when in 'supabase' mode.
// The specifier is hidden behind a variable + @vite-ignore to avoid pre-bundling.
export async function getSupabase() {
  if (getAuthMode() !== 'supabase') return null;

  const modId = '@supabase/supabase-js';
  const supabaseModule = await import(/* @vite-ignore */ modId);

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Missing Supabase env vars');

  return supabaseModule.createClient(url, key);
}
