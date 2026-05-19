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
      <CardContent className="grid gap-3 !p-3 text-center sm:gap-5 sm:!p-5 sm:text-left">
        <div className="grid justify-items-center gap-2 sm:flex sm:items-center sm:justify-between sm:gap-3">
          <div className="grid min-w-0 justify-items-center gap-2 sm:flex sm:items-center sm:gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue)] sm:h-11 sm:w-11">
              {icon}
            </div>
            <p className="text-[11px] font-bold uppercase leading-4 text-slate-500 sm:text-sm">{label}</p>
          </div>
          <p className="shrink-0 text-xl font-extrabold leading-none text-[color:var(--navy)] sm:text-2xl">{value}</p>
        </div>
        {detail ? <p className="text-xs leading-5 text-[color:var(--muted)] sm:text-sm sm:leading-6">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}
