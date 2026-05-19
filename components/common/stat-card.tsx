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
      <CardContent className="grid gap-2 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)]">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[color:var(--navy)]">{value}</p>
        </div>
        {detail ? <p className="text-xs leading-5 text-[color:var(--muted)]">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
