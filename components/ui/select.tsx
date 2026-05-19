import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
};

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="grid content-start gap-2 text-sm font-semibold text-slate-700" htmlFor={inputId}>
      {label}
      <select
        id={inputId}
        className={cn(
          "h-11 rounded-md border border-[color:var(--border)] bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)]",
          error && "border-[color:var(--danger)] focus:border-[color:var(--danger)]",
          className
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs font-medium text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}
