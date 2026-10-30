import { useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import {
  enquirySchema,
  serviceOptions,
  type EnquiryInput,
  type EnquiryValues,
} from '../schema';
import { useSubmitEnquiry } from '../hooks';
import { FormField } from './FormField';
import { DemoNotice } from './DemoNotice';
import { ConsentField } from './ConsentField';
import { Spinner, SubmitError, SubmitSuccess } from './SubmitState';
import { Button } from '@/components/ui/Button';

const MESSAGE_MAX = 600;
const empty: EnquiryInput = {
  name: '',
  mobile: '',
  email: '',
  service: '' as EnquiryInput['service'],
  message: '',
  consent: false,
};

export function EnquiryForm() {
  const uid = useId();
  const mutation = useSubmitEnquiry();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EnquiryInput, unknown, EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: empty,
    mode: 'onTouched',
  });
  const message = useWatch({ control, name: 'message' }) ?? '';

  const onSubmit = (v: EnquiryValues) =>
    mutation.mutate({
      name: v.name,
      mobile: v.mobile,
      email: v.email || undefined,
      service: v.service,
      message: v.message || undefined,
      source: 'form',
    });

  if (mutation.isSuccess) {
    return (
      <SubmitSuccess
        record={mutation.data}
        onReset={() => {
          mutation.reset();
          reset(empty);
        }}
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Enquiry form"
      className="flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id={`${uid}-name`}
          label="Full name"
          error={errors.name?.message}
        >
          {(aria) => (
            <input
              {...aria}
              {...register('name')}
              className="field"
              autoComplete="name"
              placeholder="As on your ID"
            />
          )}
        </FormField>
        <FormField
          id={`${uid}-mobile`}
          label="Mobile number"
          error={errors.mobile?.message}
          hint="We call back on this number."
        >
          {(aria) => (
            <input
              {...aria}
              {...register('mobile')}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={15}
              placeholder="10-digit mobile"
              className="field tabular-nums"
            />
          )}
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id={`${uid}-email`}
          label="Email"
          optional
          error={errors.email?.message}
        >
          {(aria) => (
            <input
              {...aria}
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="field"
            />
          )}
        </FormField>
        <FormField
          id={`${uid}-service`}
          label="I need help with"
          error={errors.service?.message}
        >
          {(aria) => (
            <select
              {...aria}
              {...register('service')}
              className="field field-select"
            >
              <option value="" disabled>
                Choose one
              </option>
              <optgroup label="Girvi services">
                {serviceOptions
                  .filter((o) => o.group === 'loan')
                  .map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Investing or advice">
                {serviceOptions
                  .filter((o) => o.group !== 'loan')
                  .map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
              </optgroup>
            </select>
          )}
        </FormField>
      </div>

      <FormField
        id={`${uid}-message`}
        label="Message"
        optional
        error={errors.message?.message}
        hint={`${message.length}/${MESSAGE_MAX} · Mention the item, weight or model and the amount you need.`}
      >
        {(aria) => (
          <textarea
            {...aria}
            {...register('message')}
            rows={3}
            maxLength={MESSAGE_MAX + 50}
            placeholder="e.g. I’d like to keep 40 g gold bangles as Girvi; please share the indicative amount and terms."
            className="field resize-y"
          />
        )}
      </FormField>

      <ConsentField
        id={`${uid}-consent`}
        registration={register('consent')}
        error={errors.consent?.message}
      >
        I agree that Girvi Baba may contact me about this enquiry by call, SMS
        or email. This enquiry does not guarantee an offer or approval.
      </ConsentField>

      {mutation.isError && (
        <SubmitError
          message={mutation.error.message}
          onRetry={handleSubmit(onSubmit)}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={mutation.isPending}
          aria-busy={mutation.isPending}
          className="sm:min-w-52"
        >
          {mutation.isPending ? (
            <>
              <Spinner /> Sending enquiry
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" /> Send enquiry
            </>
          )}
        </Button>
        <p className="text-[0.75rem] text-muted">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
      <DemoNotice />
    </form>
  );
}
