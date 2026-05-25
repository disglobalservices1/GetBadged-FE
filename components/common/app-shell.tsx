"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Bell, ChevronDown, CircleHelp, LogOut, Mail, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { AppShellNav, type AppShellNavRole } from "./app-shell-nav";
import { DepartmentTopNav } from "./department-top-nav";
import { Logo } from "./logo";
import { getMockSession } from "@/lib/auth/mock-session";
import { getMockCandidateDashboard } from "@/features/candidate/dashboard/get-mock-candidate-dashboard";
import { cn } from "@/lib/utils/cn";

type AppShellProps = {
  roleLabel: string;
  navRole: AppShellNavRole;
  candidateProfileId?: string;
  children: ReactNode;
};

const sidebarCollapsedStorageKeyByRole: Record<AppShellNavRole, string> = {
  candidate: "gb.candidateSidebarCollapsed",
  department: "gb.departmentSidebarCollapsed",
  admin: "gb.adminSidebarCollapsed"
};

export function AppShell({ roleLabel, navRole, candidateProfileId, children }: AppShellProps) {
  const session = getMockSession(navRole === "department" ? "department_admin" : navRole === "candidate" ? "candidate" : "gb_admin");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [hasLoadedSidebarPreference, setHasLoadedSidebarPreference] = useState(false);
  const sidebarStorageKey = sidebarCollapsedStorageKeyByRole[navRole];
  const isSidebarVisuallyCollapsed = isSidebarCollapsed && !isSidebarHovered;
  const expandedSidebarGridWidth = "lg:grid-cols-[clamp(200px,14vw,260px)_minmax(0,1fr)]";
  const expandedHeaderGridWidth = "lg:grid-cols-[clamp(200px,14vw,260px)_auto_minmax(330px,1fr)_auto]";
  const expandedSidebarOverlayWidth = "w-[clamp(200px,14vw,260px)]";
  const collapsedGridWidth = "lg:grid-cols-[48px_minmax(0,1fr)]";
  const candidateDashboard = useMemo(() => navRole === "candidate" ? getMockCandidateDashboard(candidateProfileId) : null, [navRole, candidateProfileId]);
  const isCertifiedCandidateShell = candidateDashboard?.track === "CXO";
  const headerGridWidth = isCertifiedCandidateShell ? "lg:grid-cols-[clamp(200px,14vw,260px)_minmax(330px,1fr)_auto]" : expandedHeaderGridWidth;
  const identity = useMemo(() => {
    const [candidateFirstName, ...candidateLastNameParts] = candidateDashboard?.fullName.split(" ") ?? [];

    return getShellIdentity(
      navRole,
      candidateFirstName || session.user.firstName,
      candidateLastNameParts.join(" ") || session.user.lastName
    );
  }, [candidateDashboard?.fullName, navRole, session.user.firstName, session.user.lastName]);

  useEffect(() => {
    setIsSidebarCollapsed(localStorage.getItem(sidebarStorageKey) === "true");
    setHasLoadedSidebarPreference(true);
  }, [sidebarStorageKey]);

  useEffect(() => {
    if (!hasLoadedSidebarPreference) {
      return;
    }

    localStorage.setItem(sidebarStorageKey, String(isSidebarCollapsed));
  }, [hasLoadedSidebarPreference, isSidebarCollapsed, sidebarStorageKey]);

  if (navRole === "admin") {
    return (
      <div className="gb-app-shell grid min-h-screen bg-[color:var(--background)] lg:grid-cols-[280px_1fr]">
        <aside className="gb-app-shell-sidebar hidden border-r border-[color:var(--border-muted)] bg-white lg:block">
          <div className="border-b border-[color:var(--border-muted)] p-6">
            <Logo />
            <p className="mt-4 text-xs font-bold uppercase text-slate-500">{roleLabel}</p>
          </div>
          <AppShellNav navRole={navRole} roleLabel={roleLabel} />
        </aside>
        <div className="flex min-w-0 flex-col">
          <header className="gb-app-shell-header flex h-16 items-center justify-between border-b border-[color:var(--border-muted)] bg-white px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <AppShellNav navRole={navRole} roleLabel={roleLabel} />
              </div>
              <p className="text-sm font-semibold text-[color:var(--navy)]">GetBadged Workspace</p>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <span className="hidden text-sm font-semibold text-slate-700 md:inline">
                {session.user.firstName} {session.user.lastName}
              </span>
              <Bell className="h-5 w-5" />
              <LogOut className="h-5 w-5" />
            </div>
          </header>
          <main className="gb-app-shell-main flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "gb-app-shell grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-slate-50 transition-[grid-template-columns] duration-300 ease-out motion-reduce:transition-none",
        isSidebarCollapsed ? collapsedGridWidth : expandedSidebarGridWidth
      )}
    >
      <header className={cn("col-span-full grid min-h-[54px] grid-cols-[1fr_auto] items-center bg-[color:var(--navy)] text-white", headerGridWidth)}>
        <a href="/" className="flex h-full min-w-0 items-center gap-2.5 overflow-hidden border-r border-white/20 px-4 lg:px-5" aria-label="GetBadged home">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md border-2 border-[color:var(--gold)] text-[11px] font-bold text-[color:var(--gold)]">GB</span>
          <span className="min-w-0 truncate text-[16px] font-bold leading-none tracking-normal">GetBadged</span>
        </a>

        {!isCertifiedCandidateShell ? (
          <div className="hidden min-w-[218px] items-center gap-2.5 px-4 xl:flex">
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border-2 border-[color:var(--gold)] text-[10px] font-bold text-[color:var(--gold)]">{identity.avatar}</span>
            <span className="min-w-0 truncate text-[11px] font-semibold">{identity.orgLabel}</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/75" />
          </div>
        ) : null}

        {navRole === "department" ? <DepartmentTopNav /> : <CandidateTopNav isCertifiedCandidate={isCertifiedCandidateShell} />}

        <div className="flex min-w-0 items-center justify-end gap-2.5 px-4 lg:px-5 xl:px-6">
          <div className="lg:hidden [&_button]:border-white/30 [&_button]:text-white">
            <AppShellNav navRole={navRole} roleLabel={roleLabel} candidateTrack={candidateDashboard?.track} />
          </div>
          <a href={`/${navRole}/messages`} className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-white/95 transition hover:text-white xl:flex" aria-label="Messages">
            <Mail className="h-3.5 w-3.5" />
            <span>Messages</span>
          </a>
          <a
            href={`/${navRole}/notifications`}
            className={cn(
              "relative hidden text-white/95 transition hover:text-white",
              isCertifiedCandidateShell
                ? "shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold lg:flex"
                : "lg:block"
            )}
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {isCertifiedCandidateShell ? <span>Notifications</span> : null}
            <span className="absolute -right-1.5 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-red-600 px-1 text-[9px] font-extrabold leading-none text-white">{navRole === "department" ? "5" : "2"}</span>
          </a>
          <div className="hidden items-center gap-2.5 lg:flex">
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-white/35 text-[10px] font-bold">{identity.avatar}</span>
            <span className="leading-tight">
              <span className="block whitespace-nowrap text-[11px] font-semibold">{identity.userLabel}</span>
              <span className="block text-[10px] font-medium text-white/75">{identity.roleLabel}</span>
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-white/75" />
          </div>
        </div>
      </header>

      <aside
        className={cn(
          "relative z-20 hidden min-h-0 overflow-x-hidden overflow-y-auto border-r border-[color:var(--border-muted)] bg-white transition-[width,box-shadow] duration-300 ease-out motion-reduce:transition-none lg:grid lg:content-between",
          isSidebarCollapsed
            ? isSidebarHovered
              ? cn(expandedSidebarOverlayWidth, "shadow-xl")
              : "w-[48px]"
            : "w-full"
        )}
        onMouseEnter={() => {
          if (isSidebarCollapsed) {
            setIsSidebarHovered(true);
          }
        }}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <div>
          <div
            className={cn(
              "flex items-center px-4 pb-2 pt-4 transition-[padding] duration-300 ease-out motion-reduce:transition-none",
              isSidebarVisuallyCollapsed ? "justify-center !px-2" : "justify-between gap-2"
            )}
          >
            <p
              className={cn(
                "min-w-0 overflow-hidden truncate text-[10px] font-extrabold uppercase tracking-wide text-[color:var(--blue-deep)] transition-[opacity,width] duration-200 ease-out motion-reduce:transition-none",
                isSidebarVisuallyCollapsed && "w-0 opacity-0"
              )}
            >
              {roleLabel}
            </p>
            <button
              type="button"
              aria-label={isSidebarCollapsed ? "Expand side menu" : "Collapse side menu"}
              aria-pressed={isSidebarCollapsed}
              title={isSidebarCollapsed ? "Expand side menu" : "Collapse side menu"}
              onClick={() => {
                setIsSidebarHovered(false);
                setIsSidebarCollapsed((current) => !current);
              }}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-[color:var(--blue-deep)] transition hover:bg-[color:var(--surface-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)] focus:ring-offset-2"
            >
              {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>
          <AppShellNav
            navRole={navRole}
            roleLabel={roleLabel}
            candidateTrack={candidateDashboard?.track}
            isCollapsed={isSidebarVisuallyCollapsed}
            onNavigate={() => setIsSidebarHovered(false)}
          />
        </div>

        {isSidebarVisuallyCollapsed ? (
          <a
            href="mailto:info@getbadged.com"
            aria-label="Need support?"
            title="Need support?"
            className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[color:var(--blue-deep)] transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--blue)] focus:ring-offset-2"
          >
            <CircleHelp className="h-5 w-5" />
          </a>
        ) : (
          <div className="m-3 rounded-md bg-blue-50 p-3 text-[10px] leading-4 transition-opacity duration-200 ease-out motion-reduce:transition-none">
            <p className="font-bold text-[color:var(--blue-deep)]">Need support?</p>
            <p className="mt-1 text-[color:var(--blue-deep)]">We're happy to help.</p>
            <p className="mt-3 font-semibold text-[color:var(--navy)]">Call us at 781.645.6005</p>
            <p className="mt-1 font-semibold text-[color:var(--blue-deep)]">info@getbadged.com</p>
          </div>
        )}
      </aside>

      <main className="gb-app-shell-main min-h-0 min-w-0 overflow-y-auto p-3 sm:p-4">{children}</main>
    </div>
  );
}

