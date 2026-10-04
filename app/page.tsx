import Link from "next/link";
import { Navigation, Footer } from "@/components/ui/navigation";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Search,
  ListTodo,
  Shield,
  Layers,
  Cpu,
  HelpCircle,
  FileText,
  BadgeAlert
} from "lucide-react";
import { CURATED_SCHEMES } from "@/lib/data/curated-schemes";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/70 text-brand-800 text-xs font-semibold mb-6 border border-brand-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
              <span>AI-Powered Public-Service Eligibility & Application Copilot</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Know what you qualify for. <br />
              <span className="bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Know what to do next.
              </span>
            </h1>

            {/* Tagline & Supporting */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
              CivicFlow analyzes your profile and supporting documents to identify potentially relevant public programs and turns them into a practical, evidence-backed application checklist.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Check My Eligibility</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/dashboard?demo=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 shadow-sm transition-all hover:border-slate-400 active:scale-[0.98]"
              >
                <span>Try Demo Persona</span>
                <span className="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 font-medium">1-Click</span>
              </Link>
            </div>

            {/* Trust disclaimer badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Zero hallucinations: Grounded in official scheme rules + deterministic threshold matching.</span>
            </div>
          </div>

          {/* Interactive Feature Preview / Signature Mockup */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-medium text-slate-500">
                  civicflow-ai // live-assessment-preview
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Confidence: 94% High
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: Why you match */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Layer 1 & 2 • Why Matched
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1 mb-3">
                    MahaDBT Professional Scholarship
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Regular Enrolled Student (Maharashtra)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Verified Income: ₹2,40,000 ≤ ₹2,50,000 limit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Aadhaar ID biometric seeded</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-mono">
                  Benefit: Up to ₹60,000 / yr + Tuition Waiver
                </div>
              </div>

              {/* Box 2: Missing Documents */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">
                    Layer 3 • Verification Audit
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1 mb-3">
                    Document Readiness (75%)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Income Certificate: Verified Tahsildar</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Aadhaar Card: Linked & Validated</span>
                    </li>
                    <li className="flex items-start gap-2 text-amber-800 font-semibold">
                      <BadgeAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Missing: College Bonafide Certificate</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 font-medium">
                  Action: Obtain before portal deadline
                </div>
              </div>

              {/* Box 3: Action Plan */}
              <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/70 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-brand-800 tracking-wider">
                    Layer 4 • CivicFlow Action Plan
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mt-1 mb-3">
                    Personalized Next Steps
                  </h4>
                  <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside font-medium">
                    <li>Download bonafide form from college portal</li>
                    <li>Verify revenue stamp on income proof</li>
                    <li>Digitize files into &lt;2MB PDF attachments</li>
                    <li>Submit directly on MahaDBT official portal</li>
                  </ol>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-200/60">
                  <Link
                    href="/dashboard?demo=true"
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                  >
                    <span>Launch interactive plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest font-bold text-brand-600 mb-2">
              How CivicFlow Works
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900">
              The 3-Step Path from Confusion to Clarity
            </h3>
            <p className="mt-3 text-slate-600">
              Transforming messy criteria, state notifications, and scattered documents into an actionable plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Profile & Document Input</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter simple parameters (age, state, occupation, income) or drop certificates. Our extractor parses income, dates, and issuing bodies without collecting unnecessary sensitive data.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Deterministic Rules & AI Reasoning</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Code rigorously validates numeric thresholds, state jurisdictions, and required document sets. LLM prompts generate contextual explanations and resolve edge cases.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">CivicFlow Action Plan</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive prioritized recommendations, exact evidence of qualification, identified missing documents, and an interactive step-by-step checklist directing you to official portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-600">
                Curated Knowledge Base
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
                Explore Available Public Programs
              </h3>
              <p className="mt-2 text-slate-600 max-w-xl text-sm">
                Actively maintained records with structured eligibility criteria, official ministry sources, and verified document mandates.
              </p>
            </div>
            <Link
              href="/schemes"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              <span>View all {CURATED_SCHEMES.length} schemes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_SCHEMES.slice(0, 3).map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-3">
                    <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                      {scheme.category}
                    </span>
                    <span className="text-slate-400">{scheme.region}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 line-clamp-1">
                    {scheme.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {scheme.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Benefit
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      {scheme.benefitAmount}
                    </span>
                  </div>
                  <Link
                    href={`/schemes`}
                    className="text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safe AI Principles */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-brand-50 text-brand-700 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Responsible AI & Fact-Grounded Decisioning</h3>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            CivicFlow does not hallucinate government benefits or legal qualifications. We use deterministic code for numbers, limits, and deadlines; language models are reserved for natural-language interpretation, document fact normalization, and personalized action generation.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-slate-900 block">Ground Truth Sources</span>
              <span className="text-[11px] text-slate-500">All schemes backed by verified ministry citations.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-slate-900 block">Deterministic Rules</span>
              <span className="text-[11px] text-slate-500">Numeric thresholds verified without stochastic guesswork.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-slate-900 block">Explicit Uncertainty</span>
              <span className="text-[11px] text-slate-500">Highlights unverified fields rather than assuming.</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
              <span className="text-xs font-bold text-slate-900 block">No Secret Retention</span>
              <span className="text-[11px] text-slate-500">Uploads processed in-memory during assessment session.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
