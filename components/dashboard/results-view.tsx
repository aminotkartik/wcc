"use client";

import { SchemeMatchResult } from "@/lib/types";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, ExternalLink, Sparkles } from "lucide-react";

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
      <div className="bg-gradient-to-r from-warmcharcoal via-sand-900 to-terracotta-950 text-white rounded-2xl p-6 shadow-md border border-sand-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amberwarm-400/20 text-amberwarm-200 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Universal Analysis Completed</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Discovered {eligibleCount} High-Probability Match{eligibleCount === 1 ? "" : "es"}
          </h2>
          <p className="text-xs text-sand-200 mt-1 max-w-xl">
            Ranked through deterministic checks and augmented with Groq-powered contextual explanations.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
          <div className="text-center">
            <span className="text-xs text-sand-200 block">Total Evaluated</span>
            <span className="text-lg font-bold">{results.length} Programs</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-center">
            <span className="text-xs text-amberwarm-300 block">Strong Match</span>
            <span className="text-lg font-bold text-amberwarm-400">{eligibleCount}</span>
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
                  ? "border-terracotta-500 shadow-md ring-2 ring-terracotta-500/20"
                  : "border-sand-200 hover:border-sand-300 shadow-2xs"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Program Header Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-sand-700">#{index + 1}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amberwarm-100 font-semibold text-amberwarm-900">
                      {scheme.programType}
                    </span>
                    <span className="text-xs text-warmcharcoal-muted">• {scheme.region}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ml-auto sm:ml-0 ${
                        isEligible
                          ? "bg-emerald-100 text-emerald-800"
                          : scheme.status === "borderline"
                          ? "bg-amberwarm-100 text-amberwarm-900"
                          : "bg-sand-100 text-sand-700"
                      }`}
                    >
                      {scheme.confidenceLabel} Confidence ({scheme.matchScore}%)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-warmcharcoal">{scheme.schemeName}</h3>

                  <p className="text-xs text-warmcharcoal-light mt-1.5 leading-relaxed">
                    {scheme.aiExplanation || scheme.reasoningSummary}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amberwarm-50 text-terracotta-900 text-xs font-bold border border-amberwarm-200">
                    <span>Benefit: {scheme.benefitAmount}</span>
                  </div>
                </div>

                {/* Score badge & primary CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 gap-3 min-w-[200px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-sand-700 block">
                      Match Score
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-black text-terracotta-600">
                        {scheme.matchScore}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSchemeForActionPlan(scheme)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all ${
                      isSelected
                        ? "bg-terracotta-600 text-white shadow-terracotta-500/25"
                        : "bg-warmcharcoal hover:bg-terracotta-600 text-white"
                    }`}
                  >
                    <span>{isSelected ? "Active In Action Plan" : "Generate Action Plan"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Collapsible/Expandable criteria audit row */}
              <div className="mt-5 pt-4 border-t border-sand-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Matched Criteria */}
                <div className="p-3 rounded-xl bg-sand-50 border border-sand-200">
                  <span className="font-bold text-warmcharcoal block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Satisfied Eligibility Conditions ({scheme.matchedCriteria.length})</span>
                  </span>
                  <ul className="space-y-1 text-warmcharcoal-light">
                    {scheme.matchedCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{crit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Document Readiness & Missing */}
                <div className="p-3 rounded-xl bg-sand-50 border border-sand-200">
                  <span className="font-bold text-warmcharcoal block mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-terracotta-600" />
                    <span>Document Gap Analysis</span>
                  </span>

                  {scheme.missingDocuments.length === 0 ? (
                    <p className="text-emerald-700 font-semibold">
                      ✓ All required documents accounted for in current profile.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-warmcharcoal-light">
                      {scheme.missingDocuments.map((doc) => (
                        <li key={doc.id} className="flex items-start gap-1.5 text-amberwarm-900">
                          <span className="text-terracotta-600 font-bold">✗</span>
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
              <div className="mt-3 pt-2 text-[11px] text-warmcharcoal-muted flex items-center justify-between">
                <span>Provider: {scheme.sourceName}</span>
                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Official Application Portal</span>
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
