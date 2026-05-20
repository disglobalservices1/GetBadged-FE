import { CandidateExamDetailPage } from "@/components/candidate/candidate-exam-detail-page";

type CandidateExamDetailRouteProps = {
  params: Promise<{
    examId: string;
  }>;
};

export default async function CandidateExamDetailRoute({ params }: CandidateExamDetailRouteProps) {
  const { examId } = await params;

  return <CandidateExamDetailPage examId={examId} />;
}
