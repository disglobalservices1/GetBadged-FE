import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({ title = "Something went wrong", description = "Please retry or contact support if the issue continues." }: ErrorStateProps) {
  return (
    <div className="grid gap-4 rounded-lg border border-red-100 bg-red-50 p-6 text-sm text-[color:var(--danger)]">
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="mt-1 text-red-700">{description}</p>
      </div>
      <div>
        <Button variant="secondary">Retry</Button>
      </div>
    </div>
  );
}
