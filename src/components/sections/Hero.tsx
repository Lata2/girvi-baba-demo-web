import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Pause,
  Play,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';
import {
  pledgeItems,
  servicePaths,
  type ItemId,
  type ServicePath,
} from '@/content/home';
import { ItemArt } from '@/components/illustrations/ItemArt';
import { InvestArt, LegalArt } from '@/components/illustrations/PathArt';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/ContactButtons';
import { selectItem } from '@/lib/selectedItem';
import { cn } from '@/lib/cn';
import { EstimatePreview } from './EstimatePreview';

const ROTATE_MS = 3200;
const ease = [0.22, 1, 0.36, 1] as const;

/** Small item tiles that float around the estimate card */
const satellites: { item: ItemId; className: string; delay: string }[] = [
  { item: 'bike', className: '-top-12 left-8', delay: '0s' },
  { item: 'gold', className: 'top-1/2 -left-8 sm:-left-12', delay: '1.6s' },
  { item: 'laptop', className: '-top-10 right-10', delay: '0.8s' },
];

const trustPoints = [
  { icon: BadgeCheck, label: 'Valued in front of you' },
  { icon: ReceiptText, label: 'All charges in writing' },
  { icon: ShieldCheck, label: 'Sealed, insured custody' },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const active = pledgeItems[index] ?? pledgeItems[0]!;
  const playing = !reduceMotion && !userPaused && !hovering && !pageHidden;

  useEffect(() => {
    const onVis = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % pledgeItems.length),
      ROTATE_MS,
    );
    return () => window.clearTimeout(t);
  }, [playing, index]);

  // Gentle parallax as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -50],
  );
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 80],
  );

  const choose = (id: ItemId) => {
    const i = pledgeItems.findIndex((f) => f.id === id);
    if (i >= 0) setIndex(i);
    selectItem(id);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-16"
    >
      {/* Background: canvas + square grid (from the reference), drifting glows, rising item icons */}
      <div
        aria-hidden="true"
        className="grid-bg absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />
      <m.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute -top-40 -right-32 -z-10"
      >
        <div className="size-[34rem] animate-drift rounded-full bg-copper-200/45 blur-3xl" />
      </m.div>
      <m.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute top-1/3 -left-48 -z-10"
      >
        <div className="size-[26rem] animate-drift rounded-full bg-blush-200/70 blur-3xl [animation-delay:-9s]" />
      </m.div>
      <HeroBackdrop />

      <div
        className="container-x"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
      >
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* -------- Copy -------- */}
          <div>
            <m.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-[0.75rem] font-semibold text-plum-900 shadow-soft"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-copper-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-copper-600" />
              </span>
              Keep items as Girvi · Receive money
            </m.p>

            <h1
              id="hero-title"
              className="mt-5 text-[2.3rem] leading-[1.06] sm:text-[3rem] lg:text-[3.4rem]"
            >
              <span className="sr-only">
                Keep eligible items as Girvi and receive money in return. Ask
                about your mobile, bike, gold, laptop, car, watch, TV, silver,
                property or another valuable.
              </span>
              <m.span
                aria-hidden="true"
                className="block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease }}
              >
                Keep
              </m.span>
              <span
                aria-hidden="true"
                className="relative block h-[1.15em] overflow-hidden"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.span
                    key={active.id}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-x-0 top-0 block text-copper-600"
                  >
                    {active.heroWord}
                  </m.span>
                </AnimatePresence>
              </span>
              <span aria-hidden="true" className="block">
                as Girvi.
              </span>
            </h1>

            <m.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted sm:text-base"
            >
              Keep eligible items as Girvi and receive money in return. See an
              indicative amount in under 2 minutes — with no obligation to
              proceed.
            </m.p>

            {/* Item chips — each pre-selects the item in the calculator */}
            <m.ul
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.25 },
                },
              }}
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Eligible items for Girvi"
            >
              {pledgeItems.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <m.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <a
                      href="#loan"
                      onClick={() => choose(item.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-lg border py-1 pr-2.5 pl-1 text-[0.76rem] font-medium transition-[background-color,border-color,color,box-shadow] duration-300',
                        isActive
                          ? 'border-copper-400 bg-copper-50 text-plum-900 shadow-soft'
                          : 'border-line bg-white text-plum-900/70 hover:border-copper-300 hover:text-plum-900',
                      )}
                    >
                      <span className="inline-flex size-6 items-center justify-center rounded-md bg-copper-100">
                        <ItemArt item={item.id} className="size-5" />
                      </span>
                      {item.title}
                    </a>
                  </m.li>
                );
              })}
              {!reduceMotion && (
                <li>
                  <button
                    type="button"
                    onClick={() => setUserPaused((p) => !p)}
                    aria-label={
                      userPaused
                        ? 'Play headline animation'
                        : 'Pause headline animation'
                    }
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-white text-muted transition-colors hover:text-plum-900"
                  >
                    {userPaused ? (
                      <Play className="size-3.5" aria-hidden="true" />
                    ) : (
                      <Pause className="size-3.5" aria-hidden="true" />
                    )}
                  </button>
                </li>
              )}
            </m.ul>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <ButtonLink
                href="#loan"
                size="lg"
                onClick={() => selectItem(active.id)}
              >
                Estimate money against my Girvi item
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ButtonLink>
              <WhatsAppButton size="lg" />
              <a
                href="#how-it-works"
                className="px-2 text-[0.875rem] font-semibold text-copper-700 underline-offset-4 transition-colors hover:text-copper-800 hover:underline"
              >
                Learn how it works
              </a>
            </m.div>

            <m.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-muted"
            >
              {trustPoints.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="size-4 text-copper-600" aria-hidden="true" />{' '}
                  {label}
                </li>
              ))}
            </m.ul>
          </div>

          {/* -------- Visual: live estimate card with floating item tiles -------- */}
          <m.div
            style={{ y: visualY }}
            initial={{ opacity: 0, y: 24, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative mx-auto w-full max-w-[26rem] lg:mr-0"
          >
            <EstimatePreview item={active} />
            {satellites.map((s) => (
              <span
                key={s.item}
                aria-hidden="true"
                className={cn(
                  'absolute hidden size-16 animate-float items-center justify-center rounded-2xl bg-white p-2.5 shadow-lift ring-1 ring-line sm:flex',
                  s.className,
                )}
                style={{ animationDelay: s.delay }}
              >
                <ItemArt item={s.item} className="size-full" />
              </span>
            ))}
          </m.div>
        </div>

        {/* -------- Three paths -------- */}
        <m.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-3 sm:grid-cols-3 lg:mt-20 lg:gap-4"
          aria-label="How Girvi Baba can help"
        >
          {servicePaths.map((p) => (
            <m.li
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
            >
              <PathCard path={p} />
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}

/** Faint item icons drifting up behind the hero — says "we take all of this" without words. */
const floaters: {
  item: ItemId;
  left: string;
  size: string;
  dur: string;
  delay: string;
  mobile?: boolean;
}[] = [
  // Edges and the right half only, so they never pass behind the headline on desktop
  {
    item: 'mobile',
    left: '1%',
    size: '3.25rem',
    dur: '26s',
    delay: '-2s',
    mobile: true,
  },
  { item: 'bike', left: '50%', size: '4.5rem', dur: '32s', delay: '-14s' },
  {
    item: 'gold',
    left: '57%',
    size: '3rem',
    dur: '24s',
    delay: '-8s',
    mobile: true,
  },
  { item: 'laptop', left: '64%', size: '4rem', dur: '30s', delay: '-20s' },
  {
    item: 'car',
    left: '72%',
    size: '4.5rem',
    dur: '34s',
    delay: '-4s',
    mobile: true,
  },
  {
    item: 'appliance',
    left: '80%',
    size: '3.75rem',
    dur: '28s',
    delay: '-17s',
  },
  {
    item: 'luxury',
    left: '87%',
    size: '3.25rem',
    dur: '25s',
    delay: '-11s',
    mobile: true,
  },
  { item: 'silver', left: '94%', size: '3.5rem', dur: '31s', delay: '-24s' },
  { item: 'mobile', left: '60%', size: '2.75rem', dur: '22s', delay: '-15s' },
  {
    item: 'bike',
    left: '91%',
    size: '3rem',
    dur: '27s',
    delay: '-22s',
    mobile: true,
  },
];

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      {floaters.map((f, i) => (
        <span
          key={i}
          className={cn(
            'absolute -bottom-24 animate-rise opacity-0',
            !f.mobile && 'hidden sm:block',
          )}
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            animationDuration: f.dur,
            animationDelay: f.delay,
          }}
        >
          <ItemArt
            item={f.item}
            className="size-full opacity-[0.1] grayscale-[40%] sm:opacity-[0.16]"
          />
        </span>
      ))}
    </div>
  );
}

