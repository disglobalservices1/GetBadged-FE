import { CandidateJobDetailPage } from "@/components/candidate/candidate-job-detail-page";

type CandidateJobDetailRouteProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function CandidateJobDetailRoute({ params }: CandidateJobDetailRouteProps) {
  const { jobId } = await params;

  return <CandidateJobDetailPage jobId={jobId} />;
}
