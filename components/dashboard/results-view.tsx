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
      <div className="paper-card rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border-1.5 border-manga-ink shadow-manga">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded stamp-badge bg-manga-parchment text-manga-ink text-xs mb-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-manga-vermilion" />
            <span>SCRUTINY COMPLETED // DETERMINISTIC PASS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-manga-ink tracking-tight font-sans">
            {eligibleCount} Qualifying Program{eligibleCount === 1 ? "" : "s"} Discovered
          </h2>
          <p className="text-xs text-warmcharcoal-light mt-1 max-w-xl leading-relaxed">
            Ranked through deterministic checks and grounded in official ministry criteria with document gap auditing.
          </p>
        </div>

        <div className="flex items-center gap-4 paper-card-subtle px-4 py-2.5 rounded-xl border border-manga-ink shadow-manga-sm bg-manga-parchment">
          <div className="text-center font-mono">
            <span className="text-[10px] text-warmcharcoal-muted block uppercase">Evaluated</span>
            <span className="text-base font-black text-manga-ink">{results.length} Programs</span>
          </div>
          <div className="h-8 w-px bg-manga-ink" />
          <div className="text-center font-mono">
            <span className="text-[10px] text-manga-vermilion block uppercase">Matches</span>
            <span className="text-base font-black text-manga-vermilion">{eligibleCount}</span>
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
              className={`rounded-2xl transition-all p-5 sm:p-6 bg-white border-1.5 border-manga-ink ${
                isSelected
                  ? "shadow-manga ring-2 ring-manga-vermilion"
                  : "shadow-manga-sm hover:shadow-manga hover:translate-x-[-1px] hover:translate-y-[-1px]"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Program Header Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
                    <span className="text-xs font-bold text-manga-ink">#{index + 1}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded stamp-badge bg-manga-parchment font-bold text-manga-ink">
                      {scheme.programType}
                    </span>
                    <span className="text-xs text-warmcharcoal-muted">• {scheme.region}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded stamp-badge font-bold ml-auto sm:ml-0 ${
                        isEligible
                          ? "bg-emerald-100 text-emerald-900 border-emerald-700"
                          : scheme.status === "borderline"
                          ? "bg-amberwarm-100 text-amberwarm-900 border-amberwarm-700"
                          : "bg-sand-100 text-sand-700 border-sand-400"
                      }`}
                    >
                      {scheme.confidenceLabel} Confidence ({scheme.matchScore}%)
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-manga-ink">{scheme.schemeName}</h3>

                  <p className="text-xs text-warmcharcoal-light mt-1.5 leading-relaxed">
                    {scheme.aiExplanation || scheme.reasoningSummary}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg paper-card-subtle text-manga-ink text-xs font-medium border border-manga-ink">
                    <span className="text-warmcharcoal-muted font-mono uppercase text-[10px]">Grant / Benefit:</span>
                    <span className="font-bold text-manga-vermilion font-mono">{scheme.benefitAmount}</span>
                  </div>
                </div>

                {/* Score badge & primary CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t lg:border-t-0 pt-3 lg:pt-0 gap-3 min-w-[200px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-warmcharcoal-muted block font-mono">
                      Match Rating
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-3xl font-black text-manga-vermilion font-mono">
                        {scheme.matchScore}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSchemeForActionPlan(scheme)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold shadow-manga-sm border-1.5 border-manga-ink transition-all font-mono uppercase ${
                      isSelected
                        ? "bg-manga-vermilion text-white"
                        : "bg-white hover:bg-manga-parchment text-manga-ink"
                    }`}
                  >
                    <span>{isSelected ? "Active In Action Plan" : "Prepare Application Plan"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Criteria audit row */}
              <div className="mt-5 pt-4 border-t-1.5 border-manga-ink grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {/* Matched Criteria */}
                <div className="p-3.5 rounded-xl paper-card-subtle border border-manga-ink bg-manga-parchment/70">
                  <span className="font-bold text-manga-ink block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>SATISFIED CRITERIA ({scheme.matchedCriteria.length})</span>
                  </span>
                  <ul className="space-y-1 text-warmcharcoal font-sans text-xs">
                    {scheme.matchedCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-700 font-bold font-mono">✓</span>
                        <span>{crit.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Document Readiness & Missing */}
                <div className="p-3.5 rounded-xl paper-card-subtle border border-manga-ink bg-manga-parchment/70">
                  <span className="font-bold text-manga-ink block mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-manga-vermilion" />
                    <span>DOCUMENT GAP AUDIT</span>
                  </span>

                  {scheme.missingDocuments.length === 0 ? (
                    <p className="text-emerald-800 font-bold">
                      ✓ All required documents accounted for in current profile.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-warmcharcoal font-sans text-xs">
                      {scheme.missingDocuments.map((doc) => (
                        <li key={doc.id} className="flex items-start gap-1.5 text-manga-vermilion font-medium">
                          <span className="font-bold font-mono">✗</span>
                          <span>
                            Missing: <strong className="text-manga-ink">{doc.name}</strong>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Source verification footer */}
              <div className="mt-3.5 pt-2.5 text-[11px] text-warmcharcoal-muted flex items-center justify-between border-t border-sand-300 font-mono">
                <span>Provider: {scheme.sourceName}</span>
                <a
                  href={scheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-manga-ink hover:text-manga-vermilion underline flex items-center gap-1 font-bold"
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
