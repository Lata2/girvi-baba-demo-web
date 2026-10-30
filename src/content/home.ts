import {
  BookOpenCheck,
  Building2,
  Clock3,
  FileText,
  Gavel,
  HandCoins,
  Home,
  Landmark,
  Languages,
  ChartLine,
  Lock,
  Percent,
  Receipt,
  ScanSearch,
  ShieldCheck,
  Undo2,
  UserCheck,
  Users,
  Vault,
  type LucideIcon,
} from 'lucide-react';
import type { ServiceInterest } from '@/features/enquiry/schema';

/* ------------------------------------------------------------ Pledge items */

export type ItemId =
  | 'mobile'
  | 'bike'
  | 'gold'
  | 'laptop'
  | 'car'
  | 'luxury'
  | 'appliance'
  | 'silver'
  | 'property'
  | 'other';

export interface PledgeItem {
  id: ItemId;
  /** Short name used in chips and cards */
  title: string;
  /** Phrase for the rotating hero headline, e.g. "your mobile" */
  heroWord: string;
  examples: string;
  /** What to mention when enquiring — helps the valuation call */
  detailHint: string;
  service: ServiceInterest;
}

/**
 * Items Girvi Baba accepts as girvi (pledge). Order matters: the first item is the
 * default everywhere, and the first six appear around the hero visual.
 * Every card, chip, form option and hero word is generated from this list.
 */
export const pledgeItems: PledgeItem[] = [
  {
    id: 'mobile',
    title: 'Mobile phones',
    heroWord: 'your mobile',
    examples: 'iPhone, Samsung, OnePlus, Vivo & more',
    detailHint: 'e.g. Samsung S23, 256 GB, 1 year old, bill available',
    service: 'pledge-mobile',
  },
  {
    id: 'bike',
    title: 'Bikes & scooters',
    heroWord: 'your bike',
    examples: 'Motorcycles, scooters, e-bikes',
    detailHint: 'e.g. Honda Activa 6G, 2022, RC in my name',
    service: 'pledge-bike',
  },
  {
    id: 'gold',
    title: 'Gold',
    heroWord: 'your gold',
    examples: 'Chains, bangles, rings, coins',
    detailHint: 'e.g. 2 bangles + chain, about 40 g, 22 karat',
    service: 'pledge-gold',
  },
  {
    id: 'laptop',
    title: 'Laptops & gadgets',
    heroWord: 'your laptop',
    examples: 'Laptops, tablets, cameras, consoles',
    detailHint: 'e.g. Dell Inspiron i5, 2023, with charger and bill',
    service: 'pledge-electronics',
  },
  {
    id: 'car',
    title: 'Cars',
    heroWord: 'your car',
    examples: 'Hatchbacks, sedans, SUVs, commercial',
    detailHint: 'e.g. Maruti Swift 2020, 40,000 km, RC in my name',
    service: 'pledge-car',
  },
  {
    id: 'luxury',
    title: 'Watches & luxury',
    heroWord: 'your watch',
    examples: 'Branded watches, diamonds, designer pieces',
    detailHint: 'e.g. Titan Edge watch, with original papers',
    service: 'pledge-luxury',
  },
  {
    id: 'appliance',
    title: 'TV & appliances',
    heroWord: 'your TV',
    examples: 'LED TVs, fridges, ACs, washing machines',
    detailHint: 'e.g. Samsung 43" LED TV, 2 years old',
    service: 'pledge-appliance',
  },
  {
    id: 'silver',
    title: 'Silver',
    heroWord: 'your silver',
    examples: 'Ornaments, utensils, coins',
    detailHint: 'e.g. silver payal and coins, about 500 g',
    service: 'pledge-silver',
  },
  {
    id: 'property',
    title: 'Property',
    heroWord: 'your property',
    examples: 'Home, shop, plot with clear title',
    detailHint: 'e.g. 2 BHK flat, 900 sq ft, registered sale deed',
    service: 'pledge-property',
  },
  {
    id: 'other',
    title: 'Anything else',
    heroWord: 'anything you own',
    examples: 'Musical instruments, tools, machinery and more — just ask',
    detailHint: 'Describe the item, its condition and any bills or papers',
    service: 'pledge-other',
  },
];

