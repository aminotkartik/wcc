"use client";

import { useState } from "react";
import { CivicFlowActionPlan, ActionPlanStep } from "@/lib/types";
import { CheckCircle2, Clock, AlertTriangle, ExternalLink, Sparkles, Printer, Download, ArrowRight, ShieldCheck } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Signature Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CivicFlow Signature Action Plan</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {plan.topMatchedScheme}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Personalized step-by-step roadmap to fulfill missing requirements and submit on the authorized portal.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl min-w-[180px] text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Application Readiness
          </span>
          <div className="flex items-baseline justify-end gap-1.5 mt-1">
            <span className="text-2xl font-black text-emerald-600">{progressPercent}%</span>
            <span className="text-xs text-slate-500 font-medium">({completedCount}/{steps.length} steps)</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Critical Missing Documents Alert */}
      {plan.criticalMissingDocuments && plan.criticalMissingDocuments.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold block mb-1">
              Required Documents to Secure Prior to Portal Submission:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-amber-800">
              {plan.criticalMissingDocuments.map((doc, idx) => (
                <li key={idx} className="font-semibold">{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Plan Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-brand-200 space-y-8 my-6">
        {steps.map((step, idx) => {
          const isDone = step.status === "completed";

          return (
            <div key={step.id} className="relative group">
              {/* Timeline marker icon */}
              <button
                onClick={() => toggleStep(step.id)}
                className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                    : "bg-white border-slate-300 text-slate-400 hover:border-brand-500 hover:text-brand-600"
                }`}
                title="Toggle status"
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
              </button>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? "bg-emerald-50/40 border-emerald-200 text-slate-600"
                    : "bg-white border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {step.category.replace("_", " ")}
                    </span>
                    <h4
                      className={`text-sm font-bold ${
                        isDone ? "text-slate-500 line-through" : "text-slate-900"
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.estimatedMinutes && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>~{step.estimatedMinutes} mins</span>
                      </span>
                    )}

                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                        isDone
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {isDone ? "Completed" : "Mark Done"}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {step.description}
                </p>

                {step.officialLink && (
                  <div className="mt-3">
                    <a
                      href={step.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <span>Proceed to Official Portal</span>
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
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{plan.disclaimer}</span>
        </div>
      </div>
    </div>
  );
}
