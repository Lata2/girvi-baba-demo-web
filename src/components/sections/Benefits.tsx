import { benefits } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="benefits-title"
          eyebrow="Why pledge, not sell"
          title="Meet today’s need. Keep what matters."
          align="center"
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {benefits.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal
                delay={(i % 3) * 0.06}
                className="group flex h-full gap-3.5 rounded-3xl border border-line bg-white p-5 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-copper-100 text-copper-700 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-[0.95rem] font-semibold text-plum-900">{title}</h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
