import { Logo } from "./logo";

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border-muted)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <Logo />
        <div className="flex flex-wrap gap-5">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
