import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

/** Consent checkbox with error wiring, shared by every enquiry form. */
export function ConsentField({
  id,
  registration,
  error,
  children,
}: {
  id: string;
  registration: UseFormRegisterReturn;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-[0.8rem] leading-snug text-muted">
        <input
          id={id}
          type="checkbox"
          {...registration}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-copper-600"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-[0.78rem] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
