import { cn } from "@/lib/utils/cn";

type StatusChipProps = {
  label: string;
  tone?: "navy" | "success" | "warning" | "danger" | "muted";
};

export function StatusChip({ label, tone = "muted" }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold uppercase",
        tone === "navy" && "bg-[color:var(--navy)] text-white",
        tone === "success" && "bg-green-50 text-[color:var(--success)]",
        tone === "warning" && "bg-yellow-50 text-amber-700",
        tone === "danger" && "bg-red-50 text-[color:var(--danger)]",
        tone === "muted" && "bg-slate-100 text-slate-600"
      )}
    >
      {label}
    </span>
  );
}
