import { Inbox, Trash2 } from 'lucide-react';
import { useClearEnquiries, useEnquiries } from '../hooks';
import { serviceOptions } from '../schema';
import { site } from '@/config/site';

const serviceLabel = (v: string) => serviceOptions.find((o) => o.value === v)?.label ?? v;
const timeFmt = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' });

/** Demo-only panel so testers can see that submissions are captured. Hidden once demoMode is off. */
export function RecentEnquiries() {
  const query = useEnquiries();
  const clear = useClearEnquiries();
  if (!site.demoMode) return null;

  return (
    <section aria-labelledby="recent-title" className="rounded-2xl border border-line bg-white/70 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 id="recent-title" className="font-sans text-[0.8rem] font-semibold text-plum-900">
          Demo enquiries on this device
        </h3>
        {query.data && query.data.length > 0 && (
          <button
            type="button"
            onClick={() => clear.mutate()}
            disabled={clear.isPending}
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-muted hover:text-plum-900"
          >
            <Trash2 className="size-3.5" aria-hidden="true" /> Clear
          </button>
        )}
      </div>

      {query.isPending ? (
        <div className="mt-4 flex flex-col gap-2" aria-busy="true" aria-label="Loading demo enquiries">
          {[0, 1].map((i) => (
            <div key={i} className="h-11 animate-pulse rounded-xl bg-copper-100" />
          ))}
        </div>
      ) : query.isError ? (
        <p className="mt-3 text-[0.8rem] text-muted">Could not read saved demo enquiries in this browser.</p>
      ) : query.data.length === 0 ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-copper-300 px-3.5 py-3 text-[0.8rem] text-muted">
          <Inbox className="size-5 shrink-0 text-copper-600" aria-hidden="true" />
          Nothing yet. Send an enquiry and it will appear here.
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {query.data.slice(0, 3).map((e) => (
            <li key={e.reference} className="flex items-center justify-between gap-3 rounded-xl bg-copper-50 px-3.5 py-2.5 text-[0.8rem]">
              <span className="min-w-0">
                <span className="block truncate font-medium text-plum-900">{serviceLabel(e.service)}</span>
                <span className="block text-[0.72rem] text-muted tabular-nums">{e.reference}</span>
              </span>
              <span className="shrink-0 text-[0.72rem] text-muted tabular-nums">{timeFmt.format(new Date(e.createdAt))}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
