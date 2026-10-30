import { computeEstimate, type Estimate, type EstimateInput, type Rates } from '@/lib/estimate';
import { mockLatency, mockRates } from '@/mocks/rates';

/**
 * API boundary. With VITE_API_URL set, requests go to the real backend; without it,
 * the app runs on mock data with realistic latency so loading states are exercised.
 */
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || null;
export const usingMockApi = API_URL === null;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) throw new Error(`Request failed (${res.status}). Please try again.`);
  return (await res.json()) as T;
}

/** GET /rates — valuation parameters and metal prices */
export async function getRates(): Promise<Rates> {
  if (usingMockApi) {
    await mockLatency(450);
    return mockRates;
  }
  return request<Rates>('/rates');
}

/** POST /estimates — indicative loan estimate for one item */
export async function estimateLoan(input: EstimateInput): Promise<Estimate> {
  if (usingMockApi) {
    await mockLatency(700);
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      throw new Error('You appear to be offline. Check your connection and try again.');
    }
    return computeEstimate(input, mockRates);
  }
  return request<Estimate>('/estimates', { method: 'POST', body: JSON.stringify(input) });
}
