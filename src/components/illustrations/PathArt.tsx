import { useId } from 'react';

/** Small decorative banners for the Invest and Legal paths. */
export function InvestArt({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1D3C4" />
          <stop offset="1" stopColor="#D98A62" />
        </linearGradient>
      </defs>
      {[30, 44, 58, 72].map((h, i) => (
        <rect key={h} x={22 + i * 20} y={96 - h} width="13" height={h} rx="3" fill={`url(#${uid}-p)`} opacity={0.55 + i * 0.15} />
      ))}
      <path d="M18 70 L44 56 L62 62 L98 28" fill="none" stroke="#F8EAE3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 26 H100 V40" fill="none" stroke="#F8EAE3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 98 H106" stroke="#F8EAE3" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LegalArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <g transform="rotate(-6 40 64)">
        <rect x="14" y="26" width="52" height="68" rx="6" fill="#fff" stroke="#F1E2D7" />
        <rect x="22" y="36" width="28" height="4" rx="2" fill="#B35A2D" />
        {[48, 56, 64, 72].map((y, i) => (
          <rect key={y} x="22" y={y} width={i === 3 ? 22 : 36} height="3" rx="1.5" fill="#5D6A6C" opacity=".3" />
        ))}
        <circle cx="52" cy="84" r="7" fill="#E7B095" />
      </g>
      <g transform="translate(62 22)">
        <rect x="21" y="8" width="4" height="66" rx="2" fill="#2A1B2E" />
        <rect x="11" y="72" width="24" height="6" rx="3" fill="#2A1B2E" />
        <rect x="0" y="16" width="46" height="3.5" rx="1.75" fill="#2A1B2E" />
        <path d="M4 19 L-4 44 M4 19 L12 44" stroke="#2A1B2E" strokeWidth="1.2" />
        <path d="M-8 44 H16 a12 6 0 0 1 -24 0 z" fill="#C66B3E" />
        <path d="M42 19 L34 44 M42 19 L50 44" stroke="#2A1B2E" strokeWidth="1.2" />
        <path d="M30 44 H54 a12 6 0 0 1 -24 0 z" fill="#C66B3E" />
        <circle cx="23" cy="10" r="4" fill="#C66B3E" />
      </g>
    </svg>
  );
}
