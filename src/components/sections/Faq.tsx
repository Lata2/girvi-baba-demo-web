import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Plus } from 'lucide-react';
import { faqs } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/ContactButtons';
import { cn } from '@/lib/cn';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-white">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQs"
            title="Questions people ask first"
            intro="Short answers. If yours isn’t here, just ask."
            className="mb-6 md:mb-6"
          />
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href="#enquire">Ask your question</ButtonLink>
              <WhatsAppButton />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-copper-50/40 shadow-soft">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${uid}-q${i}`;
              const panelId = `${uid}-a${i}`;
              return (
                <li key={f.q}>
                  <h3 className="font-sans">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.92rem] font-semibold text-plum-900 transition-colors hover:bg-copper-100/60 sm:px-6"
                    >
                      {f.q}
                      <span
                        className={cn(
                          'inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-300',
                          isOpen ? 'rotate-45 border-plum-900 bg-plum-900 text-white' : 'border-copper-300 bg-white text-copper-700',
                        )}
                        aria-hidden="true"
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[0.85rem] leading-relaxed text-muted sm:px-6">{f.a}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
