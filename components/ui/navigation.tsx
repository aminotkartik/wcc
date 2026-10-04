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
    <header className="sticky top-0 z-50 border-b-2 border-manga-ink bg-[#fcfaf6]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-manga-ink flex items-center justify-center text-white border-1.5 border-manga-ink shadow-manga-sm group-hover:bg-manga-vermilion transition-colors">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-base tracking-tight text-manga-ink">
              CivicFlow <span className="text-manga-vermilion font-mono">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-manga-ink font-mono font-bold -mt-1">
              Public Benefit Copilot
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-mono ${
                  isActive
                    ? "bg-manga-ink text-white shadow-manga-sm"
                    : "text-manga-ink hover:bg-manga-parchment border border-transparent hover:border-manga-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded stamp-badge bg-white border border-manga-ink text-manga-ink text-xs font-mono font-bold shadow-manga-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-manga-vermilion" />
            <span>Deterministic Grounding</span>
          </div>

          <Link
            href="/dashboard?demo=true"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-manga-vermilion hover:bg-manga-vermiliondark text-white text-xs font-bold border-1.5 border-manga-ink shadow-manga-sm transition-all active:translate-x-[1px] active:translate-y-[1px]"
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
    <footer className="border-t-2 border-manga-ink bg-manga-parchment py-10 mt-20 text-xs text-manga-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-manga-ink">CivicFlow AI</span>
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
