import Image from "next/image";
import Link from "next/link";

import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react";

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

export function SiteFooter() {
  return (
    <footer className="bg-[#0e131b] py-14 text-zinc-400">
      <div className="container mx-auto flex flex-col items-center gap-10 px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white transition hover:opacity-90"
        >
          <span className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full bg-white/10">
            <Image
              src="/irlogo.jpg"
              alt="Infinite Robots logo"
              fill
              sizes="256px"
              className="object-cover"
              priority
            />
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium text-zinc-200">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-5 text-zinc-200">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition duration-200 hover:border-zinc-600 hover:bg-zinc-800"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-5 w-5 text-zinc-400 transition group-hover:text-white" />
            </a>
          ))}
        </div>

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Infinite Robots, LLC
        </p>
      </div>
    </footer>
  );
}
