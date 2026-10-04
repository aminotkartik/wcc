"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/ui/navigation";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";
import { UniversalProgram } from "@/lib/types";
import { Search, Filter, ExternalLink, FileText, CheckCircle2, ChevronRight, X, Sparkles, Building, Coins } from "lucide-react";
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberwarm-100 border border-amberwarm-200 text-amberwarm-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Universal Opportunity Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-warmcharcoal tracking-tight">
            Explore Scholarships, Grants, Subsidies & Schemes
          </h1>
          <p className="mt-2 text-warmcharcoal-light max-w-2xl text-sm">
            Browse verified public programs across education, technical skills, agriculture, startup support, and welfare. Filter by category, location, or search keywords.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-sand-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-warmcharcoal-muted absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by keyword, degree, business type, or ministry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-sand-50 border border-sand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white transition-all text-warmcharcoal"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-xs font-medium text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    Type: {t}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-xs font-medium text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    Jurisdiction: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-sand-800 border-t border-sand-100 pt-3">
            <span>
              Showing <strong className="text-warmcharcoal">{filteredPrograms.length}</strong> of {UNIVERSAL_PROGRAMS.length} programs
            </span>
            <Link
              href="/dashboard?demo=true"
              className="text-terracotta-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Test your profile against all programs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl border border-sand-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-terracotta-400"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-amberwarm-100 text-amberwarm-900">
                    {prog.type}
                  </span>
                  <span className="text-[11px] font-medium text-sand-800 bg-sand-100 px-2 py-0.5 rounded border border-sand-200">
                    {prog.state}
                  </span>
                </div>

                <h3 className="text-base font-bold text-warmcharcoal hover:text-terracotta-700">
                  {prog.name}
                </h3>

                <p className="mt-2 text-xs text-warmcharcoal-light line-clamp-3 leading-relaxed">
                  {prog.description}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-amberwarm-50/70 border border-amberwarm-200">
                  <span className="text-[10px] uppercase font-bold text-amberwarm-900 block">
                    Sanction / Benefit
                  </span>
                  <span className="text-xs font-bold text-terracotta-800 mt-0.5 block">
                    {prog.benefitAmount}
                  </span>
                </div>

                <div className="mt-3 text-xs text-warmcharcoal-muted flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sand-700" />
                  <span>Requires {prog.requiredDocuments.length} verification proofs</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-sand-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProgram(prog)}
                  className="text-xs font-semibold text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
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
          <div className="text-center py-16 bg-white rounded-xl border border-sand-200">
            <p className="text-sm text-warmcharcoal-muted">No programs matched your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedType("All");
                setSelectedState("All");
              }}
              className="mt-3 px-4 py-2 bg-sand-100 text-terracotta-800 font-semibold text-xs rounded-lg hover:bg-sand-200"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmcharcoal/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-sand-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-sand-100">
              <div>
                <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-wide">
                  {activeModalProgram.type} • {activeModalProgram.state}
                </span>
                <h3 className="text-xl font-bold text-warmcharcoal mt-1">
                  {activeModalProgram.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProgram(null)}
                className="p-1 rounded-lg hover:bg-sand-100 text-warmcharcoal-muted hover:text-warmcharcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-sand-700 tracking-wider mb-1">
                  Program Details
                </h4>
                <p className="text-sm text-warmcharcoal-light leading-relaxed">
                  {activeModalProgram.description}
                </p>
              </div>

              <div className="p-3 bg-amberwarm-50 rounded-xl border border-amberwarm-200">
                <span className="text-xs font-bold uppercase text-amberwarm-900 tracking-wider block">
                  Benefit Package
                </span>
                <span className="text-sm font-bold text-terracotta-900 mt-1 block">
                  {activeModalProgram.benefitAmount}
                </span>
                <span className="text-xs text-warmcharcoal-light mt-0.5 block">
                  {activeModalProgram.benefitDescription}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-sand-700 tracking-wider mb-2">
                  Mandatory Eligibility Rules
                </h4>
                <ul className="space-y-1.5">
                  {activeModalProgram.eligibilityCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-warmcharcoal-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-sand-700 tracking-wider mb-2">
                  Required Documents
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalProgram.requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-lg bg-sand-50 border border-sand-200 text-xs">
                      <span className="font-semibold text-warmcharcoal">{doc.name}</span>
                      <p className="text-warmcharcoal-muted mt-0.5">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-sand-100 text-[11px] text-warmcharcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Provider: {activeModalProgram.provider}</span>
                <span>Verified: {activeModalProgram.lastVerifiedAt}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-4 py-2 text-xs font-medium text-warmcharcoal-light hover:bg-sand-100 rounded-lg"
              >
                Close
              </button>
              <a
                href={activeModalProgram.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <span>Authorized Application Portal</span>
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
