"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const topNavItems = [
  { label: "Dashboard", href: "/department" },
  { label: "Jobs", href: "/department/jobs" },
  { label: "Applicant Pools", href: "/department/applicant-pools" },
  { label: "Badge Pool", href: "/department/badge-pool" },
  { label: "Reports", href: "/department/reports" }
];

export function DepartmentTopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center justify-center gap-2.5 lg:flex">
      {topNavItems.map((item) => {
        const isDashboard = item.href === "/department";
        const active = isDashboard ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-md px-3.5 py-1.5 text-[13px] font-semibold text-white/90 transition duration-200 hover:bg-white/10 hover:text-white",
              active && "!bg-[color:var(--gold)] !text-[color:var(--navy)] shadow-sm hover:!bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
