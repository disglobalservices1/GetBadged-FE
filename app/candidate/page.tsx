import { cookies } from "next/headers";
import { CandidateDashboard } from "@/components/candidate/candidate-dashboard";
import { mockCandidateProfileCookieName } from "@/features/auth/mock-auth";

export default async function CandidateDashboardPage() {
  const cookieStore = await cookies();
  const candidateProfileId = cookieStore.get(mockCandidateProfileCookieName)?.value;

  return <CandidateDashboard candidateProfileId={candidateProfileId} />;
}
