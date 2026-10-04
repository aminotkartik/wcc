"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Compass, CheckCircle2, FileText, ArrowRight, ShieldCheck } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/schemes", label: "Scheme Explorer" },
    { href: "/dashboard", label: "Assessment & Demo" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              CivicFlow <span className="text-brand-600 font-extrabold">AI</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-1">
              Eligibility Copilot
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
                    ? "bg-slate-100 text-brand-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Track Ready</span>
          </div>

          <Link
            href="/dashboard?demo=true"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm shadow-brand-500/25 hover:shadow-brand-500/40 transition-all active:scale-95"
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
    <footer className="border-t border-slate-200 bg-white py-10 mt-20 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
            CF
          </div>
          <span className="font-semibold text-slate-800">CivicFlow AI</span>
          <span className="text-slate-400">|</span>
          <span>From eligibility confusion to a clear action plan</span>
        </div>
        <p className="text-xs text-slate-400 text-center md:text-right">
          Informational assistant only. Always verify final eligibility requirements with official ministry portals.
        </p>
      </div>
    </footer>
  );
}
