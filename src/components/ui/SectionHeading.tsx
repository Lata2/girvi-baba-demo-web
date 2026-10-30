import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface Props {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  aside?: ReactNode;
}

export function SectionHeading({ id, eyebrow, title, intro, align = 'left', tone = 'light', className, aside }: Props) {
  const dark = tone === 'dark';
  return (
    <Reveal
      className={cn(
        'mb-8 flex flex-col gap-5 md:mb-12',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('eyebrow', dark && 'text-copper-300')}>
            <span aria-hidden="true" className={cn('h-px w-6', dark ? 'bg-copper-300' : 'bg-copper-500')} />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={cn(
            'mt-3 text-[1.75rem] leading-[1.15] sm:text-[2.1rem] lg:text-[2.4rem]',
            dark ? 'text-white' : 'text-plum-900',
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={cn('mt-3 text-[0.95rem] leading-relaxed sm:text-base', dark ? 'text-white/70' : 'text-muted')}>{intro}</p>
        )}
      </div>
      {aside}
    </Reveal>
  );
}
