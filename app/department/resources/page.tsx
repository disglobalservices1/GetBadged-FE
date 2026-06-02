import { DepartmentResources } from "@/components/department/resources/department-resources";
import { getMockDepartmentResources } from "@/features/department/resources/get-mock-department-resources";

export default function DepartmentResourcesPage() {
  return <DepartmentResources resources={getMockDepartmentResources()} />;
}
