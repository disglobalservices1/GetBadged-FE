import { DepartmentNotifications } from "@/components/department/notifications/department-notifications";
import { getMockDepartmentNotifications } from "@/features/department/notifications/get-mock-department-notifications";

export default function DepartmentNotificationsPage() {
  return <DepartmentNotifications model={getMockDepartmentNotifications()} />;
}
