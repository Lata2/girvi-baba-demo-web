import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { FileText, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { hasPhone, hasWhatsApp, telHref, whatsappLinkProps } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/ui/ContactButtons';

/**
 * Always-reachable contact:
 *  - phones/tablets (< md): a slim bottom bar with Call · WhatsApp · Enquire
 *  - larger screens: two floating round buttons, bottom-right
 * Both appear after the visitor scrolls a little, so they never cover the hero CTAs.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile bottom bar */}
          <m.nav
            key="bar"
            aria-label="Quick contact"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-18px_rgb(122_60_30/0.35)] backdrop-blur-lg md:hidden"
          >
            <ul className="grid grid-cols-3 gap-2">
              <li>
                <a
                  href={telHref()}
                  aria-label={hasPhone ? `Call ${site.phone}` : 'Call us — opens the enquiry form'}
                  className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-plum-900 text-[0.8rem] font-semibold text-white active:scale-[0.97]"
                >
                  <Phone className="size-4" aria-hidden="true" /> Call
                </a>
              </li>
              <li>
                <a
                  {...whatsappLinkProps()}
                  aria-label={hasWhatsApp ? 'WhatsApp us (opens in a new tab)' : 'WhatsApp — opens the enquiry form'}
                  className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-whatsapp text-[0.8rem] font-semibold text-white active:scale-[0.97]"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#loan"
                  className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-copper-200 text-[0.8rem] font-semibold text-plum-900 active:scale-[0.97]"
                >
                  <FileText className="size-4" aria-hidden="true" /> Enquire
                </a>
              </li>
            </ul>
          </m.nav>

          {/* Desktop floating buttons */}
          <m.div
            key="fab"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 md:flex"
          >
            <a
              href={telHref()}
              aria-label={hasPhone ? `Call ${site.phone}` : 'Call us — opens the enquiry form'}
              className="group inline-flex size-13 items-center justify-center rounded-full bg-plum-900 text-white shadow-plum transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Phone className="size-5 transition-transform group-hover:-rotate-12" aria-hidden="true" />
            </a>
            <a
              {...whatsappLinkProps()}
              aria-label={hasWhatsApp ? 'WhatsApp us (opens in a new tab)' : 'WhatsApp — opens the enquiry form'}
              className="relative inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_14px_30px_-12px_rgb(31_168_85/0.7)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-whatsapp/30 [animation-duration:2.6s] motion-reduce:hidden" />
              <WhatsAppIcon className="relative size-6" />
            </a>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
