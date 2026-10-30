import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { quickEnquirySchema, type QuickEnquiryInput, type QuickEnquiryValues, type ServiceInterest } from '../schema';
import type { EnquiryPayload } from '../api';
import { useSubmitEnquiry } from '../hooks';
import { FormField } from './FormField';
import { DemoNotice } from './DemoNotice';
import { ConsentField } from './ConsentField';
import { Spinner, SubmitError, SubmitSuccess } from './SubmitState';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface Props {
  service: ServiceInterest;
  source: EnquiryPayload['source'];
  submitLabel: string;
  tone?: 'light' | 'dark';
  buttonVariant?: ButtonVariant;
  className?: string;
}

/** Name + mobile callback form for a fixed service (Invest, Legal advice). */
export function CompactEnquiry({ service, source, submitLabel, tone = 'light', buttonVariant = 'primary', className }: Props) {
  const uid = useId();
  const mutation = useSubmitEnquiry();
  const empty: QuickEnquiryInput = { name: '', mobile: '', consent: false, service };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickEnquiryInput, unknown, QuickEnquiryValues>({
    resolver: zodResolver(quickEnquirySchema),
    defaultValues: empty,
    mode: 'onTouched',
  });

  const onSubmit = (v: QuickEnquiryValues) => mutation.mutate({ name: v.name, mobile: v.mobile, service: v.service, source });
  const dark = tone === 'dark';

  if (mutation.isSuccess) {
    return (
      <div className={className}>
        <SubmitSuccess
          tone={tone}
          record={mutation.data}
          onReset={() => {
            mutation.reset();
            reset(empty);
          }}
        />
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-label={submitLabel} className={cn('flex flex-col gap-4', className)}>
      <input type="hidden" {...register('service')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id={`${uid}-name`} label="Your name" tone={tone} error={errors.name?.message}>
          {(aria) => <input {...aria} {...register('name')} className="field" autoComplete="name" placeholder="Full name" />}
        </FormField>
        <FormField id={`${uid}-mobile`} label="Mobile number" tone={tone} error={errors.mobile?.message}>
          {(aria) => (
            <input
              {...aria}
              {...register('mobile')}
              className="field tabular-nums"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="10-digit mobile"
              maxLength={15}
            />
          )}
        </FormField>
      </div>
      <div className={cn(dark && '[&_label]:text-white/70 [&_p]:text-copper-200')}>
        <ConsentField id={`${uid}-consent`} registration={register('consent')} error={errors.consent?.message}>
          I agree to be contacted about this enquiry by call or SMS.
        </ConsentField>
      </div>
      {mutation.isError && <SubmitError message={mutation.error.message} onRetry={handleSubmit(onSubmit)} />}
      <Button type="submit" variant={buttonVariant} size="lg" className="w-full sm:w-auto sm:self-start" disabled={mutation.isPending} aria-busy={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <Spinner /> Sending
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" /> {submitLabel}
          </>
        )}
      </Button>
      <DemoNotice compact tone={tone} />
    </form>
  );
}
