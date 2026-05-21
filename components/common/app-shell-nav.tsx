"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Shield, X } from "lucide-react";
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

function NavLinks({ navRole, onNavigate }: { navRole: AppShellNavRole; onNavigate?: () => void }) {
  const pathname = usePathname();
  const navItems = navItemsByRole[navRole];

  const activeHref = navItems
    .filter((item) => pathname === item.href || (item.href.split("/").length > 2 && pathname.startsWith(`${item.href}/`)))
    .sort((first, second) => second.href.length - first.href.length)[0]?.href;

  if (navRole === "candidate") {
    const accountItems = [
      { label: "Settings", href: "/candidate/settings", icon: navItems.find((item) => item.href === "/candidate/settings")?.icon ?? Shield },
      { label: "Privacy & Data", href: "/candidate/privacy", icon: Shield },
      { label: "Sign out", href: "/auth/login", icon: LogOut }
    ];
    const candidateItems = navItems.filter((item) => !["/candidate/settings", "/candidate/messages"].includes(item.href));

    return (
      <nav className="grid gap-6 py-6 pl-3 pr-4">
        <CandidateNavSection title="Candidate" items={candidateItems} activeHref={activeHref} onNavigate={onNavigate} />
        <CandidateNavSection title="Account" items={accountItems} activeHref={activeHref} onNavigate={onNavigate} />
      </nav>
    );
  }

  return (
    <nav className="grid gap-1 p-4">
      {navItems.map((item) => {
        const active = activeHref === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 transition-[background-color,color,transform] duration-200 ease-out hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)] motion-reduce:transition-none",
              active && "bg-blue-50 text-[color:var(--blue-deep)]"
            )}
          >
            <span
              className={cn(
                "absolute bottom-2 left-0 top-2 w-1 origin-center rounded-r-full bg-[color:var(--blue-deep)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                active ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
              )}
            />
            <item.icon className="h-4 w-4" />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

function CandidateNavSection({
  title,
  items,
  activeHref,
  onNavigate
}: {
  title: string;
  items: Array<{ label: string; href: string; icon: ComponentType<{ className?: string }> }>;
  activeHref?: string;
  onNavigate?: () => void;
}) {
  return (
    <section className="grid gap-3">
      <p className="px-2 text-[10px] font-extrabold uppercase tracking-wide text-[color:var(--blue)]">{title}</p>
      <div className="grid gap-1.5">
        {items.map((item) => {
          const active = activeHref === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "flex min-h-9 max-w-full items-center gap-2.5 rounded-md px-2.5 text-[9.5px] font-extrabold text-[#182747] transition-colors hover:bg-blue-50",
                active && "bg-[#001b3f] text-white hover:bg-[#001b3f]"
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="min-w-0 truncate whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
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
