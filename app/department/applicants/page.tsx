import { ClipboardList } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentApplicantsPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Applicant pool"
      title="Applicant Pool"
      description="Review direct applications, accepted badges, and candidates awaiting department action."
      emptyTitle="Applicant review tools are coming"
      emptyDescription="The route is ready so the workspace keeps its layout while applicant pool workflows are completed."
      icon={<ClipboardList className="h-8 w-8" />}
    />
  );
}
