"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Overview" },
    { href: "/schemes", label: "Program Directory" },
    { href: "/dashboard", label: "Eligibility Copilot" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sand-300/70 bg-[#fbf9f5]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-terracotta-700 flex items-center justify-center text-white shadow-sm group-hover:bg-terracotta-800 transition-colors">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base tracking-tight text-warmcharcoal">
              CivicFlow <span className="text-terracotta-700 font-bold">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-sand-700 -mt-1 font-mono">
              Public Benefit Copilot
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
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-sand-200/80 text-warmcharcoal font-semibold border border-sand-300"
                    : "text-warmcharcoal-light hover:text-warmcharcoal hover:bg-sand-100/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded stamp-badge bg-sand-200/80 border border-sand-300 text-warmcharcoal text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Deterministic Grounding</span>
          </div>

          <Link
            href="/dashboard?demo=true"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-medium shadow-sm transition-all active:scale-95"
          >
            <span>Fast Track Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-sand-300/80 bg-sand-100/60 py-10 mt-20 text-xs text-sand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-warmcharcoal">CivicFlow AI</span>
          <span className="text-sand-400">|</span>
          <span>From eligibility confusion to a clear action plan</span>
        </div>
        <p className="text-sand-700 text-center md:text-right">
          Informational guidance for public programs, scholarships, and grants. Confirm specific criteria with authorized ministry gazettes.
        </p>
      </div>
    </footer>
  );
}
