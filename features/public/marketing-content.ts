import {
  BadgeCheck,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  MessageSquare,
  Search,
  ShieldCheck,
  Users
} from "lucide-react";

export const publicHeroStats = [
  { label: "Candidate tracks", value: "3", detail: "ELR, CXO, OPS" },
  { label: "Phase 1 state", value: "MA", detail: "Massachusetts launch" },
  { label: "Privacy model", value: "Consent", detail: "Anonymous Badge Pool" }
];

export const publicAudienceCards = [
  {
    title: "For Candidates",
    body: "Create a profile, complete track requirements, browse jobs, Apply directly, and respond to Badge Requests.",
    href: "/auth/signup/candidate",
    cta: "Start candidate profile",
    icon: Users
  },
  {
    title: "For Departments",
    body: "Build a Department Profile, publish job posts, browse anonymous eligible candidates, and manage Applicant Pools.",
    href: "/auth/signup/department",
    cta: "Register department",
    icon: Building2
  }
];

export const publicWorkflowSteps = [
  {
    title: "Build eligibility",
    body: "Candidates complete profile sections, documents, phone verification, and track-specific requirements.",
    icon: ClipboardCheck
  },
  {
    title: "Explore opportunities",
    body: "Candidates browse approved Department Profiles and available jobs across Massachusetts.",
    icon: Search
  },
  {
    title: "Apply or accept",
    body: "Candidates Apply directly with tokens or accept Badge Requests at no token cost.",
    icon: BadgeCheck
  },
  {
    title: "Manage hiring",
    body: "Departments review applications, update statuses, message candidates, archive records, and export data.",
    icon: BriefcaseBusiness
  }
];

export const publicTrustCards = [
  {
    title: "Privacy-first Badge Pool",
    body: "Name, phone, street address, ethnicity, age/date of birth, gender, last 4 SSN, and application history stay hidden before consent.",
    icon: ShieldCheck
  },
  {
    title: "Structured application records",
    body: "Full applications include profile, documents, essays, cover letters, notes, status history, and change logs where permitted.",
    icon: FileText
  },
  {
    title: "Clear communication",
    body: "Notifications, message history, and status updates keep candidates and departments aligned inside GetBadged.",
    icon: MessageSquare
  }
];

export const resourceGroups = [
  {
    title: "Candidate Resources",
    description: "Guides for profiles, documents, applications, Badge Requests, and exam readiness.",
    icon: GraduationCap,
    links: ["Application profile checklist", "Supporting document guide", "Badge Request basics", "Exam registration overview"]
  },
  {
    title: "Department Resources",
    description: "Operational guidance for profiles, job posts, Badge Pool workflows, and Applicant Pool management.",
    icon: Building2,
    links: ["Department Profile playbook", "Job post template guide", "Badge Pool privacy rules", "Applicant Pool workflow"]
  },
  {
    title: "Platform Updates",
    description: "Announcements, launch notes, policy updates, and GetBadged operating guidance.",
    icon: Bell,
    links: ["Massachusetts MVP launch", "Token and credit rules", "Messaging and notification guide", "Export and reporting basics"]
  }
];

export const aboutPrinciples = [
  {
    title: "Consent before identity",
    body: "The Badge Pool is useful because it shows qualifications without exposing protected candidate identity details.",
    icon: ShieldCheck
  },
  {
    title: "One profile, many opportunities",
    body: "Candidates maintain a reusable profile and application package while controlling where their full data is shared.",
    icon: FileText
  },
  {
    title: "Departments own their process",
    body: "Departments manage profiles, jobs, applicants, statuses, messages, private notes, exports, and hiring records.",
    icon: BriefcaseBusiness
  },
  {
    title: "Built for public safety",
    body: "The platform language, workflow, and privacy boundaries are designed around public-safety recruiting needs.",
    icon: BookOpen
  }
];
