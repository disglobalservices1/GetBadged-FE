import { Building2 } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentProfilePage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Department profile"
      title="Department Profile"
      description="Review and maintain the public agency details that candidates and GetBadged admins use."
      emptyTitle="Profile tools are coming next"
      emptyDescription="This destination is wired into the Department workspace shell so the navigation stays stable while the profile workflow is built."
      icon={<Building2 className="h-8 w-8" />}
    />
  );
}
