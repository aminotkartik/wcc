"use client";

import { SchemeMatchResult } from "@/lib/types";
import { CheckCircle2, XCircle, HelpCircle, ExternalLink, ArrowRight, ShieldCheck, FileText, BadgePercent } from "lucide-react";

interface ResultsViewProps {
  results: SchemeMatchResult[];
  onSelectSchemeForActionPlan: (scheme: SchemeMatchResult) => void;
  selectedSchemeId?: string;
}

export function ResultsView({
  results,
  onSelectSchemeForActionPlan,
  selectedSchemeId
}: ResultsViewProps) {
  const eligibleCount = results.filter((r) => r.status === "likely_eligible").length;

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-Layer Analysis Completed</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Found {eligibleCount} High-Probability Match{eligibleCount === 1 ? "" : "es"}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Ranked deterministically using verified criteria, income limits, and document audit.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
          <div className="text-center">
            <span className="text-xs text-slate-300 block">Total Evaluated</span>
            <span className="text-lg font-bold">{results.length} Schemes</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <span className="text-xs text-emerald-300 block">Strong Match</span>
            <span className="text-lg font-bold text-emerald-400">{eligibleCount}</span>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((scheme, index) => {
          const isSelected = selectedSchemeId === scheme.schemeId;
          const isEligible = scheme.status === "likely_eligible";

          return (
            <div
              key={scheme.schemeId}
              className={`rounded-2xl border transition-all p-5 sm:p-6 bg-white ${
                isSelected
                  ? "border-brand-500 shadow-md ring-2 ring-brand-500/20"
                  : "border-slate-200/80 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Scheme Header Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-500">#{index + 1}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                      {scheme.category}
                    </span>
                    <span className="text-xs text-slate-400">• {scheme.region}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ml-auto sm:ml-0 ${
                        isEligible
                          ? "bg-emerald-100 text-emerald-800"
                          : scheme.status === "borderline"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {scheme.confidenceLabel} Confidence ({scheme.matchScore}%)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{scheme.schemeName}</h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {scheme.reasoningSummary}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
                    <span>Benefit: {scheme.benefitAmount}</span>
                  </div>
                </div>

                {/* Score badge & primary CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 gap-3 min-w-[200px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Match Score
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-black text-brand-600">
                        {scheme.matchScore}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSchemeForActionPlan(scheme)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                      isSelected
                        ? "bg-brand-600 text-white shadow-brand-500/25"
                        : "bg-slate-900 hover:bg-brand-600 text-white"
                    }`}
                  >
                    <span>{isSelected ? "Active In Action Plan" : "Generate Action Plan"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Collapsible/Expandable criteria audit row */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Matched Criteria */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Satisfied Eligibility Conditions ({scheme.matchedCriteria.length})</span>
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {scheme.matchedCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{crit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Document Readiness & Missing */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-600" />
                    <span>Document Gap Analysis</span>
                  </span>

                  {scheme.missingDocuments.length === 0 ? (
                    <p className="text-emerald-700 font-semibold">
                      ✓ All required documents accounted for in current profile.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-slate-600">
                      {scheme.missingDocuments.map((doc) => (
                        <li key={doc.id} className="flex items-start gap-1.5 text-amber-800">
                          <span className="text-amber-600 font-bold">✗</span>
                          <span>
                            Missing: <strong>{doc.name}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Source verification footer */}
              <div className="mt-3 pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Source: {scheme.sourceMinistry}</span>
                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline flex items-center gap-1"
                >
                  <span>Official Scheme Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
