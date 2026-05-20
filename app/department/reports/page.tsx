import { DepartmentReports } from "@/components/department/reports/department-reports";
import { getMockDepartmentReports } from "@/features/department/reports/get-mock-department-reports";

export default function DepartmentReportsPage() {
  return <DepartmentReports model={getMockDepartmentReports()} />;
}
