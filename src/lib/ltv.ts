/**
 * Regulatory loan-to-value (LTV) ceilings for consumption loans against gold/silver,
 * as set by the RBI (Lending Against Gold and Silver Collateral) Directions, 2025,
 * applicable to RBI-regulated lenders from 1 April 2026.
 *
 * The slab is decided by the LOAN amount, not the collateral value:
 *   loan ≤ ₹2.5 lakh            → up to 85% LTV
 *   ₹2.5 lakh < loan ≤ ₹5 lakh  → up to 80% LTV
 *   loan > ₹5 lakh               → up to 75% LTV
 *
 * This is an indicative ceiling only. Actual eligibility depends on purity, net
 * weight, the lender's valuation, policy and credit assessment.
 */
export const LTV_SLABS = [
  { upTo: 250_000, ratio: 0.85, label: 'Up to ₹2.5 lakh' },
  { upTo: 500_000, ratio: 0.8, label: '₹2.5 lakh to ₹5 lakh' },
  { upTo: Number.POSITIVE_INFINITY, ratio: 0.75, label: 'Above ₹5 lakh' },
] as const;

export interface LtvResult {
  maxLoan: number;
  ratio: number;
  slabLabel: string;
}

export function maxLoanForValue(collateralValue: number): LtvResult {
  if (!Number.isFinite(collateralValue) || collateralValue <= 0) {
    return { maxLoan: 0, ratio: LTV_SLABS[0].ratio, slabLabel: LTV_SLABS[0].label };
  }

  let best: LtvResult = { maxLoan: 0, ratio: LTV_SLABS[0].ratio, slabLabel: LTV_SLABS[0].label };
  let lowerBound = 0;

  for (const slab of LTV_SLABS) {
    const candidate = Math.min(collateralValue * slab.ratio, slab.upTo);
    // A slab is only reachable if the loan it allows actually falls inside it.
    if (candidate > lowerBound && candidate > best.maxLoan) {
      best = { maxLoan: Math.floor(candidate), ratio: slab.ratio, slabLabel: slab.label };
    }
    lowerBound = slab.upTo;
  }

  return best;
}
