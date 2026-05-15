import { Building2, FileCheck2, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { getMockDepartmentDashboard } from "@/features/department/dashboard/get-mock-department-dashboard";

export default function DepartmentDashboardPage() {
  const dashboard = getMockDepartmentDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow={dashboard.tierLabel}
        title={dashboard.departmentName}
        description="Department workspace foundation for jobs, Badge Pool, applicants, messages, and exports."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Building2 />} label="Active Jobs" value={dashboard.activeJobs} detail="Job post builder pending." />
        <StatCard icon={<ShieldCheck />} label="Badge Credits" value={dashboard.badgeCreditsRemaining} detail="Credits visible before sending Badges." />
        <StatCard icon={<FileCheck2 />} label="Applicants" value={dashboard.applicantCount} detail="Per-job and combined pools." />
        <StatCard icon={<MessageSquare />} label="Unread Messages" value={dashboard.unreadMessages} detail="Two-way per Master Checklist." />
      </div>
    </div>
  );
}
