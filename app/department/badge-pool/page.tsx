import { DepartmentBadgePool } from "@/components/department/badge-pool/department-badge-pool";
import { getMockDepartmentBadgePool } from "@/features/department/badge-pool/get-mock-department-badge-pool";

export default function DepartmentBadgePoolPage() {
  return <DepartmentBadgePool model={getMockDepartmentBadgePool()} />;
}
