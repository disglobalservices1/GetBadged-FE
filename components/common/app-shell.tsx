import { Bell, LogOut } from "lucide-react";
import { Logo } from "./logo";
import type { NavItem } from "@/types/navigation";
import { getMockSession } from "@/lib/auth/mock-session";

type AppShellProps = {
  roleLabel: string;
  navItems: NavItem[];
  children: React.ReactNode;
};

export function AppShell({ roleLabel, navItems, children }: AppShellProps) {
  const session = getMockSession();

  return (
    <div className="grid min-h-screen bg-[color:var(--background)] lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-[color:var(--border-muted)] bg-white">
        <div className="border-b border-[color:var(--border-muted)] p-6">
          <Logo />
          <p className="mt-4 text-xs font-bold uppercase text-slate-500">{roleLabel}</p>
        </div>
        <nav className="grid gap-1 p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)]"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[color:var(--border-muted)] bg-white px-6">
          <p className="text-sm font-semibold text-[color:var(--navy)]">GetBadged Workspace</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="hidden text-sm font-semibold text-slate-700 md:inline">
              {session.user.firstName} {session.user.lastName}
            </span>
            <Bell className="h-5 w-5" />
            <LogOut className="h-5 w-5" />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
