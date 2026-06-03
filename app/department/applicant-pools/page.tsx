import { DepartmentApplicantPool } from "@/components/department/applicants/department-applicant-pool";
import { getMockDepartmentApplicantPool } from "@/features/department/applicants/get-mock-department-applicant-pool";

type DepartmentApplicantPoolsPageProps = {
  searchParams?: Promise<{
    jobId?: string;
  }>;
};

export default async function DepartmentApplicantPoolsPage({ searchParams }: DepartmentApplicantPoolsPageProps) {
  const filters = await searchParams;

  return <DepartmentApplicantPool model={getMockDepartmentApplicantPool({ initialJobFilter: filters?.jobId })} />;
}
