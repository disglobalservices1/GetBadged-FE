import { Bell, ChevronDown, Mail, LogOut } from "lucide-react";
import { AppShellNav, type AppShellNavRole } from "./app-shell-nav";
import { DepartmentTopNav } from "./department-top-nav";
import { Logo } from "./logo";
import { getMockSession } from "@/lib/auth/mock-session";

type AppShellProps = {
  roleLabel: string;
  navRole: AppShellNavRole;
  children: React.ReactNode;
};

export function AppShell({ roleLabel, navRole, children }: AppShellProps) {
  const session = getMockSession(navRole === "department" ? "department_admin" : undefined);

  if (navRole === "department") {
    return (
      <div className="gb-app-shell grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-slate-50 lg:grid-cols-[clamp(200px,14vw,260px)_minmax(0,1fr)]">
        <header className="col-span-full grid min-h-[54px] grid-cols-[1fr_auto] items-center bg-[color:var(--navy)] text-white lg:grid-cols-[clamp(200px,14vw,260px)_auto_minmax(330px,1fr)_auto]">
          <div className="flex h-full min-w-0 items-center gap-2.5 border-r border-white/20 px-4 lg:px-5">
            <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md border-2 border-[color:var(--gold)] text-[11px] font-bold text-[color:var(--gold)]">GB</span>
            <span className="min-w-0 truncate text-[16px] font-bold leading-none tracking-normal">GetBadged</span>
          </div>
          <div className="hidden min-w-[218px] items-center gap-2.5 px-4 xl:flex">
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border-2 border-[color:var(--gold)] text-[10px] font-bold text-[color:var(--gold)]">AW</span>
            <span className="min-w-0 truncate text-[11px] font-semibold">Westview Police Department</span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/75" />
          </div>

          <DepartmentTopNav />

          <div className="flex min-w-0 items-center justify-end gap-2.5 px-4 lg:px-5 xl:px-6">
            <div className="lg:hidden [&_button]:border-white/30 [&_button]:text-white">
              <AppShellNav navRole={navRole} roleLabel={roleLabel} />
            </div>
            <a href="/department/messages" className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-white/95 transition hover:text-white xl:flex" aria-label="Messages">
              <Mail className="h-3.5 w-3.5" />
              <span>Messages</span>
            </a>
            <a href="/department/notifications" className="relative hidden text-white/95 transition hover:text-white lg:block" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1.5 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-red-600 px-1 text-[9px] font-extrabold leading-none text-white">5</span>
            </a>
            <div className="hidden items-center gap-2.5 lg:flex">
              <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-white/35 text-[10px] font-bold">AW</span>
              <span className="leading-tight">
                <span className="block whitespace-nowrap text-[11px] font-semibold">Angela Wilson</span>
                <span className="block text-[10px] font-medium text-white/75">Department Admin</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-white/75" />
            </div>
          </div>
        </header>

        <aside className="hidden min-h-0 overflow-y-auto border-r border-[color:var(--border-muted)] bg-white lg:grid lg:content-between">
          <div>
            <div className="px-4 pb-2 pt-4">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-[color:var(--blue-deep)]">{roleLabel}</p>
            </div>
            <AppShellNav navRole={navRole} roleLabel={roleLabel} />
          </div>
          <div className="m-3 rounded-md bg-blue-50 p-3 text-[10px] leading-4">
            <p className="font-bold text-[color:var(--blue-deep)]">Need support?</p>
            <p className="mt-1 text-[color:var(--blue-deep)]">We're happy to help.</p>
            <p className="mt-3 font-semibold text-[color:var(--navy)]">Call us at 781.645.6005</p>
            <p className="mt-1 font-semibold text-[color:var(--blue-deep)]">info@getbadged.com</p>
          </div>
        </aside>

        <main className="gb-app-shell-main min-h-0 min-w-0 overflow-y-auto p-3 sm:p-4">{children}</main>
      </div>
    );
  }

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
