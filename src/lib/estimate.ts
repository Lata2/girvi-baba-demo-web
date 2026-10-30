import type { ItemId } from '@/content/home';
import { maxLoanForValue } from './ltv';

/* ------------------------------------------------------------------ Types */

export type Condition = 'excellent' | 'good' | 'fair';
export type MetalItem = 'gold' | 'silver';
export type AssetItem = Exclude<ItemId, MetalItem>;

export interface ItemRate {
  /** Share of the assessed value that can be lent */
  ltv: number;
  /** Value lost per year of age (0 for items that do not depreciate) */
  depreciationPerYear: number;
  /** Lowest share of the purchase price an item is ever valued at */
  floor: number;
}

export interface Rates {
  updatedAt: string;
  /** Rupees per gram of pure (24k) gold */
  gold24kPerGram: number;
  /** Rupees per gram of pure silver */
  silverPerGram: number;
  items: Record<AssetItem, ItemRate>;
}

export type EstimateInput =
  | { kind: 'metal'; item: MetalItem; weightGrams: number; purity: number }
  | { kind: 'asset'; item: AssetItem; price: number; ageYears: number; condition: Condition; hasPapers: boolean };

export interface Estimate {
  item: ItemId;
  /** Our assessed value of the item */
  itemValue: number;
  /** Most likely loan amount */
  loan: number;
  low: number;
  high: number;
  /** Effective loan-to-value used */
  ltv: number;
  notes: string[];
}

/* -------------------------------------------------------------- Constants */

export const CONDITION_FACTOR: Record<Condition, number> = { excellent: 1, good: 0.85, fair: 0.65 };
/** Missing bill / RC / papers lowers the valuation */
export const NO_PAPERS_FACTOR = 0.85;
/** Spread shown around the most likely amount for non-metal items */
export const ASSET_SPREAD = 0.12;

const roundTo = (n: number, step: number) => Math.max(0, Math.round(n / step) * step);
const roundMoney = (n: number) => roundTo(n, n >= 1_00_000 ? 1000 : 100);

/* ---------------------------------------------------------------- Engine */

/**
 * Indicative loan estimate. Pure and deterministic, so the same function can run
 * in the browser (mock API) or on a server later.
 */
export function computeEstimate(input: EstimateInput, rates: Rates): Estimate {
  if (input.kind === 'metal') {
    const perGram = input.item === 'gold' ? rates.gold24kPerGram : rates.silverPerGram;
    const weight = Math.max(0, input.weightGrams);
    const purity = Math.min(1, Math.max(0, input.purity));
    const itemValue = weight * purity * perGram;
    // Gold and silver follow the RBI loan-to-value slabs
    const { maxLoan, ratio } = maxLoanForValue(itemValue);
    const loan = roundMoney(maxLoan);
    return {
      item: input.item,
      itemValue: roundMoney(itemValue),
      loan,
      low: roundMoney(loan * 0.9),
      high: loan,
      ltv: ratio,
      notes: ['Final amount depends on purity and net weight tested at the branch.', 'Stones and embellishments are not counted.'],
    };
  }

  const rate = rates.items[input.item];
  const age = Math.max(0, input.ageYears);
  const depreciated = Math.max(rate.floor, (1 - rate.depreciationPerYear) ** age);
  const itemValue =
    Math.max(0, input.price) * depreciated * CONDITION_FACTOR[input.condition] * (input.hasPapers ? 1 : NO_PAPERS_FACTOR);
  const loan = itemValue * rate.ltv;
  const notes = ['Final amount is confirmed after a physical check of the item.'];
  if (!input.hasPapers) notes.push('Bring the bill, RC or ownership papers to get a better valuation.');

  return {
    item: input.item,
    itemValue: roundMoney(itemValue),
    loan: roundMoney(loan),
    low: roundMoney(loan * (1 - ASSET_SPREAD)),
    high: roundMoney(loan * (1 + ASSET_SPREAD)),
    ltv: rate.ltv,
    notes,
  };
}

export const isMetal = (item: ItemId): item is MetalItem => item === 'gold' || item === 'silver';