function CandidateTopNav({ isCertifiedCandidate = false }: { isCertifiedCandidate?: boolean }) {
  if (isCertifiedCandidate) {
    return (
      <nav className="hidden items-center justify-center gap-2.5 lg:flex">
        {[
          { label: "Public", href: "/" },
          { label: "Candidate", href: "/candidate", active: true },
          { label: "Dept Admin", href: "/department" },
          { label: "Dept User", href: "/department" },
          { label: "GB Admin", href: "/admin" }
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-semibold text-white/90 transition duration-200 hover:bg-white/10 hover:text-white",
              item.active && "!bg-[color:var(--gold)] !text-[color:var(--navy)] shadow-sm hover:!bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center justify-center gap-2.5 lg:flex">
      <div className="flex items-center rounded-md border border-white/30 p-0.5">
        {[
          { label: "Public", href: "/" },
          { label: "Candidate", href: "/candidate", active: true }
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-semibold text-white/90 transition duration-200 hover:bg-white/10 hover:text-white",
              item.active && "!bg-[color:var(--gold)] !text-[color:var(--navy)] shadow-sm hover:!bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
      {[
        { label: "Dept Admin", href: "/department" },
        { label: "Dept User", href: "/department" },
        { label: "GB Admin", href: "/admin" }
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-semibold text-white/90 transition duration-200 hover:bg-white/10 hover:text-white"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function getShellIdentity(navRole: AppShellNavRole, firstName: string, lastName: string) {
  if (navRole === "department") {
    return {
      avatar: "AW",
      orgLabel: "Westview Police Department",
      userLabel: "Angela Wilson",
      roleLabel: "Department Admin"
    };
  }

  return {
    avatar: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(),
    orgLabel: "Candidate Workspace",
    userLabel: `${firstName} ${lastName}`,
    roleLabel: "Candidate"
  };
}
