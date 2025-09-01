import * as React from 'react';
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export function Input({ className='', ...props }: Props) {
  return <input className={`w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder:text-slate-400 ${className}`} {...props} />;
}
