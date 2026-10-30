import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  IndianRupee,
  Info,
  PhoneCall,
  RotateCcw,
} from 'lucide-react';
import { itemById, pledgeItems, type ItemId } from '@/content/home';
import { ItemArt } from '@/components/illustrations/ItemArt';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/ContactButtons';
import { FormField } from '@/features/enquiry/components/FormField';
import { ConsentField } from '@/features/enquiry/components/ConsentField';
import { DemoNotice } from '@/features/enquiry/components/DemoNotice';
import {
  Spinner,
  SubmitError,
  SubmitSuccess,
} from '@/features/enquiry/components/SubmitState';
import { useSubmitEnquiry } from '@/features/enquiry/hooks';
import {
  quickEnquirySchema,
  type QuickEnquiryInput,
  type QuickEnquiryValues,
} from '@/features/enquiry/schema';
import { usingMockApi } from '@/api/client';
import { isMetal, type Estimate } from '@/lib/estimate';
import { formatINR } from '@/lib/format';
import { selectItem, useSelectedItem } from '@/lib/selectedItem';
import { cn } from '@/lib/cn';
import { useEstimateLoan } from '../hooks';
import {
  STEPS,
  ageOptions,
  conditionOptions,
  describeItem,
  goldKarats,
  initialValues,
  itemCopy,
  silverPurities,
  toEstimateInput,
  validateDetails,
  type WizardValues,
} from '../wizardConfig';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Five-step Girvi estimate: Item → Details → Condition → Estimate → Contact.
 * The selected item is shared with the hero chips and ticker through `selectedItem`.
 */
