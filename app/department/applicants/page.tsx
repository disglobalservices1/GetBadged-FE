import { DepartmentApplicantPool } from "@/components/department/applicants/department-applicant-pool";
import { getMockDepartmentApplicantPool } from "@/features/department/applicants/get-mock-department-applicant-pool";

type DepartmentApplicantsPageProps = {
  searchParams?: Promise<{
    jobId?: string;
  }>;
};

export default async function DepartmentApplicantsPage({ searchParams }: DepartmentApplicantsPageProps) {
  const filters = await searchParams;

  return <DepartmentApplicantPool model={getMockDepartmentApplicantPool({ initialJobFilter: filters?.jobId })} />;
}
