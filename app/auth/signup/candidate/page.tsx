import { CandidateSignupForm } from "@/components/auth/candidate-signup-form";

type CandidateSignupPageProps = {
  searchParams?: Promise<{
    jobId?: string;
  }>;
};

export default async function CandidateSignupPage({ searchParams }: CandidateSignupPageProps) {
  const params = await searchParams;

  return <CandidateSignupForm jobId={params?.jobId} />;
}
