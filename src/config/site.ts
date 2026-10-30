/**
 * Business details live here so they can be filled in once, before launch.
 *
 * Contact details can be set in two ways:
 *   1. Environment variables in `.env` (see `.env.example`) — recommended, no code change.
 *   2. Editing the fallback values below.
 *
 * Anything left empty is never invented: Call/WhatsApp buttons fall back to the
 * enquiry form until a real number is configured.
 */
const env = import.meta.env;
const clean = (v: string | undefined) =>
  v && v.trim() !== '' ? v.trim() : null;

export const site = {
  name: 'Girvi Baba',
  tagline:
    'Keep eligible items as Girvi and receive money in return — ask about mobiles, bikes, gold, laptops, cars and more.',
  /** Display + dial number, e.g. '+91 98765 43210' */
  phone: clean(env.VITE_CONTACT_PHONE) ?? (null as string | null),
  /** WhatsApp number in international format without '+', e.g. '919876543210' */
  whatsapp: clean(env.VITE_WHATSAPP_NUMBER) ?? (null as string | null),
  /** Pre-filled WhatsApp message */
  whatsappMessage:
    clean(env.VITE_WHATSAPP_MESSAGE) ??
    'Hello Girvi Baba, I would like to know how much money I may receive for keeping my item as Girvi.',
  /** e.g. 'hello@girvibaba.in' */
  email: clean(env.VITE_CONTACT_EMAIL) ?? (null as string | null),
  /** Registered office address */
  address: clean(env.VITE_CONTACT_ADDRESS) ?? (null as string | null),
  /** Licence / registration details (state pawnbroker / money-lender licence, CIN, RBI if applicable) */
  registration: null as string | null,
  hours: 'Mon–Sat, 10:00 am – 6:30 pm IST',
  /** Set to false once a real enquiry endpoint is connected */
  demoMode: true,
} as const;

export const navLinks = [
  { href: '#loan', label: 'Girvi Services' },
  { href: '#invest', label: 'Invest' },
  { href: '#legal', label: 'Legal advice' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQs' },
] as const;
