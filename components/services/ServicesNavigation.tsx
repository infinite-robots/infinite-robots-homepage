"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type ServicesNavItem = {
  id: string;
  label: string;
};

const SCROLL_OFFSET = 160;

export function ServicesNavigation({ items }: { items: ServicesNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && itemIds.includes(hash)) {
      // Initialize activeId from URL hash on mount - this is intentional
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveId(hash);
    }
  }, [itemIds]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    let ticking = false;

    const findActiveId = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET;
      let currentId = items[0]?.id ?? "";

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) {
          continue;
        }

        if (scrollPosition >= element.offsetTop) {
          currentId = item.id;
        } else {
          break;
        }
      }

      return currentId;
    };

    const updateActiveId = () => {
      const nextId = findActiveId();
      setActiveId((previousId) =>
        previousId === nextId ? previousId : nextId,
      );
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveId();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize activeId on mount - this is intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateActiveId();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-16 z-30 bg-zinc-50 dark:bg-white/5 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <nav className="grid w-full gap-2 py-2 text-sm font-semibold hidden md:grid-cols-2 lg:flex lg:justify-center lg:gap-1.5">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`w-full whitespace-nowrap rounded-md px-3 py-1.5 text-center transition-colors lg:w-auto lg:rounded-none ${
                  isActive
                    ? "text-brand-strong dark:text-brand font-bold"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
