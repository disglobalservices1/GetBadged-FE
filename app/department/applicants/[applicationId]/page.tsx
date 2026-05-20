import { DepartmentApplicationDetail } from "@/components/department/applicants/department-application-detail";
import { getMockDepartmentApplicationDetail } from "@/features/department/applicants/get-mock-department-applicant-pool";

type DepartmentApplicationDetailPageProps = {
  params: Promise<{
    applicationId: string;
  }>;
};

export default async function DepartmentApplicationDetailPage({ params }: DepartmentApplicationDetailPageProps) {
  const { applicationId } = await params;

  return <DepartmentApplicationDetail model={getMockDepartmentApplicationDetail(applicationId)} />;
}
