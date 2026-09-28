"use client";

import { type ReactNode, useEffect, useRef } from "react";

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/**
 * Wraps a robot scene: pauses its CSS animations while offscreen and,
 * on fine-pointer devices, lets the robots' eyes follow the cursor.
 */
export function SceneMotion({
  children,
  className,
  trackPointer = false,
}: {
  children: ReactNode;
  className?: string;
  trackPointer?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !trackPointer) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const apply = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const x = (pointer.x - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (pointer.y - (rect.top + rect.height * 0.45)) / rect.height;
      element.style.setProperty("--look-x", clamp(x).toFixed(3));
      element.style.setProperty("--look-y", clamp(y * 2).toFixed(3));
    };

    const handleMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [trackPointer]);

  return (
    <div ref={ref} className={`ir-scene ${className ?? ""}`}>
      {children}
    </div>
  );
}
