import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[color:var(--border-muted)] bg-white">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  );
}
