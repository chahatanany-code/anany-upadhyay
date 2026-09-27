"use client";

import React from "react";
import { socialLinks } from "@/data/social";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#050608] py-16 px-6 sm:px-12 max-w-7xl mx-auto z-10 text-zinc-500 font-mono text-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        {/* Left Identity */}
        <div>
          <h3 className="text-xl font-black tracking-tight text-white mb-1">
            ANANY KUMAR UPADHYAY
          </h3>
          <p className="text-xs text-[#00f0ff] tracking-wider uppercase">
            CSE • AI/ML • SRMIST DELHI NCR
          </p>
        </div>

        {/* Center Social Links */}
        <div className="flex flex-wrap items-center gap-6">
          {socialLinks.map((soc) => (
            <a
              key={soc.name}
              href={soc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#00f0ff] transition-colors"
              data-cursor="link"
            >
              {soc.name} ↗
            </a>
          ))}
        </div>

        {/* Back to top magnetic button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 transition-all group"
          data-cursor="view"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#00f0ff] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
        <div>© {currentYear} ANANY KUMAR UPADHYAY. ALL RIGHTS RESERVED.</div>
        <div className="text-zinc-400 font-medium">
          BUILT WITH REACT, GSAP & CURIOSITY.
        </div>
      </div>
    </footer>
  );
}
