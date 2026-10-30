import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'light' | 'ghost-light' | 'whatsapp';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none';

const variants: Record<ButtonVariant, string> = {
  /** Copper — the main call to action (white text passes WCAG AA) */
  primary: 'bg-copper-600 text-white shadow-copper hover:-translate-y-0.5 hover:bg-copper-700',
  /** Plum — strong secondary action */
  dark: 'bg-plum-900 text-white shadow-plum hover:-translate-y-0.5 hover:bg-plum-800',
  outline: 'border border-plum-900/15 bg-white text-plum-900 hover:-translate-y-0.5 hover:border-copper-500 hover:shadow-soft',
  light: 'bg-white text-plum-900 shadow-soft hover:-translate-y-0.5 hover:bg-copper-50',
  'ghost-light': 'border border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10',
  whatsapp: 'border border-plum-900/10 bg-white text-plum-900 hover:-translate-y-0.5 hover:border-whatsapp/50 hover:shadow-soft',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[0.8rem]',
  md: 'h-11 px-5 text-[0.875rem]',
  lg: 'h-12 px-6 text-[0.9rem]',
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

