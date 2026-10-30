import { m } from 'motion/react';
import { Info } from 'lucide-react';
import { steps } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y">
      <div className="container-x">
        <SectionHeading id="how-title" eyebrow="How it works" title="From your item to your money in four steps" align="center" />

        <ol className="relative mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* Dashed connector drawn on scroll (desktop) */}
          <m.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-10 right-[12%] left-[12%] hidden h-0 origin-left border-t-2 border-dashed border-copper-300 lg:block"
          />
          {steps.map((step, i) => (
            <m.li
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
              className="group relative rounded-2xl border border-line bg-white px-5 pt-6 pb-6 text-center shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-copper-300 hover:shadow-lift motion-reduce:hover:translate-y-0"
            >
              <span className="relative mx-auto inline-flex size-9 items-center justify-center rounded-full bg-copper-600 text-[0.85rem] font-bold text-white tabular-nums ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-[0.95rem]">{step.title}</h3>
              <p className="mx-auto mt-1.5 max-w-[15rem] text-[0.8rem] leading-relaxed text-muted">{step.body}</p>
            </m.li>
          ))}
        </ol>

        <Reveal className="mx-auto mt-6 flex max-w-2xl items-start gap-2.5 rounded-xl border border-blush-200 bg-blush px-4 py-3 text-[0.78rem] text-plum-900/80">
          <Info className="mt-0.5 size-4 shrink-0 text-copper-600" aria-hidden="true" />
          Estimates use current valuation rates for each item type, updated regularly. You can stop at any point before
          signing — there is no obligation.
        </Reveal>
      </div>
    </section>
  );
}
