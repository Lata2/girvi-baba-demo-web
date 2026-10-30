import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { m } from 'motion/react';
import { site } from '@/config/site';
import { telHref } from '@/lib/contact';
import { Reveal } from '@/components/ui/Reveal';
import { CallButton, WhatsAppButton } from '@/components/ui/ContactButtons';
import { EnquiryForm } from '@/features/enquiry/components/EnquiryForm';
import { RecentEnquiries } from '@/features/enquiry/components/RecentEnquiries';

const nextSteps = [
  'We review your enquiry and item details.',
  'A specialist calls you within one business day.',
  'You receive the available amount and written terms after valuation.',
];

export function Enquiry() {
  const contacts = [
    site.phone && { icon: Phone, label: site.phone, href: telHref() },
    site.email && {
      icon: Mail,
      label: site.email,
      href: `mailto:${site.email}`,
    },
    site.address && { icon: MapPin, label: site.address },
  ].filter(Boolean) as { icon: typeof Phone; label: string; href?: string }[];

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="section-y">
      <div className="container-x">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal className="lg:pt-4">
            <p className="eyebrow">Contact</p>
            <h2
              id="enquire-title"
              className="mt-3 text-[1.6rem] leading-tight sm:text-[2rem]"
            >
              Enquire About Girvi
            </h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              Your estimate is a starting point. Send your details and a Girvi
              Baba specialist will follow up about keeping an eligible item as
              Girvi, investing, or legal advice.
            </p>

            <ol className="mt-6 space-y-3">
              {nextSteps.map((s, i) => (
                <m.li
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 text-[0.85rem] text-plum-900"
                >
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-copper-100 text-[0.72rem] font-bold text-copper-700 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </m.li>
              ))}
            </ol>

            <div className="mt-7 space-y-2.5 border-t border-line pt-6 text-[0.85rem] text-plum-900/80">
              <p className="flex items-center gap-2.5">
                <Clock3 className="size-4 text-copper-600" aria-hidden="true" />{' '}
                {site.hours}
              </p>
              {contacts.map(({ icon: Icon, label, href }) => (
                <p key={label} className="flex items-center gap-2.5">
                  <Icon className="size-4 text-copper-600" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="hover:text-copper-700">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                <CallButton size="md" variant="dark" />
                <WhatsAppButton size="md" label="Chat on WhatsApp" />
              </div>
            </div>

            <div className="mt-7">
              <RecentEnquiries />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-plum-900/10">
              <div className="bg-plum-900 px-5 py-5 text-white sm:px-7">
                <h3 className="text-lg text-white">Send us your details</h3>
                <p className="mt-0.5 text-[0.8rem] text-white/70">
                  Tell us what you need and we’ll call you back.
                </p>
              </div>
              <div className="p-5 sm:p-7">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