export const itemById = (id: ItemId) =>
  pledgeItems.find((i) => i.id === id) ?? pledgeItems[0]!;

/* ----------------------------------------------------------- Three paths */

export interface ServicePath {
  id: 'loan' | 'invest' | 'legal';
  title: string;
  body: string;
  cta: string;
  href: string;
}

export const servicePaths: ServicePath[] = [
  {
    id: 'loan',
    title: 'Girvi Services',
    body: 'Keep eligible items as Girvi and receive money in return.',
    cta: 'Explore Girvi services',
    href: '#loan',
  },
  {
    id: 'invest',
    title: 'Invest with Girvi Baba',
    body: 'Explore opportunities backed by eligible assets.',
    cta: 'Explore investing',
    href: '#invest',
  },
  {
    id: 'legal',
    title: 'Legal Advice for Starting a Girvi Business',
    body: 'Start a Girvi business with clear guidance.',
    cta: 'Get guidance',
    href: '#legal',
  },
];

export const trustFacts: { icon: LucideIcon; title: string }[] = [
  { icon: ScanSearch, title: 'Valued in front of you' },
  { icon: Receipt, title: 'All charges in writing' },
  { icon: Lock, title: 'Sealed, insured custody' },
  { icon: Undo2, title: 'Items back on agreed settlement' },
];

/* ---------------------------------------------------------- How it works */

export const steps: { title: string; body: string }[] = [
  {
    title: 'Choose an eligible item',
    body: 'Mobile, bike, gold, laptop, car — or another item of value.',
  },
  {
    title: 'Get an indicative amount',
    body: 'Answer five quick questions to see how much you may receive for your Girvi item.',
  },
  {
    title: 'Visit for valuation',
    body: 'Your item is checked in front of you, with every charge explained in writing.',
  },
  {
    title: 'Receive your money',
    body: 'Money is paid to your bank. Your item is returned once agreed dues are settled.',
  },
];

/* --------------------------------------------------------------- Benefits */

export const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Home,
    title: 'Keep ownership',
    body: 'Keeping an item as Girvi is not selling it. It can be returned when agreed dues are settled.',
  },
  {
    icon: FileText,
    title: 'Clear paperwork',
    body: 'Requirements depend on the item. We explain the KYC and documents needed.',
  },
  {
    icon: Receipt,
    title: 'No hidden charges',
    body: 'Every fee is written down before you agree.',
  },
  {
    icon: Clock3,
    title: 'Clear settlement terms',
    body: 'Understand the timeline and settlement options before you agree.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe custody',
    body: 'Items are sealed, recorded and stored securely.',
  },
  {
    icon: BookOpenCheck,
    title: 'No pressure',
    body: 'Ask first, decide later. Risks explained as clearly as benefits.',
  },
];

/* ------------------------------------------------- Gold & silver limits */

export const goldSilverLimits: { title: string; limit: string }[] = [
  { title: 'Gold ornaments', limit: 'Up to 1 kg per customer' },
  { title: 'Gold coins (bank-minted)', limit: 'Up to 50 g per customer' },
  { title: 'Silver ornaments', limit: 'Up to 10 kg per customer' },
  { title: 'Silver coins (bank-minted)', limit: 'Up to 500 g per customer' },
];

export const notAccepted: string[] = [
  'Gold or silver bars and bullion',
  'Digital gold, ETFs or gold funds',
  'Items already kept as Girvi elsewhere',
  'Stolen, disputed or unproven ownership',
];

/* ----------------------------------------------------------------- Invest */

