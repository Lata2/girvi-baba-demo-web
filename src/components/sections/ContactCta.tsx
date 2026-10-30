import { site } from '@/config/site';
import { Reveal } from '@/components/ui/Reveal';
import { CallButton, WhatsAppButton } from '@/components/ui/ContactButtons';
import { ItemArt } from '@/components/illustrations/ItemArt';

export function ContactCta() {
  return (
    <section aria-labelledby="cta-title" className="pt-4 pb-16 sm:pb-20 lg:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-copper-200 via-copper-300 to-copper-400 px-6 py-10 shadow-lift sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-12">
            <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10 opacity-50" />
            <div className="max-w-xl">
              <h2 id="cta-title" className="text-[1.6rem] leading-tight sm:text-[2rem]">
                Not sure what your item is worth?
              </h2>
              <p className="mt-2 text-[0.95rem] text-plum-900/75">Call or WhatsApp us. A quick chat, no obligation. {site.hours}.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <CallButton size="lg" showNumber />
                <WhatsAppButton size="lg" variant="light" label="WhatsApp us" />
              </div>
            </div>
            <div aria-hidden="true" className="hidden shrink-0 items-end gap-1 lg:flex">
              <ItemArt item="mobile" className="size-28 animate-float" />
              <ItemArt item="bike" className="size-32 animate-float [animation-delay:1.5s]" />
              <ItemArt item="gold" className="size-28 animate-float [animation-delay:3s]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
