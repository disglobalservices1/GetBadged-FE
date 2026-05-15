import { ClipboardList, FileWarning, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { getMockAdminDashboard } from "@/features/admin/dashboard/get-mock-admin-dashboard";

export default function AdminDashboardPage() {
  const dashboard = getMockAdminDashboard();

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="GB Admin"
        title="Platform command center"
        description="Approval queues, exams, scores, users, CMS, reports, and audit logs will build from this foundation."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Users />} label="Pending Departments" value={dashboard.pendingDepartments} detail="Self-registration approvals." />
        <StatCard icon={<ClipboardList />} label="Profile Reviews" value={dashboard.pendingProfiles} detail="Department Profile approvals." />
        <StatCard icon={<FileWarning />} label="Job Reviews" value={dashboard.pendingJobs} detail="Job post approvals." />
        <StatCard icon={<ShieldCheck />} label="Audit Events" value={dashboard.auditEventsToday} detail="Impersonation and admin actions." />
      </div>
    </div>
  );
}
