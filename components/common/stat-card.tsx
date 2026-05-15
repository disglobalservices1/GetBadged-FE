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
      <CardContent className="grid gap-3 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-bold text-[color:var(--navy)]">{value}</p>
        </div>
        {detail ? <p className="text-sm leading-5 text-[color:var(--muted)]">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
