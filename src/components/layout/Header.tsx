import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { navLinks, site } from '@/config/site';
import { hasPhone, telHref } from '@/lib/contact';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { CallButton, WhatsAppButton } from '@/components/ui/ContactButtons';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** Anchor to scroll to once the menu has closed and the scroll-lock is released */
  const pendingTarget = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
      const target = pendingTarget.current;
      pendingTarget.current = null;
      if (target) {
        // Wait a frame so the browser applies the unlocked overflow before scrolling
        requestAnimationFrame(() => {
          document
            .querySelector(target)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', target);
        });
      }
    };
  }, [open]);

  /** Close the menu first, then scroll once the body scroll-lock is released. */
  const goTo = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return setOpen(false);
    e.preventDefault();
    pendingTarget.current = href;
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        scrolled || open
          ? 'border-b border-line/80 bg-white/85 shadow-[0_10px_30px_-24px_rgb(122_60_30/0.5)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-18">
        <a
          href="#top"
          aria-label="Girvi Baba, back to top"
          className="rounded-lg"
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3 py-2 text-[0.85rem] font-medium text-plum-900/75 transition-colors hover:text-plum-900 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-copper-500 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-flex">
            <WhatsAppButton size="sm" />
          </span>
          <span className="hidden sm:inline-flex">
            <CallButton
              size="sm"
              showNumber={Boolean(site.phone)}
              className="xl:px-4"
            />
          </span>
          {/* Compact call icon for small phones */}
          <a
            href={telHref()}
            aria-label={
              hasPhone
                ? `Call ${site.phone}`
                : 'Call us — opens the enquiry form'
            }
            className="inline-flex size-10 items-center justify-center rounded-full bg-plum-900 text-white sm:hidden"
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-plum-900/15 bg-white/70 text-plum-900 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {navLinks.map((l, i) => (
                <m.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                >
                  <a
                    href={l.href}
                    onClick={goTo}
                    className="block rounded-xl px-3 py-3 text-[0.95rem] font-medium text-plum-900 hover:bg-copper-100"
                  >
                    {l.label}
                  </a>
                </m.li>
              ))}
              <li className="mt-3 grid grid-cols-2 gap-2 pb-2">
                <CallButton size="md" className="w-full" onClick={goTo} />
                <WhatsAppButton size="md" className="w-full" onClick={goTo} />
              </li>
              <li className="pb-2">
                <ButtonLink
                  href="#loan"
                  variant="outline"
                  size="md"
                  className="w-full"
                  onClick={goTo}
                >
                  Get an estimate for my Girvi item
                </ButtonLink>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
