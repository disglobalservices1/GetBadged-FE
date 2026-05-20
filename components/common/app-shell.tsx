import { Bell, LogOut } from "lucide-react";
import { AppShellNav, type AppShellNavRole } from "./app-shell-nav";
import { Logo } from "./logo";
import { getMockSession } from "@/lib/auth/mock-session";

type AppShellProps = {
  roleLabel: string;
  navRole: AppShellNavRole;
  children: React.ReactNode;
};

export function AppShell({ roleLabel, navRole, children }: AppShellProps) {
  const session = getMockSession();

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
