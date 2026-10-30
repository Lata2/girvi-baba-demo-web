import { AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';
import { borrowerRights, commitments, risks } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Transparency() {
  return (
    <section
      id="rights"
      aria-labelledby="rights-title"
      className="section-y bg-white"
    >
      <div className="container-x">
        <SectionHeading
          id="rights-title"
          eyebrow="Your rights"
          title="Protections every Girvi customer should know"
          intro="For gold and silver collateral with RBI-regulated providers. Confirm which protections apply to your Girvi arrangement in writing."
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {borrowerRights.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal
                delay={i * 0.06}
                className="group h-full rounded-3xl border border-line bg-copper-50/60 p-5 transition-[border-color,background-color] duration-300 hover:border-copper-300 hover:bg-white"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-plum-900 text-copper-300 transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-sans text-[0.95rem] font-semibold text-plum-900">
                  {title}
                </h3>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                  {body}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid gap-3 lg:mt-5 lg:grid-cols-2 lg:gap-4">
          <Reveal className="h-full rounded-3xl bg-copper-100 p-5 ring-1 ring-copper-200 sm:p-6">
            <h3 className="flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-plum-900">
              <ShieldCheck
                className="size-[1.1rem] text-plum-700"
                aria-hidden="true"
              />
              Our commitments
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-[0.85rem] text-plum-900/85">
              {commitments.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-600"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.08}
            className="h-full rounded-3xl border border-line bg-white p-5 sm:p-6"
          >
            <h3 className="flex items-center gap-2 font-sans text-[0.95rem] font-semibold text-plum-900">
              <AlertTriangle
                className="size-[1.1rem] text-copper-700"
                aria-hidden="true"
              />
              Risks to understand first
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-[0.85rem] text-plum-900/85">
              {risks.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-plum-500"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <p className="mt-6 max-w-3xl text-[0.75rem] leading-relaxed text-muted">
          Source: RBI (Lending Against Gold and Silver Collateral) Directions,
          2025. Complaints about a regulated lender can be raised with the
          lender, then through the{' '}
          <a
            href="https://cms.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-copper-700 underline underline-offset-4 hover:text-plum-900"
          >
            RBI Complaint Management System
            <ExternalLink className="size-3" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          . General information, not legal advice.
        </p>
      </div>
    </section>
  );
}
