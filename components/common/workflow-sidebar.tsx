import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type WorkflowStep = {
  label: string;
  icon: LucideIcon;
  status: "complete" | "in_progress" | "not_started" | "locked";
};

type WorkflowSidebarProps = {
  steps: WorkflowStep[];
};

export function WorkflowSidebar({ steps }: WorkflowSidebarProps) {
  return (
    <aside className="grid content-start gap-2 border-r border-[color:var(--border-muted)] bg-white p-5">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-700 transition-colors duration-300 ease-out",
            step.status === "in_progress" && "bg-[color:var(--blue-deep)] text-white"
          )}
        >
          <step.icon className="h-4 w-4 transition-transform duration-300 ease-out" />
          <span className="flex-1">
            {index + 1}. {step.label}
          </span>
          {step.status === "complete" ? <CheckCircle2 className="gb-check-motion h-4 w-4 text-[color:var(--success)]" /> : null}
          {step.status === "not_started" ? <Circle className="h-4 w-4 text-slate-400 transition-opacity duration-200" /> : null}
          {step.status === "locked" ? <Lock className="h-4 w-4 text-slate-400 transition-opacity duration-200" /> : null}
        </div>
      ))}
    </aside>
  );
}
