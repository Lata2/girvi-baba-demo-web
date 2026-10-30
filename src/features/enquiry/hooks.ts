import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clearEnquiries, listEnquiries, submitEnquiry, type EnquiryPayload, type EnquiryRecord } from './api';

export const enquiryKeys = {
  all: ['enquiries'] as const,
};

export function useEnquiries() {
  return useQuery({ queryKey: enquiryKeys.all, queryFn: listEnquiries, staleTime: Infinity });
}

export function useSubmitEnquiry() {
  const qc = useQueryClient();
  return useMutation<EnquiryRecord, Error, EnquiryPayload>({
    mutationFn: submitEnquiry,
    onSuccess: (record) => {
      qc.setQueryData<EnquiryRecord[]>(enquiryKeys.all, (prev = []) => [record, ...prev].slice(0, 10));
    },
  });
}

export function useClearEnquiries() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearEnquiries,
    onSuccess: () => qc.setQueryData(enquiryKeys.all, []),
  });
}
