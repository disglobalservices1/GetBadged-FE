import { FileText } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentReportsPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Reports"
      title="Reports"
      description="Access department activity summaries, exports, and operational reporting."
      emptyTitle="Reports are planned for later"
      emptyDescription="The page exists now to keep Department navigation consistent while reporting features are still pending."
      icon={<FileText className="h-8 w-8" />}
    />
  );
}
