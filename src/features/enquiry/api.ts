import type { ServiceInterest } from './schema';

/**
 * DEMO-ONLY enquiry store.
 *
 * There is no backend yet. Submissions are kept in this browser's sessionStorage
 * so the UI can show realistic loading / success / error / empty states.
 * Replace `submitEnquiry` and `listEnquiries` with real `fetch` calls when an API
 * is ready — the hooks and components will keep working unchanged.
 */

export interface EnquiryPayload {
  name: string;
  mobile: string;
  service: ServiceInterest;
  email?: string;
  message?: string;
  source: 'loan' | 'invest' | 'legal' | 'form';
}

export interface EnquiryRecord extends EnquiryPayload {
  reference: string;
  createdAt: string;
}

const STORAGE_KEY = 'girvi-baba:demo-enquiries';
const LATENCY_MS = 900;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function read(): EnquiryRecord[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EnquiryRecord[]) : [];
  } catch {
    return [];
  }
}

function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `GB-DEMO-${stamp}${rand}`;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryRecord> {
  await wait(LATENCY_MS);

  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new Error('You appear to be offline. Check your connection and send the enquiry again.');
  }

  const record: EnquiryRecord = { ...payload, reference: makeReference(), createdAt: new Date().toISOString() };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...read()].slice(0, 10)));
  } catch {
    throw new Error('This browser blocked local storage, so the demo enquiry could not be saved. Try a normal (non-private) window.');
  }

  return record;
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  await wait(250);
  return read();
}

export async function clearEnquiries(): Promise<void> {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to clear */
  }
}
