"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Github,
  Instagram,
  Moon,
  Sun,
  Twitter,
  Youtube,
} from "lucide-react";

import { useTheme } from "./ThemeProvider";
import { useChatContext } from "@/components/chat/ChatContext";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "X (Twitter)", href: "https://x.com", icon: Twitter },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
];

function ThemeToggle() {
  const {
    isReady,
    theme,
    systemTheme,
    userPreference,
    toggleTheme,
    setThemePreference,
  } = useTheme();

  const Icon = theme === "dark" ? Sun : Moon;
  const toggleLabel =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  const helperMessage = !isReady
    ? "Loading theme preference..."
    : userPreference === "system"
      ? `Following system ${systemTheme} preference`
      : `Using ${userPreference} mode`;

  return (
    <div className="flex flex-col items-center gap-2 text-sm text-zinc-200 dark:text-zinc-300">
      <button
        type="button"
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-medium transition-colors hover:border-white/25 hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800/60 dark:hover:border-zinc-500 dark:hover:bg-zinc-700/80"
        onClick={toggleTheme}
        aria-label={toggleLabel}
        aria-pressed={theme === "dark"}
        disabled={!isReady}
      >
        <Icon
          aria-hidden="true"
          className="h-4 w-4 text-white transition group-hover:rotate-12 dark:text-zinc-100"
        />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white dark:text-zinc-100">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
      {!isReady || userPreference === "system" ? (
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {helperMessage}
        </span>
      ) : (
        <button
          type="button"
          className="text-xs text-zinc-400 cursor-pointer underline-offset-4 transition hover:text-white hover:underline dark:text-zinc-500 dark:hover:text-zinc-300"
          onClick={() => setThemePreference("system")}
        >
          Revert to system default
        </button>
      )}
    </div>
  );
}

export function SiteFooter() {
  const { openChat } = useChatContext();

  return (
    <footer className="bg-brand-dark pt-8 pb-16 text-zinc-300 transition-colors duration-300">
      <div className="container mx-auto flex flex-col items-center gap-10 px-6">
        <button
          onClick={openChat}
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white transition hover:opacity-90 dark:text-zinc-100 cursor-pointer"
          aria-label="Open chat"
        >
          <span className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full bg-white/10">
            <Image
              src="/irlogo.jpg"
              alt="Infinite Robots logo - click to chat"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </span>
        </button>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-4 text-sm font-medium text-zinc-200 sm:gap-x-10 dark:text-zinc-300">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white dark:hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ThemeToggle />

        <div className="flex items-center justify-center gap-5 text-zinc-200 dark:text-zinc-300">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition duration-200 hover:border-white/30 hover:bg-white/15 dark:border-zinc-700 dark:bg-zinc-800/70 dark:hover:border-zinc-500 dark:hover:bg-zinc-700"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-5 w-5 text-zinc-300 transition group-hover:text-white dark:text-zinc-200 dark:group-hover:text-zinc-100" />
            </a>
          ))}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Infinite Robots, LLC
        </p>
      </div>
    </footer>
  );
}
