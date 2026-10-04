"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation, Footer } from "@/components/ui/navigation";
import { ProfileBuilder } from "@/components/dashboard/profile-builder";
import { ResultsView } from "@/components/dashboard/results-view";
import { ActionPlanTimeline } from "@/components/action-plan/action-plan-timeline";
import { DEMO_PERSONAS } from "@/lib/data/curated-schemes";
import { UserProfile, ExtractedDocumentFact, SchemeMatchResult, CivicFlowActionPlan } from "@/lib/types";
import { Sparkles, RefreshCw, CheckCircle2, FileText, ArrowRight, Layers, ShieldCheck, UserCheck } from "lucide-react";

function DashboardContent() {
  const searchParams = useSearchParams();
  const demoParam = searchParams.get("demo");

  // Selected persona for demo mode
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(0);
  const currentPersona = DEMO_PERSONAS[selectedPersonaIndex];

  const [profile, setProfile] = useState<UserProfile>(currentPersona.profile);
  const [documents, setDocuments] = useState<ExtractedDocumentFact[]>(currentPersona.sampleExtractedDocs);
  const [assessmentResults, setAssessmentResults] = useState<SchemeMatchResult[] | null>(null);
  const [actionPlan, setActionPlan] = useState<CivicFlowActionPlan | null>(null);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "results" | "action_plan">("profile");

  // Auto-run if demo query param is present
  useEffect(() => {
    if (demoParam === "true") {
      runAssessment(currentPersona.profile, currentPersona.sampleExtractedDocs);
    }
  }, [demoParam]);

  const handlePersonaChange = (index: number) => {
    setSelectedPersonaIndex(index);
    const persona = DEMO_PERSONAS[index];
    setProfile(persona.profile);
    setDocuments(persona.sampleExtractedDocs);
    setAssessmentResults(null);
    setActionPlan(null);
    setActiveTab("profile");
  };

  const runAssessment = async (prof: UserProfile, docs: ExtractedDocumentFact[]) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: prof, documents: docs })
      });
      const data = await res.json();
      if (data.success && data.results) {
        setAssessmentResults(data.results);
        setActiveTab("results");

        // Automatically prepare action plan for the top likely eligible match
        const topEligible = data.results.find((r: SchemeMatchResult) => r.status === "likely_eligible") || data.results[0];
        if (topEligible) {
          setSelectedSchemeId(topEligible.schemeId);
          fetchActionPlan([topEligible], prof.fullName);
        }
      }
    } catch (err) {
      console.error("Assessment error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActionPlan = async (matches: SchemeMatchResult[], name: string) => {
    try {
      const res = await fetch("/api/action-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matches, userFullName: name })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setActionPlan(data.data);
      }
    } catch (err) {
      console.error("Action plan error", err);
    }
  };

  const handleSelectSchemeForPlan = (scheme: SchemeMatchResult) => {
    setSelectedSchemeId(scheme.schemeId);
    fetchActionPlan([scheme], profile.fullName);
    setActiveTab("action_plan");
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Top Header & Demo Persona Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Judges & Evaluators Fast Track
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                Zero Setup
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              CivicFlow Eligibility Assessment Workspace
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Switch fictional personas to verify deterministic rules, missing document detection, and action plan generation.
            </p>
          </div>

          {/* Persona Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Select Demo Persona
              </span>
              <select
                value={selectedPersonaIndex}
                onChange={(e) => handlePersonaChange(Number(e.target.value))}
                className="mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {DEMO_PERSONAS.map((p, idx) => (
                  <option key={p.id} value={idx}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => runAssessment(profile, documents)}
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-sm shadow-brand-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? "Analyzing..." : "1-Click Analyze"}</span>
            </button>
          </div>
        </div>

        {/* Active Persona Banner Details */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            Active: {currentPersona.profile.fullName} ({currentPersona.profile.age}y, {currentPersona.profile.state})
          </span>
          <span className="text-slate-400">•</span>
          <span>Occupation: {currentPersona.profile.occupation}</span>
          <span className="text-slate-400">•</span>
          <span>Annual Income: ₹{(currentPersona.profile.annualIncome).toLocaleString("en-IN")}</span>
          <span className="text-slate-400">•</span>
          <span>Category: {currentPersona.profile.category || "General"}</span>
          <span className="text-slate-400">•</span>
          <span>Attached Proofs: {documents.length}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "profile"
              ? "border-brand-600 text-brand-700 bg-white"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>1. Profile & Documents</span>
        </button>

        <button
          onClick={() => {
            if (assessmentResults) setActiveTab("results");
          }}
          disabled={!assessmentResults}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "results"
              ? "border-brand-600 text-brand-700 bg-white"
              : assessmentResults
              ? "border-transparent text-slate-500 hover:text-slate-900"
              : "border-transparent text-slate-300 cursor-not-allowed"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>
            2. Assessment Results {assessmentResults && `(${assessmentResults.length})`}
          </span>
        </button>

        <button
          onClick={() => {
            if (actionPlan) setActiveTab("action_plan");
          }}
          disabled={!actionPlan}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "action_plan"
              ? "border-brand-600 text-brand-700 bg-white"
              : actionPlan
              ? "border-transparent text-slate-500 hover:text-slate-900"
              : "border-transparent text-slate-300 cursor-not-allowed"
          }`}
        >
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>3. CivicFlow Action Plan</span>
        </button>
      </div>

      {/* Tab 1: Profile & Documents */}
      {activeTab === "profile" && (
        <ProfileBuilder
          initialProfile={profile}
          initialDocuments={documents}
          onComplete={(p, d) => {
            setProfile(p);
            setDocuments(d);
            runAssessment(p, d);
          }}
          isLoading={isLoading}
        />
      )}

      {/* Tab 2: Assessment Results */}
      {activeTab === "results" && assessmentResults && (
        <div className="space-y-6">
          <ResultsView
            results={assessmentResults}
            onSelectSchemeForActionPlan={handleSelectSchemeForPlan}
            selectedSchemeId={selectedSchemeId}
          />
        </div>
      )}

      {/* Tab 3: Action Plan Timeline */}
      {activeTab === "action_plan" && actionPlan && (
        <div className="space-y-6">
          <ActionPlanTimeline plan={actionPlan} />
        </div>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navigation />
      <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading CivicFlow Workspace...</div>}>
        <DashboardContent />
      </Suspense>
      <Footer />
    </div>
  );
}
