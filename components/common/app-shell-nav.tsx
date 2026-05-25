"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeCheck, LogOut, Menu, Shield, ShieldCheck, X } from "lucide-react";
import { Logo } from "./logo";
import { adminNavItems, candidateNavItems, departmentNavItems } from "@/lib/routes/navigation";
import type { NavItem } from "@/types/navigation";
import type { CandidateTrack } from "@/types/candidate";
import { cn } from "@/lib/utils/cn";

export type AppShellNavRole = "candidate" | "department" | "admin";

type AppShellNavProps = {
  navRole: AppShellNavRole;
  roleLabel: string;
  candidateTrack?: CandidateTrack;
  isCollapsed?: boolean;
  onNavigate?: () => void;
};

type ShellNavItem = NavItem & {
  badge?: string;
};

const navItemsByRole = {
  candidate: candidateNavItems,
  department: departmentNavItems,
  admin: adminNavItems
};

const departmentNavGroups = [
  {
    label: "Department",
    items: ["Dashboard", "Job Postings", "Applicant Pool", "Badge Pool", "Messages", "Reports & Analytics"]
  },
  {
    label: "Manage",
    items: ["Team Members", "Department Profile", "Membership & Billing"]
  }
];

const candidateAccountItems: ShellNavItem[] = [
  { label: "Settings", href: "/candidate/settings", icon: candidateNavItems.find((item) => item.href === "/candidate/settings")?.icon ?? Shield },
  { label: "Privacy & Data", href: "/candidate/privacy", icon: Shield },
  { label: "Sign out", href: "/auth/login", icon: LogOut }
];

const certifiedCandidateNavItems: ShellNavItem[] = [
  candidateNavItems.find((item) => item.href === "/candidate"),
  candidateNavItems.find((item) => item.href === "/candidate/profile"),
  candidateNavItems.find((item) => item.href === "/candidate/documents"),
  { label: "Certification & Background", href: "/candidate/profile/background", icon: ShieldCheck },
  candidateNavItems.find((item) => item.href === "/candidate/jobs"),
  { label: "Badge Requests", href: "/candidate/badge-requests", icon: BadgeCheck, badge: "3" },
  candidateNavItems.find((item) => item.href === "/candidate/applications"),
  candidateNavItems.find((item) => item.href === "/candidate/tokens")
].filter((item): item is ShellNavItem => Boolean(item));

const candidateNavGroups = [
  {
    label: "Candidate",
    items: ["Dashboard", "Candidate Profile", "Supporting Documents", "Exam Registration", "Browse Departments & Jobs", "Submitted Applications", "Tokens & Purchases"]
  },
  {
    label: "Account",
    items: ["Settings", "Privacy & Data", "Sign out"]
  }
];

const certifiedCandidateNavGroups = [
  {
    label: "Candidate",
    items: ["Dashboard", "Candidate Profile", "Supporting Documents", "Certification & Background", "Browse Departments & Jobs", "Badge Requests", "Submitted Applications", "Tokens & Purchases"]
  },
  {
    label: "Account",
    items: ["Settings", "Privacy & Data", "Sign out"]
  }
];

