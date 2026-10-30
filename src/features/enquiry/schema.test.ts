import { describe, expect, it } from 'vitest';
import { enquirySchema, loanEstimateSchema } from './schema';

const valid = {
  name: 'Priya Sharma',
  mobile: '98765 43210',
  email: '',
  service: 'pledge-gold',
  message: '',
  consent: true,
};

describe('enquirySchema', () => {
  it('accepts a valid enquiry and normalises the mobile number', () => {
    const r = enquirySchema.parse({ ...valid, mobile: '+91 98765-43210' });
    expect(r.mobile).toBe('9876543210');
  });

  it('rejects numbers that are not Indian mobiles', () => {
    expect(enquirySchema.safeParse({ ...valid, mobile: '12345 67890' }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, mobile: '98765' }).success).toBe(false);
  });

  it('allows a blank email but rejects a malformed one', () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
    expect(enquirySchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
  });

  it('accepts the new pledge item services', () => {
    for (const service of ['pledge-mobile', 'pledge-bike', 'pledge-car', 'pledge-electronics', 'pledge-appliance', 'pledge-other', 'legal-business']) {
      expect(enquirySchema.safeParse({ ...valid, service }).success).toBe(true);
    }
  });

  it('requires consent and a service choice', () => {
    expect(enquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, service: '' }).success).toBe(false);
  });
});

describe('loanEstimateSchema', () => {
  const base = { name: 'Rahul Verma', mobile: '9876543210', service: 'pledge-bike', consent: true, details: 'Honda Activa 2022', amount: '' };

  it('accepts a blank amount and strips rupee formatting', () => {
    expect(loanEstimateSchema.parse(base).amount).toBe('');
    expect(loanEstimateSchema.parse({ ...base, amount: '₹ 1,50,000' }).amount).toBe('150000');
  });

  it('requires item details and rejects non-numeric amounts', () => {
    expect(loanEstimateSchema.safeParse({ ...base, details: '' }).success).toBe(false);
    expect(loanEstimateSchema.safeParse({ ...base, amount: 'lots' }).success).toBe(false);
  });
});
