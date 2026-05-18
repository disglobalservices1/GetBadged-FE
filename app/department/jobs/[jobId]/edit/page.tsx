import { DepartmentJobPostEditor } from "@/components/department/jobs/department-job-posts";

type DepartmentJobPostEditPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function DepartmentJobPostEditPage({ params }: DepartmentJobPostEditPageProps) {
  const { jobId } = await params;

  return <DepartmentJobPostEditor jobId={jobId} />;
}
