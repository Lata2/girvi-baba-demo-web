import type { EstimateInput, Rates } from '@/lib/estimate';
import type { ItemId } from '@/content/home';

/**
 * MOCK DATA — sample valuation parameters so the UI works without a backend.
 * Replace by setting VITE_API_URL (see src/api/client.ts). Figures are illustrative,
 * not live market prices, and are labelled as samples in the UI while demoMode is on.
 */
export const mockRates: Rates = {
  updatedAt: new Date().toISOString(),
  gold24kPerGram: 7_400,
  silverPerGram: 90,
  items: {
    mobile: { ltv: 0.4, depreciationPerYear: 0.25, floor: 0.15 },
    bike: { ltv: 0.5, depreciationPerYear: 0.12, floor: 0.25 },
    laptop: { ltv: 0.4, depreciationPerYear: 0.22, floor: 0.15 },
    car: { ltv: 0.5, depreciationPerYear: 0.12, floor: 0.25 },
    luxury: { ltv: 0.5, depreciationPerYear: 0.05, floor: 0.5 },
    appliance: { ltv: 0.3, depreciationPerYear: 0.2, floor: 0.15 },
    property: { ltv: 0.5, depreciationPerYear: 0, floor: 1 },
    other: { ltv: 0.35, depreciationPerYear: 0.15, floor: 0.2 },
  },
};

/** Typical example per item, used by the hero preview card */
export const sampleInputs: Record<ItemId, { label: string; input: EstimateInput }> = {
  mobile: { label: 'iPhone 14 · 1 year old', input: { kind: 'asset', item: 'mobile', price: 70_000, ageYears: 1, condition: 'good', hasPapers: true } },
  bike: { label: 'Honda Activa · 2 years', input: { kind: 'asset', item: 'bike', price: 85_000, ageYears: 2, condition: 'good', hasPapers: true } },
  gold: { label: 'Gold bangles · 40 g, 22k', input: { kind: 'metal', item: 'gold', weightGrams: 40, purity: 22 / 24 } },
  laptop: { label: 'Dell i5 laptop · 1 year', input: { kind: 'asset', item: 'laptop', price: 60_000, ageYears: 1, condition: 'excellent', hasPapers: true } },
  car: { label: 'Maruti Swift · 4 years', input: { kind: 'asset', item: 'car', price: 6_50_000, ageYears: 4, condition: 'good', hasPapers: true } },
  luxury: { label: 'Branded watch · with papers', input: { kind: 'asset', item: 'luxury', price: 45_000, ageYears: 2, condition: 'excellent', hasPapers: true } },
  appliance: { label: '43" LED TV · 1 year', input: { kind: 'asset', item: 'appliance', price: 35_000, ageYears: 1, condition: 'good', hasPapers: true } },
  silver: { label: 'Silver payal · 250 g', input: { kind: 'metal', item: 'silver', weightGrams: 250, purity: 0.925 } },
  property: { label: '2 BHK flat · clear title', input: { kind: 'asset', item: 'property', price: 45_00_000, ageYears: 0, condition: 'good', hasPapers: true } },
  other: { label: 'Guitar · 2 years old', input: { kind: 'asset', item: 'other', price: 30_000, ageYears: 2, condition: 'good', hasPapers: true } },
};

export const mockLatency = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
