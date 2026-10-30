import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { m } from 'motion/react';
import type { EnquiryRecord } from '../api';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

export function Spinner() {
  return <Loader2 className="size-4 animate-spin" aria-hidden="true" />;
}

export function SubmitError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-[#e7b7b2] bg-[#fbefed] px-4 py-3 text-[0.8rem] text-[#8a2f27]">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p className="font-semibold">The enquiry was not sent.</p>
        <p className="mt-0.5">{message}</p>
      </div>
      <button type="button" onClick={onRetry} className="shrink-0 font-semibold underline underline-offset-4">
        Try again
      </button>
    </div>
  );
}

export function SubmitSuccess({ record, onReset, tone = 'light' }: { record: EnquiryRecord; onReset: () => void; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-4 py-2"
    >
      <m.span
        initial={{ scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
        className={cn('inline-flex size-12 items-center justify-center rounded-full', dark ? 'bg-white/10 text-copper-300' : 'bg-copper-100 text-copper-700')}
      >
        <CheckCircle2 className="size-6" aria-hidden="true" />
      </m.span>
      <div>
        <p className={cn('font-display text-xl', dark ? 'text-white' : 'text-plum-900')}>
          Thank you, {record.name.split(' ')[0]}.
        </p>
        <p className={cn('mt-1.5 text-[0.85rem]', dark ? 'text-white/70' : 'text-muted')}>
          Reference <span className="font-semibold tabular-nums">{record.reference}</span>.{' '}
          {site.demoMode
            ? 'This is a demo, so no one will call yet. Once live, the team calls back during working hours.'
            : 'Our team will call you back during working hours.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className={cn('text-[0.85rem] font-semibold underline underline-offset-4', dark ? 'text-copper-300' : 'text-copper-700')}
      >
        Send another enquiry
      </button>
    </m.div>
  );
}
