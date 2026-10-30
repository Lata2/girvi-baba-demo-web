const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const formatINR = (value: number): string => inr.format(Math.round(value));

/** Compact Indian notation: ₹2.5 lakh, ₹1.2 crore */
export function formatINRCompact(value: number): string {
  if (value >= 1_00_00_000) return `₹${trim(value / 1_00_00_000)} crore`;
  if (value >= 1_00_000) return `₹${trim(value / 1_00_000)} lakh`;
  return formatINR(value);
}

const trim = (n: number) => (Math.round(n * 100) / 100).toString();
