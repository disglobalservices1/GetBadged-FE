import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700" htmlFor={inputId}>
      {label}
      <textarea
        id={inputId}
        className={cn(
          "min-h-28 rounded-md border border-[color:var(--border)] bg-white px-3 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[color:var(--blue)] focus:ring-2 focus:ring-[rgba(27,51,181,0.12)]",
          error && "border-[color:var(--danger)] focus:border-[color:var(--danger)]",
          className
        )}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-[color:var(--danger)]">{error}</span> : null}
    </label>
  );
}
