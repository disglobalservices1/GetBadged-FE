import { Bell } from "lucide-react";
import { DepartmentFeaturePlaceholder } from "@/components/department/department-feature-placeholder";

export default function DepartmentNotificationsPage() {
  return (
    <DepartmentFeaturePlaceholder
      eyebrow="Notifications"
      title="Notifications"
      description="Review department alerts, approval updates, application events, and account notices."
      emptyTitle="Notification center is coming"
      emptyDescription="This destination is connected so users can move through the shell without losing the Department layout."
      icon={<Bell className="h-8 w-8" />}
    />
  );
}
