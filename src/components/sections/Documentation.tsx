import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { CircleCheck, CircleDashed, Lightbulb } from 'lucide-react';
import { documentGroups } from '@/content/home';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

export function Documentation() {
  const [active, setActive] = useState(documentGroups[0]!.id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group =
    documentGroups.find((g) => g.id === active) ?? documentGroups[0]!;

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = documentGroups.length;
    const next =
      e.key === 'ArrowRight'
        ? (i + 1) % n
        : e.key === 'ArrowLeft'
          ? (i - 1 + n) % n
          : null;
    if (next === null) return;
    e.preventDefault();
    setActive(documentGroups[next]!.id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="documents" aria-labelledby="docs-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="docs-title"
          eyebrow="Documents"
          title="Keep these ready for a quicker visit"
          intro="Requirements vary by item and amount. This covers what is commonly asked."
        />

        <Reveal className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
          <div>
            <div
              role="tablist"
              aria-label="Document checklists"
              aria-orientation="horizontal"
              className="flex gap-2 overflow-x-auto rounded-2xl bg-copper-100 p-1.5 lg:flex-col lg:overflow-visible"
            >
              {documentGroups.map((g, i) => {
                const selected = g.id === active;
                return (
                  <button
                    key={g.id}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`doc-tab-${g.id}`}
                    aria-selected={selected}
                    aria-controls="doc-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(g.id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      'relative shrink-0 rounded-xl px-4 py-2.5 text-left text-[0.85rem] font-semibold transition-colors',
                      selected
                        ? 'text-plum-900'
                        : 'text-plum-900/60 hover:text-plum-900',
                    )}
                  >
                    {selected && (
                      <m.span
                        layoutId="doc-tab-bg"
                        className="absolute inset-0 rounded-xl bg-white shadow-soft ring-1 ring-line"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="relative">{g.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-5 hidden gap-2 rounded-2xl border border-copper-200 bg-white p-4 text-[0.8rem] text-copper-800 lg:flex">
              <Lightbulb
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              Keep your ID address current — Girvi notices go to the address on
              file.
            </p>
          </div>

          <div
            id="doc-panel"
            role="tabpanel"
            aria-labelledby={`doc-tab-${group.id}`}
            className="min-h-[16rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={group.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[0.9rem] text-muted">{group.intro}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={item.title}
                      className="flex gap-3 rounded-2xl border border-line bg-white p-4 transition-[box-shadow,border-color] duration-300 hover:border-copper-300 hover:shadow-soft"
                    >
                      {item.required ? (
                        <CircleCheck
                          className="mt-0.5 size-5 shrink-0 text-plum-700"
                          aria-hidden="true"
                        />
                      ) : (
                        <CircleDashed
                          className="mt-0.5 size-5 shrink-0 text-copper-500"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <p className="text-[0.9rem] font-semibold text-plum-900">
                          {item.title}
                          <span className="sr-only">
                            {item.required
                              ? ', usually required'
                              : ', may be asked'}
                          </span>
                        </p>
                        <p className="mt-0.5 text-[0.8rem] text-muted">
                          {item.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] text-muted"
                  aria-hidden="true"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <CircleCheck className="size-4 text-plum-700" /> Usually
                    required
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CircleDashed className="size-4 text-copper-500" /> May be
                    asked
                  </span>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
