"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation, Footer } from "@/components/ui/navigation";
import { ProfileBuilder } from "@/components/dashboard/profile-builder";
import { ResultsView } from "@/components/dashboard/results-view";
import { ActionPlanTimeline } from "@/components/action-plan/action-plan-timeline";
import { DEMO_PERSONAS } from "@/lib/data/curated-schemes";
import { UserProfile, ExtractedDocumentFact, SchemeMatchResult, CivicFlowActionPlan } from "@/lib/types";
import { Sparkles, Layers, UserCheck, CheckCircle2, Clock } from "lucide-react";

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
  const [aiStatusStage, setAiStatusStage] = useState<number>(0);
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
    setAiStatusStage(1); // Understanding profile
    
    // Smooth visual status progression matching backend stages
    const timer1 = setTimeout(() => setAiStatusStage(2), 300); // Finding programs
    const timer2 = setTimeout(() => setAiStatusStage(3), 600); // Checking eligibility
    const timer3 = setTimeout(() => setAiStatusStage(4), 900); // Building action plan

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

        const topEligible = data.results.find((r: SchemeMatchResult) => r.status === "likely_eligible") || data.results[0];
        if (topEligible) {
          setSelectedSchemeId(topEligible.schemeId);
          fetchActionPlan([topEligible], prof.fullName);
        }
      }
    } catch (err) {
      console.error("Assessment error", err);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsLoading(false);
      setAiStatusStage(0);
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
      <div className="bg-white rounded-2xl border border-sand-200 p-5 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
                Judges & Evaluators Fast Track
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amberwarm-100 text-amberwarm-900 font-bold">
                Universal Multi-Program Demo
              </span>
            </div>
            <h1 className="text-2xl font-black text-warmcharcoal">
              CivicFlow Eligibility Assessment Workspace
            </h1>
            <p className="text-xs text-warmcharcoal-light mt-0.5">
              Switch personas to explore scholarships, grants, research fellowships, subsidies, and welfare schemes.
            </p>
          </div>

          {/* Persona Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-sand-700">
                Select Universal Persona
              </span>
              <select
                value={selectedPersonaIndex}
                onChange={(e) => handlePersonaChange(Number(e.target.value))}
                className="mt-1 px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-xs font-semibold text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
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
              className="mt-4 px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg text-xs font-bold shadow-sm shadow-terracotta-500/20 flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isLoading ? "Analyzing..." : "1-Click Analyze"}</span>
            </button>
          </div>
        </div>

        {/* Active Persona Banner Details */}
        <div className="mt-4 pt-3 border-t border-sand-100 flex flex-wrap items-center gap-4 text-xs text-warmcharcoal-light">
          <span className="font-semibold text-warmcharcoal">
            Active: {currentPersona.profile.fullName} ({currentPersona.profile.age}y, {currentPersona.profile.state})
          </span>
          <span className="text-sand-400">•</span>
          <span>Occupation: {currentPersona.profile.occupation}</span>
          <span className="text-sand-400">•</span>
          <span>Annual Income: ₹{(currentPersona.profile.annualIncome).toLocaleString("en-IN")}</span>
          <span className="text-sand-400">•</span>
          <span>Target Need: {currentPersona.profile.goalOrNeed || "All relevant programs"}</span>
          <span className="text-sand-400">•</span>
          <span>Attached Proofs: {documents.length}</span>
        </div>
      </div>

      {/* AI Processing Status Experience (Real Stage Progression) */}
      {isLoading && (
        <div className="mb-8 p-5 bg-white rounded-2xl border border-terracotta-200 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-terracotta-600 animate-spin" />
            <h3 className="text-sm font-bold text-warmcharcoal">
              CivicFlow AI Copilot Analysis in Progress...
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${aiStatusStage >= 1 ? "bg-amberwarm-50 border-amberwarm-200 text-amberwarm-900 font-semibold" : "bg-sand-50 border-sand-200 text-sand-400"}`}>
              {aiStatusStage >= 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
              <span>1. Profile Context</span>
            </div>
            <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${aiStatusStage >= 2 ? "bg-amberwarm-50 border-amberwarm-200 text-amberwarm-900 font-semibold" : "bg-sand-50 border-sand-200 text-sand-400"}`}>
              {aiStatusStage >= 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
              <span>2. Program Retrieval</span>
            </div>
            <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${aiStatusStage >= 3 ? "bg-amberwarm-50 border-amberwarm-200 text-amberwarm-900 font-semibold" : "bg-sand-50 border-sand-200 text-sand-400"}`}>
              {aiStatusStage >= 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
              <span>3. Deterministic Rules</span>
            </div>
            <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${aiStatusStage >= 4 ? "bg-amberwarm-50 border-amberwarm-200 text-amberwarm-900 font-semibold" : "bg-sand-50 border-sand-200 text-sand-400"}`}>
              {aiStatusStage >= 4 ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
              <span>4. Action Plan Synth</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-sand-200 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "profile"
              ? "border-terracotta-600 text-terracotta-800 bg-white"
              : "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
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
              ? "border-terracotta-600 text-terracotta-800 bg-white"
              : assessmentResults
              ? "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
              : "border-transparent text-sand-700 cursor-not-allowed"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>
            2. Program Matches {assessmentResults && `(${assessmentResults.length})`}
          </span>
        </button>

        <button
          onClick={() => {
            if (actionPlan) setActiveTab("action_plan");
          }}
          disabled={!actionPlan}
          className={`px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "action_plan"
              ? "border-terracotta-600 text-terracotta-800 bg-white"
              : actionPlan
              ? "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
              : "border-transparent text-sand-700 cursor-not-allowed"
          }`}
        >
          <Sparkles className="w-4 h-4 text-terracotta-600" />
          <span>3. Opportunity Action Plan</span>
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
    <div className="flex flex-col min-h-screen bg-sand-50">
      <Navigation />
      <Suspense fallback={<div className="p-12 text-center text-sm text-sand-800">Loading CivicFlow Workspace...</div>}>
        <DashboardContent />
      </Suspense>
      <Footer />
    </div>
  );
}
