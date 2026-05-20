import { CandidateProfileWizard } from "@/components/candidate/profile/candidate-profile-wizard";

type CandidateProfileStepPageProps = {
  params: Promise<{
    step: string;
  }>;
};

export default async function CandidateProfileStepPage({ params }: CandidateProfileStepPageProps) {
  const { step } = await params;

  return <CandidateProfileWizard stepKey={step} />;
}
