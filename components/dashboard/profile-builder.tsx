"use client";

import { useState } from "react";
import { UserProfile, ExtractedDocumentFact } from "@/lib/types";
import { User, MapPin, Briefcase, GraduationCap, IndianRupee, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, Upload, Trash2, CheckCircle2 } from "lucide-react";

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

  const statesList = [
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
    "Salaried Professional"
  ];

  const educationLevels = [
    "High School",
    "Diploma",
    "Undergraduate",
    "Postgraduate",
    "Doctorate"
  ];

  const handleSimulatedUpload = (docType: string, defaultName: string) => {
    // Add realistic extracted mock document
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
          nameMatch: profile.fullName || "User",
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
          status: "Regular Bonafide Student"
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        {[
          { num: 1, label: "Identity & Location" },
          { num: 2, label: "Education & Income" },
          { num: 3, label: "Supporting Documents" }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/25"
                  : step > s.num
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`text-xs font-semibold hidden sm:inline ${
                step === s.num ? "text-slate-900" : "text-slate-400"
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
            <h3 className="text-lg font-bold text-slate-900">Step 1: Your Background & Location</h3>
            <p className="text-xs text-slate-500 -mt-3">
              Only demographic facts required for geographic and jurisdictional welfare schemes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="80"
                  required
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Domicile / State</label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Primary Occupation</label>
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {occupations.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
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
            <h3 className="text-lg font-bold text-slate-900">Step 2: Education, Income & Category</h3>
            <p className="text-xs text-slate-500 -mt-3">
              Essential for merit-cum-means scholarships, fee waivers, and category subsidies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Annual Family Income (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    step="10000"
                    required
                    value={profile.annualIncome}
                    onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  e.g., 240000 = ₹2.4 Lakhs/yr
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Social / Welfare Category
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
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
                <label className="text-xs font-bold text-slate-700 block mb-1">Education Level</label>
                <select
                  value={profile.educationLevel}
                  onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {educationLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course / Specialization</label>
                <input
                  type="text"
                  value={profile.course || ""}
                  onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                  placeholder="e.g. B.Tech Computer Engineering"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition-colors"
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
            <h3 className="text-lg font-bold text-slate-900">Step 3: Document Grounding & Verification</h3>
            <p className="text-xs text-slate-500 -mt-3">
              CivicFlow extracts verifiable attributes (income limits, issuing authority, identity) to confirm your readiness.
            </p>

            {uploadNotice && (
              <div className="p-3 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{uploadNotice}</span>
              </div>
            )}

            {/* Simulated quick-add document chips */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Simulate Instant Document Extraction:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("income_certificate", "Income_Certificate_2026.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-600 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-500" />
                  <span>+ Income Certificate (₹2.4L)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("aadhaar_card", "Aadhaar_UIDAI_Verified.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-600 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-500" />
                  <span>+ Aadhaar Card Proof</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedUpload("bonafide_certificate", "College_Bonafide_Study.pdf")}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-600 text-xs font-medium text-slate-700 shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-brand-500" />
                  <span>+ Bonafide Certificate</span>
                </button>
              </div>
            </div>

            {/* Currently Extracted Documents */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                Extracted & Attached Proofs ({documents.length}):
              </span>

              {documents.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
                  No documents attached yet. You can still run the eligibility assessment using your stated profile facts, or attach sample documents above for high confidence scoring.
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.documentType}
                    className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{doc.fileName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          {Math.round(doc.confidence * 100)}% Confidence
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        {Object.entries(doc.extractedFields)
                          .slice(0, 3)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" | ")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeDoc(doc.documentType)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? "Running Assessment..." : "Run CivicFlow Assessment"}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
