import type { ReactNode } from "react";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";

type DepartmentFeaturePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle?: string;
  emptyDescription?: string;
  icon: ReactNode;
};

export function DepartmentFeaturePlaceholder({
  eyebrow,
  title,
  description,
  emptyTitle,
  emptyDescription,
  icon
}: DepartmentFeaturePlaceholderProps) {
  return (
    <div className="grid gap-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <EmptyState icon={icon} title={emptyTitle ?? `${title} is coming soon`} description={emptyDescription ?? description} />
    </div>
  );
}
