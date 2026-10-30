import { ArrowUp } from 'lucide-react';
import { site } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { CallButton, WhatsAppButton } from '@/components/ui/ContactButtons';

const groups = [
  {
    title: 'Services',
    links: [
      { href: '#loan', label: 'Girvi Services' },
      { href: '#invest', label: 'Invest with Girvi Baba' },
      { href: '#legal', label: 'Girvi business legal advice' },
    ],
  },
  {
    title: 'Guidance',
    links: [
      { href: '#how-it-works', label: 'How it works' },
      { href: '#documents', label: 'Documents' },
      { href: '#rights', label: 'Customer rights' },
      { href: '#faq', label: 'FAQs' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { href: '#enquire', label: 'Send an enquiry' },
      { href: '#loan', label: 'Get a Girvi estimate' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-plum-950 pt-14 pb-24 text-white/70 md:pb-10">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-[0.85rem] leading-relaxed">
              {site.tagline}
            </p>
            <p className="mt-3 text-[0.8rem] text-white/55">{site.hours}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <CallButton size="sm" variant="primary" showNumber />
              <WhatsAppButton size="sm" variant="ghost-light" />
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-sans text-[0.8rem] font-semibold tracking-wide text-white">
                  {g.title}
                </h2>
                <ul className="mt-3 flex flex-col gap-2 text-[0.85rem]">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="transition-colors hover:text-copper-300"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[0.72rem] leading-relaxed text-white/55 sm:p-5">
          <p>
            <strong className="font-semibold text-white/75">Important:</strong>{' '}
            Girvi Baba provides information and handles enquiries about Girvi
            arrangements, investing and Girvi-business guidance. Every
            arrangement is subject to KYC, valuation, written terms, provider
            policy and applicable laws, including RBI directions and state
            pawnbroker or money-lending laws. Nothing here is an offer,
            approval, guarantee of funds or returns, or legal advice. Items kept
            as Girvi may be auctioned after due notice if agreed dues remain
            unsettled.
          </p>
          <p className="mt-2">
            <span className="text-white/75">
              Registration and licence details:
            </span>{' '}
            {site.registration ?? 'to be published here before launch.'}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Girvi Baba. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 hover:text-copper-300"
          >
            <ArrowUp className="size-3.5" aria-hidden="true" /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
