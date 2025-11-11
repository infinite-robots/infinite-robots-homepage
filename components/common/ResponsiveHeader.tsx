"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const NAV_ITEMS = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function ResponsiveHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#hero"
          className="text-lg font-semibold tracking-tight text-zinc-900"
          onClick={() => setMobileOpen(false)}
        >
          Infinite Robots
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-700 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-950"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-[#1F3A93] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#172b6d]"
          >
            Book a Consultation
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-zinc-200 text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls={mobileNavId}
        >
          {mobileOpen ? (
            <X aria-hidden="true" className="h-5 w-5" focusable="false" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" focusable="false" />
          )}
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-full z-40 origin-top transform border-t border-zinc-200 bg-white px-6 pb-6 pt-4 shadow-lg transition-all duration-200 ease-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        id={mobileNavId}
      >
        <nav className="flex flex-col gap-4 text-base font-medium text-zinc-800">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-950"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              aria-hidden={!mobileOpen}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="rounded-full bg-[#1F3A93] px-5 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#172b6d]"
            onClick={() => setMobileOpen(false)}
            tabIndex={mobileOpen ? 0 : -1}
            aria-hidden={!mobileOpen}
          >
            Book a Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
