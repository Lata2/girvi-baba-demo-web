import { useMutation, useQuery } from '@tanstack/react-query';
import { estimateLoan, getRates } from '@/api/client';
import type { Estimate, EstimateInput } from '@/lib/estimate';

export const estimateKeys = {
  rates: ['rates'] as const,
};

/** Valuation rates change slowly — cache for an hour */
export function useRates() {
  return useQuery({ queryKey: estimateKeys.rates, queryFn: getRates, staleTime: 60 * 60 * 1000 });
}

export function useEstimateLoan() {
  return useMutation<Estimate, Error, EstimateInput>({ mutationFn: estimateLoan });
}
