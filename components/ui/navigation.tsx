"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, CheckCircle2, FileText, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/schemes", label: "Program Explorer" },
    { href: "/dashboard", label: "Eligibility Copilot & Demo" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-terracotta-700 via-terracotta-600 to-terracotta-500 flex items-center justify-center text-white shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-warmcharcoal group-hover:text-terracotta-700 transition-colors">
              CivicFlow <span className="text-terracotta-600 font-extrabold">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-700 -mt-1">
              Public Benefits & Opportunities
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sand-200 text-terracotta-800 font-semibold"
                    : "text-warmcharcoal-light hover:text-warmcharcoal hover:bg-sand-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amberwarm-100 border border-amberwarm-200 text-amberwarm-900 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amberwarm-700" />
            <span>Groq-Powered Copilot</span>
          </div>

          <Link
            href="/dashboard?demo=true"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-semibold shadow-sm shadow-terracotta-500/25 hover:shadow-terracotta-500/40 transition-all active:scale-95"
          >
            <span>Try Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-100 py-10 mt-20 text-sm text-sand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-terracotta-600 text-white flex items-center justify-center text-xs font-bold">
            CF
          </div>
          <span className="font-semibold text-warmcharcoal">CivicFlow AI</span>
          <span className="text-sand-400">|</span>
          <span>From eligibility confusion to a clear action plan</span>
        </div>
        <p className="text-xs text-sand-700 text-center md:text-right">
          Informational assistant for scholarships, grants, fellowships, and welfare schemes. Always verify final requirements with official program portals.
        </p>
      </div>
    </footer>
  );
}
