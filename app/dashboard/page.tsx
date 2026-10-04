"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation, Footer } from "@/components/ui/navigation";
import { ProfileBuilder } from "@/components/dashboard/profile-builder";
import { ResultsView } from "@/components/dashboard/results-view";
import { ActionPlanTimeline } from "@/components/action-plan/action-plan-timeline";
import { DEMO_PERSONAS } from "@/lib/data/curated-schemes";
import { UserProfile, ExtractedDocumentFact, SchemeMatchResult, CivicFlowActionPlan } from "@/lib/types";
import { Layers, UserCheck, CheckCircle2, Clock, Feather, Compass, FileCheck } from "lucide-react";

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

  // Natural pacing: simulates realistic human reasoning & review stages
  const runAssessment = async (prof: UserProfile, docs: ExtractedDocumentFact[]) => {
    setIsLoading(true);
    setAiStatusStage(1); // Stage 1: Reviewing profile statements & parameters

    // Stage 1 delay
    await new Promise((r) => setTimeout(r, 750));
    setAiStatusStage(2); // Stage 2: Cross-referencing government & scholarship registries

    // Stage 2 delay
    await new Promise((r) => setTimeout(r, 850));
    setAiStatusStage(3); // Stage 3: Evaluating deterministic thresholds & document gaps

    // Fire actual backend evaluation
    let responseData: any = null;
    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: prof, documents: docs })
      });
      responseData = await res.json();
    } catch (err) {
      console.error("Assessment error", err);
    }

    // Stage 3 to 4 pacing
    await new Promise((r) => setTimeout(r, 800));
    setAiStatusStage(4); // Stage 4: Compiling evidence & drafting action plan
    await new Promise((r) => setTimeout(r, 650));

    if (responseData && responseData.success && responseData.results) {
      setAssessmentResults(responseData.results);
      setActiveTab("results");

      const topEligible = responseData.results.find((r: SchemeMatchResult) => r.status === "likely_eligible") || responseData.results[0];
      if (topEligible) {
        setSelectedSchemeId(topEligible.schemeId);
        fetchActionPlan([topEligible], prof.fullName);
      }
    }

    setIsLoading(false);
    setAiStatusStage(0);
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
      {/* Top Header & Fast Track Persona Selector */}
      <div className="paper-card rounded-2xl p-6 sm:p-7 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-terracotta-700 stamp-badge px-2 py-0.5 bg-sand-200/70 border border-sand-300">
                Evaluation Workspace
              </span>
              <span className="text-sand-600 text-xs">• Verified Reference Data</span>
            </div>
            <h1 className="text-2xl font-bold text-warmcharcoal tracking-tight font-sans">
              Eligibility & Opportunity Assessment
            </h1>
            <p className="text-xs text-warmcharcoal-light mt-1 max-w-xl leading-relaxed">
              Examine national scholarships, research fellowships, startup seed grants, and welfare programs tailored to individual applicant circumstances.
            </p>
          </div>

          {/* Persona Selector Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase text-sand-700 tracking-wider">
                Select Persona Profile
              </span>
              <select
                value={selectedPersonaIndex}
                onChange={(e) => handlePersonaChange(Number(e.target.value))}
                className="mt-1 px-3 py-2 paper-input rounded-lg text-xs font-medium text-warmcharcoal focus:outline-none"
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
              className="mt-4 px-4 py-2 bg-terracotta-700 hover:bg-terracotta-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isLoading ? "Reviewing..." : "Run Evaluation"}</span>
            </button>
          </div>
        </div>

        {/* Active Persona Banner Details */}
        <div className="mt-5 pt-3.5 border-t border-sand-200/80 flex flex-wrap items-center gap-4 text-xs text-warmcharcoal-light">
          <span className="font-semibold text-warmcharcoal">
            {currentPersona.profile.fullName} ({currentPersona.profile.age}y, {currentPersona.profile.state})
          </span>
          <span className="text-sand-400">•</span>
          <span>Occupation: {currentPersona.profile.occupation}</span>
          <span className="text-sand-400">•</span>
          <span>Annual Income: ₹{(currentPersona.profile.annualIncome).toLocaleString("en-IN")}</span>
          <span className="text-sand-400">•</span>
          <span>Focus: {currentPersona.profile.goalOrNeed || "All applicable opportunities"}</span>
          <span className="text-sand-400">•</span>
          <span>Verified Records: {documents.length}</span>
        </div>
      </div>

      {/* Deliberate Pacing Status Experience */}
      {isLoading && (
        <div className="mb-8 p-6 paper-card rounded-2xl border-terracotta-200/80 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Feather className="w-4 h-4 text-terracotta-700 animate-pulse" />
              <h3 className="text-sm font-semibold text-warmcharcoal">
                Evaluating Eligibility & Cross-Referencing Knowledge Base...
              </h3>
            </div>
            <span className="text-[11px] font-mono text-sand-700">
              {aiStatusStage === 1 && "Verifying facts..."}
              {aiStatusStage === 2 && "Scanning criteria..."}
              {aiStatusStage === 3 && "Auditing documents..."}
              {aiStatusStage === 4 && "Drafting roadmap..."}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-lg border transition-all duration-300 flex items-center gap-2.5 ${aiStatusStage >= 1 ? "bg-amberwarm-50/90 border-amberwarm-300 text-amberwarm-900 font-medium" : "bg-white/40 border-sand-200 text-sand-500"}`}>
              {aiStatusStage > 1 ? <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> : <Clock className="w-4 h-4 shrink-0 text-amberwarm-700 animate-spin" />}
              <span>1. Profile Understanding</span>
            </div>
            <div className={`p-3 rounded-lg border transition-all duration-300 flex items-center gap-2.5 ${aiStatusStage >= 2 ? "bg-amberwarm-50/90 border-amberwarm-300 text-amberwarm-900 font-medium" : "bg-white/40 border-sand-200 text-sand-500"}`}>
              {aiStatusStage > 2 ? <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> : aiStatusStage === 2 ? <Clock className="w-4 h-4 shrink-0 text-amberwarm-700 animate-spin" /> : <Clock className="w-4 h-4 shrink-0 text-sand-400" />}
              <span>2. Program Matching</span>
            </div>
            <div className={`p-3 rounded-lg border transition-all duration-300 flex items-center gap-2.5 ${aiStatusStage >= 3 ? "bg-amberwarm-50/90 border-amberwarm-300 text-amberwarm-900 font-medium" : "bg-white/40 border-sand-200 text-sand-500"}`}>
              {aiStatusStage > 3 ? <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> : aiStatusStage === 3 ? <Clock className="w-4 h-4 shrink-0 text-amberwarm-700 animate-spin" /> : <Clock className="w-4 h-4 shrink-0 text-sand-400" />}
              <span>3. Document Gap Audit</span>
            </div>
            <div className={`p-3 rounded-lg border transition-all duration-300 flex items-center gap-2.5 ${aiStatusStage >= 4 ? "bg-amberwarm-50/90 border-amberwarm-300 text-amberwarm-900 font-medium" : "bg-white/40 border-sand-200 text-sand-500"}`}>
              {aiStatusStage === 4 ? <Clock className="w-4 h-4 shrink-0 text-amberwarm-700 animate-spin" /> : <Clock className="w-4 h-4 shrink-0 text-sand-400" />}
              <span>4. Action Roadmap</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-sand-300/80 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "profile"
              ? "border-terracotta-700 text-terracotta-800 bg-white/70"
              : "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>1. Profile & Verification</span>
        </button>

        <button
          onClick={() => {
            if (assessmentResults) setActiveTab("results");
          }}
          disabled={!assessmentResults}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "results"
              ? "border-terracotta-700 text-terracotta-800 bg-white/70"
              : assessmentResults
              ? "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
              : "border-transparent text-sand-500 cursor-not-allowed"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>
            2. Verified Matches {assessmentResults && `(${assessmentResults.length})`}
          </span>
        </button>

        <button
          onClick={() => {
            if (actionPlan) setActiveTab("action_plan");
          }}
          disabled={!actionPlan}
          className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "action_plan"
              ? "border-terracotta-700 text-terracotta-800 bg-white/70"
              : actionPlan
              ? "border-transparent text-warmcharcoal-light hover:text-warmcharcoal"
              : "border-transparent text-sand-500 cursor-not-allowed"
          }`}
        >
          <FileCheck className="w-4 h-4 text-terracotta-700" />
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
      <Suspense fallback={<div className="p-12 text-center text-xs text-sand-700">Loading Assessment Session...</div>}>
        <DashboardContent />
      </Suspense>
      <Footer />
    </div>
  );
}
