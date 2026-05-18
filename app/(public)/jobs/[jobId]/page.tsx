import { notFound } from "next/navigation";
import { JobDetailPage } from "@/components/public/job-detail-page";
import { getPublicJobById } from "@/features/public/directory";

type PublicJobDetailRouteProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function PublicJobDetailRoute({ params }: PublicJobDetailRouteProps) {
  const { jobId } = await params;
  const job = getPublicJobById(jobId);

  if (!job) {
    notFound();
  }

  return <JobDetailPage job={job} />;
}
