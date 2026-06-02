import { PublicFooterColumns } from "@/components/public/home-page";

export function PublicFooter() {
  return (
    <footer className="bg-[color:var(--navy)] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_3fr_auto] lg:px-8">
        <div>
          <a href="/" className="flex items-center gap-3">
            <img src="/images/getbadged-mark.png" alt="" className="h-9 w-9 object-contain" />
            <span className="text-[26px] font-black tracking-[-0.04em] text-white">GetBadged</span>
          </a>
          <p className="mt-4 max-w-[220px] text-[13px] leading-6 text-white/70">
            The two-way consent marketplace for law enforcement and public safety. Building stronger communities through better connections.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <PublicFooterColumns />
        </div>

        <div className="grid content-start gap-4">
          <h4 className="text-[11px] font-black uppercase tracking-[0.08em] text-white">Follow Us</h4>
          <div className="flex items-center gap-3">
            <a href="/" className="grid h-9 w-9 place-items-center rounded border border-white/20 text-white/80 transition hover:text-white">
              <LinkedInMark />
            </a>
            <a href="/" className="grid h-9 w-9 place-items-center rounded border border-white/20 text-white/80 transition hover:text-white">
              <InstagramMark />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-4 py-4 text-[11px] text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>© 2025 GetBadged. All rights reserved.</span>
          <span>Connecting those who get it, with those who got it.</span>
        </div>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46 2.48 2.48 0 0 1 4.98 3.5ZM3 9h4v12H3zm7 0h3.83v1.64h.05c.53-1 1.84-2.05 3.8-2.05 4.07 0 4.82 2.68 4.82 6.16V21h-4v-5.53c0-1.32-.03-3.01-1.84-3.01-1.85 0-2.13 1.44-2.13 2.92V21h-4z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  );
}
