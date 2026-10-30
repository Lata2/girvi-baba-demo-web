import { useMemo } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { PledgeItem } from '@/content/home';
import { ItemArt } from '@/components/illustrations/ItemArt';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { useRates } from '@/features/estimate/hooks';
import { computeEstimate } from '@/lib/estimate';
import { formatINR } from '@/lib/format';
import { sampleInputs } from '@/mocks/rates';
import { usingMockApi } from '@/api/client';

const ease = [0.22, 1, 0.36, 1] as const;

/** Browser-window style card that previews an estimate for the item in the hero headline. */
export function EstimatePreview({ item }: { item: PledgeItem }) {
  const rates = useRates();
  const sample = sampleInputs[item.id];
  const estimate = useMemo(
    () => (rates.data ? computeEstimate(sample.input, rates.data) : null),
    [rates.data, sample],
  );
  const loanShare =
    estimate && estimate.itemValue > 0 ? estimate.loan / estimate.itemValue : 0;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#e5675b]" />
            <span className="size-2.5 rounded-full bg-[#eab64a]" />
            <span className="size-2.5 rounded-full bg-[#5fbf6a]" />
          </span>
          <span className="flex-1 truncate rounded-md bg-canvas px-3 py-1 text-[0.7rem] text-muted">
            girvibaba.in/estimate
          </span>
        </div>

        <div className="p-5 sm:p-6" aria-live="polite">
          <div className="space-y-2" aria-hidden="true">
            <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-blush" />
            <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-blush [animation-delay:200ms]" />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-copper-100">
                <ItemArt item={item.id} className="size-9" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.85rem] font-semibold text-plum-900">
                  Girvi item: {item.title}
                </span>
                <span className="block truncate text-[0.75rem] text-muted">
                  {sample.label}
                </span>
              </span>
            </m.div>
          </AnimatePresence>

          <p className="mt-5 text-[0.75rem] font-medium text-muted">
            Indicative money you may receive
          </p>
          {estimate ? (
            <>
              <AnimatedNumber
                value={estimate.loan}
                className="block font-display text-[2rem] leading-tight font-bold text-plum-900 tabular-nums"
              />
              <p className="text-[0.75rem] text-muted tabular-nums">
                Range: {formatINR(estimate.low)} – {formatINR(estimate.high)}
              </p>
            </>
          ) : (
            <div className="mt-1 space-y-2" aria-label="Loading estimate">
              <div className="h-8 w-40 animate-pulse rounded-lg bg-blush" />
              <div className="h-3 w-32 animate-pulse rounded bg-blush" />
            </div>
          )}

          <dl className="mt-5 space-y-3 text-[0.75rem]">
            <Bar
              label="Item value"
              value={estimate?.itemValue}
              share={estimate ? 1 : 0}
              tone="bg-plum-300"
            />
            <Bar
              label="Money against your Girvi item"
              value={estimate?.loan}
              share={loanShare}
              tone="bg-copper-500"
            />
          </dl>

          <p className="mt-4 text-[0.68rem] text-muted">
            Sample estimate{usingMockApi ? ' · demo rates' : ''}. Your amount
            depends on the item’s condition.
          </p>
        </div>
      </div>

      <m.span
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute -right-3 -bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-copper-600 px-3 py-1.5 text-[0.72rem] font-semibold text-white shadow-copper"
      >
        <Sparkles className="size-3.5" aria-hidden="true" /> Instant estimate
      </m.span>
    </div>
  );
}

function Bar({
  label,
  value,
  share,
  tone,
}: {
  label: string;
  value?: number;
  share: number;
  tone: string;
}) {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <dt className="font-medium text-plum-900">{label}</dt>
        <dd className="text-muted tabular-nums">
          {value !== undefined ? formatINR(value) : '—'}
        </dd>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-blush"
        aria-hidden="true"
      >
        <m.div
          className={`h-full rounded-full ${tone}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.round(share * 100)}%` }}
          transition={{ duration: 0.9, ease }}
        />
      </div>
    </div>
  );
}