const pathStyle: Record<
  ServicePath['id'],
  { card: string; title: string; body: string; cta: string }
> = {
  loan: {
    card: 'bg-copper-600 ring-copper-700/40',
    title: 'text-white',
    body: 'text-white/80',
    cta: 'text-white',
  },
  invest: {
    card: 'bg-plum-900 ring-plum-800',
    title: 'text-white',
    body: 'text-white/70',
    cta: 'text-copper-300',
  },
  legal: {
    card: 'bg-white ring-line',
    title: 'text-plum-900',
    body: 'text-muted',
    cta: 'text-copper-700',
  },
};

function PathCard({ path }: { path: ServicePath }) {
  const s = pathStyle[path.id];
  return (
    <a
      href={path.href}
      className={cn(
        'group relative flex h-full min-h-32 items-center gap-3 overflow-hidden rounded-2xl p-5 shadow-soft ring-1 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0',
        s.card,
      )}
    >
      <div className="relative z-10 min-w-0 flex-1">
        <h2 className={cn('text-lg', s.title)}>{path.title}</h2>
        <p className={cn('mt-1 text-[0.85rem]', s.body)}>{path.body}</p>
        <span
          className={cn(
            'mt-3 inline-flex items-center gap-1 text-[0.8rem] font-semibold',
            s.cta,
          )}
        >
          {path.cta}
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
      <div
        className={cn(
          'relative size-20 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 sm:size-16 lg:size-24',
          path.id === 'loan' && 'rounded-2xl bg-white/95 p-2',
        )}
      >
        {path.id === 'loan' && <ItemArt item="mobile" className="size-full" />}
        {path.id === 'invest' && <InvestArt className="size-full" />}
        {path.id === 'legal' && <LegalArt className="size-full" />}
      </div>
    </a>
  );
}
