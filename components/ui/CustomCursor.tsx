"use client";

import React, { useEffect, useRef, useState } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "button" | "project" | "link">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isTouchDevice() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect hovered target for interactive states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const isProject = target.closest("[data-cursor='project']") || target.closest(".project-card");
      const isExternalLink = target.closest("a[target='_blank']") || target.closest("[data-cursor='link']");
      const isButton = target.closest("button") || target.closest("a");

      if (cursorAttr === "explore" || isProject) {
        setCursorVariant("project");
        setCursorText("EXPLORE");
      } else if (cursorAttr === "view" || (isButton && !isExternalLink)) {
        setCursorVariant("button");
        setCursorText("VIEW");
      } else if (isExternalLink) {
        setCursorVariant("link");
        setCursorText("↗");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth render loop
    const render = () => {
      // Ring follows mouse with smooth lerp interpolation
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isClient) return null;

  return (
    <div
      className={`custom-cursor pointer-events-none fixed inset-0 z-[999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Central micro-dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
      />

      {/* Expanding Outer Ring with Label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-200 ${
          cursorVariant === "project"
            ? "w-20 h-20 bg-[#00f0ff]/15 border-[#00f0ff] backdrop-blur-xs scale-100"
            : cursorVariant === "button"
            ? "w-14 h-14 bg-white/10 border-white/40 scale-100"
            : cursorVariant === "link"
            ? "w-12 h-12 bg-[#38bdf8]/15 border-[#38bdf8] scale-100"
            : "w-8 h-8 border-white/20 scale-100"
        }`}
      >
        {cursorText && (
          <span
            className={`font-mono font-bold tracking-wider select-none text-[10px] ${
              cursorVariant === "project"
                ? "text-[#00f0ff]"
                : cursorVariant === "link"
                ? "text-[#38bdf8] text-xs"
                : "text-white"
            }`}
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
