import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  detail?: string;
};

export function StatCard({ icon, label, value, detail }: StatCardProps) {
  return (
    <Card>
      <CardContent className="grid gap-5 !p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
              {icon}
            </div>
            <p className="text-sm font-bold uppercase text-slate-500">{label}</p>
          </div>
          <p className="shrink-0 text-2xl font-extrabold text-[color:var(--navy)]">{value}</p>
        </div>
        {detail ? <p className="text-sm leading-6 text-[color:var(--muted)]">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
