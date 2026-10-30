import { useId } from 'react';
import { cn } from '@/lib/cn';

/** Brand mark: a peach seal (the pledge seal) enclosing a stylised “G”. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1D3C4" />
          <stop offset=".55" stopColor="#D98A62" />
          <stop offset="1" stopColor="#B35A2D" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill={`url(#${id}-g)`} />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke="#2A1B2E" strokeOpacity=".3" strokeDasharray="1.6 2.2" />
      <path
        d="M26.5 15.2A8 8 0 1 0 28 21h-7.2"
        fill="none"
        stroke="#2A1B2E"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ tone = 'dark', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.25rem] font-semibold tracking-tight whitespace-nowrap',
            tone === 'light' ? 'text-white' : 'text-plum-900',
          )}
        >
          Girvi Baba
        </span>
        <span lang="hi" className={cn('mt-0.5 font-deva text-[0.75rem]', tone === 'light' ? 'text-copper-300' : 'text-copper-700')}>
          गिरवी बाबा
        </span>
      </span>
    </span>
  );
}
