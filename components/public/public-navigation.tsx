import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { publicFooterColumns, publicHeaderLinks } from "@/features/public/marketing-content";

export function PublicHeaderNavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {publicHeaderLinks.map((link) => (
        <PublicNavLink key={link.label} href={link.href} withCaret={link.withCaret} onClick={onNavigate}>
          {link.label}
        </PublicNavLink>
      ))}
    </>
  );
}

export function PublicNavLink({
  href,
  withCaret = false,
  children,
  onClick
}: {
  href: string;
  withCaret?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a href={href} onClick={onClick} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/86 transition hover:text-white">
      {children}
      {withCaret ? <ChevronDown className="h-3.5 w-3.5" /> : null}
    </a>
  );
}

export function PublicFooterColumns() {
  return (
    <>
      {publicFooterColumns.map((column) => (
        <div key={column.title}>
          <h4 className="text-[11px] font-black uppercase tracking-[0.08em] text-white">{column.title}</h4>
          <div className="mt-3 grid gap-2">
            {column.links.map((link) => (
              <a key={link.label} href={link.href} className="text-[13px] font-medium text-white/74 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
