import {
  BadgeCheck,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  Lock,
  MessageSquare,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Users
} from "lucide-react";

export type PublicLink = {
  label: string;
  href: string;
};

export const publicComingSoonHref = "/_not-found";

export const publicHeaderLinks: Array<PublicLink & { withCaret?: boolean }> = [
  { label: "For Candidates", href: "/#candidate-path", withCaret: true },
  { label: "For Departments", href: "/#department-path", withCaret: true },
  { label: "Resources", href: "/resources", withCaret: true },
  { label: "About Us", href: "/about", withCaret: true }
];

export const publicActionLinks = {
  signIn: { label: "Sign In", href: "/auth/login" },
  getStarted: { label: "Get Started", href: "/auth/signup/candidate" },
  candidateSignup: { label: "I'm a Candidate", href: "/auth/signup/candidate" },
  departmentSignup: { label: "I'm a Department", href: "/auth/signup/department" },
  resources: { label: "Explore Resources", href: "/resources" },
  browseJobs: { label: "Browse Jobs", href: "/jobs" },
  browseDepartments: { label: "Browse Departments", href: "/departments" }
} satisfies Record<string, PublicLink>;

export const publicFooterColumns: Array<{ title: string; links: PublicLink[] }> = [
  {
    title: "Candidates",
    links: [
      { label: "For Candidates", href: "/#candidate-path" },
      { label: "Available Jobs", href: "/jobs" },
      { label: "Exam Information", href: "/resources" },
      { label: "Resources", href: "/resources" }
    ]
  },
  {
    title: "Departments",
    links: [
      { label: "For Departments", href: "/#department-path" },
      { label: "How It Works", href: "/about" },
      { label: "Pricing", href: publicComingSoonHref },
      { label: "Department Resources", href: "/resources" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Exam Information", href: "/resources" },
      { label: "Help & FAQ", href: "/resources" },
      { label: "Candidate Resources", href: "/resources" },
      { label: "Department Resources", href: "/resources" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: publicComingSoonHref },
      { label: "Privacy Policy", href: publicComingSoonHref },
      { label: "Terms of Service", href: publicComingSoonHref }
    ]
  }
];

export const publicSocialLinks: PublicLink[] = [
  { label: "LinkedIn", href: publicComingSoonHref },
  { label: "Instagram", href: publicComingSoonHref }
];

export const homeHeroContent = {
  headlineLines: [
    { text: "The Smarter Way" },
    { text: "To Get Hired.", highlight: "Get Hired." },
    { text: "The Better Way" },
    { text: "To Hire.", highlight: "To Hire." }
  ],
  body: "GetBadged is the two-way consent marketplace for law enforcement and public safety.",
  accent: "A privacy-first way for qualified candidates and public-safety agencies to find the right fit.",
  candidateCta: {
    label: "I'm a Candidate",
    sublabel: "Join & Apply for Jobs",
    href: "/auth/signup/candidate"
  },
  departmentCta: {
    label: "I'm a Department",
    sublabel: "Find & Badge Candidates",
    href: "/auth/signup/department"
  },
  browseCtas: [
    publicActionLinks.browseJobs,
    publicActionLinks.browseDepartments
  ],
  noteTitle: "The nation's two-way marketplace for public safety.",
  noteBody: "Connecting driven candidates with forward-thinking agencies across the country."
};

export const homeBenefitCards = [
  {
    icon: ShieldCheck,
    tone: "gold" as const,
    title: "Pre-vetted.",
    copy: "Pre-qualified. Ready to serve."
  },
  {
    icon: Handshake,
    tone: "white" as const,
    title: "Two-way consent built into",
    copy: "every connection."
  },
  {
    icon: Lock,
    tone: "gold" as const,
    title: "No names.",
    copy: "No phone numbers. Until you both agree."
  },
  {
    icon: Globe,
    tone: "white" as const,
    title: "Built for today.",
    copy: "Expanding for tomorrow."
  }
];

export const homePathwayCards = [
  {
    title: "Entry Level New Recruit",
    body: "Take the first step toward your law enforcement career.",
    cta: "Join & Register for My Exam",
    href: "/auth/signup/candidate",
    learnHref: "/resources",
    tone: "blue" as const,
    icon: ShieldCheck
  },
  {
    title: "Certified Lateral Transfers",
    body: "POST certified and ready for your next opportunity.",
    cta: "Join This Path",
    href: "/auth/signup/candidate",
    learnHref: "/resources",
    tone: "gold" as const,
    icon: Shield
  },
  {
    title: "Other Public Safety",
    body: "Dispatch, corrections, security, EMS and more.",
    cta: "Join This Path",
    href: "/auth/signup/candidate",
    learnHref: "/resources",
    tone: "navy" as const,
    icon: Globe
  }
];

export const homeCandidateSection = {
  title: "Three Pathways. One Purpose.",
  body: "Choose the path that fits your public-safety career. Browse public jobs and departments before login, then create a candidate account when you are ready to Apply.",
  secondaryCtas: [
    publicActionLinks.browseJobs,
    publicActionLinks.signIn
  ]
};

export const homeResourceCallout = {
  icon: ShoppingCart,
  title: "Looking for prep resources, assessments, and more?",
  body: "Visit our Resource Center to explore study guides, assessments, and professional development products.",
  cta: publicActionLinks.resources
};

export const homeDepartmentSection = {
  eyebrow: "For Departments",
  title: "Two ways to hire. Total control.",
  body: [
    "With GetBadged, agencies have 2 ways to hire: receive directly submitted applications from candidates who meet listed requirements, or search an anonymous pool of pre-vetted candidates who are ready to go and send Badge Requests.",
    "Department Profiles and Job Posts stay internal until GB Admin approval, and protected candidate identity stays hidden until the candidate applies or accepts a Badge Request."
  ],
  cards: [
    {
      title: "Direct Applications",
      body: "Receive applications from candidates who meet your public requirements.",
      icon: Users
    },
    {
      title: "Badge Candidates",
      body: "Search our anonymous, pre-vetted pool and send badges to the candidates you want to meet.",
      icon: Shield
    }
  ],
  ctas: [
    { label: "Register Department", href: "/auth/signup/department", variant: "primary" as const },
    { label: "Browse Public Profiles", href: "/departments", variant: "secondary" as const },
    { label: "Department Login", href: "/auth/login", variant: "secondary" as const }
  ],
  previewItems: [
    "Approval-gated Department Profiles",
    "Approval-gated Job Posts",
    "Anonymous Badge Pool browsing",
    "Full candidate data only after consent"
  ]
};

export const homeFinalCta = {
  title: "Ready to make the right connection?",
  body: "Whether you're starting your career or building your team, GetBadged is here to help.",
  candidateCta: publicActionLinks.candidateSignup,
  departmentCta: publicActionLinks.departmentSignup
};

export const homeJobsPreviewSection = {
  eyebrow: "Browse Jobs",
  title: "See active public-safety openings before you sign in.",
  body: "Home-page job previews should only show active public postings with public-safe requirements, department context, and clear routes into job details.",
  cta: publicActionLinks.browseJobs
};

export const homeDepartmentsPreviewSection = {
  eyebrow: "Browse Departments",
  title: "Compare approved departments that are hiring through GetBadged.",
  body: "Public department previews should surface approved profile summaries, community fit, hiring timelines, and links to available jobs.",
  cta: publicActionLinks.browseDepartments
};

export const homeStatsSection = {
  eyebrow: "Public Snapshot",
  title: "Configured stats that explain how the platform works.",
  body: "These are mock public metrics today and can move to GB Admin-managed CMS content later."
};

export const homeAnnouncementsSection = {
  eyebrow: "News & Announcements",
  title: "Public updates that can later be managed by GB Admin.",
  body: "Announcement cards here stay public-safe and are designed to become CMS-managed without changing the homepage structure."
};

export const homeAboutSection = {
  eyebrow: "Why GetBadged",
  title: "A public-safety hiring platform built around Apply and Badge workflows.",
  body: "Candidates can Apply to active jobs, departments can Badge from an anonymous pool, and protected identity stays private until consent unlocks the next step.",
  ctas: [
    { label: "About Us", href: "/about" },
    { label: "Candidate Path", href: "/auth/signup/candidate" },
    { label: "Department Path", href: "/auth/signup/department" }
  ]
};

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
    contentType: "Guides & FAQs",
    links: ["Application profile checklist", "Supporting document guide", "Badge Request basics", "Exam registration overview"]
  },
  {
    title: "Department Resources",
    description: "Operational guidance for profiles, job posts, Badge Pool workflows, and Applicant Pool management.",
    icon: Building2,
    contentType: "Playbooks",
    links: ["Department Profile playbook", "Job post template guide", "Badge Pool privacy rules", "Applicant Pool workflow"]
  },
  {
    title: "Platform Updates",
    description: "Announcements, launch notes, policy updates, and GetBadged operating guidance.",
    icon: Bell,
    contentType: "Announcements",
    links: ["Massachusetts MVP launch", "Token and credit rules", "Messaging and notification guide", "Export and reporting basics"]
  }
];

export const homeAnnouncements = [
  {
    title: "Massachusetts MVP launch",
    body: "GetBadged public browse pages, candidate pathways, and department discovery are structured around the Massachusetts launch scope.",
    category: "Launch Note",
    dateLabel: "June 2026",
    href: "/resources"
  },
  {
    title: "Token and credit rules",
    body: "Direct applications consume one candidate token, while accepting a Badge Request does not consume a candidate token.",
    category: "Platform Rule",
    dateLabel: "Current public guidance",
    href: "/resources"
  },
  {
    title: "Privacy-first Badge Pool",
    body: "Protected candidate identity remains hidden until a direct application or accepted Badge Request creates consent.",
    category: "Privacy Update",
    dateLabel: "Current public guidance",
    href: "/about"
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
