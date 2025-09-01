export function isAdmin(user?: any) {
  const r = user?.user_metadata?.role;
  return r === 'admin' || r === 'super_admin';
}
export function isClient(user?: any) { return user?.user_metadata?.role === 'client'; }
export function getDashboardPath(user?: any): string {
  if (!user) return '/';
  if (isAdmin(user)) return '/admin';
  if (isClient(user)) {
    const cid = user?.user_metadata?.client_id;
    return cid ? `/client/${cid}` : '/onboarding/create-client-id';
  }
  return '/';
}
