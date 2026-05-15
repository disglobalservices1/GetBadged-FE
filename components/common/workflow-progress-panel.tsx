import { Progress } from "@/components/ui/progress";

type WorkflowProgressPanelProps = {
  percent: number;
  children?: React.ReactNode;
};

export function WorkflowProgressPanel({ percent, children }: WorkflowProgressPanelProps) {
  return (
    <aside className="grid content-start gap-6 border-l border-[color:var(--border-muted)] bg-white p-6">
      <div className="grid gap-3">
        <h2 className="text-sm font-bold uppercase text-[color:var(--navy)]">Your Progress</h2>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-[color:var(--success)]">{percent}%</span>
          <span className="pb-1 text-sm font-semibold text-slate-600">Complete</span>
        </div>
        <Progress value={percent} />
      </div>
      {children}
    </aside>
  );
}
