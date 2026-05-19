import { BadgeCheck } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentBadgePoolPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Badge pool"
      title="Badge Pool"
      description="Track badge credits, issued badges, and department pool activity."
      emptyTitle="Badge pool management is not active yet"
      emptyDescription="This placeholder keeps the Department shell and active navigation intact until badge pool screens are built."
      icon={<BadgeCheck className="h-8 w-8" />}
    />
  );
}
