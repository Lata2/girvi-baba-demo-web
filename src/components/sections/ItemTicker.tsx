import { pledgeItems } from '@/content/home';
import { ItemArt } from '@/components/illustrations/ItemArt';
import { selectItem } from '@/lib/selectedItem';
import { cn } from '@/lib/cn';

/**
 * Endless scrolling strip of everything that can be pledged. The list is rendered twice
 * and shifted by -50% so the loop is seamless; it pauses on hover or keyboard focus.
 * Reduced-motion users get a static, wrapped list instead.
 */
export function ItemTicker() {
  return (
    <section aria-label="Things you can pledge" className="relative overflow-hidden bg-plum-900 py-3.5 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-plum-900 to-transparent sm:w-24" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-plum-900 to-transparent sm:w-24" />
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={cn('flex shrink-0 items-center', copy === 1 && 'motion-reduce:hidden')}
          >
            {pledgeItems.map((item) => (
              <li key={item.id} className="flex items-center">
                <a
                  href="#loan"
                  tabIndex={copy === 1 ? -1 : undefined}
                  onClick={() => selectItem(item.id)}
                  className="flex items-center gap-2.5 rounded-full px-4 py-1 text-[0.85rem] font-medium whitespace-nowrap text-white/90 transition-colors hover:text-copper-300"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/95">
                    <ItemArt item={item.id} className="size-6" />
                  </span>
                  {item.title}
                </a>
                <span aria-hidden="true" className="text-copper-400">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
