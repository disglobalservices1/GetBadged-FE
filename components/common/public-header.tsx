"use client";

import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { PublicHeaderNavItems } from "@/components/public/home-page";

export function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#9f8250]/38 bg-[#071126]">
      <div className="flex w-full items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-7">
        <div className="flex min-w-0 items-center gap-6">
          <a href="/" className="flex items-center gap-3.5">
            <BrandMark />
            <span className="text-[26px] font-black tracking-[-0.05em] text-white">GetBadged</span>
          </a>
          <div className="hidden h-8 w-px bg-[#6d7890]/38 lg:block" />
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          <PublicHeaderNavItems />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-white/25 px-5 text-[13px] font-semibold text-white transition hover:bg-white/8"
          >
            Sign In
          </a>
          <a
            href="/auth/signup/candidate"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[color:var(--gold)] px-7 text-[13px] font-bold text-[color:var(--navy)] transition hover:brightness-95"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white lg:hidden"
          aria-label={isMenuOpen ? "Close public navigation" : "Open public navigation"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[#6d7890]/22 bg-[#071126] lg:hidden">
          <div className="grid gap-4 px-4 py-5 sm:px-6">
            <div className="grid gap-4">
              <PublicHeaderNavItems />
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-4 text-[13px] font-semibold text-white"
              >
                Sign In
              </a>
              <a
                href="/auth/signup/candidate"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-[color:var(--gold)] px-5 text-[13px] font-bold text-[color:var(--navy)]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function BrandMark() {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center text-[color:var(--gold)]">
      <Shield className="absolute h-full w-full stroke-[1.8]" />
      <span className="relative text-[17px] font-black leading-none">GB</span>
    </span>
  );
}
