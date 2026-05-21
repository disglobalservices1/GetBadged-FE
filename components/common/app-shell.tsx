import { Bell, ChevronDown, LogOut, Mail } from "lucide-react";
import { AppShellNav, type AppShellNavRole } from "./app-shell-nav";
import { Logo } from "./logo";
import { getMockSession } from "@/lib/auth/mock-session";
import { cn } from "@/lib/utils/cn";

type AppShellProps = {
  roleLabel: string;
  navRole: AppShellNavRole;
  children: React.ReactNode;
};

export function AppShell({ roleLabel, navRole, children }: AppShellProps) {
  const session = getMockSession();

  if (navRole === "candidate") {
    return (
      <div className="gb-app-shell grid min-h-screen bg-white">
        <header className="gb-app-shell-header flex h-[70px] items-center justify-between bg-[#001b3f] px-6 text-white shadow-sm">
          <a href="/" className="flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)] focus:ring-offset-2 focus:ring-offset-[#001b3f]" aria-label="GetBadged home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/getbadged-mark.png" alt="" className="h-11 w-11 object-contain" />
            <span className="text-[22px] font-extrabold tracking-normal">GetBadged</span>
          </a>

          <nav className="hidden items-center gap-7 text-[11px] font-bold xl:flex">
            <div className="flex items-center rounded-md border border-white/30 p-0.5">
              {[
                { label: "Public", href: "/" },
                { label: "Candidate", href: "/candidate" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded px-5 py-2 text-white/90 transition-colors hover:bg-white/10",
                    item.label === "Candidate" && "bg-[color:var(--gold)] text-[#071739] hover:bg-[color:var(--gold)]"
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
                className="rounded px-1 py-2 text-white/90 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-7 text-[11px] font-bold">
            <a href="/candidate/messages" className="hidden items-center gap-2 text-white/90 lg:flex">
              <Mail className="h-6 w-6" />
              Messages
            </a>
            <a href="/candidate/notifications" className="hidden items-center text-white/90 lg:flex" aria-label="Notifications">
              <span className="relative inline-flex">
                <Bell className="h-6 w-6" />
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] leading-none text-white">2</span>
              </span>
            </a>
            <button type="button" className="flex items-center gap-3 text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-sm font-bold">JS</span>
              <span className="hidden leading-tight md:grid">
                <span>{session.user.firstName} {session.user.lastName}</span>
                <span className="text-[10px] text-white/80">Candidate</span>
              </span>
              <ChevronDown className="h-5 w-5 text-white/80" />
            </button>
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-70px)] lg:grid-cols-[207px_1fr]">
          <aside className="gb-app-shell-sidebar hidden border-r border-[color:var(--border-muted)] bg-white lg:block">
            <AppShellNav navRole={navRole} roleLabel={roleLabel} />
          </aside>
          <main className="gb-app-shell-main min-w-0 bg-white p-6 lg:p-8">{children}</main>
        </div>
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
