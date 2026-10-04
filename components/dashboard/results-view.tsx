"use client";

import { SchemeMatchResult } from "@/lib/types";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, ExternalLink } from "lucide-react";

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
      <div className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-sand-300">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded stamp-badge bg-sand-200 border border-sand-300 text-warmcharcoal text-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Deterministic Assessment Complete</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-warmcharcoal">
            {eligibleCount} Likely Qualifying Program{eligibleCount === 1 ? "" : "s"} Identified
          </h2>
          <p className="text-xs text-warmcharcoal-light mt-1 max-w-xl leading-relaxed">
            Ranked through deterministic checks and grounded in official ministry criteria with document gap auditing.
          </p>
        </div>

        <div className="flex items-center gap-4 paper-card-subtle px-4 py-2.5 rounded-xl border-sand-300">
          <div className="text-center">
            <span className="text-xs text-sand-700 block font-mono">Evaluated</span>
            <span className="text-base font-bold text-warmcharcoal">{results.length} Programs</span>
          </div>
          <div className="h-8 w-px bg-sand-300" />
          <div className="text-center">
            <span className="text-xs text-emerald-800 block font-mono">Matches</span>
            <span className="text-base font-bold text-emerald-700">{eligibleCount}</span>
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
              className={`rounded-2xl transition-all p-5 sm:p-6 ${
                isSelected
                  ? "paper-card border-terracotta-600 ring-1 ring-terracotta-600/30"
                  : "paper-card hover:border-sand-400"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Program Header Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-sand-700">#{index + 1}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded stamp-badge bg-sand-200 font-medium text-warmcharcoal border border-sand-300">
                      {scheme.programType}
                    </span>
                    <span className="text-xs text-warmcharcoal-muted font-mono">• {scheme.region}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded stamp-badge font-medium ml-auto sm:ml-0 ${
                        isEligible
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : scheme.status === "borderline"
                          ? "bg-amberwarm-100 text-amberwarm-900 border border-amberwarm-200"
                          : "bg-sand-100 text-sand-700 border border-sand-200"
                      }`}
                    >
                      {scheme.confidenceLabel} Confidence ({scheme.matchScore}%)
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-warmcharcoal">{scheme.schemeName}</h3>

                  <p className="text-xs text-warmcharcoal-light mt-1.5 leading-relaxed">
                    {scheme.aiExplanation || scheme.reasoningSummary}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg paper-card-subtle text-warmcharcoal text-xs font-medium">
                    <span className="text-sand-700">Grant / Benefit:</span>
                    <span className="font-semibold text-terracotta-800">{scheme.benefitAmount}</span>
                  </div>
                </div>

                {/* Score badge & primary CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 gap-3 min-w-[200px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-semibold text-sand-700 block font-mono">
                      Match Rating
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-terracotta-700 font-sans">
                        {scheme.matchScore}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSchemeForActionPlan(scheme)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium shadow-sm transition-all ${
                      isSelected
                        ? "bg-terracotta-700 text-white"
                        : "paper-card hover:bg-white text-warmcharcoal"
                    }`}
                  >
                    <span>{isSelected ? "Active In Action Plan" : "Prepare Application Plan"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Criteria audit row */}
              <div className="mt-5 pt-4 border-t border-sand-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Matched Criteria */}
                <div className="p-3.5 rounded-xl paper-card-subtle">
                  <span className="font-semibold text-warmcharcoal block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Satisfied Eligibility Conditions ({scheme.matchedCriteria.length})</span>
                  </span>
                  <ul className="space-y-1 text-warmcharcoal-light">
                    {scheme.matchedCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{crit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Document Readiness & Missing */}
                <div className="p-3.5 rounded-xl paper-card-subtle">
                  <span className="font-semibold text-warmcharcoal block mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-terracotta-700" />
                    <span>Document Gap Audit</span>
                  </span>

                  {scheme.missingDocuments.length === 0 ? (
                    <p className="text-emerald-800 font-medium">
                      ✓ All required documents accounted for in current profile.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-warmcharcoal-light">
                      {scheme.missingDocuments.map((doc) => (
                        <li key={doc.id} className="flex items-start gap-1.5 text-amberwarm-900">
                          <span className="text-terracotta-700 font-bold">✗</span>
                          <span>
                            Missing: <strong className="text-warmcharcoal">{doc.name}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Source verification footer */}
              <div className="mt-3.5 pt-2.5 text-[11px] text-warmcharcoal-muted flex items-center justify-between border-t border-sand-200/60 font-mono">
                <span>Provider: {scheme.sourceName}</span>
                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-700 hover:underline flex items-center gap-1 font-sans font-medium"
                >
                  <span>Official Portal</span>
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
