import { BadgeCheck, ClipboardCheck, FileText, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { getMockCandidateDashboard } from "@/features/candidate/dashboard/get-mock-candidate-dashboard";

export default function CandidateDashboardPage() {
  const dashboard = getMockCandidateDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow={`${dashboard.track} Candidate`}
        title={`Welcome back, ${dashboard.firstName}.`}
        description={dashboard.statusDescription}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<WalletCards />} label="Application Tokens" value={dashboard.tokenBalance} detail="Shown on dashboard and at apply." />
        <StatCard icon={<ClipboardCheck />} label="Profile Complete" value={`${dashboard.profileCompletionPercent}%`} detail="Autosave wizard ready." />
        <StatCard icon={<BadgeCheck />} label="Badge Requests" value={dashboard.badgeRequestCount} detail="Accept or ignore; no decline." />
        <StatCard icon={<FileText />} label="Applications" value={dashboard.applicationCount} detail="Direct and accepted Badges." />
      </div>
    </div>
  );
}
