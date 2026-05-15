import { Logo } from "./logo";

export function PublicFooter() {
  return (
    <footer className="mt-auto bg-[color:var(--navy)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <Logo inverted />
        <div className="flex flex-wrap gap-5 text-white/80">
          <a href="/jobs">For Candidates</a>
          <a href="/departments">For Departments</a>
          <a href="/resources">Resources</a>
          <a href="/about">About Us</a>
        </div>
        <div className="flex flex-wrap gap-5 text-white/70">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-white/10 px-6 py-4 text-xs text-white/70">
        <span>© 2025 GetBadged. All rights reserved.</span>
        <span className="font-bold text-[color:var(--gold)]">getbadged.com</span>
      </div>
    </footer>
  );
}
