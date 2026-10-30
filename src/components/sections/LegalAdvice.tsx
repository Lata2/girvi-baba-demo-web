import { m } from 'motion/react';
import { legalTopics } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Reveal } from '@/components/ui/Reveal';
import { LegalArt } from '@/components/illustrations/PathArt';
import { CallButton, WhatsAppButton } from '@/components/ui/ContactButtons';
import { CompactEnquiry } from '@/features/enquiry/components/CompactEnquiry';

export function LegalAdvice() {
  return (
    <section
      id="legal"
      aria-labelledby="legal-title"
      className="section-y bg-white"
    >
      <div className="container-x">
        <SectionHeading
          id="legal-title"
          eyebrow="Girvi business legal advice"
          title="Legal Advice for Starting a Girvi Business"
          intro="Get clear guidance on licences, rules and paperwork before you open your Girvi business."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {legalTopics.map(({ icon: Icon, title, body }, i) => (
              <m.li
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
              >
                <SpotlightCard className="group h-full rounded-3xl border border-line bg-copper-50/60 p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-copper-300 hover:bg-white hover:shadow-lift motion-reduce:hover:translate-y-0">
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-copper-700 shadow-soft ring-1 ring-line transition-colors duration-300 group-hover:bg-plum-900 group-hover:text-copper-300">
                      <Icon className="size-[1.1rem]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-[0.95rem] font-semibold text-plum-900">
                        {title}
                      </h3>
                      <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                        {body}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </m.li>
            ))}
          </ul>

          <Reveal delay={0.08} className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl bg-copper-100 p-5 ring-1 ring-copper-200 sm:p-6">
              <LegalArt className="absolute -top-2 -right-3 size-28 opacity-90" />
              <h3 className="max-w-[12rem] text-xl">Book a consultation</h3>
              <p className="mt-1 mb-5 max-w-[15rem] text-[0.82rem] text-plum-900/70">
                Tell us where you are. We’ll call to plan the next steps.
              </p>
              <CompactEnquiry
                service="legal-business"
                source="legal"
                submitLabel="Request a call"
                className="[&_.field]:bg-white"
              />
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-copper-200 pt-5">
                <CallButton size="sm" variant="light" />
                <WhatsAppButton
                  size="sm"
                  variant="light"
                  message="Hello Girvi Baba, I need legal guidance to start a Girvi business."
                />
              </div>
            </div>
            <p className="mt-3 text-[0.72rem] leading-relaxed text-muted">
              General guidance only. Rules differ by state — for a formal
              opinion on your case, consult a qualified lawyer.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
