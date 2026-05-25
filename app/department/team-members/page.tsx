import { Users } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentTeamMembersPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Manage"
      title="Team Members"
      description="Invite and manage department users for this workspace."
      icon={<Users className="h-10 w-10" />}
    />
  );
}
