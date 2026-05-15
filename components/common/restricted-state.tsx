import { ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type RestrictedStateProps = {
  title?: string;
  description?: string;
};

export function RestrictedState({
  title = "Access restricted",
  description = "Your current role or account status does not allow this action."
}: RestrictedStateProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-50 text-[color:var(--danger)]">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-bold text-[color:var(--navy)]">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
