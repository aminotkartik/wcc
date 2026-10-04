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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded stamp-badge bg-sand-200 border border-sand-300 text-warmcharcoal text-xs mb-2">
            <Compass className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Public Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-warmcharcoal tracking-tight font-sans">
            Scholarships, Fellowships & Welfare Schemes
          </h1>
          <p className="mt-1 text-warmcharcoal-light max-w-2xl text-xs sm:text-sm leading-relaxed">
            Verified database of educational scholarships, doctoral fellowships, livelihood grants, and state welfare programs.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="paper-card p-4 rounded-xl mb-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-sand-600 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by scholarship, institution type, field of study, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 paper-input rounded-lg text-xs focus:outline-none text-warmcharcoal"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 paper-input rounded-lg text-xs font-medium text-warmcharcoal focus:outline-none"
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
                className="px-3 py-2 paper-input rounded-lg text-xs font-medium text-warmcharcoal focus:outline-none"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    Jurisdiction: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-sand-800 border-t border-sand-200 pt-3">
            <span>
              Showing <strong className="text-warmcharcoal">{filteredPrograms.length}</strong> of {UNIVERSAL_PROGRAMS.length} verified programs
            </span>
            <Link
              href="/dashboard?demo=true"
              className="text-terracotta-700 font-semibold hover:underline flex items-center gap-1"
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
              className="paper-card rounded-xl p-5 flex flex-col justify-between hover:border-sand-400 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded stamp-badge bg-sand-200 text-warmcharcoal border border-sand-300">
                    {prog.type}
                  </span>
                  <span className="text-[11px] font-medium text-sand-700 bg-sand-100 px-2 py-0.5 rounded border border-sand-200 font-mono">
                    {prog.state}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-warmcharcoal hover:text-terracotta-700">
                  {prog.name}
                </h3>

                <p className="mt-1.5 text-xs text-warmcharcoal-light line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="mt-4 p-3 rounded-lg paper-card-subtle">
                  <span className="text-[10px] uppercase font-semibold text-sand-700 block">
                    Sanction / Grant Amount
                  </span>
                  <span className="text-xs font-semibold text-terracotta-800 mt-0.5 block">
                    {prog.benefitAmount}
                  </span>
                </div>

                <div className="mt-3 text-xs text-warmcharcoal-muted flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sand-600" />
                  <span>Requires {prog.requiredDocuments.length} verification documents</span>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-sand-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProgram(prog)}
                  className="text-xs font-medium text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
                >
                  <span>Criteria & Documents</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={prog.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sand-800 hover:text-warmcharcoal flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16 paper-card rounded-xl">
            <p className="text-xs text-warmcharcoal-muted">No programs matched your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedType("All");
                setSelectedState("All");
              }}
              className="mt-3 px-3 py-1.5 paper-card text-warmcharcoal font-medium text-xs rounded-md hover:bg-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmcharcoal/30 backdrop-blur-xs">
          <div className="paper-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3.5 border-b border-sand-200">
              <div>
                <span className="text-xs font-medium text-terracotta-700 uppercase tracking-wide">
                  {activeModalProgram.type} • {activeModalProgram.state}
                </span>
                <h3 className="text-lg font-bold text-warmcharcoal mt-0.5">
                  {activeModalProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-1 rounded-lg hover:bg-sand-200 text-warmcharcoal-muted hover:text-warmcharcoal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <h4 className="text-[10px] font-semibold uppercase text-sand-700 tracking-wider mb-1">
                  Program Summary
                </h4>
                <p className="text-warmcharcoal-light leading-relaxed">
                  {activeModalProgram.description}
                </p>
              </div>

              <div className="p-3 paper-card-subtle rounded-xl">
                <span className="text-[10px] font-semibold uppercase text-sand-700 tracking-wider block">
                  Benefit Package
                </span>
                <span className="text-xs font-bold text-terracotta-800 mt-0.5 block">
                  {activeModalProgram.benefitAmount}
                </span>
                <span className="text-warmcharcoal-muted mt-0.5 block">
                  {activeModalProgram.benefitDescription}
                </span>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold uppercase text-sand-700 tracking-wider mb-2">
                  Mandatory Eligibility Rules
                </h4>
                <ul className="space-y-1.5">
                  {activeModalProgram.eligibilityCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-warmcharcoal-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold uppercase text-sand-700 tracking-wider mb-2">
                  Required Application Documents
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalProgram.requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-lg paper-card-subtle">
                      <span className="font-semibold text-warmcharcoal">{doc.name}</span>
                      <p className="text-warmcharcoal-muted mt-0.5">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-sand-200 text-[11px] text-warmcharcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Provider: {activeModalProgram.provider}</span>
                <span>Verified: {activeModalProgram.lastVerifiedAt}</span>
              </div>
            </div>

            <div className="pt-3.5 border-t border-sand-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-warmcharcoal-light hover:bg-sand-200 rounded-lg"
              >
                Close
              </button>
              <a
                href={activeModalProgram.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 shadow-sm"
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
