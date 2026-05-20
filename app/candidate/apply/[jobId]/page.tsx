import { CandidateApplyPage } from "@/components/candidate/candidate-apply-page";

type CandidateApplyRouteProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function CandidateApplyRoute({ params }: CandidateApplyRouteProps) {
  const { jobId } = await params;

  return <CandidateApplyPage jobId={jobId} />;
}
