import { cookies } from "next/headers";
import { AppShell } from "@/components/common/app-shell";
import { mockCandidateProfileCookieName } from "@/features/auth/mock-auth";

type CandidateLayoutProps = {
  children: React.ReactNode;
};

export default async function CandidateLayout({ children }: CandidateLayoutProps) {
  const cookieStore = await cookies();
  const candidateProfileId = cookieStore.get(mockCandidateProfileCookieName)?.value;

  return (
    <AppShell navRole="candidate" roleLabel="Candidate" candidateProfileId={candidateProfileId}>
      {children}
    </AppShell>
  );
}
