import { trustFacts } from '@/content/home';
import { Reveal } from '@/components/ui/Reveal';

export function TrustBar() {
  return (
    <div className="border-y border-line bg-white/70">
      <Reveal className="container-x">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 py-5 lg:grid-cols-4">
          {trustFacts.map(({ icon: Icon, title }) => (
            <li key={title} className="flex items-center gap-2.5 text-[0.82rem] font-medium text-plum-900 sm:text-[0.875rem]">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-copper-100 text-copper-700">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              {title}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
