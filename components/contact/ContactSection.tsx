"use client";

import React, { useState } from "react";
import { socialLinks } from "@/data/social";
import { ArrowUpRight, Copy, Check, Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const emailSocial = socialLinks.find((s) => s.icon === "mail") || {
    handle: "chahatanany@gmail.com",
    url: "mailto:chahatanany@gmail.com",
  };
  const linkedinSocial = socialLinks.find((s) => s.icon === "linkedin");
  const githubSocial = socialLinks.find((s) => s.icon === "github");

  const copyEmail = () => {
    navigator.clipboard.writeText(emailSocial.handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 sm:px-12 max-w-7xl mx-auto z-10"
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
        <span className="text-[#00f0ff]">08 //</span>
        <span>GET IN TOUCH</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading, Subheading & Direct Links */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f0ff] to-cyan-300">
                SOMETHING.
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 font-light max-w-xl">
              Have an idea, project, opportunity or simply want to talk tech? Whether it is neural
              networks, web performance, or athletic conditioning—my inbox is always open.
            </p>
          </div>

          {/* Social Action Cards */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            {/* LinkedIn */}
            {linkedinSocial && (
              <a
                href={linkedinSocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[#0d1117] hover:bg-[#141b24] border border-white/10 hover:border-[#00f0ff]/50 text-white transition-all duration-300 group shadow-lg flex-1 min-w-[200px]"
                data-cursor="link"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
                    <LinkedInIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-zinc-500 uppercase">NETWORK</span>
                    <span className="font-bold text-sm text-white group-hover:text-[#00f0ff] transition-colors">
                      LINKEDIN
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {/* GitHub */}
            {githubSocial && (
              <a
                href={githubSocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[#0d1117] hover:bg-[#141b24] border border-white/10 hover:border-[#00f0ff]/50 text-white transition-all duration-300 group shadow-lg flex-1 min-w-[200px]"
                data-cursor="link"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-white">
                    <GitHubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-zinc-500 uppercase">REPOSITORIES</span>
                    <span className="font-bold text-sm text-white group-hover:text-[#00f0ff] transition-colors">
                      GITHUB
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>

          {/* Email Copy Card */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">DIRECT EMAIL</span>
                <a
                  href={emailSocial.url}
                  className="font-mono text-sm text-white hover:text-[#00f0ff] transition-colors"
                >
                  {emailSocial.handle}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
                data-cursor="view"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <a
                href={emailSocial.url}
                className="px-4 py-2 rounded-xl bg-[#00f0ff] text-[#07080a] text-xs font-mono font-bold hover:shadow-[0_0_15px_#00f0ff] transition-all"
                data-cursor="view"
              >
                OPEN MAIL
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Instant Message Form */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0a0d13] border border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-white/10 pb-4 mb-6">
            <span className="text-[#00f0ff]">DIRECT DISPATCH PROTOCOL</span>
            <span>SECURE_ENCRYPTION</span>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">DISPATCH INITIATED</h3>
              <p className="text-xs text-zinc-400 font-mono max-w-sm mx-auto">
                Thank you for reaching out. You can also connect directly on LinkedIn or write to{" "}
                <span className="text-[#00f0ff]">{emailSocial.handle}</span>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-mono text-zinc-500 hover:text-white underline pt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-[#00f0ff] focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-[#00f0ff] focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                  MESSAGE / TECH PROPOSAL
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, idea, or challenge..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-[#00f0ff] focus:outline-none transition-all font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#00f0ff] text-[#07080a] font-bold text-xs font-mono uppercase tracking-widest hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all flex items-center justify-center gap-2 mt-4"
                data-cursor="view"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
