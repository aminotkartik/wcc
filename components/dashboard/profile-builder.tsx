"use client";

import { useState } from "react";
import { UserProfile, ExtractedDocumentFact } from "@/lib/types";
import { ChevronRight, ChevronLeft, Upload, Trash2, CheckCircle2, MessageSquare, Edit3, Loader2, FileText, Compass, Sparkles } from "lucide-react";

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

    // Natural human-like pause while reviewing description
    await new Promise((r) => setTimeout(r, 650));

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
        setNaturalParsedNotice(`Extracted parameters (${data.source === "groq" ? "Groq inference" : "heuristic parser"}). Please review the fields below.`);
      }
    } catch (err) {
      console.error("Natural language parse failed", err);
    } finally {
      setIsParsingNatural(false);
    }
  };

  const handleSimulatedUpload = async (docType: string, defaultName: string) => {
    setUploadNotice(`Reading certificate text: "${defaultName}"...`);
    await new Promise((r) => setTimeout(r, 600));

    let newDoc: ExtractedDocumentFact;
    if (docType === "income_certificate") {
      newDoc = {
        documentType: "income_certificate",
        fileName: defaultName,
        confidence: 0.96,
        extractedFields: {
          annualIncome: profile.annualIncome || 240000,
          issueDate: "2026-08-18",
          issuingAuthority: "Tahsildar / Revenue Authority",
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
          courseMatch: profile.course || "Degree Course",
          institution: profile.institutionType || "Recognized College",
          status: "Regular Bonafide Student"
        },
        verifiedByUser: true,
        uploadedAt: new Date().toISOString()
      };
    }

    setDocuments((prev) => [...prev.filter((d) => d.documentType !== docType), newDoc]);
    setUploadNotice(`Verified "${defaultName}" with ${Math.round(newDoc.confidence * 100)}% confidence stamp.`);
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
    <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6 bg-white border-1.5 border-manga-ink shadow-manga">
      {/* Natural Language Self-Description Entry */}
      <div className="p-5 rounded-xl bg-manga-parchment border-1.5 border-manga-ink shadow-manga-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <MessageSquare className="w-4 h-4 text-manga-vermilion" />
          <h3 className="text-sm font-bold text-manga-ink font-mono uppercase">
            SPEECH ENTRY: DESCRIBE YOUR CIRCUMSTANCES
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded stamp-badge bg-white text-manga-ink font-mono font-bold ml-auto border border-manga-ink">
            GROQ PARSER
          </span>
        </div>
        <p className="text-xs text-warmcharcoal-light mb-3">
          Explain in your own words (e.g. &ldquo;I&apos;m a 20-year-old engineering student from Pune looking for a tuition scholarship, family income 2.4L&rdquo;).
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <textarea
            rows={2}
            value={naturalText}
            onChange={(e) => setNaturalText(e.target.value)}
            placeholder="Type your background here or try: I am a 21-year-old undergraduate in Maharashtra seeking financial assistance, family income is 2.4 lakh..."
            className="flex-1 p-3 paper-input rounded-lg text-xs text-manga-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={handleNaturalLanguageParse}
            disabled={isParsingNatural || !naturalText.trim()}
            className="px-4 py-2.5 bg-manga-ink hover:bg-manga-vermilion text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 shadow-manga-sm font-mono uppercase border-1.5 border-manga-ink active:translate-x-[1px] active:translate-y-[1px]"
          >
            {isParsingNatural ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Parsing...</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>Parse Statement</span>
              </>
            )}
          </button>
        </div>

        {naturalParsedNotice && (
          <div className="mt-3 p-2.5 bg-white border border-emerald-600 rounded-lg text-xs text-emerald-900 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{naturalParsedNotice}</span>
          </div>
        )}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b-1.5 border-manga-ink pb-4 font-mono">
        {[
          { num: 1, label: "01 // RESIDENCY" },
          { num: 2, label: "02 // INCOME & STUDY" },
          { num: 3, label: "03 // CERTIFICATES" }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-1.5 border-manga-ink transition-all ${
                step === s.num
                  ? "bg-manga-ink text-white shadow-manga-sm"
                  : step > s.num
                  ? "bg-emerald-100 text-manga-ink font-bold"
                  : "bg-manga-parchment text-sand-500"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`text-xs font-bold hidden sm:inline ${
                step === s.num ? "text-manga-ink" : "text-sand-600"
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
            <h3 className="text-base font-bold text-manga-ink font-sans">Step 1: Your Demographic Context</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="80"
                  required
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-mono font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Domicile / State</label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Occupation</label>
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
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
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
              <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Stated Goal or Financial Need</label>
              <input
                type="text"
                value={profile.goalOrNeed || ""}
                onChange={(e) => setProfile({ ...profile, goalOrNeed: e.target.value })}
                placeholder="e.g. Tuition fee waiver, seed capital grant, skill stipend, agricultural support"
                className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-manga-ink hover:bg-manga-vermilion text-white font-bold text-xs transition-colors shadow-manga-sm border-1.5 border-manga-ink font-mono uppercase"
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
            <h3 className="text-base font-bold text-manga-ink font-sans">Step 2: Educational Context & Family Income</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">
                  Annual Family Income (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2 text-manga-ink font-bold text-sm">₹</span>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={profile.annualIncome}
                    onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-2 paper-input rounded-lg text-sm text-manga-ink font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">
                  Reservation / Category
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
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
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Education Level</label>
                <select
                  value={profile.educationLevel}
                  onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
                >
                  {educationLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-manga-ink block mb-1 font-mono uppercase">Course / Discipline</label>
                <input
                  type="text"
                  value={profile.course || ""}
                  onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                  placeholder="e.g. B.Tech Engineering, Biotechnology, Electrical Vocational"
                  className="w-full px-3.5 py-2 paper-input rounded-lg text-sm text-manga-ink font-medium"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border-1.5 border-manga-ink text-manga-ink hover:bg-manga-parchment text-xs font-bold font-mono uppercase shadow-manga-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-manga-ink hover:bg-manga-vermilion text-white font-bold text-xs transition-colors shadow-manga-sm border-1.5 border-manga-ink font-mono uppercase"
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
            <h3 className="text-base font-bold text-manga-ink font-sans">Step 3: Verification & Certificate Scrutiny</h3>

            {uploadNotice && (
              <div className="p-3 bg-amberwarm-100 border-1.5 border-manga-ink rounded-lg text-xs text-manga-ink font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{uploadNotice}</span>
              </div>
            )}

            {/* Quick add certificate chips */}
            <div className="p-4 rounded-xl bg-manga-parchment border-1.5 border-manga-ink shadow-manga-sm">
              <span className="text-xs font-bold text-manga-ink block mb-2 font-mono uppercase">
                Attach Sample Certificate Proofs:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("income_certificate", "Official_Income_Certificate_2026.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border-1.5 border-manga-ink hover:bg-sand-100 text-xs font-bold text-manga-ink shadow-manga-sm flex items-center gap-1.5 transition-all font-mono"
                >
                  <Upload className="w-3.5 h-3.5 text-manga-vermilion" />
                  <span>+ Income Certificate (₹2.4L)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("aadhaar_card", "Aadhaar_National_ID.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border-1.5 border-manga-ink hover:bg-sand-100 text-xs font-bold text-manga-ink shadow-manga-sm flex items-center gap-1.5 transition-all font-mono"
                >
                  <Upload className="w-3.5 h-3.5 text-manga-vermilion" />
                  <span>+ Aadhaar Identity Proof</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("bonafide_certificate", "College_Bonafide_Study.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border-1.5 border-manga-ink hover:bg-sand-100 text-xs font-bold text-manga-ink shadow-manga-sm flex items-center gap-1.5 transition-all font-mono"
                >
                  <Upload className="w-3.5 h-3.5 text-manga-vermilion" />
                  <span>+ Bonafide Certificate</span>
                </button>
              </div>
            </div>

            {/* Currently Attached Documents */}
            <div className="space-y-3 font-mono">
              <span className="text-xs font-bold text-manga-ink block uppercase">
                Attached Verification Proofs ({documents.length}):
              </span>

              {documents.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-manga-ink text-center text-xs text-warmcharcoal-muted">
                  No documents attached yet. Evaluation will proceed using your stated profile facts.
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.documentType}
                    className="p-3 rounded-lg bg-white border-1.5 border-manga-ink shadow-manga-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-manga-ink">{doc.fileName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-manga-ink font-bold">
                          {Math.round(doc.confidence * 100)}% CONFIDENCE
                        </span>
                      </div>
                      <div className="text-[11px] text-warmcharcoal-muted mt-1">
                        {Object.entries(doc.extractedFields)
                          .slice(0, 3)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" | ")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDoc(doc.documentType)}
                      className="p-1 text-manga-ink hover:text-manga-vermilion rounded"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border-1.5 border-manga-ink text-manga-ink hover:bg-manga-parchment text-xs font-bold font-mono uppercase shadow-manga-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-manga-ink hover:bg-manga-vermilion text-white font-bold text-xs shadow-manga border-1.5 border-manga-ink transition-all disabled:opacity-50 font-mono uppercase"
              >
                <Compass className="w-4 h-4" />
                <span>{isLoading ? "Reviewing..." : "Scan Opportunities & Build Plan"}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
