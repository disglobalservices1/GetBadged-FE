"use client";

import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { resolveRoleAwarePublicHref, type PublicAuthIntent } from "@/features/public/public-routing";
import { getMockRoleFromCookieString } from "@/lib/auth/mock-session";
import type { UserRole } from "@/types/auth";

type RoleAwarePublicLinkProps = ComponentPropsWithoutRef<"a"> & {
  intent: PublicAuthIntent;
  fallbackHref?: string;
};

export function RoleAwarePublicLink({
  intent,
  fallbackHref,
  href,
  children,
  ...props
}: RoleAwarePublicLinkProps) {
  const role = useMockUserRole();
  const resolvedHref = resolveRoleAwarePublicHref(intent, role);

  return (
    <a href={resolvedHref || fallbackHref || href} {...props}>
      {children}
    </a>
  );
}

function useMockUserRole() {
  const [role, setRole] = useState<UserRole | undefined>(undefined);

  useEffect(() => {
    const syncRole = () => {
      setRole(getMockRoleFromCookieString(document.cookie));
    };

    syncRole();
    window.addEventListener("focus", syncRole);
    return () => window.removeEventListener("focus", syncRole);
  }, []);

  return role;
}
