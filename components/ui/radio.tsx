import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 text-sm font-medium text-slate-700", className)}>
      <input type="radio" className="h-4 w-4 accent-[color:var(--blue-deep)]" {...props} />
      <span>{label}</span>
    </label>
  );
}