function NavLinks({
  navRole,
  candidateTrack,
  onNavigate,
  isCollapsed = false
}: {
  navRole: AppShellNavRole;
  candidateTrack?: CandidateTrack;
  onNavigate?: () => void;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();
  const baseItems = navItemsByRole[navRole];
  const isCertifiedCandidate = navRole === "candidate" && candidateTrack === "CXO";
  const navItems: ShellNavItem[] = navRole === "candidate"
    ? [...(isCertifiedCandidate ? certifiedCandidateNavItems : baseItems.filter((item) => item.href !== "/candidate/messages")), ...candidateAccountItems]
    : baseItems;

  const activeHref = navItems
    .filter((item) => pathname === item.href || (item.href.split("/").length > 2 && pathname.startsWith(`${item.href}/`)))
    .sort((first, second) => second.href.length - first.href.length)[0]?.href;

  const isCompactShell = navRole === "department" || navRole === "candidate";

  const renderLink = (item: (typeof navItems)[number]) => {
    const active = activeHref === item.href;
    const collapseLink = isCompactShell && isCollapsed;

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-label={collapseLink ? item.label : undefined}
        title={collapseLink ? item.label : undefined}
        onClick={onNavigate}
        className={cn(
          "relative flex items-center rounded-md font-semibold transition-[background-color,color,transform,width,padding] duration-200 ease-out hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)] motion-reduce:transition-none",
          isCompactShell ? "gap-2.5 px-3 py-2 text-[12px] leading-4 text-slate-700" : "gap-3 px-3 py-2.5 text-sm text-slate-700",
          collapseLink && "mx-auto h-8 w-8 !justify-center !gap-0 !px-0 !py-0",
          active && (isCompactShell ? "!bg-[color:var(--navy)] !text-white hover:!bg-[color:var(--navy)] hover:!text-white" : "bg-blue-50 text-[color:var(--blue-deep)]")
        )}
      >
        <span
          className={cn(
            "absolute bottom-2 left-0 top-2 w-1 origin-center rounded-r-full bg-[color:var(--blue-deep)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
            active && !isCompactShell ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
          )}
        />
        <item.icon className={cn("shrink-0", isCompactShell ? "h-3.5 w-3.5" : "h-4 w-4")} />
        <span
          className={cn(
            "min-w-0 overflow-hidden transition-[opacity,width] duration-200 ease-out motion-reduce:transition-none",
            navRole === "candidate" && !collapseLink ? "whitespace-normal break-words leading-tight" : "truncate",
            collapseLink && "w-0 opacity-0"
          )}
        >
          {item.label}
        </span>
        {item.badge && !collapseLink ? (
          <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--gold)] px-1.5 text-[10px] font-extrabold leading-none text-[color:var(--navy)]">
            {item.badge}
          </span>
        ) : null}
      </Link>
    );
  };

  if (navRole === "department") {
    return (
      <GroupedNav
        groups={departmentNavGroups}
        navItems={navItems}
        isCollapsed={isCollapsed}
        renderLink={renderLink}
      />
    );
  }

  if (navRole === "candidate") {
    return (
      <GroupedNav
        groups={isCertifiedCandidate ? certifiedCandidateNavGroups : candidateNavGroups}
        navItems={navItems}
        isCollapsed={isCollapsed}
        renderLink={renderLink}
      />
    );
  }

  return <nav className="grid gap-1 p-4">{navItems.map(renderLink)}</nav>;
}

function GroupedNav({
  groups,
  navItems,
  isCollapsed,
  renderLink
}: {
  groups: Array<{ label: string; items: string[] }>;
  navItems: ShellNavItem[];
  isCollapsed: boolean;
  renderLink: (item: ShellNavItem) => ReactNode;
}) {
  return (
    <nav className={cn("grid gap-4 px-1.5 pb-3 pt-0 transition-[padding] duration-300 ease-out motion-reduce:transition-none", isCollapsed && "!px-0")}>
      {groups.map((group, groupIndex) => (
        <div key={group.label} className="grid gap-1">
          {isCollapsed && groupIndex > 0 ? <div className="mx-auto my-2 h-px w-5 bg-[color:var(--border-muted)]" /> : null}
          {groupIndex > 0 ? (
            <p
              className={cn(
                "px-3 text-[10px] font-extrabold uppercase tracking-wide text-[color:var(--blue-deep)] transition-[opacity,height,margin] duration-200 ease-out motion-reduce:transition-none",
                isCollapsed && "h-0 overflow-hidden opacity-0"
              )}
            >
              {group.label}
            </p>
          ) : null}
          {group.items
            .map((label) => navItems.find((item) => item.label === label))
            .filter((item): item is (typeof navItems)[number] => Boolean(item))
            .map(renderLink)}
        </div>
      ))}
    </nav>
  );
}

export function AppShellNav({ navRole, roleLabel, candidateTrack, isCollapsed = false, onNavigate }: AppShellNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <NavLinks navRole={navRole} candidateTrack={candidateTrack} isCollapsed={isCollapsed} onNavigate={onNavigate} />
      </div>

      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-[color:var(--navy)] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          className={cn(
            "absolute inset-0 bg-slate-950/40 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={cn(
            "relative grid h-full w-[min(320px,86vw)] content-start bg-white shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[color:var(--border-muted)] p-5">
            <div>
              <Logo />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">{roleLabel}</p>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavLinks navRole={navRole} candidateTrack={candidateTrack} onNavigate={() => setIsOpen(false)} />
        </aside>
      </div>
    </>
  );
}
