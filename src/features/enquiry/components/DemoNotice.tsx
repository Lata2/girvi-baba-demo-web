import { Info } from 'lucide-react';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

export function DemoNotice({ compact = false, tone = 'light', className }: { compact?: boolean; tone?: 'light' | 'dark'; className?: string }) {
  if (!site.demoMode) return null;
  return (
    <p
      className={cn(
        'flex items-start gap-2 rounded-xl border',
        tone === 'dark' ? 'border-white/15 bg-white/5 text-white/70' : 'border-copper-200 bg-copper-50 text-copper-800',
        compact ? 'px-3 py-2 text-[0.72rem]' : 'px-4 py-3 text-[0.8rem]',
        className,
      )}
    >
      <Info className={cn('mt-0.5 shrink-0', compact ? 'size-3.5' : 'size-4')} aria-hidden="true" />
      <span>
        <strong className="font-semibold">Demo only.</strong> Enquiries are saved in this browser until a backend is connected.
      </span>
    </p>
  );
}
