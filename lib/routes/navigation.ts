import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

export const candidateNavItems: NavItem[] = [
  { label: "Dashboard", href: "/candidate", icon: LayoutDashboard },
  { label: "Candidate Profile", href: "/candidate/profile", icon: Users },
  { label: "Supporting Documents", href: "/candidate/documents", icon: FileText },
  { label: "Exam Registration", href: "/candidate/exams", icon: ClipboardList },
  { label: "Browse Departments & Jobs", href: "/candidate/jobs", icon: BriefcaseBusiness },
  { label: "Submitted Applications", href: "/candidate/applications", icon: ClipboardList },
  { label: "Tokens & Purchases", href: "/candidate/tokens", icon: BadgeCheck },
  { label: "Messages", href: "/candidate/messages", icon: MessageSquare },
  { label: "Settings", href: "/candidate/settings", icon: Settings }
];

export const departmentNavItems: NavItem[] = [
  { label: "Dashboard", href: "/department", icon: LayoutDashboard },
  { label: "Department Profile", href: "/department/profile", icon: Building2 },
  { label: "Job Postings", href: "/department/jobs", icon: BriefcaseBusiness },
  { label: "Applicant Pools", href: "/department/applicant-pools", icon: ClipboardList },
  { label: "Badge Pool", href: "/department/badge-pool", icon: BadgeCheck },
  { label: "Messages", href: "/department/messages", icon: MessageSquare },
  { label: "Reports & Exports", href: "/department/reports", icon: FileText },
  { label: "Notifications", href: "/department/notifications", icon: Bell },
  { label: "Resources", href: "/department/resources", icon: FileText },
  { label: "Settings / Users", href: "/department/settings", icon: Users },
  { label: "Billing", href: "/department/billing", icon: CreditCard }
];

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Approvals", href: "/admin/approvals/departments", icon: ShieldCheck },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Exams", href: "/admin/exams", icon: ClipboardList },
  { label: "Scores", href: "/admin/scores", icon: BadgeCheck },
  { label: "CMS", href: "/admin/cms", icon: FileText },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText }
];
