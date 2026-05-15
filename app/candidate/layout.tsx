import { AppShell } from "@/components/common/app-shell";
import { candidateNavItems } from "@/lib/routes/navigation";

type CandidateLayoutProps = {
  children: React.ReactNode;
};

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  return (
    <AppShell navItems={candidateNavItems} roleLabel="Candidate">
      {children}
    </AppShell>
  );
}
