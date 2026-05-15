import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

type WorkflowHeaderProps = {
  title: string;
  subtitle?: string;
  lastSavedLabel?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
};

export function WorkflowHeader({
  title,
  subtitle,
  lastSavedLabel = "Last saved just now",
  primaryActionLabel = "Continue",
  secondaryActionLabel = "Save & Exit"
}: WorkflowHeaderProps) {
  return (
    <header className="flex min-h-20 items-center justify-between gap-6 border-b border-[color:var(--border-muted)] bg-white px-6">
      <Logo />
      <div className="hidden min-w-0 flex-1 md:block">
        <h1 className="text-xl font-bold uppercase text-[color:var(--navy)]">{title}</h1>
        {subtitle ? <p className="text-sm font-medium text-slate-600">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 text-xs font-semibold text-slate-500 lg:flex">
          <CheckCircle2 className="h-4 w-4 text-[color:var(--blue)]" />
          {lastSavedLabel}
        </div>
        <Button variant="secondary">{secondaryActionLabel}</Button>
        <Button>{primaryActionLabel}</Button>
      </div>
    </header>
  );
}
