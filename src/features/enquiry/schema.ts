import { z } from 'zod';

export const serviceOptions = [
  {
    value: 'pledge-mobile',
    label: 'Keep a mobile phone as Girvi',
    group: 'loan',
  },
  {
    value: 'pledge-bike',
    label: 'Keep a bike or scooter as Girvi',
    group: 'loan',
  },
  { value: 'pledge-gold', label: 'Keep gold as Girvi', group: 'loan' },
  {
    value: 'pledge-electronics',
    label: 'Keep a laptop or gadget as Girvi',
    group: 'loan',
  },
  { value: 'pledge-car', label: 'Keep a car as Girvi', group: 'loan' },
  {
    value: 'pledge-luxury',
    label: 'Keep a watch or luxury item as Girvi',
    group: 'loan',
  },
  {
    value: 'pledge-appliance',
    label: 'Keep a TV or appliance as Girvi',
    group: 'loan',
  },
  { value: 'pledge-silver', label: 'Keep silver as Girvi', group: 'loan' },
  {
    value: 'pledge-property',
    label: 'Enquire about keeping property as Girvi',
    group: 'loan',
  },
  {
    value: 'pledge-other',
    label: 'Keep another eligible item as Girvi',
    group: 'loan',
  },
  { value: 'investor', label: 'Invest with Girvi Baba', group: 'other' },
  {
    value: 'legal-business',
    label: 'Legal advice to start a Girvi business',
    group: 'other',
  },
  {
    value: 'legal-guidance',
    label: 'Guidance on my rights as a customer',
    group: 'other',
  },
] as const;

export type ServiceInterest = (typeof serviceOptions)[number]['value'];

export const loanServiceOptions = serviceOptions.filter(
  (o) => o.group === 'loan',
);

const serviceValues = serviceOptions.map((o) => o.value) as [
  ServiceInterest,
  ...ServiceInterest[],
];

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6–9 */
const normaliseMobile = (raw: string) =>
  raw.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name (at least 2 characters).')
    .max(80, 'Keep the name under 80 characters.')
    .regex(
      /^[\p{L}\p{M} .'-]+$/u,
      'Use letters, spaces, dots or hyphens only.',
    ),
  mobile: z
    .string()
    .trim()
    .transform(normaliseMobile)
    .pipe(
      z
        .string()
        .regex(
          /^[6-9]\d{9}$/,
          'Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.',
        ),
    ),
  email: z
    .string()
    .trim()
    .max(120, 'Keep the email under 120 characters.')
    .refine(
      (v) => v === '' || z.email().safeParse(v).success,
      'Enter a valid email address, or leave it blank.',
    ),
  service: z.enum(serviceValues, {
    error: 'Choose what you would like help with.',
  }),
  message: z.string().trim().max(600, 'Keep the message under 600 characters.'),
  consent: z
    .boolean()
    .refine((v) => v, 'Please agree so we can contact you about this enquiry.'),
});

/** Quick callback (Invest / Legal panels) — subset of the full form */
export const quickEnquirySchema = enquirySchema.pick({
  name: true,
  mobile: true,
  service: true,
  consent: true,
});

/** "How much can I get?" — item details plus an optional amount in rupees */
export const loanEstimateSchema = enquirySchema
  .pick({ name: true, mobile: true, service: true, consent: true })
  .extend({
    details: z
      .string()
      .trim()
      .min(3, 'Add a few words about the item (type, weight, model or year).')
      .max(300, 'Keep the details under 300 characters.'),
    amount: z
      .string()
      .trim()
      .transform((v) => v.replace(/[,\s₹]/g, ''))
      .refine(
        (v) => v === '' || /^\d{1,9}$/.test(v),
        'Enter the amount in rupees using digits only, or leave it blank.',
      ),
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;
export type QuickEnquiryInput = z.input<typeof quickEnquirySchema>;
export type QuickEnquiryValues = z.output<typeof quickEnquirySchema>;
export type LoanEstimateInput = z.input<typeof loanEstimateSchema>;
export type LoanEstimateValues = z.output<typeof loanEstimateSchema>;
