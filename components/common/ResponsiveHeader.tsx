"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { useChatContext } from "@/components/chat/ChatContext";

const NAV_ITEMS = [
  { href: "/", label: "Home", showDesktop: false },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function ResponsiveHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavId = useId();
  const pathname = usePathname();
  const { toggleChat, hasNotification, isOpen, closeChat } = useChatContext();

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
    <header className="sticky top-0 z-50 bg-brand-dark">
      <div className="container mx-auto flex h-16 items-stretch justify-between pl-3 pr-6">
        <div className="flex h-full items-center gap-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleChat();
              setMobileOpen(false);
            }}
            className="relative h-full w-16 shrink-0 cursor-pointer overflow-hidden transition-opacity hover:opacity-90 focus:outline-none focus:ring-0 active:outline-none"
            style={{ outline: "none" }}
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Open chat"
          >
            <Image
              src="/irlogo.jpg"
              alt="Infinite Robots logo - click to chat"
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
            {hasNotification && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 ring-2 ring-brand-dark">
                <span className="h-2 w-2 rounded-full bg-white"></span>
              </span>
            )}
          </button>
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-white transition-colors hover:text-zinc-200"
            onClick={() => setMobileOpen(false)}
          >
            Infinite Robots
          </Link>
          {/* Close chat button - only show when chat is open */}
          {isOpen && (
            <button
              onClick={(e) => {
                e.preventDefault();
                closeChat();
                setMobileOpen(false);
              }}
              className="ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-white/80 transition-all hover:bg-white/20 hover:text-white active:scale-95"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="hidden items-center gap-8 py-4 text-sm font-medium text-zinc-200 md:flex">
          {NAV_ITEMS.filter((item) => item.showDesktop !== false).map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold text-base transition-colors ${
                  pathname === item.href
                    ? "text-white"
                    : "text-zinc-200 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2 text-base font-bold text-white transition-colors hover:bg-brand-strong"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          className="my-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-white/20 text-zinc-100 transition-colors hover:border-white/40 hover:text-white md:hidden"
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
        className={`absolute inset-x-0 top-full z-40 origin-top transform border-y border-white/10 bg-brand-dark pb-6 pt-4 shadow-lg transition-all duration-200 ease-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        id={mobileNavId}
      >
        <div className="container mx-auto px-6">
          <nav className="flex flex-col items-end gap-4 text-base font-medium text-zinc-100 text-right">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href
                    ? "text-brand"
                    : "text-zinc-100 hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                aria-hidden={!mobileOpen}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
