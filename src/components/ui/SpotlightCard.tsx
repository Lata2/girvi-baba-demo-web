import { useCallback, type CSSProperties, type HTMLAttributes, type PointerEvent } from 'react';
import { cn } from '@/lib/cn';

interface Props extends HTMLAttributes<HTMLDivElement> {
  spot?: string;
}

/** Card with a soft radial glow that follows a mouse/pen pointer. Touch input is ignored. */
export function SpotlightCard({ spot, className, style, children, ...rest }: Props) {
  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn('spotlight', className)}
      style={{ ...(spot ? ({ '--spot': spot } as CSSProperties) : null), ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
