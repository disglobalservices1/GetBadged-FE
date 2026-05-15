import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function PublicHeader() {
  return (
    <header className="border-b border-[color:var(--border-muted)] bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-[color:var(--navy)] md:flex">
          <a href="/jobs">For Candidates</a>
          <a href="/departments">For Departments</a>
          <a href="/resources">Resources</a>
          <a href="/about">About Us</a>
        </nav>
        <div className="flex items-center gap-3">
          <Search className="hidden h-5 w-5 text-[color:var(--navy)] sm:block" />
          <Button href="/auth/login">Apply Now</Button>
        </div>
      </div>
    </header>
  );
}
