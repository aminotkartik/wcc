"use client";

import { useState } from "react";
import { UserProfile, ExtractedDocumentFact } from "@/lib/types";
import { Sparkles, ChevronRight, ChevronLeft, Upload, Trash2, CheckCircle2, MessageSquare, Edit3, Loader2 } from "lucide-react";

interface ProfileBuilderProps {
  initialProfile: UserProfile;
  initialDocuments: ExtractedDocumentFact[];
  onComplete: (profile: UserProfile, documents: ExtractedDocumentFact[]) => void;
  isLoading: boolean;
}

export function ProfileBuilder({
  initialProfile,
  initialDocuments,
  onComplete,
  isLoading
}: ProfileBuilderProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [documents, setDocuments] = useState<ExtractedDocumentFact[]>(initialDocuments);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Natural Language Entry State
  const [naturalText, setNaturalText] = useState("");
  const [isParsingNatural, setIsParsingNatural] = useState(false);
  const [naturalParsedNotice, setNaturalParsedNotice] = useState<string | null>(null);

  const statesList = [
    "All India",
    "Maharashtra",
    "Karnataka",
    "Delhi",
    "Tamil Nadu",
    "Uttar Pradesh",
    "Gujarat",
    "Rajasthan",
    "West Bengal",
    "Telangana",
    "Kerala"
  ];

  const occupations = [
    "Student",
    "Self-Employed",
    "Unemployed",
    "Farmer",
    "Salaried Professional",
    "Artisan",
    "Entrepreneur"
  ];

  const educationLevels = [
    "High School",
    "Diploma",
    "Undergraduate",
    "Postgraduate",
    "Doctorate",
    "None/Basic"
  ];

  const handleNaturalLanguageParse = async () => {
    if (!naturalText.trim()) return;
    setIsParsingNatural(true);
    setNaturalParsedNotice(null);

    try {
      const res = await fetch("/api/profile/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: naturalText })
      });
      const data = await res.json();
      if (data.success && data.profile) {
        const p = data.profile;
        setProfile((prev) => ({
          ...prev,
          fullName: p.fullName || prev.fullName,
          age: p.age || prev.age,
          state: p.state || prev.state,
          occupation: p.occupation || prev.occupation,
          studentStatus: p.studentStatus !== undefined ? p.studentStatus : prev.studentStatus,
          educationLevel: p.educationLevel || prev.educationLevel,
          course: p.course || prev.course,
          annualIncome: p.annualIncome || prev.annualIncome,
          category: p.category || prev.category,
          goalOrNeed: p.goalOrNeed || prev.goalOrNeed
        }));
        setNaturalParsedNotice(`AI successfully extracted profile attributes (${data.source === "groq" ? "via Groq API" : "via heuristic extraction"}).`);
      }
    } catch (err) {
      console.error("Natural language parse failed", err);
    } finally {
      setIsParsingNatural(false);
    }
  };

  const handleSimulatedUpload = (docType: string, defaultName: string) => {
    let newDoc: ExtractedDocumentFact;
    if (docType === "income_certificate") {
      newDoc = {
        documentType: "income_certificate",
        fileName: defaultName,
        confidence: 0.96,
        extractedFields: {
          annualIncome: profile.annualIncome || 240000,
          issueDate: "2026-08-18",
          issuingAuthority: "Tahsildar / Sub-Divisional Magistrate",
          certificateNumber: "MH/REV/2026/89412"
        },
        verifiedByUser: true,
        uploadedAt: new Date().toISOString()
      };
    } else if (docType === "aadhaar_card") {
      newDoc = {
        documentType: "aadhaar_card",
        fileName: defaultName,
        confidence: 0.98,
        extractedFields: {
          nameMatch: profile.fullName || "Applicant",
          dob: "2005-04-12",
          stateMatch: profile.state || "Maharashtra",
          aadhaarLastFour: "8841"
        },
        verifiedByUser: true,
        uploadedAt: new Date().toISOString()
      };
    } else {
      newDoc = {
        documentType: "bonafide_certificate",
        fileName: defaultName,
        confidence: 0.94,
        extractedFields: {
          courseMatch: profile.course || "Degree Program",
          institution: profile.institutionType || "Recognized College",
          status: "Regular Bonafide Scholar"
        },
        verifiedByUser: true,
        uploadedAt: new Date().toISOString()
      };
    }

    setDocuments((prev) => [...prev.filter((d) => d.documentType !== docType), newDoc]);
    setUploadNotice(`Extracted fields from "${defaultName}" with ${Math.round(newDoc.confidence * 100)}% confidence`);
    setTimeout(() => setUploadNotice(null), 4000);
  };

  const removeDoc = (type: string) => {
    setDocuments((prev) => prev.filter((d) => d.documentType !== type));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile, documents);
  };

  return (
    <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Natural Language Self-Description Entry (Groq Feature) */}
      <div className="p-5 rounded-xl bg-amberwarm-50/60 border border-amberwarm-200">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-terracotta-600" />
          <h3 className="text-sm font-bold text-warmcharcoal">
            Natural-Language Entry: Describe Your Situation
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800 font-bold ml-auto">
            Groq AI Powered
          </span>
        </div>
        <p className="text-xs text-warmcharcoal-light mb-3">
          Type naturally in plain English (e.g. &ldquo;I&apos;m a 20-year-old engineering student from Pune looking for a tuition scholarship, family income 2.4L&rdquo;).
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            rows={2}
            value={naturalText}
            onChange={(e) => setNaturalText(e.target.value)}
            placeholder="Type your situation here or try: I am a 21-year-old undergraduate in Maharashtra seeking financial assistance, family income is 2.4 lakh..."
            className="flex-1 p-3 bg-white border border-sand-300 rounded-lg text-xs text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
          />
          <button
            type="button"
            onClick={handleNaturalLanguageParse}
            disabled={isParsingNatural || !naturalText.trim()}
            className="px-4 py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
          >
            {isParsingNatural ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Interpreting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Parse Situation</span>
              </>
            )}
          </button>
        </div>

        {naturalParsedNotice && (
          <div className="mt-3 p-2.5 bg-white border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{naturalParsedNotice} Check the pre-filled fields below.</span>
          </div>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-sand-200 pb-4">
        {[
          { num: 1, label: "Identity & Domicile" },
          { num: 2, label: "Education & Income" },
          { num: 3, label: "Supporting Documents" }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num
                  ? "bg-terracotta-600 text-white shadow-md shadow-terracotta-500/25"
                  : step > s.num
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-sand-100 text-sand-700"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`text-xs font-semibold hidden sm:inline ${
                step === s.num ? "text-warmcharcoal" : "text-sand-700"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Identity */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-warmcharcoal">Step 1: Your Demographic & Location Context</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="80"
                  required
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Domicile / State</label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Primary Occupation</label>
                <select
                  value={profile.occupation}
                  onChange={(e) => {
                    const occ = e.target.value;
                    setProfile({
                      ...profile,
                      occupation: occ,
                      studentStatus: occ === "Student"
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  {occupations.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Primary Need / Goal</label>
              <input
                type="text"
                value={profile.goalOrNeed || ""}
                onChange={(e) => setProfile({ ...profile, goalOrNeed: e.target.value })}
                placeholder="e.g. Tuition fee waiver, seed capital grant, skill stipend, agricultural support"
                className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs transition-colors"
              >
                <span>Continue to Financials</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Financial & Educational */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-warmcharcoal">Step 2: Education, Income & Social Category</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">
                  Annual Household Income (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sand-700 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={profile.annualIncome}
                    onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">
                  Category (Social & Economic)
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  <option value="General">General / Open</option>
                  <option value="General / EWS">General (Economically Weaker Section - EWS)</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Education Level</label>
                <select
                  value={profile.educationLevel}
                  onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                >
                  {educationLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-warmcharcoal-light block mb-1">Course / Trade / Specialization</label>
                <input
                  type="text"
                  value={profile.course || ""}
                  onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                  placeholder="e.g. B.Tech Engineering, Biotechnology, Electrical Vocational"
                  className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-lg text-sm text-warmcharcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-warmcharcoal-light hover:bg-sand-100 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs transition-colors"
              >
                <span>Continue to Documents</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Document Verification & Extraction */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-warmcharcoal">Step 3: Supporting Document Verification</h3>

            {uploadNotice && (
              <div className="p-3 bg-amberwarm-50 border border-amberwarm-200 rounded-lg text-xs text-amberwarm-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadNotice}</span>
              </div>
            )}

            {/* Simulated quick-add document chips */}
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold text-warmcharcoal block mb-2">
                Simulate Instant Document Extraction:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("income_certificate", "Official_Income_Certificate_2026.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 hover:border-terracotta-500 hover:text-terracotta-700 text-xs font-medium text-warmcharcoal shadow-2xs flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>+ Income Certificate (₹2.4L)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("aadhaar_card", "Aadhaar_National_ID.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 hover:border-terracotta-500 hover:text-terracotta-700 text-xs font-medium text-warmcharcoal shadow-2xs flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>+ Aadhaar Identity Proof</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("bonafide_certificate", "College_Bonafide_Study.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-sand-300 hover:border-terracotta-500 hover:text-terracotta-700 text-xs font-medium text-warmcharcoal shadow-2xs flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-terracotta-600" />
                  <span>+ Bonafide Certificate</span>
                </button>
              </div>
            </div>

            {/* Currently Extracted Documents */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-warmcharcoal block">
                Attached Documents ({documents.length}):
              </span>

              {documents.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-sand-300 text-center text-xs text-sand-800">
                  No documents attached yet. You can still run the eligibility assessment using your stated profile facts.
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.documentType}
                    className="p-3 rounded-lg bg-white border border-sand-200 shadow-2xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-warmcharcoal">{doc.fileName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          {Math.round(doc.confidence * 100)}% Confidence
                        </span>
                      </div>
                      <div className="text-[11px] text-warmcharcoal-muted mt-1 font-mono">
                        {Object.entries(doc.extractedFields)
                          .slice(0, 3)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" | ")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDoc(doc.documentType)}
                      className="p-1 text-sand-700 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-warmcharcoal-light hover:bg-sand-100 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-terracotta-600 to-amberwarm-600 hover:from-terracotta-700 hover:to-amberwarm-700 text-white font-bold text-xs shadow-md shadow-terracotta-500/25 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? "Running Groq Assessment..." : "Discover Programs & Action Plan"}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
