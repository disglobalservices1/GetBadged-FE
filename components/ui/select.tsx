import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
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
    <label className="grid gap-2 text-sm font-semibold text-slate-700" htmlFor={inputId}>
      {label}
      <span className="relative">
        <select
          id={inputId}
          className={cn(
            "min-h-14 w-full appearance-none rounded-md border border-[color:var(--border)] bg-white px-4 pr-12 text-sm text-slate-950 outline-none transition focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)]",
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
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-950" />
      </span>
      {error ? <span className="text-xs font-medium text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}