export function LoanWizard() {
  const uid = useId();
  const reduceMotion = useReducedMotion();
  const item = useSelectedItem();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<WizardValues>(initialValues);
  const [errors, setErrors] = useState<ReturnType<typeof validateDetails>>({});
  const estimate = useEstimateLoan();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);

  // Picking a different item elsewhere on the page (hero chips, ticker) restarts from Details.
  const [seenItem, setSeenItem] = useState<ItemId>(item);
  if (seenItem !== item) {
    setSeenItem(item);
    setErrors({});
    if (step > 1) setStep(1);
  }

  // Move focus to the new step's heading once it has animated in — never on first render.
  const focusHeading = () => {
    if (interacted.current) headingRef.current?.focus();
  };

  const go = (next: number) => {
    interacted.current = true;
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const set = <K extends keyof WizardValues>(
    key: K,
    value: WizardValues[K],
  ) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onContinue = (e?: FormEvent) => {
    e?.preventDefault();
    // Enter on the Estimate/Contact steps must not advance the wizard.
    if (step >= 3) return;
    if (step === 1) {
      const found = validateDetails(item, values);
      setErrors(found);
      if (Object.values(found).some(Boolean)) {
        const firstField = Object.keys(found)[0];
        document.getElementById(`${uid}-${firstField}`)?.focus();
        return;
      }
    }
    if (step === 2 || (step === 1 && isMetal(item))) {
      // Metals skip the condition step — purity and weight decide their value.
      estimate.mutate(toEstimateInput(item, values));
      go(3);
      return;
    }
    go(step + 1);
  };

  const onBack = () => go(step === 3 && isMetal(item) ? 1 : step - 1);

  const restart = () => {
    estimate.reset();
    setValues(initialValues);
    setErrors({});
    go(0);
  };

  const info = itemById(item);
  const metal = isMetal(item);
  const copy = isMetal(item) ? null : itemCopy[item];
  const stepLabel = STEPS[step]!;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-plum-900/10">
      {/* Header: step counter + progress bars (reference style) */}
      <div className="bg-plum-900 px-5 pt-4 pb-5 text-white sm:px-6">
        <div className="flex items-center justify-between text-[0.75rem] font-medium">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-white/70">{stepLabel}</span>
        </div>
        <ol className="mt-3 grid grid-cols-5 gap-1.5" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className="h-1 overflow-hidden rounded-full bg-white/15"
            >
              <span className="sr-only">
                {s}
                {i < step ? ' (done)' : i === step ? ' (current)' : ''}
              </span>
              <m.span
                aria-hidden="true"
                className="block h-full rounded-full bg-copper-500"
                initial={false}
                animate={{
                  width: i < step ? '100%' : i === step ? '55%' : '0%',
                }}
                transition={{ duration: 0.45, ease }}
              />
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={onContinue} noValidate className="px-5 pt-6 pb-5 sm:px-7">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -28 }}
            transition={{ duration: 0.3, ease }}
            onAnimationComplete={focusHeading}
            className="min-h-[19rem]"
          >
            {step === 0 && (
              <StepFrame
                headingRef={headingRef}
                title="Which item would you like to keep as Girvi?"
                hint="Choose an eligible item. You can change it later."
              >
                <div
                  role="radiogroup"
                  aria-label="Item to pledge"
                  className="grid grid-cols-2 gap-2 sm:grid-cols-5"
                >
                  {pledgeItems.map((p) => {
                    const selected = p.id === item;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => selectItem(p.id)}
                        className={cn(
                          'group relative flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center text-[0.75rem] font-semibold transition-[border-color,background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
                          selected
                            ? 'border-copper-500 bg-copper-50 text-plum-900 shadow-soft'
                            : 'border-line bg-white text-plum-900/75 hover:border-copper-300',
                        )}
                      >
                        <ItemArt
                          item={p.id}
                          className="size-11 transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="leading-tight">{p.title}</span>
                        {selected && (
                          <m.span
                            layoutId={`${uid}-check`}
                            className="absolute top-1.5 right-1.5 inline-flex size-4 items-center justify-center rounded-full bg-copper-600 text-white"
                            aria-hidden="true"
                          >
                            <Check className="size-3" />
                          </m.span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </StepFrame>
            )}

            {step === 1 && (
              <StepFrame
                headingRef={headingRef}
                title={
                  metal
                    ? `Tell us about your ${info.title.toLowerCase()}`
                    : `Tell us about your ${info.heroWord.replace(/^your /, '')}`
                }
                hint={
                  metal
                    ? 'An approximate weight is fine — it’s checked at the branch.'
                    : 'Rough figures are fine. We confirm everything in person.'
                }
              >
                {metal ? (
                  <div className="grid gap-4">
                    <Segmented
                      label="Type"
                      value={values.metalForm}
                      onChange={(v) => set('metalForm', v)}
                      options={[
                        {
                          value: 'ornaments',
                          label:
                            item === 'gold'
                              ? 'Jewellery'
                              : 'Ornaments / utensils',
                        },
                        { value: 'coins', label: 'Coins' },
                      ]}
                    />
                    <FormField
                      id={`${uid}-weightGrams`}
                      label="Approximate weight"
                      error={errors.weightGrams}
                    >
                      {(aria) => (
                        <Suffixed suffix="grams">
                          <input
                            {...aria}
                            inputMode="decimal"
                            value={values.weightGrams}
                            onChange={(e) =>
                              set(
                                'weightGrams',
                                e.target.value.replace(/[^\d.]/g, ''),
                              )
                            }
                            placeholder="e.g. 40"
                            className="field pr-16 tabular-nums"
                          />
                        </Suffixed>
                      )}
                    </FormField>
                    {item === 'gold' ? (
                      <Segmented
                        label="Purity"
                        value={values.goldKarat}
                        onChange={(v) => set('goldKarat', v)}
                        options={goldKarats.map((k) => ({
                          value: k,
                          label: `${k}k`,
                        }))}
                      />
                    ) : (
                      <Segmented
                        label="Purity"
                        value={values.silverPurity}
                        onChange={(v) => set('silverPurity', v)}
                        options={silverPurities.map((p) => ({
                          value: p.value,
                          label: p.label,
                        }))}
                      />
                    )}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <FormField
                      id={`${uid}-model`}
                      label={copy?.model ?? ''}
                      error={errors.model}
                    >
                      {(aria) => (
                        <input
                          {...aria}
                          value={values.model}
                          onChange={(e) => set('model', e.target.value)}
                          maxLength={120}
                          placeholder={copy?.modelHint}
                          className="field"
                        />
                      )}
                    </FormField>
                    <div
                      className={cn(
                        'grid gap-4',
                        item !== 'property' && 'sm:grid-cols-2',
                      )}
                    >
                      <FormField
                        id={`${uid}-price`}
                        label={copy?.price ?? ''}
                        error={errors.price}
                      >
                        {(aria) => (
                          <div className="relative">
                            <IndianRupee
                              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
                              aria-hidden="true"
                            />
                            <input
                              {...aria}
                              inputMode="numeric"
                              value={values.price}
                              onChange={(e) =>
                                set(
                                  'price',
                                  e.target.value.replace(/[^\d,]/g, ''),
                                )
                              }
                              placeholder="e.g. 60,000"
                              className="field pl-9 tabular-nums"
                            />
                          </div>
                        )}
                      </FormField>
                      {item !== 'property' && (
                        <FormField id={`${uid}-age`} label="How old is it?">
                          {(aria) => (
                            <select
                              {...aria}
                              value={values.ageYears}
                              onChange={(e) =>
                                set('ageYears', Number(e.target.value))
                              }
                              className="field field-select"
                            >
                              {ageOptions.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </FormField>
                      )}
                    </div>
                  </div>
                )}
              </StepFrame>
            )}

            {step === 2 && !metal && (
              <StepFrame
                headingRef={headingRef}
                title="What condition is it in?"
                hint="Be honest — it keeps the final amount close to this estimate."
              >
                <div
                  role="radiogroup"
                  aria-label="Condition"
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {conditionOptions.map((o) => {
                    const selected = values.condition === o.value;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set('condition', o.value)}
                        className={cn(
                          'rounded-xl border p-3.5 text-left transition-[border-color,background-color] duration-200',
                          selected
                            ? 'border-copper-500 bg-copper-50'
                            : 'border-line hover:border-copper-300',
                        )}
                      >
                        <span className="flex items-center justify-between text-[0.85rem] font-semibold text-plum-900">
                          {o.title}
                          <span
                            className={cn(
                              'inline-flex size-4 items-center justify-center rounded-full border',
                              selected
                                ? 'border-copper-600 bg-copper-600 text-white'
                                : 'border-line',
                            )}
                            aria-hidden="true"
                          >
                            {selected && <Check className="size-3" />}
                          </span>
                        </span>
                        <span className="mt-1 block text-[0.75rem] leading-snug text-muted">
                          {o.body}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <label className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line p-3.5">
                  <span className="text-[0.85rem] font-medium text-plum-900">
                    {copy?.papers}
                  </span>
                  <span className="relative inline-flex shrink-0">
                    <input
                      type="checkbox"
                      checked={values.hasPapers}
                      onChange={(e) => set('hasPapers', e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="h-6 w-11 rounded-full bg-plum-100 transition-colors peer-checked:bg-copper-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-copper-600" />
                    <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-soft transition-transform peer-checked:translate-x-5" />
                  </span>
                </label>
              </StepFrame>
            )}

            {step === 3 && (
              <StepFrame
                headingRef={headingRef}
                title="Your estimated Girvi amount"
                hint={`Indicative money against your ${info.title.toLowerCase()} · ${describeItem(item, values)}`}
              >
                <EstimateResult
                  estimate={estimate.data}
                  pending={estimate.isPending}
                  error={estimate.error?.message}
                  onRetry={() => estimate.mutate(toEstimateInput(item, values))}
                />
              </StepFrame>
            )}

            {step === 4 && estimate.data && (
              <StepFrame
                headingRef={headingRef}
                title="Where should we call you?"
                hint="A specialist confirms your amount and books a visit. No obligation."
              >
                <ContactStep
                  summary={`Estimate ${formatINR(estimate.data.low)} – ${formatINR(estimate.data.high)}. Item: ${describeItem(item, values)}`}
                  service={info.service}
                  onRestart={restart}
                />
              </StepFrame>
            )}
          </m.div>
        </AnimatePresence>

        {/* Footer navigation (hidden on the contact step, which has its own submit) */}
        {step < 4 && (
          <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
            <button
              type="button"
              onClick={onBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-[0.8rem] font-semibold text-muted transition-colors hover:text-plum-900 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back
            </button>
            {step === 3 ? (
              <Button
                type="button"
                size="md"
                onClick={() => go(4)}
                disabled={!estimate.isSuccess}
              >
                Get this amount{' '}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button type="submit" size="md">
                {step === 2 || (step === 1 && metal)
                  ? 'See my estimate'
                  : 'Continue'}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

/* ------------------------------------------------------------- Pieces */

function StepFrame({
  title,
  hint,
  headingRef,
  children,
}: {
  title: string;
  hint: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}) {
  return (
    <div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="text-[1.15rem] outline-none sm:text-[1.25rem]"
      >
        {title}
      </h3>
      <p className="mt-1 mb-5 text-[0.8rem] text-muted">{hint}</p>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-[0.8rem] font-semibold text-plum-900">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(o.value)}
              className={cn(
                'min-w-16 flex-1 rounded-lg border px-3 py-2 text-[0.8rem] font-semibold transition-colors',
                selected
                  ? 'border-copper-500 bg-copper-50 text-copper-800'
                  : 'border-line text-plum-900/75 hover:border-copper-300',
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Suffixed({
  suffix,
  children,
}: {
  suffix: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[0.75rem] font-medium text-muted">
        {suffix}
      </span>
    </div>
  );
}

function EstimateResult({
  estimate,
  pending,
  error,
  onRetry,
}: {
  estimate?: Estimate;
  pending: boolean;
  error?: string;
  onRetry: () => void;
}) {
  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-[#e7b7b2] bg-[#fbefed] p-4 text-[0.85rem] text-[#8a2f27]"
      >
        <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <div className="flex-1">
          <p className="font-semibold">We couldn’t calculate the estimate.</p>
          <p className="mt-0.5">{error}</p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 font-semibold underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    );
  }

  if (pending || !estimate) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="rounded-xl border border-line bg-canvas p-5"
      >
        <p className="flex items-center gap-2 text-[0.85rem] font-medium text-plum-900">
          <Spinner /> Calculating your estimate…
        </p>
        <div className="mt-4 space-y-2.5" aria-hidden="true">
          <div className="h-9 w-48 animate-pulse rounded-lg bg-blush" />
          <div className="h-3 w-40 animate-pulse rounded bg-blush" />
          <div className="h-2 w-full animate-pulse rounded-full bg-blush" />
        </div>
      </div>
    );
  }

  const share = estimate.itemValue > 0 ? estimate.loan / estimate.itemValue : 0;
  return (
    <div aria-live="polite">
      <div className="rounded-xl border border-copper-200 bg-copper-50 p-5">
        <p className="text-[0.75rem] font-medium text-muted">
          Indicative amount you may receive
        </p>
        <AnimatedNumber
          value={estimate.loan}
          className="block font-display text-[2.25rem] leading-tight font-bold text-plum-900 tabular-nums"
        />
        <p className="text-[0.8rem] text-muted tabular-nums">
          Range: {formatINR(estimate.low)} – {formatINR(estimate.high)}
        </p>
        <dl className="mt-4 grid gap-3 text-[0.75rem]">
          <div>
            <div className="flex justify-between">
              <dt className="font-medium text-plum-900">Assessed item value</dt>
              <dd className="text-muted tabular-nums">
                {formatINR(estimate.itemValue)}
              </dd>
            </div>
            <div
              className="mt-1 h-1.5 rounded-full bg-plum-300"
              aria-hidden="true"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <dt className="font-medium text-plum-900">
                Girvi amount ({Math.round(share * 100)}% of item value)
              </dt>
              <dd className="text-muted tabular-nums">
                {formatINR(estimate.loan)}
              </dd>
            </div>
            <div
              className="mt-1 h-1.5 overflow-hidden rounded-full bg-blush-200"
              aria-hidden="true"
            >
              <m.div
                className="h-full rounded-full bg-copper-600"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(share * 100)}%` }}
                transition={{ duration: 0.9, ease }}
              />
            </div>
          </div>
        </dl>
      </div>
      <ul className="mt-3 space-y-1.5 text-[0.75rem] text-muted">
        {estimate.notes.map((n) => (
          <li key={n} className="flex gap-2">
            <Info
              className="mt-0.5 size-3.5 shrink-0 text-copper-600"
              aria-hidden="true"
            />{' '}
            {n}
          </li>
        ))}
        {usingMockApi && (
          <li className="flex gap-2">
            <Info
              className="mt-0.5 size-3.5 shrink-0 text-copper-600"
              aria-hidden="true"
            />{' '}
            Calculated with sample demo rates.
          </li>
        )}
      </ul>
    </div>
  );
}

function ContactStep({
  summary,
  service,
  onRestart,
}: {
  summary: string;
  service: QuickEnquiryInput['service'];
  onRestart: () => void;
}) {
  const uid = useId();
  const mutation = useSubmitEnquiry();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickEnquiryInput, unknown, QuickEnquiryValues>({
    resolver: zodResolver(quickEnquirySchema),
    defaultValues: { name: '', mobile: '', consent: false, service },
    mode: 'onTouched',
  });

  const onSubmit = (v: QuickEnquiryValues) =>
    mutation.mutate({
      name: v.name,
      mobile: v.mobile,
      service: v.service,
      message: summary,
      source: 'loan',
    });

  if (mutation.isSuccess) {
    return (
      <div>
        <SubmitSuccess record={mutation.data} onReset={onRestart} />
      </div>
    );
  }

  // Nested <form> is invalid HTML, so this step submits through a button handler.
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id={`${uid}-name`}
          label="Your name"
          error={errors.name?.message}
        >
          {(aria) => (
            <input
              {...aria}
              {...register('name')}
              className="field"
              autoComplete="name"
              placeholder="Full name"
            />
          )}
        </FormField>
        <FormField
          id={`${uid}-mobile`}
          label="Mobile number"
          error={errors.mobile?.message}
        >
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
      <ConsentField
        id={`${uid}-consent`}
        registration={register('consent')}
        error={errors.consent?.message}
      >
        I agree to be contacted about this Girvi estimate. This enquiry does not
        guarantee an offer or approval.
      </ConsentField>
      {mutation.isError && (
        <SubmitError
          message={mutation.error.message}
          onRetry={handleSubmit(onSubmit)}
        />
      )}
      <div className="flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 self-start rounded-lg px-2 py-2 text-[0.8rem] font-semibold text-muted hover:text-plum-900"
        >
          <RotateCcw className="size-4" aria-hidden="true" /> Start over
        </button>
        <div className="flex flex-col gap-2 sm:flex-row">
          <WhatsAppButton size="md" message={`Hello Girvi Baba, ${summary}`} />
          <Button
            type="button"
            size="md"
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
            aria-busy={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner /> Sending
              </>
            ) : (
              <>
                <PhoneCall className="size-4" aria-hidden="true" /> Request a
                callback
              </>
            )}
          </Button>
        </div>
      </div>
      <DemoNotice compact />
    </div>
  );
}
