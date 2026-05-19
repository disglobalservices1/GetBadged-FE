import { AppShell } from "@/components/common/app-shell";

type CandidateLayoutProps = {
  children: React.ReactNode;
};

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  return (
    <AppShell navRole="candidate" roleLabel="Candidate">
      {children}
    </AppShell>
  );
}
