"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/ui/navigation";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";
import { UniversalProgram } from "@/lib/types";
import { Search, ExternalLink, FileText, CheckCircle2, ChevronRight, X, GraduationCap, Compass } from "lucide-react";
import Link from "next/link";

export default function SchemesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [activeModalProgram, setActiveModalProgram] = useState<UniversalProgram | null>(null);

  const types = ["All", "Scholarship", "Fellowship", "Grant", "Subsidy", "Welfare Scheme", "Skill Program", "Entrepreneurship"];
  const states = ["All", "All India", "Maharashtra", "Karnataka"];

  const filteredPrograms = UNIVERSAL_PROGRAMS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.targetUsers.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === "All" || p.type.toLowerCase() === selectedType.toLowerCase();
    const matchesState = selectedState === "All" || p.state === selectedState || (selectedState !== "All" && p.state === "All India");

    return matchesSearch && matchesType && matchesState;
  });

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded stamp-badge bg-manga-parchment border border-manga-ink text-manga-ink text-xs mb-2 font-mono font-bold shadow-manga-sm">
            <Compass className="w-3.5 h-3.5 text-manga-vermilion" />
            <span>ARCHIVE DIRECTORY // PUBLIC PROGRAMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-manga-ink tracking-tight font-sans">
            Scholarships, Fellowships & Welfare Schemes
          </h1>
          <p className="mt-1 text-warmcharcoal-light max-w-2xl text-xs sm:text-sm leading-relaxed">
            Verified database of educational scholarships, doctoral fellowships, livelihood grants, and state welfare programs.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="paper-card p-4 rounded-xl mb-8 space-y-3.5 bg-white border-1.5 border-manga-ink shadow-manga">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-warmcharcoal-muted absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by scholarship, institution type, field of study, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 paper-input rounded-lg text-xs focus:outline-none text-manga-ink font-medium"
              />
            </div>

            <div className="flex gap-2 font-mono">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 paper-input rounded-lg text-xs font-bold text-manga-ink focus:outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    Category: {t}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 paper-input rounded-lg text-xs font-bold text-manga-ink focus:outline-none"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    Jurisdiction: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-manga-ink border-t-1.5 border-manga-ink pt-3 font-mono">
            <span>
              Showing <strong className="font-black text-manga-vermilion">{filteredPrograms.length}</strong> of {UNIVERSAL_PROGRAMS.length} verified programs
            </span>
            <Link
              href="/dashboard?demo=true"
              className="text-manga-ink hover:text-manga-vermilion font-bold underline flex items-center gap-1 uppercase"
            >
              <span>Audit profile against all records</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="paper-card rounded-xl p-5 flex flex-col justify-between bg-white border-1.5 border-manga-ink shadow-manga-sm hover:shadow-manga hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5 font-mono">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded stamp-badge bg-manga-parchment text-manga-ink border border-manga-ink">
                    {prog.type}
                  </span>
                  <span className="text-[11px] font-bold text-sand-700 bg-sand-100 px-2 py-0.5 rounded border border-sand-300">
                    {prog.state}
                  </span>
                </div>

                <h3 className="text-sm font-black text-manga-ink hover:text-manga-vermilion">
                  {prog.name}
                </h3>

                <p className="mt-1.5 text-xs text-warmcharcoal-light line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="mt-4 p-3 rounded-lg paper-card-subtle border border-manga-ink bg-manga-parchment/60 font-mono">
                  <span className="text-[10px] uppercase font-bold text-warmcharcoal-muted block">
                    Sanction / Grant Amount
                  </span>
                  <span className="text-xs font-black text-manga-vermilion mt-0.5 block">
                    {prog.benefitAmount}
                  </span>
                </div>

                <div className="mt-3 text-xs text-warmcharcoal-muted flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-manga-vermilion" />
                  <span>Requires {prog.requiredDocuments.length} verification documents</span>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-sand-300 flex items-center justify-between font-mono">
                <button
                  onClick={() => setActiveModalProgram(prog)}
                  className="text-xs font-bold text-manga-ink hover:text-manga-vermilion flex items-center gap-1 uppercase"
                >
                  <span>Criteria & Documents</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={prog.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-manga-ink hover:text-manga-vermilion underline flex items-center gap-1 font-bold"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16 paper-card rounded-xl border-1.5 border-manga-ink bg-white font-mono">
            <p className="text-xs text-warmcharcoal-muted">No programs matched your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedType("All");
                setSelectedState("All");
              }}
              className="mt-3 px-3 py-1.5 bg-manga-ink text-white font-bold text-xs rounded-md shadow-manga-sm uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-manga-ink/40 backdrop-blur-xs">
          <div className="paper-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-manga-lg border-2 border-manga-ink bg-white animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3.5 border-b-1.5 border-manga-ink">
              <div>
                <span className="text-xs font-bold text-manga-vermilion uppercase font-mono">
                  {activeModalProgram.type} • {activeModalProgram.state}
                </span>
                <h3 className="text-lg font-black text-manga-ink mt-0.5">
                  {activeModalProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-1 rounded-lg hover:bg-manga-parchment text-manga-ink border border-manga-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs font-sans">
              <div>
                <h4 className="text-[10px] font-bold uppercase text-warmcharcoal-muted tracking-wider mb-1 font-mono">
                  Program Summary
                </h4>
                <p className="text-warmcharcoal-light leading-relaxed">
                  {activeModalProgram.description}
                </p>
              </div>

              <div className="p-3 paper-card-subtle rounded-xl border border-manga-ink bg-manga-parchment">
                <span className="text-[10px] font-bold uppercase text-warmcharcoal-muted tracking-wider block font-mono">
                  Benefit Package
                </span>
                <span className="text-xs font-black text-manga-vermilion mt-0.5 block font-mono">
                  {activeModalProgram.benefitAmount}
                </span>
                <span className="text-warmcharcoal-muted mt-0.5 block">
                  {activeModalProgram.benefitDescription}
                </span>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase text-warmcharcoal-muted tracking-wider mb-2 font-mono">
                  Mandatory Eligibility Rules
                </h4>
                <ul className="space-y-1.5">
                  {activeModalProgram.eligibilityCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-warmcharcoal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase text-warmcharcoal-muted tracking-wider mb-2 font-mono">
                  Required Application Documents
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalProgram.requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-lg paper-card-subtle border border-manga-ink bg-white">
                      <span className="font-bold text-manga-ink">{doc.name}</span>
                      <p className="text-warmcharcoal-muted mt-0.5">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t-1.5 border-manga-ink text-[11px] text-warmcharcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
                <span>Provider: {activeModalProgram.provider}</span>
                <span>Verified: {activeModalProgram.lastVerifiedAt}</span>
              </div>
            </div>

            <div className="pt-3.5 border-t-1.5 border-manga-ink flex items-center justify-end gap-2.5 font-mono">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-3.5 py-1.5 text-xs font-bold text-manga-ink hover:bg-manga-parchment rounded-lg border border-manga-ink uppercase"
              >
                Close
              </button>
              <a
                href={activeModalProgram.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-manga-vermilion hover:bg-manga-vermiliondark text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-manga-sm border-1.5 border-manga-ink uppercase"
              >
                <span>Authorized Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
