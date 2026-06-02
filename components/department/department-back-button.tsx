"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type BackTarget = {
  href: string;
  label: string;
};

export function DepartmentBackButton() {
  const pathname = usePathname();
  const target = getBackTarget(pathname);

  if (!target) {
    return null;
  }

  return (
    <div className="print:hidden">
      <Button href={target.href} variant="secondary" iconLeft={<ArrowLeft className="h-4 w-4" />}>
        {target.label}
      </Button>
    </div>
  );
}

function getBackTarget(pathname: string): BackTarget | null {
  const mainDepartmentPages = new Set([
    "/department",
    "/department/profile",
    "/department/jobs",
    "/department/badge-pool",
    "/department/applicant-pools",
    "/department/messages",
    "/department/reports",
    "/department/notifications",
    "/department/resources",
    "/department/settings",
    "/department/billing",
    "/department/pending"
  ]);

  if (mainDepartmentPages.has(pathname)) {
    return null;
  }

  if (/^\/department\/applicant-pools\/[^/]+$/.test(pathname) || /^\/department\/applicants\/[^/]+$/.test(pathname)) {
    return { href: "/department/applicant-pools", label: "Back to Applicant Pools" };
  }

  if (/^\/department\/messages\/[^/]+$/.test(pathname)) {
    return { href: "/department/messages", label: "Back to Messages" };
  }

  if (pathname === "/department/jobs/new" || /^\/department\/jobs\/[^/]+\/edit$/.test(pathname)) {
    return { href: "/department/jobs", label: "Back to Job Posts" };
  }

  if (pathname === "/department/profile/edit") {
    return { href: "/department/profile", label: "Back to Department Profile" };
  }

  return null;
}
