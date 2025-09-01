import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'ghost' | 'secondary' };
export const Button = React.forwardRef<HTMLButtonElement, Props>(function Button({ className='', variant, ...props }, ref) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const style = variant === 'ghost'
    ? 'bg-transparent hover:bg-white/10 text-slate-200'
    : variant === 'secondary'
    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
    : 'bg-indigo-600 text-white hover:bg-indigo-700';
  return <button ref={ref} className={`${base} ${style} ${className}`} {...props} />;
});
