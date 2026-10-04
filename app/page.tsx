import Link from "next/link";
import { Navigation, Footer } from "@/components/ui/navigation";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Search,
  ListTodo,
  Shield,
  FileText,
  BadgeAlert,
  Compass,
  ScrollText,
  GraduationCap
} from "lucide-react";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";

export default function HomePage() {
  const scholarshipsCount = UNIVERSAL_PROGRAMS.filter(p => p.type === "Scholarship").length;

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-sand-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded stamp-badge bg-sand-200/80 text-warmcharcoal text-xs mb-6 border border-sand-300 shadow-2xs">
              <ScrollText className="w-3.5 h-3.5 text-terracotta-700" />
              <span>Public Benefit & Scholarship Eligibility Navigator</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmcharcoal tracking-tight leading-[1.2] font-sans">
              Find the opportunities <br />
              <span className="text-terracotta-700 underline decoration-sand-300 decoration-2 underline-offset-4">
                you may qualify for.
              </span>
            </h1>

            {/* Supporting statement */}
            <p className="mt-5 text-base sm:text-lg text-warmcharcoal-light font-normal leading-relaxed max-w-2xl mx-auto">
              CivicFlow analyzes your background and verification documents to identify relevant scholarships, research fellowships, and public welfare programs—explaining precisely why they fit and what to do next.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white font-medium text-sm shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Check My Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard?demo=true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg paper-card hover:bg-white text-warmcharcoal font-medium text-sm transition-all active:scale-[0.98]"
              >
                <span>Try Demo Persona</span>
                <span className="text-xs px-2 py-0.5 rounded stamp-badge bg-sand-200 text-sand-800 border border-sand-300 font-mono">1-Click</span>
              </Link>
            </div>

            {/* Program Type Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-sand-800">
              <span className="px-3 py-1 rounded paper-card-subtle font-medium text-warmcharcoal">🎓 {scholarshipsCount} Scholarships</span>
              <span className="px-3 py-1 rounded paper-card-subtle font-medium text-warmcharcoal">🔬 Research Fellowships</span>
              <span className="px-3 py-1 rounded paper-card-subtle font-medium text-warmcharcoal">🌱 Agricultural Grants</span>
              <span className="px-3 py-1 rounded paper-card-subtle font-medium text-warmcharcoal">💼 Credit Subsidies</span>
              <span className="px-3 py-1 rounded paper-card-subtle font-medium text-warmcharcoal">🛡️ Social Assistance</span>
            </div>
          </div>

          {/* Interactive Feature Preview / Signature Mockup */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl paper-card p-5 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3.5 mb-4 text-xs font-mono text-sand-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sand-400" />
                <span>civicflow // assessment-record-01</span>
              </div>
              <span className="stamp-badge px-2 py-0.5 bg-sand-200 border border-sand-300 text-warmcharcoal font-semibold">
                Confidence: 94% High
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Box 1: Why you match */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-sand-700 tracking-wider">
                    Profile Verification
                  </span>
                  <h4 className="text-sm font-semibold text-warmcharcoal mt-1 mb-2.5">
                    Central Sector Merit Scholarship
                  </h4>
                  <ul className="space-y-1.5 text-xs text-warmcharcoal-light">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Regular Enrolled University Student</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Verified Income: ₹2,40,000 ≤ ₹4,50,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Age ≤ 25 years verified</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-terracotta-700 font-medium">
                  Benefit: Up to ₹20,000 / yr Direct Grant
                </div>
              </div>

              {/* Box 2: Missing Documents */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-sand-700 tracking-wider">
                    Certificate Gap Audit
                  </span>
                  <h4 className="text-sm font-semibold text-warmcharcoal mt-1 mb-2.5">
                    Document Readiness (75%)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-warmcharcoal-light">
                    <li className="flex items-start gap-2 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Income Certificate: Verified Tahsildar</span>
                    </li>
                    <li className="flex items-start gap-2 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Aadhaar Card: Linked & Validated</span>
                    </li>
                    <li className="flex items-start gap-2 text-warmcharcoal">
                      <BadgeAlert className="w-3.5 h-3.5 text-terracotta-600 shrink-0 mt-0.5" />
                      <span>Missing: College Bonafide Certificate</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-warmcharcoal-muted">
                  Required: Obtain prior to portal filing
                </div>
              </div>

              {/* Box 3: Action Plan */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-sand-700 tracking-wider">
                    Application Roadmap
                  </span>
                  <h4 className="text-sm font-semibold text-warmcharcoal mt-1 mb-2.5">
                    Recommended Sequence
                  </h4>
                  <ol className="space-y-1.5 text-xs text-warmcharcoal-light list-decimal list-inside">
                    <li>Download bonafide form from college</li>
                    <li>Verify revenue authority stamp</li>
                    <li>Digitize attachments &lt; 2MB</li>
                    <li>Submit directly on official NSP portal</li>
                  </ol>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-200">
                  <Link
                    href="/dashboard?demo=true"
                    className="text-xs font-semibold text-terracotta-700 hover:text-terracotta-800 flex items-center gap-1"
                  >
                    <span>Launch roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Explorer Preview */}
      <section className="py-16 bg-sand-100/40 border-b border-sand-300/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-terracotta-700 stamp-badge px-2 py-0.5 bg-sand-200 border border-sand-300">
                Verified Registry
              </span>
              <h3 className="text-2xl font-bold text-warmcharcoal mt-2">
                Available Programs & Scholarships
              </h3>
              <p className="mt-1.5 text-warmcharcoal-light max-w-xl text-xs leading-relaxed">
                Curated public schemes across higher education, technical training, doctoral research, and community welfare.
              </p>
            </div>
            <Link
              href="/schemes"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-semibold text-terracotta-700 hover:text-terracotta-800"
            >
              <span>Explore all {UNIVERSAL_PROGRAMS.length} programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UNIVERSAL_PROGRAMS.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                className="paper-card rounded-xl p-5 flex flex-col justify-between hover:border-sand-400 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-2.5">
                    <span className="px-2 py-0.5 rounded stamp-badge bg-sand-200/90 text-warmcharcoal text-[11px] border border-sand-300">
                      {prog.type}
                    </span>
                    <span className="text-sand-700 text-[11px]">{prog.state}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-warmcharcoal line-clamp-1">
                    {prog.name}
                  </h4>
                  <p className="text-xs text-warmcharcoal-light mt-1.5 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-sand-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-sand-700 block">
                      Grant / Sanction
                    </span>
                    <span className="text-xs font-semibold text-terracotta-700">
                      {prog.benefitAmount}
                    </span>
                  </div>
                  <Link
                    href={`/schemes`}
                    className="text-xs font-medium text-terracotta-700 hover:underline"
                  >
                    Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Architecture Principles */}
      <section className="py-16 bg-white/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-warmcharcoal">Architectural Guardrails: Deterministic Logic First</h3>
          <p className="mt-2 text-warmcharcoal-light max-w-2xl mx-auto text-xs leading-relaxed">
            CivicFlow separates factual eligibility conditions from language interpretation. Numeric thresholds, domicile requirements, and academic criteria are validated with deterministic code; Groq API handles natural-language interpretation, statement parsing, and contextual action plans.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3 rounded-lg paper-card-subtle">
              <span className="text-xs font-semibold text-warmcharcoal block">Universal Catalog</span>
              <span className="text-[11px] text-warmcharcoal-muted">Broad coverage across education, skills, and welfare.</span>
            </div>
            <div className="p-3 rounded-lg paper-card-subtle">
              <span className="text-xs font-semibold text-warmcharcoal block">Deterministic Engine</span>
              <span className="text-[11px] text-warmcharcoal-muted">Exact limits evaluated without LLM guesswork.</span>
            </div>
            <div className="p-3 rounded-lg paper-card-subtle">
              <span className="text-xs font-semibold text-warmcharcoal block">Natural Statement Entry</span>
              <span className="text-[11px] text-warmcharcoal-muted">Parsed into verified profile structures.</span>
            </div>
            <div className="p-3 rounded-lg paper-card-subtle">
              <span className="text-xs font-semibold text-warmcharcoal block">Document Gap Audit</span>
              <span className="text-[11px] text-warmcharcoal-muted">Flags missing forms prior to submission.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
