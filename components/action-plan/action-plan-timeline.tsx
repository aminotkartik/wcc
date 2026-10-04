"use client";

import { useState } from "react";
import { CivicFlowActionPlan, ActionPlanStep } from "@/lib/types";
import { CheckCircle2, Clock, AlertTriangle, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Signature Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amberwarm-100 text-amberwarm-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
            <span>CivicFlow Opportunity Action Plan</span>
          </div>
          <h2 className="text-2xl font-black text-warmcharcoal">
            {plan.topMatchedScheme}
          </h2>
          <p className="text-xs text-warmcharcoal-light mt-1">
            Personalized step-by-step roadmap to fulfill missing requirements and submit on the authorized portal.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="bg-sand-50 border border-sand-200 p-4 rounded-xl min-w-[180px] text-right">
          <span className="text-[10px] uppercase font-bold text-sand-700 block">
            Readiness Score
          </span>
          <div className="flex items-baseline justify-end gap-1.5 mt-1">
            <span className="text-2xl font-black text-terracotta-600">{progressPercent}%</span>
            <span className="text-xs text-warmcharcoal-muted font-medium">({completedCount}/{steps.length} steps)</span>
          </div>
          <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-terracotta-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Critical Missing Documents Alert */}
      {plan.criticalMissingDocuments && plan.criticalMissingDocuments.length > 0 && (
        <div className="p-4 rounded-xl bg-amberwarm-50 border border-amberwarm-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amberwarm-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amberwarm-900">
            <span className="font-bold block mb-1">
              Required Documents to Secure Prior to Portal Submission:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-amberwarm-800">
              {plan.criticalMissingDocuments.map((doc, idx) => (
                <li key={idx} className="font-semibold">{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Plan Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amberwarm-300 space-y-8 my-6">
        {steps.map((step, idx) => {
          const isDone = step.status === "completed";

          return (
            <div key={step.id} className="relative group">
              {/* Timeline marker icon */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs"
                    : "bg-white border-sand-300 text-sand-700 hover:border-terracotta-500 hover:text-terracotta-600"
                }`}
                title="Toggle status"
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
              </button>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? "bg-sand-50 border-sand-200 text-warmcharcoal-muted"
                    : "bg-white border-sand-200 hover:border-sand-300 shadow-2xs"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sand-100 text-sand-800">
                      {step.category.replace("_", " ")}
                    </span>
                    <h4
                      className={`text-sm font-bold ${
                        isDone ? "text-warmcharcoal-muted line-through" : "text-warmcharcoal"
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.estimatedMinutes && (
                      <span className="text-[11px] text-warmcharcoal-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>~{step.estimatedMinutes} mins</span>
                      </span>
                    )}

                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        isDone
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "bg-sand-50 border-sand-200 text-warmcharcoal hover:bg-sand-100"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <span>Proceed to Official Application Desk</span>
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
      <div className="pt-4 border-t border-sand-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-warmcharcoal-muted gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{plan.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
