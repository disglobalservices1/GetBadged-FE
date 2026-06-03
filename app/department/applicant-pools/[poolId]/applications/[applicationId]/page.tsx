import { DepartmentApplicationDetail } from "@/components/department/applicants/department-application-detail";
import { getMockDepartmentApplicationDetail } from "@/features/department/applicants/get-mock-department-applicant-pool";

type DepartmentApplicantPoolApplicationDetailPageProps = {
  params: Promise<{
    poolId: string;
    applicationId: string;
  }>;
};

export default async function DepartmentApplicantPoolApplicationDetailPage({
  params
}: DepartmentApplicantPoolApplicationDetailPageProps) {
  const { applicationId } = await params;
  const model = getMockDepartmentApplicationDetail(applicationId);

  if (!model) {
    return null;
  }

  return <DepartmentApplicationDetail model={model} />;
}
