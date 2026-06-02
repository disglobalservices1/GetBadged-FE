import { Users } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentSettingsPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Manage"
      title="Settings / Users"
      description="Manage department settings, user seats, and workspace access."
      icon={<Users className="h-10 w-10" />}
    />
  );
}
