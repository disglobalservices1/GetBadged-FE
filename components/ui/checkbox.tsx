import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 text-sm font-medium text-slate-700", className)}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-[color:var(--border)] accent-[color:var(--blue-deep)]"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