export const investPoints: { icon: LucideIcon; title: string; body: string }[] =
  [
    {
      icon: Vault,
      title: 'Asset-backed',
      body: 'Customer Girvi arrangements are backed by eligible items held in custody.',
    },
    {
      icon: ChartLine,
      title: 'Clear reporting',
      body: 'Know where your money is and how asset-backed arrangements perform.',
    },
    {
      icon: Clock3,
      title: 'Your horizon',
      body: 'Choose a tenure that fits your plans.',
    },
    {
      icon: UserCheck,
      title: 'A real person',
      body: 'Talk to our team before you commit anything.',
    },
  ];

/* ------------------------------------------------------------ Legal advice */

export const legalTopics: { icon: LucideIcon; title: string; body: string }[] =
  [
    {
      icon: Landmark,
      title: 'Licence & registration',
      body: 'Pawnbroker or money-lender licence under your state’s Act, and when RBI (NBFC) registration applies.',
    },
    {
      icon: Building2,
      title: 'Business setup',
      body: 'Choosing the entity, GST, Shops & Establishment registration and a compliant premises.',
    },
    {
      icon: Percent,
      title: 'Interest & charges',
      body: 'State limits on interest rates and how to disclose every charge to customers.',
    },
    {
      icon: FileText,
      title: 'Girvi tickets & registers',
      body: 'Formats for Girvi tickets, valuation records and the books your licence requires.',
    },
    {
      icon: Users,
      title: 'KYC & anti-money-laundering',
      body: 'Customer verification, record keeping and reporting duties under the PMLA.',
    },
    {
      icon: Gavel,
      title: 'Auctions & recovery',
      body: 'Notice periods, fair public auctions and refunding any surplus to the customer.',
    },
  ];

/* ------------------------------------------------------------- Documents */

export interface DocumentGroup {
  id: string;
  label: string;
  intro: string;
  items: { title: string; note: string; required: boolean }[];
}

export const documentGroups: DocumentGroup[] = [
  {
    id: 'electronics',
    label: 'Mobile & electronics',
    intro: 'For mobiles, laptops, TVs, appliances and watches.',
    items: [
      {
        title: 'Photo identity proof',
        note: 'Aadhaar, passport, voter ID or driving licence',
        required: true,
      },
      {
        title: 'Original bill or warranty card',
        note: 'Proves ownership and helps valuation',
        required: true,
      },
      {
        title: 'Box, charger & accessories',
        note: 'Usually improves the valuation',
        required: false,
      },
      {
        title: 'Phone unlocked & account removed',
        note: 'Sign out of iCloud / Google before pledging',
        required: false,
      },
    ],
  },
  {
    id: 'vehicle',
    label: 'Bikes & cars',
    intro: 'For motorcycles, scooters, cars and commercial vehicles.',
    items: [
      {
        title: 'KYC of the owner',
        note: 'Photo ID, address proof and PAN',
        required: true,
      },
      {
        title: 'Registration certificate (RC)',
        note: 'Registered in your name',
        required: true,
      },
      {
        title: 'Valid insurance',
        note: 'Current policy for the vehicle',
        required: true,
      },
      {
        title: 'Existing finance closure / NOC',
        note: 'If the vehicle has existing finance',
        required: false,
      },
    ],
  },
  {
    id: 'gold-silver',
    label: 'Gold & silver',
    intro: 'For pledging ornaments or eligible coins.',
    items: [
      {
        title: 'Photo identity proof',
        note: 'Aadhaar, passport, voter ID or driving licence',
        required: true,
      },
      {
        title: 'Address proof',
        note: 'Usually covered by the ID if the address is current',
        required: true,
      },
      {
        title: 'PAN card',
        note: 'May be needed for larger Girvi amounts',
        required: false,
      },
      {
        title: 'Purchase invoice',
        note: 'Helpful, may be asked for coins or large pledges',
        required: false,
      },
    ],
  },
  {
    id: 'property',
    label: 'Property',
    intro:
      'For property considered for a Girvi arrangement, subject to title checks and applicable law.',
    items: [
      {
        title: 'KYC of all owners',
        note: 'Photo ID, address proof and PAN',
        required: true,
      },
      {
        title: 'Title deed & chain documents',
        note: 'Showing clear ownership',
        required: true,
      },
      {
        title: 'Encumbrance certificate',
        note: 'Confirms no existing charge',
        required: true,
      },
      {
        title: 'Income documents',
        note: 'ITR, salary slips or business financials',
        required: true,
      },
    ],
  },
];

