import { describe, expect, it } from 'vitest';
import { maxLoanForValue } from './ltv';
import { formatINRCompact } from './format';

describe('maxLoanForValue', () => {
  it('returns 0 for invalid values', () => {
    expect(maxLoanForValue(0).maxLoan).toBe(0);
    expect(maxLoanForValue(-10).maxLoan).toBe(0);
    expect(maxLoanForValue(Number.NaN).maxLoan).toBe(0);
  });

  it('applies 85% for small loans', () => {
    expect(maxLoanForValue(100_000)).toMatchObject({ maxLoan: 85_000, ratio: 0.85 });
  });

  it('moves to the 80% slab once 85% would exceed ₹2.5 lakh', () => {
    // 85% of 3L = 2.55L (> 2.5L cap), so 80% slab gives 2.4L — the 85% slab capped at 2.5L is better
    expect(maxLoanForValue(300_000)).toMatchObject({ maxLoan: 250_000, ratio: 0.85 });
    // 80% of 4L = 3.2L, inside the 80% slab
    expect(maxLoanForValue(400_000)).toMatchObject({ maxLoan: 320_000, ratio: 0.8 });
  });

  it('applies 75% above ₹5 lakh', () => {
    expect(maxLoanForValue(1_000_000)).toMatchObject({ maxLoan: 750_000, ratio: 0.75 });
    // 80% of 6.5L = 5.2L → capped at 5L; 75% = 4.875L not above 5L → stays in 80% slab at 5L
    expect(maxLoanForValue(650_000)).toMatchObject({ maxLoan: 500_000, ratio: 0.8 });
  });
});

describe('formatINRCompact', () => {
  it('uses lakh and crore', () => {
    expect(formatINRCompact(250_000)).toBe('₹2.5 lakh');
    expect(formatINRCompact(12_000_000)).toBe('₹1.2 crore');
  });
});
