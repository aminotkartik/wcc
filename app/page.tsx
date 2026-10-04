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
  BadgeAlert,
  HeartHandshake,
  GraduationCap,
  Building,
  Coins,
  Compass
} from "lucide-react";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-sand-100/70 via-sand-50 to-sand-50 border-b border-sand-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amberwarm-100 text-amberwarm-900 text-xs font-semibold mb-6 border border-amberwarm-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-terracotta-600 animate-pulse" />
              <span>Universal Public-Benefit & Opportunity Copilot</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-warmcharcoal tracking-tight leading-[1.15]">
              Find the opportunities <br />
              <span className="bg-gradient-to-r from-terracotta-700 via-terracotta-600 to-amberwarm-600 bg-clip-text text-transparent">
                you may qualify for.
              </span>
            </h1>

            {/* Supporting statement */}
            <p className="mt-6 text-lg sm:text-xl text-warmcharcoal-light font-normal leading-relaxed">
              CivicFlow uses AI to understand your situation, discover relevant scholarships and public-benefit programs, explain why they may fit, and show you what to do next.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-base shadow-lg shadow-terracotta-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Check My Eligibility</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/dashboard?demo=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-sand-100 text-warmcharcoal font-semibold text-base border border-sand-300 shadow-sm transition-all hover:border-sand-400 active:scale-[0.98]"
              >
                <span>Try Demo</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amberwarm-100 text-amberwarm-900 font-medium">1-Click</span>
              </Link>
            </div>

            {/* Program Type Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-sand-800">
              <span className="px-3 py-1 rounded-full bg-white border border-sand-200 shadow-2xs font-medium">🎓 Scholarships</span>
              <span className="px-3 py-1 rounded-full bg-white border border-sand-200 shadow-2xs font-medium">🔬 Research Fellowships</span>
              <span className="px-3 py-1 rounded-full bg-white border border-sand-200 shadow-2xs font-medium">🌱 Agricultural Grants</span>
              <span className="px-3 py-1 rounded-full bg-white border border-sand-200 shadow-2xs font-medium">💼 Startup & MSME Subsidies</span>
              <span className="px-3 py-1 rounded-full bg-white border border-sand-200 shadow-2xs font-medium">🛡️ Welfare Programs</span>
            </div>
          </div>

          {/* Interactive Feature Preview / Signature Mockup */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-sand-200/80">
            <div className="flex items-center justify-between border-b border-sand-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-terracotta-400" />
                <span className="w-3 h-3 rounded-full bg-amberwarm-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono font-medium text-warmcharcoal-muted">
                  civicflow-ai // universal-discovery-preview
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Confidence: 94% High
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: Why you match */}
              <div className="p-4 rounded-xl bg-sand-50 border border-sand-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-sand-700 tracking-wider">
                    Profile & Discovery
                  </span>
                  <h4 className="text-sm font-bold text-warmcharcoal mt-1 mb-3">
                    Central Sector Merit Scholarship
                  </h4>
                  <ul className="space-y-2 text-xs text-warmcharcoal-light">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Regular Enrolled University Student</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Verified Income: ₹2,40,000 ≤ ₹4,50,000 threshold</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Age ≤ 25 years verified</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-terracotta-700 font-semibold">
                  Benefit: Up to ₹20,000 / yr Direct Stipend
                </div>
              </div>

              {/* Box 2: Missing Documents */}
              <div className="p-4 rounded-xl bg-amberwarm-50/70 border border-amberwarm-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-amberwarm-900 tracking-wider">
                    Document Gap Analysis
                  </span>
                  <h4 className="text-sm font-bold text-warmcharcoal mt-1 mb-3">
                    Verification Readiness (75%)
                  </h4>
                  <ul className="space-y-2 text-xs text-warmcharcoal-light">
                    <li className="flex items-start gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Income Certificate: Verified Tahsildar</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Aadhaar Card: Linked & Validated</span>
                    </li>
                    <li className="flex items-start gap-2 text-amberwarm-900 font-semibold">
                      <BadgeAlert className="w-4 h-4 text-amberwarm-600 shrink-0 mt-0.5" />
                      <span>Missing: College Bonafide Certificate</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-amberwarm-200 text-[11px] text-amberwarm-900 font-medium">
                  Priority: Secure before portal submission
                </div>
              </div>

              {/* Box 3: Action Plan */}
              <div className="p-4 rounded-xl bg-terracotta-50/60 border border-terracotta-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-terracotta-800 tracking-wider">
                    CivicFlow Action Plan
                  </span>
                  <h4 className="text-sm font-bold text-warmcharcoal mt-1 mb-3">
                    Personalized Next Steps
                  </h4>
                  <ol className="space-y-2 text-xs text-warmcharcoal-light list-decimal list-inside font-medium">
                    <li>Download bonafide form from registrar</li>
                    <li>Verify revenue authority stamp</li>
                    <li>Digitize attachments into &lt;2MB files</li>
                    <li>Submit directly on official NSP portal</li>
                  </ol>
                </div>
                <div className="mt-4 pt-3 border-t border-terracotta-200">
                  <Link
                    href="/dashboard?demo=true"
                    className="text-xs font-bold text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
                  >
                    <span>Launch interactive copilot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Explorer Preview */}
      <section className="py-20 bg-sand-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600">
                Universal Knowledge Base
              </span>
              <h3 className="text-3xl font-extrabold text-warmcharcoal mt-1">
                Explore Available Programs & Opportunities
              </h3>
              <p className="mt-2 text-warmcharcoal-light max-w-xl text-sm">
                Curated public schemes, higher education scholarships, research fellowships, startup grants, and livelihood subsidies.
              </p>
            </div>
            <Link
              href="/schemes"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-700 hover:text-terracotta-800"
            >
              <span>View all {UNIVERSAL_PROGRAMS.length} programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UNIVERSAL_PROGRAMS.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-sand-200 p-6 flex flex-col justify-between hover:border-terracotta-400 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-3">
                    <span className="px-2.5 py-1 rounded bg-amberwarm-100 text-amberwarm-900">
                      {prog.type}
                    </span>
                    <span className="text-sand-700">{prog.state}</span>
                  </div>
                  <h4 className="text-base font-bold text-warmcharcoal line-clamp-1">
                    {prog.name}
                  </h4>
                  <p className="text-xs text-warmcharcoal-light mt-2 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sand-700 block">
                      Benefit
                    </span>
                    <span className="text-xs font-bold text-terracotta-700">
                      {prog.benefitAmount}
                    </span>
                  </div>
                  <Link
                    href={`/schemes`}
                    className="text-xs font-semibold text-terracotta-700 hover:underline"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Groq AI Architecture Principles */}
      <section className="py-16 bg-white border-t border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-amberwarm-100 text-terracotta-700 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-warmcharcoal">Hybrid Architecture: Groq AI + Deterministic Rules</h3>
          <p className="mt-3 text-warmcharcoal-light max-w-2xl mx-auto text-sm leading-relaxed">
            We use Groq API inference for natural-language profile understanding, document interpretation, and personalized action-plan synthesis. Exact numeric limits, age thresholds, and residency constraints are computed deterministically in backend code.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold text-warmcharcoal block">Universal Programs</span>
              <span className="text-[11px] text-warmcharcoal-muted">Scholarships, grants, subsidies, and welfare.</span>
            </div>
            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold text-warmcharcoal block">Deterministic Logic</span>
              <span className="text-[11px] text-warmcharcoal-muted">Numeric limits evaluated without LLM guessing.</span>
            </div>
            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold text-warmcharcoal block">Natural-Language Entry</span>
              <span className="text-[11px] text-warmcharcoal-muted">Describe your situation in plain English.</span>
            </div>
            <div className="p-3 rounded-lg bg-sand-50 border border-sand-200">
              <span className="text-xs font-bold text-warmcharcoal block">Document Gap Detection</span>
              <span className="text-[11px] text-warmcharcoal-muted">Pinpoints missing forms prior to submission.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
