import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import { formatINR } from '@/lib/format';

/**
 * Rupee amount that counts smoothly from its previous value to the new one.
 * Writes to the DOM directly (no re-render per frame); reduced-motion users see the final value.
 */
export function AnimatedNumber({ value, className, duration = 0.9 }: { value: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = formatINR(value);
      from.current = value;
      return;
    }
    const controls = animate(from.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = formatINR(v);
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {formatINR(value)}
    </span>
  );
}