/* --------------------------------------------------------- Borrower rights */

export const borrowerRights: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: Undo2,
    title: 'Timely item return',
    body: 'For gold and silver collateral with regulated providers, return timelines apply after agreed dues are fully settled.',
  },
  {
    icon: Gavel,
    title: 'Notice before any auction',
    body: 'Unsettled Girvi dues require prior notice before an auction. Auctions are public, with a fair reserve price.',
  },
  {
    icon: HandCoins,
    title: 'Surplus comes back to you',
    body: 'If an auction recovers more than the agreed dues, the surplus must be refunded to you.',
  },
  {
    icon: Languages,
    title: 'Documents you can read',
    body: 'Girvi documents and valuations should be in your preferred language, with every charge stated.',
  },
];

export const commitments: string[] = [
  'No guaranteed or “assured” returns, ever',
  'No hidden charges added after you sign',
  'No pressure to agree to terms you do not understand',
  'Funds paid only into your own account',
];

export const risks: string[] = [
  'Unsettled Girvi dues can lead to an auction of the item after notice.',
  'Falling prices may require a part-payment or additional security, as set out in the terms.',
  'Late settlement may add charges or affect your credit history, where applicable.',
  'Investments can lose value — security reduces risk, but does not remove it.',
];

/* ---------------------------------------------------------------- FAQs */

export const faqs: { q: string; a: string }[] = [
  {
    q: 'Which items can I keep as Girvi with Girvi Baba?',
    a: 'Eligible items may include mobile phones, bikes and scooters, cars, laptops, TVs and appliances, watches, gold, silver, property and more. Each item is checked and valued individually, subject to applicable law and ownership verification.',
  },
  {
    q: 'How much money can I get against my Girvi item?',
    a: 'The indicative amount depends on the item’s value, age and condition. Share the details and we will call back with an estimate. Final terms and amount are confirmed after an in-person valuation and eligibility checks.',
  },
  {
    q: 'Can I keep my mobile or bike as Girvi?',
    a: 'Eligible mobiles and bikes may be accepted. Bring the item with its bill or RC and your ID. Mobiles should be signed out of iCloud / Google. Items accepted as Girvi are kept safely and returned after agreed dues are settled.',
  },
  {
    q: 'Will my item be safe?',
    a: 'Items accepted as Girvi are sealed, recorded and stored securely under the applicable custody and insurance policy. Ask for these details before you agree.',
  },
  {
    q: 'What if I cannot settle the agreed dues on time?',
    a: 'Speak to us early about the options available under your written terms. If dues remain unsettled, notice is required before any auction, and any surplus after recovering the dues is refunded to you.',
  },
  {
    q: 'Do investors get guaranteed returns?',
    a: 'No. Girvi Baba never promises guaranteed or fixed returns. Investment opportunities are offered only through structures permitted by law, with risks disclosed in writing.',
  },
  {
    q: 'Can you help me start a Girvi business?',
    a: 'Yes. We guide you on licensing, registration, applicable charges, record keeping and auction rules. For a formal opinion on your specific case, we recommend a qualified lawyer as well.',
  },
  {
    q: 'What does “Girvi” mean?',
    a: 'Girvi means keeping an eligible item you own as security and receiving money in return. You retain ownership, and the item is returned once the agreed dues are settled.',
  },
];
