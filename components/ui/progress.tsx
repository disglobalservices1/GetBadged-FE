type ProgressProps = {
  value: number;
  label?: string;
  barClassName?: string;
};

export function Progress({ value, label, barClassName }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="grid gap-2">
      {label ? <div className="text-sm font-semibold text-slate-700">{label}</div> : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${barClassName ?? "bg-[color:var(--success)]"}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
