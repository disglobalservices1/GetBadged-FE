import { DepartmentApplicationDetail } from "@/components/department/applicants/department-application-detail";
import { getMockDepartmentApplicationDetail } from "@/features/department/applicants/get-mock-department-applicant-pool";

export default async function DepartmentApplicantPoolDetailPage({
  params
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await params;
  const model = getMockDepartmentApplicationDetail(applicationId);

  if (!model) {
    return null;
  }

  return <DepartmentApplicationDetail model={model} />;
}
