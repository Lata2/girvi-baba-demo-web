import { m, type HTMLMotionProps } from 'motion/react';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

/**
 * Gentle scroll-triggered entrance. Runs once, travels a short distance and is
 * automatically neutralised for reduced-motion users by <MotionConfig reducedMotion="user">.
 */
export function Reveal({ delay = 0, y = 18, children, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
