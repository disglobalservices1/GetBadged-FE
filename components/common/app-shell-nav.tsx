"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { adminNavItems, candidateNavItems, departmentNavItems } from "@/lib/routes/navigation";
import { cn } from "@/lib/utils/cn";

export type AppShellNavRole = "candidate" | "department" | "admin";

type AppShellNavProps = {
  navRole: AppShellNavRole;
  roleLabel: string;
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

function NavLinks({ navRole, onNavigate }: { navRole: AppShellNavRole; onNavigate?: () => void }) {
  const pathname = usePathname();
  const navItems = navItemsByRole[navRole];

  const activeHref = navItems
    .filter((item) => pathname === item.href || (item.href.split("/").length > 2 && pathname.startsWith(`${item.href}/`)))
    .sort((first, second) => second.href.length - first.href.length)[0]?.href;

  const renderLink = (item: (typeof navItems)[number]) => {
        const active = activeHref === item.href;
        const isDepartment = navRole === "department";

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center rounded-md font-semibold transition-[background-color,color,transform] duration-200 ease-out hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)] motion-reduce:transition-none",
              isDepartment ? "gap-2.5 px-3 py-2 text-[12px] leading-4 text-slate-700" : "gap-3 px-3 py-2.5 text-sm text-slate-700",
              active && (isDepartment ? "bg-[color:var(--navy)] text-white hover:bg-[color:var(--navy)] hover:text-white" : "bg-blue-50 text-[color:var(--blue-deep)]")
            )}
          >
            <span
              className={cn(
                "absolute bottom-2 left-0 top-2 w-1 origin-center rounded-r-full bg-[color:var(--blue-deep)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                active && !isDepartment ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
              )}
            />
            <item.icon className={cn("shrink-0", isDepartment ? "h-3.5 w-3.5" : "h-4 w-4")} />
            {item.label}
          </a>
        );
  };

  if (navRole === "department") {
    return (
      <nav className="grid gap-4 px-1.5 pb-3 pt-0">
        {departmentNavGroups.map((group) => (
          <div key={group.label} className="grid gap-1">
            {group.label !== "Department" ? (
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wide text-[color:var(--blue-deep)]">{group.label}</p>
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

  return <nav className="grid gap-1 p-4">{navItems.map(renderLink)}</nav>;
}

export function AppShellNav({ navRole, roleLabel }: AppShellNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:block">
        <NavLinks navRole={navRole} />
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
          <NavLinks navRole={navRole} onNavigate={() => setIsOpen(false)} />
        </aside>
      </div>
    </>
  );
}
