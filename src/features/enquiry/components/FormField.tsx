import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  tone?: 'light' | 'dark';
  children: (aria: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode;
}

/** Accessible label + control + hint/error wiring for any input. */
export function FormField({ id, label, error, hint, optional, tone = 'light', children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;
  const dark = tone === 'dark';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={cn('text-[0.8rem] font-semibold', dark ? 'text-white/85' : 'text-plum-900')}>
        {label}
        {optional && <span className={cn('ml-1 font-normal', dark ? 'text-white/55' : 'text-muted')}>(optional)</span>}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {error ? (
        <p id={errorId} className={cn('text-[0.78rem] font-medium', dark ? 'text-copper-200' : 'text-danger')} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className={cn('text-[0.75rem]', dark ? 'text-white/55' : 'text-muted')}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
