import { BriefcaseBusiness } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentJobsPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Job posts"
      title="Job Posts"
      description="Create, draft, submit, and monitor department job postings from this workspace area."
      emptyTitle="Job posting tools are queued"
      emptyDescription="The route is available now so Department navigation does not drop to a 404 while the posting workflow is being implemented."
      icon={<BriefcaseBusiness className="h-8 w-8" />}
    />
  );
}
