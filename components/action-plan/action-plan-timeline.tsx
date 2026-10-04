"use client";

import { useState } from "react";
import { CivicFlowActionPlan, ActionPlanStep } from "@/lib/types";
import { CheckCircle2, Clock, AlertTriangle, ExternalLink, ShieldCheck, FileCheck } from "lucide-react";

interface ActionPlanTimelineProps {
  plan: CivicFlowActionPlan;
}

export function ActionPlanTimeline({ plan }: ActionPlanTimelineProps) {
  const [steps, setSteps] = useState<ActionPlanStep[]>(plan.steps);

  const toggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "completed" ? "pending" : "completed";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6 bg-white border-1.5 border-manga-ink shadow-manga">
      {/* Signature Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-1.5 border-manga-ink pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded stamp-badge bg-manga-parchment text-manga-ink text-xs font-mono font-bold mb-2 border border-manga-ink">
            <FileCheck className="w-3.5 h-3.5 text-manga-vermilion" />
            <span>ACTION EXECUTION // ROADMAP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-manga-ink tracking-tight font-sans">
            {plan.topMatchedScheme}
          </h2>
          <p className="text-xs text-warmcharcoal-light mt-1">
            Personalized step-by-step checklist to fulfill missing prerequisites and apply on the authorized portal.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="paper-card-subtle p-3.5 rounded-xl min-w-[170px] text-right border border-manga-ink bg-manga-parchment">
          <span className="text-[10px] uppercase font-bold text-warmcharcoal-muted block font-mono">
            Readiness Progress
          </span>
          <div className="flex items-baseline justify-end gap-1.5 mt-1 font-mono">
            <span className="text-2xl font-black text-manga-vermilion">{progressPercent}%</span>
            <span className="text-xs text-warmcharcoal-muted">({completedCount}/{steps.length} tasks)</span>
          </div>
          <div className="w-full bg-sand-300 h-2 rounded-full overflow-hidden mt-2 border border-manga-ink">
            <div
              className="bg-manga-vermilion h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Critical Missing Documents Alert */}
      {plan.criticalMissingDocuments && plan.criticalMissingDocuments.length > 0 && (
        <div className="p-4 rounded-xl bg-amberwarm-100 border-1.5 border-manga-ink shadow-manga-sm flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-manga-vermilion shrink-0 mt-0.5" />
          <div className="text-xs text-manga-ink">
            <span className="font-bold font-mono uppercase block mb-1">
              Required Documents to Secure Prior to Portal Submission:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-warmcharcoal">
              {plan.criticalMissingDocuments.map((doc, idx) => (
                <li key={idx} className="font-semibold">{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Plan Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-manga-ink space-y-7 my-6">
        {steps.map((step, idx) => {
          const isDone = step.status === "completed";

          return (
            <div key={step.id} className="relative group">
              {/* Timeline marker icon */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`absolute -left-[33px] sm:-left-[41px] top-0 w-7 h-7 rounded-full border-1.5 border-manga-ink flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-emerald-600 text-white shadow-manga-sm"
                    : "bg-white text-manga-ink hover:bg-manga-parchment"
                }`}
                title="Toggle status"
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-xs font-bold font-mono">{idx + 1}</span>}
              </button>

              <div
                className={`p-4 rounded-xl transition-all border-1.5 border-manga-ink ${
                  isDone
                    ? "bg-sand-100 text-warmcharcoal-muted"
                    : "bg-white shadow-manga-sm hover:shadow-manga hover:translate-x-[-1px] hover:translate-y-[-1px]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded stamp-badge bg-manga-parchment text-manga-ink border border-manga-ink">
                      {step.category.replace("_", " ")}
                    </span>
                    <h4
                      className={`text-sm font-bold ${
                        isDone ? "text-warmcharcoal-muted line-through" : "text-manga-ink"
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.estimatedMinutes && (
                      <span className="text-[11px] text-warmcharcoal-muted flex items-center gap-1 font-mono font-bold">
                        <Clock className="w-3 h-3" />
                        <span>~{step.estimatedMinutes}m</span>
                      </span>
                    )}

                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-md border-1.5 border-manga-ink transition-colors font-mono uppercase shadow-manga-sm ${
                        isDone
                          ? "bg-sand-200 text-warmcharcoal"
                          : "bg-white hover:bg-manga-parchment text-manga-ink"
                      }`}
                    >
                      {isDone ? "Completed" : "Mark Done"}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-warmcharcoal-light mt-2 leading-relaxed">
                  {step.description}
                </p>

                {step.officialLink && (
                  <div className="mt-3">
                    <a
                      href={step.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-manga-vermilion hover:bg-manga-vermiliondark text-white text-xs font-bold border-1.5 border-manga-ink shadow-manga-sm transition-all font-mono uppercase"
                    >
                      <span>Proceed to Official Desk</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grounding & Verification Disclaimer */}
      <div className="pt-4 border-t-1.5 border-manga-ink flex flex-col sm:flex-row sm:items-center justify-between text-xs text-warmcharcoal-muted gap-2 font-mono">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{plan.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
