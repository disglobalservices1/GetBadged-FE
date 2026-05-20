"use client";

import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Logo } from "./logo";

const navItems = [
  { href: "/jobs", label: "For Candidates" },
  { href: "/departments", label: "For Departments" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About Us" }
];

export function PublicHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-[color:var(--border-muted)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 py-4">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color:var(--border)] text-[color:var(--navy)] transition hover:bg-blue-50 lg:hidden"
              aria-label={isMenuOpen ? "Close public navigation" : "Open public navigation"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <a href="/" aria-label="GetBadged home">
              <Logo />
            </a>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[color:var(--navy)] lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 transition hover:bg-blue-50 hover:text-[color:var(--blue)]",
                    isActive && "bg-blue-50 text-[color:var(--blue)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Search className="hidden h-5 w-5 text-[color:var(--navy)] sm:block" />
            <a className="hidden text-sm font-semibold text-[color:var(--navy)] sm:inline" href="/auth/login">
              Sign In
            </a>
            <Button href="/auth/signup/candidate">Apply Now</Button>
          </div>
        </div>
      </div>

      <div
        className={cn("fixed inset-0 z-50 lg:hidden", isMenuOpen ? "pointer-events-auto" : "pointer-events-none")}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          className={cn(
            "absolute inset-0 bg-slate-950/40 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          className={cn(
            "relative grid h-full w-[min(320px,86vw)] content-start bg-white shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-[color:var(--border-muted)] p-5">
            <div>
              <Logo />
              <p className="mt-4 text-xs font-bold uppercase text-slate-500">Public</p>
            </div>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--border-muted)] text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="grid gap-1 p-4 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "relative flex items-center rounded-md px-3 py-2.5 text-slate-700 transition-[background-color,color,transform] duration-200 ease-out hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)] motion-reduce:transition-none",
                    isActive && "bg-blue-50 text-[color:var(--blue-deep)]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute bottom-2 left-0 top-2 w-1 origin-center rounded-r-full bg-[color:var(--blue-deep)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                      isActive ? "scale-y-100 opacity-100" : "scale-y-50 opacity-0"
                    )}
                  />
                  {item.label}
                </a>
              );
            })}
            <a
              href="/auth/login"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex items-center rounded-md px-3 py-2.5 text-slate-700 transition-[background-color,color,transform] duration-200 ease-out hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--navy)] sm:hidden"
            >
              Sign In
            </a>
          </nav>
        </aside>
      </div>
    </header>
  );
}
