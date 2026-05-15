import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description: string;
};

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="grid justify-items-center gap-3 p-10 text-center">
        {icon ? <div className="text-[color:var(--blue)]">{icon}</div> : null}
        <h1 className="text-xl font-bold text-[color:var(--navy)]">{title}</h1>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">{description}</p>
      </CardContent>
    </Card>
  );
}
