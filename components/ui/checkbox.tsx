import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Checkbox({ label, error, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium text-slate-700", className)}>
      <span className="inline-flex items-start gap-2">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-[color:var(--border)] accent-[color:var(--blue-deep)]"
          aria-invalid={Boolean(error)}
          {...props}
        />
        <span>{label}</span>
      </span>
      {error ? <span className="text-xs font-medium text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}
