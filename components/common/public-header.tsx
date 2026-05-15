import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function PublicHeader() {
  return (
    <header className="border-b border-[color:var(--border-muted)] bg-white">
      <div className="mx-auto flex min-h-20 max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="/" aria-label="GetBadged home">
          <Logo />
        </a>
        <nav className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-[color:var(--navy)] md:order-2 md:w-auto md:gap-8">
          <a href="/jobs">For Candidates</a>
          <a href="/departments">For Departments</a>
          <a href="/resources">Resources</a>
          <a href="/about">About Us</a>
        </nav>
        <div className="order-2 flex items-center gap-3 md:order-3">
          <Search className="hidden h-5 w-5 text-[color:var(--navy)] sm:block" />
          <a className="hidden text-sm font-semibold text-[color:var(--navy)] sm:inline" href="/auth/login">
            Sign In
          </a>
          <Button href="/auth/signup/candidate">Apply Now</Button>
        </div>
      </div>
    </header>
  );
}
