"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/ui/navigation";
import { CURATED_SCHEMES } from "@/lib/data/curated-schemes";
import { Scheme } from "@/lib/types";
import { Search, Filter, ExternalLink, FileText, CheckCircle2, ChevronRight, X, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SchemesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [activeModalScheme, setActiveModalScheme] = useState<Scheme | null>(null);

  const categories = ["All", "Education & Scholarships", "Skill & Employment", "Agriculture & Rural", "Social Welfare", "Entrepreneurship"];
  const states = ["All", "All India", "Maharashtra", "Karnataka"];

  const filteredSchemes = CURATED_SCHEMES.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.targetAudience.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesState = selectedState === "All" || s.region === selectedState || (selectedState !== "All" && s.region === "All India");

    return matchesSearch && matchesCategory && matchesState;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Public Program Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Curated Public Schemes & Scholarships
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl text-sm">
            Browse verified welfare schemes, educational scholarships, and self-employment subsidies. Every record includes precise criteria, document mandates, and official source links.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search scheme name, eligibility, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {states.map((s) => (
                  <option key={s} value={s}>
                    Region: {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>
              Showing <strong className="text-slate-800">{filteredSchemes.length}</strong> of {CURATED_SCHEMES.length} programs
            </span>
            <Link
              href="/dashboard?demo=true"
              className="text-brand-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Test your profile against all schemes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between hover:border-brand-300"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {scheme.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                    {scheme.region}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600">
                  {scheme.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {scheme.shortDescription}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                    Benefit Package
                  </span>
                  <span className="text-xs font-bold text-emerald-700 mt-0.5 block">
                    {scheme.benefitAmount}
                  </span>
                </div>

                <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Requires {scheme.requiredDocuments.length} verification documents</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalScheme(scheme)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Criteria & Documents</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">No schemes matched your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedState("All");
              }}
              className="mt-3 px-4 py-2 bg-brand-50 text-brand-700 font-semibold text-xs rounded-lg hover:bg-brand-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                  {activeModalScheme.category} • {activeModalScheme.region}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {activeModalScheme.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalScheme(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                  Program Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalScheme.fullDescription}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider block">
                  Sanction & Benefits
                </span>
                <span className="text-sm font-bold text-emerald-900 mt-1 block">
                  {activeModalScheme.benefitAmount} ({activeModalScheme.benefitType})
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Mandatory Eligibility Rules
                </h4>
                <ul className="space-y-1.5">
                  {activeModalScheme.eligibilityCriteria.map((c, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                  Required Application Documents
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {activeModalScheme.requiredDocuments.map((doc) => (
                    <div key={doc.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70 text-xs">
                      <span className="font-semibold text-slate-800">{doc.name}</span>
                      <p className="text-slate-500 mt-0.5">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Authority: {activeModalScheme.sourceMinistry}</span>
                <span>Verified: {activeModalScheme.lastVerifiedDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <a
                href={activeModalScheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <span>Official Application Portal</span>
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
