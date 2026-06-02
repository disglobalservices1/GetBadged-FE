import { DepartmentApplicantPool } from "@/components/department/applicants/department-applicant-pool";
import { getMockDepartmentApplicantPool } from "@/features/department/applicants/get-mock-department-applicant-pool";

export default function DepartmentApplicantPoolsPage() {
  return <DepartmentApplicantPool model={getMockDepartmentApplicantPool()} />;
}
