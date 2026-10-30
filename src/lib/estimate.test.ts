import { describe, expect, it } from 'vitest';
import { computeEstimate, type Rates } from './estimate';
import { mockRates } from '@/mocks/rates';

const rates: Rates = { ...mockRates, gold24kPerGram: 7_000, silverPerGram: 100 };

describe('computeEstimate — metals', () => {
  it('values gold by pure-gold content and applies the RBI 85% slab for small loans', () => {
    // 10 g of 24k at ₹7,000 = ₹70,000 → 85% = ₹59,500
    const e = computeEstimate({ kind: 'metal', item: 'gold', weightGrams: 10, purity: 1 }, rates);
    expect(e.itemValue).toBe(70_000);
    expect(e.loan).toBe(59_500);
    expect(e.high).toBe(e.loan);
    expect(e.low).toBeLessThan(e.loan);
  });

  it('accounts for karat purity', () => {
    const k24 = computeEstimate({ kind: 'metal', item: 'gold', weightGrams: 24, purity: 1 }, rates);
    const k18 = computeEstimate({ kind: 'metal', item: 'gold', weightGrams: 24, purity: 18 / 24 }, rates);
    expect(k18.itemValue).toBe(Math.round(k24.itemValue * 0.75));
  });

  it('returns zero for zero weight', () => {
    expect(computeEstimate({ kind: 'metal', item: 'silver', weightGrams: 0, purity: 0.925 }, rates).loan).toBe(0);
  });
});

describe('computeEstimate — other items', () => {
  const base = { kind: 'asset', item: 'mobile', price: 1_00_000, ageYears: 0, condition: 'excellent', hasPapers: true } as const;

  it('applies the item loan-to-value to a new item', () => {
    const e = computeEstimate(base, rates);
    expect(e.itemValue).toBe(1_00_000);
    expect(e.loan).toBe(40_000);
    expect(e.low).toBeLessThan(e.loan);
    expect(e.high).toBeGreaterThan(e.loan);
  });

  it('lowers the value for age, condition and missing papers', () => {
    const newer = computeEstimate(base, rates).loan;
    expect(computeEstimate({ ...base, ageYears: 2 }, rates).loan).toBeLessThan(newer);
    expect(computeEstimate({ ...base, condition: 'fair' }, rates).loan).toBeLessThan(newer);
    const noPapers = computeEstimate({ ...base, hasPapers: false }, rates);
    expect(noPapers.loan).toBeLessThan(newer);
    expect(noPapers.notes.length).toBe(2);
  });

  it('never depreciates below the floor', () => {
    const old = computeEstimate({ ...base, ageYears: 40 }, rates);
    expect(old.itemValue).toBe(1_00_000 * rates.items.mobile.floor);
  });

  it('does not depreciate property', () => {
    const e = computeEstimate({ ...base, item: 'property', price: 50_00_000, ageYears: 10 }, rates);
    expect(e.itemValue).toBe(50_00_000);
    expect(e.loan).toBe(25_00_000);
  });
});
