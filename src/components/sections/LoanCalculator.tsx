import { Ban, Check, Info } from 'lucide-react';
import { goldSilverLimits, notAccepted } from '@/content/home';
import { Reveal } from '@/components/ui/Reveal';
import { LoanWizard } from '@/features/estimate/components/LoanWizard';

export function LoanCalculator() {
  return (
    <section
      id="loan"
      aria-labelledby="loan-title"
      className="section-y bg-blush"
    >
      <div className="container-x">
        <Reveal className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
          <p className="eyebrow justify-center">Keep Your Items as Girvi</p>
          <h2
            id="loan-title"
            className="mt-3 text-[1.75rem] leading-tight sm:text-[2.2rem]"
          >
            Girvi Services
          </h2>
          <p className="mt-2 text-[0.95rem] text-muted">
            Get an indicative amount of money against your eligible Girvi item.{' '}
            <em className="font-serif text-[1.05rem] text-plum-900">
              No documents needed yet.
            </em>
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto max-w-2xl">
          <LoanWizard />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-sans text-[0.9rem] font-semibold">
              Gold & silver limits
            </h3>
            <p className="mt-0.5 text-[0.75rem] text-muted">
              Requirements for regulated providers, per customer across all
              providers.
            </p>
            <ul className="mt-3 space-y-1.5 text-[0.8rem]">
              {goldSilverLimits.map((l) => (
                <li key={l.title} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-copper-600"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-medium text-plum-900">
                      {l.title}:
                    </span>{' '}
                    <span className="text-muted">{l.limit}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.06}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <h3 className="flex items-center gap-2 font-sans text-[0.9rem] font-semibold">
              <Ban className="size-4 text-danger" aria-hidden="true" /> Not
              accepted
            </h3>
            <ul className="mt-3 space-y-1.5 text-[0.8rem] text-muted">
              {notAccepted.map((n) => (
                <li key={n} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-full bg-danger"
                  />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-3 flex max-w-4xl items-start gap-2.5 rounded-xl border border-copper-200 bg-copper-50 px-4 py-3 text-[0.75rem] text-copper-800">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Estimates are indicative. The final amount and terms are confirmed
          after your item is checked in person, subject to eligibility,
          applicable law and provider policy.
        </Reveal>
      </div>
    </section>
  );
}
