import { site } from '@/config/site';

/** Fallback target when a contact channel is not configured yet. */
export const ENQUIRY_ANCHOR = '#enquire';

export const hasPhone = Boolean(site.phone);
export const hasWhatsApp = Boolean(site.whatsapp);

export function telHref(): string {
  return site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : ENQUIRY_ANCHOR;
}

export function whatsappHref(message: string = site.whatsappMessage): string {
  if (!site.whatsapp) return ENQUIRY_ANCHOR;
  const number = site.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Props for an <a> that opens WhatsApp in a new tab only when it is configured */
export function whatsappLinkProps(message?: string) {
  return hasWhatsApp
    ? { href: whatsappHref(message), target: '_blank', rel: 'noopener noreferrer' }
    : { href: ENQUIRY_ANCHOR };
}
