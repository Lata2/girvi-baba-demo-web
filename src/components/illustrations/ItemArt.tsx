import { useId } from 'react';
import type { ItemId } from '@/content/home';

/**
 * Lightweight vector illustrations for each pledge category (no raster downloads).
 * Decorative only: the surrounding text always names the item, so they are aria-hidden.
 * Gradient ids are scoped per instance with useId to avoid clashes.
 */
export function ItemArt({ item, className }: { item: ItemId; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const url = (n: string) => `url(#${id(n)})`;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id('gold')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FCE7AE" />
          <stop offset=".5" stopColor="#E3AE55" />
          <stop offset="1" stopColor="#B4802F" />
        </linearGradient>
        <linearGradient id={id('silver')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAFBFC" />
          <stop offset=".55" stopColor="#C3CBD3" />
          <stop offset="1" stopColor="#8E99A5" />
        </linearGradient>
        <linearGradient id={id('peach')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7B095" />
          <stop offset="1" stopColor="#C66B3E" />
        </linearGradient>
        <linearGradient id={id('deep')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A3F5E" />
          <stop offset="1" stopColor="#2A1B2E" />
        </linearGradient>
        <linearGradient id={id('screen')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8EAE3" />
          <stop offset="1" stopColor="#E7B095" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="104" rx="38" ry="5" fill="#7A3C1E" opacity=".1" />
      {item === 'mobile' && <Mobile url={url} />}
      {item === 'bike' && <Bike url={url} />}
      {item === 'gold' && <Gold url={url} />}
      {item === 'laptop' && <Gadgets url={url} />}
      {item === 'car' && <Vehicle url={url} />}
      {item === 'luxury' && <Luxury url={url} />}
      {item === 'appliance' && <Appliance url={url} />}
      {item === 'silver' && <Silver url={url} />}
      {item === 'property' && <Property url={url} />}
      {item === 'other' && <Other url={url} />}
    </svg>
  );
}

type ArtProps = { url: (n: string) => string };

/** Point on a quadratic Bézier curve */
const quad = (t: number, a: number, c: number, b: number) => (1 - t) ** 2 * a + 2 * (1 - t) * t * c + t ** 2 * b;

function Mobile({ url }: ArtProps) {
  return (
    <g>
      <g transform="rotate(-10 60 58)">
        <rect x="36" y="12" width="48" height="90" rx="10" fill={url('deep')} />
        <rect x="40.5" y="20" width="39" height="74" rx="5" fill={url('screen')} />
        <rect x="53" y="15" width="14" height="3" rx="1.5" fill="#1D1220" />
        <circle cx="60" cy="46" r="13" fill="#C66B3E" />
        <text x="60" y="52" textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">
          ₹
        </text>
        <rect x="47" y="66" width="26" height="4" rx="2" fill="#B35A2D" opacity=".55" />
        <rect x="51" y="74" width="18" height="4" rx="2" fill="#B35A2D" opacity=".3" />
        <rect x="52" y="86" width="16" height="2.5" rx="1.25" fill="#2A1B2E" opacity=".35" />
      </g>
      <path d="M92 28 Q92 34 98 34 Q92 34 92 40 Q92 34 86 34 Q92 34 92 28 Z" fill="#C66B3E" />
      <path d="M22 70 Q22 74 26 74 Q22 74 22 78 Q22 74 18 74 Q22 74 22 70 Z" fill="#D98A62" />
    </g>
  );
}

function Bike({ url }: ArtProps) {
  return (
    <g>
      {[28, 92].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="82" r="15" fill="none" stroke="#1E2B2E" strokeWidth="6" />
          <circle cx={cx} cy="82" r="4" fill="#C9CFD3" />
        </g>
      ))}
      <path d="M36 42 L28 82" stroke="#8E99A5" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M28 82 L50 64 H74 L92 82" fill="none" stroke={url('deep')} strokeWidth="4" strokeLinejoin="round" />
      <rect x="50" y="62" width="22" height="14" rx="3" fill="#8E99A5" />
      <path d="M62 76 L100 72" stroke="#C9CFD3" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 52 Q54 40 72 46 L76 58 Q60 62 46 60 Z" fill={url('deep')} />
      <path d="M50 52 Q58 46 68 49" fill="none" stroke="#D98A62" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M72 50 Q86 46 100 52 L98 57 L74 57 Z" fill="#1E2B2E" />
      <path d="M84 62 Q98 60 106 72" fill="none" stroke={url('deep')} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 46 L32 36 H24" fill="none" stroke="#1E2B2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="48" r="4.5" fill="#FCE7AE" stroke="#C66B3E" strokeWidth="1.5" />
    </g>
  );
}

function Appliance({ url }: ArtProps) {
  return (
    <g>
      <rect x="10" y="32" width="66" height="44" rx="4" fill="#1E2B2E" />
      <rect x="13.5" y="35.5" width="59" height="37" rx="2" fill={url('screen')} />
      <path d="M22 64 Q34 46 46 56 T66 46" fill="none" stroke="#B35A2D" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M38 76 L34 86 H52 L48 76 Z" fill="#8E99A5" />
      <rect x="26" y="86" width="34" height="3" rx="1.5" fill="#8E99A5" />
      <rect x="80" y="20" width="30" height="82" rx="5" fill="#fff" stroke="#C9CFD3" strokeWidth="2" />
      <path d="M80 48 H110" stroke="#C9CFD3" strokeWidth="2" />
      <rect x="103" y="28" width="2.5" height="12" rx="1.25" fill={url('deep')} />
      <rect x="103" y="56" width="2.5" height="18" rx="1.25" fill={url('deep')} />
      <circle cx="88" cy="30" r="3" fill="#D98A62" />
    </g>
  );
}

function Gold({ url }: ArtProps) {
  const beads = Array.from({ length: 13 }, (_, i) => {
    const t = 0.08 + (i / 12) * 0.84;
    return { x: quad(t, 20, 60, 100), y: quad(t, 24, 92, 24), r: 2.6 + Math.sin(t * Math.PI) * 1.8, key: i };
  });
  return (
    <g>
      <path d="M20 24 Q60 92 100 24" fill="none" stroke={url('gold')} strokeWidth="2" />
      {beads.map((b) => (
        <circle key={b.key} cx={b.x} cy={b.y} r={b.r} fill={url('gold')} stroke="#9C6B24" strokeOpacity=".35" strokeWidth=".6" />
      ))}
      <path d="M60 60 C70 70 70 80 60 90 C50 80 50 70 60 60 Z" fill={url('gold')} stroke="#9C6B24" strokeOpacity=".45" />
      <circle cx="60" cy="76" r="4.5" fill="#B35A2D" />
      <circle cx="58.6" cy="74.6" r="1.4" fill="#fff" opacity=".7" />
      <ellipse cx="94" cy="92" rx="11" ry="5" fill="none" stroke={url('gold')} strokeWidth="4" />
      <path d="M90 85 l4 -5 4 5 -4 3 z" fill="#E7B095" stroke="#B35A2D" strokeWidth=".8" />
    </g>
  );
}

function Silver({ url }: ArtProps) {
  return (
    <g>
      <circle cx="78" cy="50" r="22" fill={url('silver')} stroke="#7E8995" strokeOpacity=".5" />
      <circle cx="78" cy="50" r="16" fill="none" stroke="#7E8995" strokeOpacity=".5" strokeDasharray="1.5 2" />
      <text x="78" y="57" textAnchor="middle" fontSize="19" fontWeight="700" fill="#6B7682" fontFamily="system-ui, sans-serif">
        ₹
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(0 ${-i * 8})`}>
          <ellipse cx="44" cy="92" rx="24" ry="8" fill="#8E99A5" />
          <ellipse cx="44" cy="88" rx="24" ry="8" fill={url('silver')} stroke="#7E8995" strokeOpacity=".4" />
        </g>
      ))}
      <ellipse cx="44" cy="64" rx="15" ry="4.5" fill="none" stroke="#7E8995" strokeOpacity=".45" />
      <ellipse cx="92" cy="90" rx="14" ry="6" fill="none" stroke={url('silver')} strokeWidth="4" />
    </g>
  );
}

function Vehicle({ url }: ArtProps) {
  return (
    <g>
      <path
        d="M12 84 L12 72 Q12 64 20 62 L36 58 L50 44 Q54 40 62 40 L82 40 Q90 40 95 46 L104 58 Q110 60 110 68 L110 84 Z"
        fill={url('deep')}
      />
      <path d="M52 57 L60 47 Q62 45 65 45 L72 45 L72 57 Z" fill={url('screen')} />
      <path d="M77 45 L84 45 Q88 45 90 48 L96 57 L77 57 Z" fill={url('screen')} />
      <path d="M14 70 H108" stroke="#E7B095" strokeWidth="2" opacity=".7" />
      <rect x="102" y="64" width="7" height="4" rx="2" fill="#FCE7AE" />
      <rect x="12" y="66" width="6" height="4" rx="2" fill="#C66B3E" />
      {[34, 88].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="86" r="12" fill="#1E2B2E" />
          <circle cx={cx} cy="86" r="5.5" fill="#D9DEE0" />
          <circle cx={cx} cy="86" r="2" fill="#1E2B2E" />
        </g>
      ))}
    </g>
  );
}

function Property({ url }: ArtProps) {
  return (
    <g>
      <rect x="80" y="30" width="9" height="20" rx="1.5" fill="#B35A2D" />
      <rect x="28" y="56" width="64" height="44" rx="3" fill="#fff" stroke="#F1E2D7" strokeWidth="1.5" />
      <path d="M18 60 L60 24 L102 60 Z" fill={url('peach')} stroke="#B35A2D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="53" y="74" width="14" height="26" rx="2" fill={url('deep')} />
      <circle cx="64" cy="88" r="1.3" fill="#E7B095" />
      {[34, 74].map((x) => (
        <g key={x}>
          <rect x={x} y="66" width="13" height="12" rx="1.5" fill="#E9E1E8" stroke="#45304A" strokeWidth="1.2" />
          <path d={`M${x + 6.5} 66 V78 M${x} 72 H${x + 13}`} stroke="#45304A" strokeWidth="1" />
        </g>
      ))}
      <circle cx="60" cy="46" r="5" fill="#FBF6F3" stroke="#B35A2D" strokeWidth="1.2" />
    </g>
  );
}

function Gadgets({ url }: ArtProps) {
  return (
    <g>
      <rect x="16" y="34" width="70" height="46" rx="5" fill="#1E2B2E" />
      <rect x="20" y="38" width="62" height="38" rx="2" fill={url('screen')} />
      <path d="M28 66 L40 54 L50 62 L62 48 L74 58" fill="none" stroke="#B35A2D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 82 H94 L90 90 H12 Z" fill="#C9CFD3" />
      <rect x="44" y="82" width="14" height="2.5" rx="1.2" fill="#8E99A5" />
      <rect x="80" y="44" width="28" height="52" rx="6" fill={url('deep')} />
      <rect x="83.5" y="50" width="21" height="40" rx="2.5" fill="#E9E1E8" />
      <rect x="90" y="46.5" width="8" height="2" rx="1" fill="#E7B095" />
      <circle cx="94" cy="70" r="6" fill="#E7B095" />
    </g>
  );
}

function Luxury({ url }: ArtProps) {
  return (
    <g>
      <rect x="48" y="12" width="24" height="30" rx="5" fill={url('deep')} />
      <rect x="48" y="78" width="24" height="26" rx="5" fill={url('deep')} />
      <rect x="82" y="55" width="6" height="10" rx="2" fill={url('gold')} />
      <circle cx="60" cy="60" r="25" fill={url('gold')} stroke="#9C6B24" strokeOpacity=".4" />
      <circle cx="60" cy="60" r="19" fill="#fff" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = i % 3 === 0 ? 13.5 : 15.5;
        return (
          <line
            key={i}
            x1={60 + Math.cos(a) * r1}
            y1={60 + Math.sin(a) * r1}
            x2={60 + Math.cos(a) * 17}
            y2={60 + Math.sin(a) * 17}
            stroke="#2A1B2E"
            strokeWidth={i % 3 === 0 ? 1.8 : 1}
            strokeLinecap="round"
          />
        );
      })}
      <path d="M60 60 L60 48 M60 60 L68 64" stroke="#2A1B2E" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="60" cy="60" r="2" fill="#B35A2D" />
      <g transform="translate(92 18)">
        <path d="M0 6 L6 0 H16 L22 6 L11 20 Z" fill="#F8EAE3" stroke="#B35A2D" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M0 6 H22 M6 0 L11 20 L16 0" fill="none" stroke="#B35A2D" strokeWidth=".9" opacity=".7" />
      </g>
    </g>
  );
}

function Other({ url }: ArtProps) {
  const star = (x: number, y: number, s: number) =>
    `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;
  return (
    <g>
      <rect x="30" y="54" width="60" height="46" rx="4" fill={url('peach')} />
      <rect x="26" y="44" width="68" height="14" rx="3" fill="#D98A62" stroke="#B35A2D" strokeWidth="1.2" />
      <rect x="55" y="44" width="10" height="56" fill={url('deep')} />
      <path d="M60 44 C48 30 36 36 44 44 Z" fill="none" stroke="#2A1B2E" strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 44 C72 30 84 36 76 44 Z" fill="none" stroke="#2A1B2E" strokeWidth="4" strokeLinejoin="round" />
      <path d={star(96, 30, 7)} fill="#C66B3E" />
      <path d={star(22, 34, 5)} fill="#D98A62" />
      <path d={star(102, 54, 4)} fill="#E7B095" />
    </g>
  );
}
