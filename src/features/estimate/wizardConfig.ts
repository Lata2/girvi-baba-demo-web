import type { ItemId } from '@/content/home';
import type { Condition, EstimateInput } from '@/lib/estimate';
import { isMetal } from '@/lib/estimate';

export const STEPS = ['Item', 'Details', 'Condition', 'Estimate', 'Contact'] as const;

export interface WizardValues {
  weightGrams: string;
  goldKarat: number;
  silverPurity: number;
  metalForm: 'ornaments' | 'coins';
  model: string;
  price: string;
  ageYears: number;
  condition: Condition;
  hasPapers: boolean;
}

export const initialValues: WizardValues = {
  weightGrams: '',
  goldKarat: 22,
  silverPurity: 0.925,
  metalForm: 'ornaments',
  model: '',
  price: '',
  ageYears: 1,
  condition: 'good',
  hasPapers: true,
};

export const goldKarats = [24, 22, 20, 18] as const;
export const silverPurities = [
  { value: 0.999, label: 'Fine (99.9%)' },
  { value: 0.925, label: 'Sterling (92.5%)' },
  { value: 0.8, label: 'Ornament (80%)' },
] as const;
export const ageOptions = [
  { value: 0, label: 'Less than 1 year' },
  { value: 1, label: '1 year' },
  { value: 2, label: '2 years' },
  { value: 3, label: '3 years' },
  { value: 5, label: '4–6 years' },
  { value: 8, label: 'More than 6 years' },
] as const;

export const conditionOptions: { value: Condition; title: string; body: string }[] = [
  { value: 'excellent', title: 'Excellent', body: 'Like new, no marks, works perfectly' },
  { value: 'good', title: 'Good', body: 'Normal use, small marks, fully working' },
  { value: 'fair', title: 'Fair', body: 'Visible wear or minor faults' },
];

/** Item-specific wording for the Details and Condition steps */
export const itemCopy: Record<Exclude<ItemId, 'gold' | 'silver'>, { model: string; modelHint: string; price: string; papers: string }> = {
  mobile: { model: 'Brand & model', modelHint: 'e.g. iPhone 14, 128 GB', price: 'Purchase price', papers: 'I have the bill or box' },
  bike: { model: 'Make, model & year', modelHint: 'e.g. Honda Activa 6G, 2022', price: 'Purchase price (on-road)', papers: 'RC and insurance are in my name' },
  laptop: { model: 'Brand & model', modelHint: 'e.g. Dell Inspiron i5, 16 GB', price: 'Purchase price', papers: 'I have the bill or warranty card' },
  car: { model: 'Make, model & year', modelHint: 'e.g. Maruti Swift VXi, 2020', price: 'Purchase price (on-road)', papers: 'RC and insurance are in my name' },
  luxury: { model: 'Brand & item', modelHint: 'e.g. Titan Edge watch', price: 'Purchase price', papers: 'I have the bill or authenticity papers' },
  appliance: { model: 'Item & brand', modelHint: 'e.g. Samsung 43" LED TV', price: 'Purchase price', papers: 'I have the bill or warranty card' },
  property: { model: 'Property type & city', modelHint: 'e.g. 2 BHK flat, Pune', price: 'Approximate market value', papers: 'Title deed is clear and in my name' },
  other: { model: 'What is the item?', modelHint: 'e.g. Yamaha guitar, Bosch drill kit', price: 'Purchase price', papers: 'I have the bill or ownership proof' },
};

export const parseRupees = (v: string) => Number(v.replace(/[,\s₹]/g, ''));

/** Validation for the Details step. Returns field → message. */
export function validateDetails(item: ItemId, v: WizardValues): Partial<Record<'weightGrams' | 'model' | 'price', string>> {
  const errors: Partial<Record<'weightGrams' | 'model' | 'price', string>> = {};
  if (isMetal(item)) {
    const w = Number(v.weightGrams);
    if (!v.weightGrams.trim() || !Number.isFinite(w) || w <= 0) errors.weightGrams = 'Enter the approximate weight in grams.';
    else if (item === 'gold' && v.metalForm === 'coins' && w > 50) errors.weightGrams = 'Gold coins are limited to 50 g per borrower.';
    else if (item === 'gold' && w > 1000) errors.weightGrams = 'Gold ornaments are limited to 1 kg per borrower.';
    else if (item === 'silver' && v.metalForm === 'coins' && w > 500) errors.weightGrams = 'Silver coins are limited to 500 g per borrower.';
    else if (item === 'silver' && w > 10000) errors.weightGrams = 'Silver ornaments are limited to 10 kg per borrower.';
    return errors;
  }
  if (v.model.trim().length < 2) errors.model = 'Tell us what the item is (at least 2 characters).';
  const p = parseRupees(v.price);
  if (!v.price.trim() || !Number.isFinite(p)) errors.price = 'Enter the amount in rupees.';
  else if (p < 1000) errors.price = 'Enter at least ₹1,000.';
  else if (p > 50_00_00_000) errors.price = 'For amounts above ₹50 crore, please call us directly.';
  return errors;
}

export function toEstimateInput(item: ItemId, v: WizardValues): EstimateInput {
  if (item === 'gold' || item === 'silver') {
    return {
      kind: 'metal',
      item,
      weightGrams: Number(v.weightGrams),
      purity: item === 'gold' ? v.goldKarat / 24 : v.silverPurity,
    };
  }
  return {
    kind: 'asset',
    item,
    price: parseRupees(v.price),
    ageYears: item === 'property' ? 0 : v.ageYears,
    condition: v.condition,
    hasPapers: v.hasPapers,
  };
}

/** One-line description for the enquiry sent to the team */
export function describeItem(item: ItemId, v: WizardValues): string {
  if (item === 'gold') return `${v.weightGrams} g gold ${v.metalForm}, ${v.goldKarat}k`;
  if (item === 'silver') return `${v.weightGrams} g silver ${v.metalForm}, ${Math.round(v.silverPurity * 1000) / 10}%`;
  return `${v.model.trim()} · bought for ₹${parseRupees(v.price).toLocaleString('en-IN')} · ${v.condition} condition · papers: ${v.hasPapers ? 'yes' : 'no'}`;
}
