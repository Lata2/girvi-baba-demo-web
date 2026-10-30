import { ShieldAlert } from 'lucide-react';
import { m } from 'motion/react';
import { investPoints } from '@/content/home';
import { Reveal } from '@/components/ui/Reveal';
import { CompactEnquiry } from '@/features/enquiry/components/CompactEnquiry';

export function Invest() {
  return (
    <section id="invest" aria-labelledby="invest-title" className="section-y">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-plum-900 px-5 py-10 text-white shadow-plum sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden="true"
              className="absolute -top-28 -right-28 -z-10 size-96 rounded-full bg-copper-500/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-plum-500/40 blur-3xl"
            />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                <p className="eyebrow text-copper-300">
                  <span aria-hidden="true" className="h-px w-6 bg-copper-300" />
                  Investment opportunities
                </p>
                <h2
                  id="invest-title"
                  className="mt-3 text-[1.75rem] leading-[1.15] text-white sm:text-[2.1rem] lg:text-[2.4rem]"
                >
                  Invest with Girvi Baba
                </h2>
                <p className="mt-3 max-w-lg text-[0.95rem] text-white/70">
                  Customer Girvi arrangements are backed by eligible items held
                  in safe custody.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {investPoints.map(({ icon: Icon, title, body }, i) => (
                    <m.li
                      key={title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
                      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-copper-300/40 hover:bg-white/[0.07]"
                    >
                      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-copper-300 text-plum-950 transition-transform duration-300 group-hover:-rotate-6">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 font-sans text-[0.95rem] font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] text-white/65">
                        {body}
                      </p>
                    </m.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center">
                <div className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm sm:p-7">
                  <h3 className="font-display text-xl text-white">
                    Register your interest
                  </h3>
                  <p className="mt-1 mb-5 text-[0.82rem] text-white/65">
                    We call to explain how it works, the risks, and next steps.
                  </p>
                  <CompactEnquiry
                    service="investor"
                    source="invest"
                    submitLabel="Talk to our team"
                    tone="dark"
                    buttonVariant="primary"
                  />
                </div>
                <p className="mt-4 flex gap-2 text-[0.75rem] leading-relaxed text-white/55">
                  <ShieldAlert
                    className="mt-0.5 size-4 shrink-0 text-copper-300"
                    aria-hidden="true"
                  />
                  No guaranteed or fixed returns. Investments can lose value and
                  are offered only through structures permitted by law, with all
                  risks disclosed in writing.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
