import Link from "next/link";
import Image from "next/image";
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
  GraduationCap,
  Users,
  Feather,
  Zap,
  Sparkles,
  BookOpen
} from "lucide-react";
import { UNIVERSAL_PROGRAMS } from "@/lib/data/curated-schemes";

export default function HomePage() {
  const scholarshipsCount = UNIVERSAL_PROGRAMS.filter(p => p.type === "Scholarship").length;

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b-2 border-manga-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded stamp-badge bg-manga-parchment text-manga-ink text-xs mb-5 shadow-manga-sm">
                <span className="w-2 h-2 rounded-full bg-manga-vermilion" />
                <span className="font-mono uppercase font-bold tracking-wider text-[11px]">CHAPTER 01 // CIVICFLOW DISCOVERY</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-manga-ink tracking-tight leading-[1.15] font-sans">
                Find the public programs <br />
                <span className="relative inline-block text-manga-vermilion">
                  you actually qualify for.
                  <span className="absolute -bottom-1 left-0 w-full h-[4px] bg-manga-ink rounded" />
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-warmcharcoal-light font-normal leading-relaxed max-w-2xl">
                Navigating government assistance, scholarships, and grants shouldn&apos;t feel like deciphering an adversarial maze. CivicFlow pairs structured eligibility rules with human-friendly guidance to turn scattered guidelines into an orderly, personalized action plan.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-manga-ink hover:bg-manga-vermilion text-white font-bold text-sm shadow-manga hover:shadow-manga-sm transition-all active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span>Check My Eligibility</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                <Link
                  href="/dashboard?demo=true"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-manga-parchment text-manga-ink font-bold text-sm border-1.5 border-manga-ink shadow-manga hover:shadow-manga-sm transition-all active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span>Try Demo Persona</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amberwarm-200 text-manga-ink font-mono font-bold border border-manga-ink">FAST</span>
                </Link>
              </div>

              {/* Manga Program Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
                <span className="manga-tag bg-white text-manga-ink">🎓 {scholarshipsCount} Verified Scholarships</span>
                <span className="manga-tag bg-white text-manga-ink">🔬 Research Fellowships</span>
                <span className="manga-tag bg-white text-manga-ink">🌱 Agricultural Grants</span>
                <span className="manga-tag bg-white text-manga-ink">💼 Credit Subsidies</span>
              </div>
            </div>

            {/* Right Column: Manga Focus Frame (IMAGE REMOVED as requested) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Manga Graphic Panel instead of image */}
                <div className="manga-bubble p-6 relative overflow-hidden bg-white">
                  {/* Screentone background pattern */}
                  <div className="absolute inset-0 screentone-box pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between border-b-1.5 border-manga-ink pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-manga-vermilion border border-manga-ink" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-manga-ink">
                          FIELD AUDIT // CASE #89412
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-manga-ink rounded">
                        VERIFIED
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-manga-ink tracking-tight">
                        Aarav Sharma • 3rd Year Engineering
                      </h3>
                      <div className="p-3 rounded-lg bg-sand-100 border border-manga-ink text-xs font-medium text-warmcharcoal space-y-1">
                        <p className="font-semibold text-manga-vermiliondark flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-manga-vermilion" />
                          <span>Matched with MahaDBT & Central Merit Scholarships</span>
                        </p>
                        <p className="text-warmcharcoal-light text-[11px]">
                          100% Tuition fee concession + ₹20,000 annual maintenance allowance.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded bg-white border border-manga-ink">
                        <span className="text-[10px] text-warmcharcoal-muted block uppercase">Income Ceiling</span>
                        <span className="font-bold text-manga-ink">₹2.4L ≤ ₹2.5L</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-manga-ink">
                        <span className="text-[10px] text-warmcharcoal-muted block uppercase">Missing Cert</span>
                        <span className="font-bold text-manga-vermilion">Bonafide</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-sand-800">
                      <span>STATUS: READY FOR DESK</span>
                      <Link
                        href="/dashboard?demo=true"
                        className="font-bold text-manga-vermilion hover:underline flex items-center gap-1"
                      >
                        <span>Audit Case &rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Overlaid tactile inkan / stamp badge */}
                <div className="absolute -bottom-4 -right-2 bg-manga-vermilion text-white px-3 py-1.5 rounded-lg border-1.5 border-manga-ink shadow-manga-sm flex items-center gap-2">
                  <Feather className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    Zero Guesswork
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Feature Preview / Signature Mockup */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl paper-card p-5 sm:p-7 shadow-manga bg-white">
            <div className="flex items-center justify-between border-b-1.5 border-manga-ink pb-3.5 mb-5 text-xs font-mono text-manga-ink">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-manga-vermilion" />
                <span className="font-bold uppercase tracking-wider">PANEL // ASSESSMENT-RECORD-01</span>
              </div>
              <span className="stamp-badge px-2 py-0.5 bg-amberwarm-100 text-manga-ink font-bold">
                CONFIDENCE: 94% HIGH
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Box 1: Why you match */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between border-1.5 border-manga-ink">
                <div>
                  <span className="text-[10px] uppercase font-bold text-manga-vermilion tracking-wider font-mono">
                    [01] PROFILE VERIFICATION
                  </span>
                  <h4 className="text-sm font-bold text-manga-ink mt-1 mb-2.5">
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
                <div className="mt-4 pt-3 border-t border-sand-300 text-[11px] text-manga-vermilion font-bold font-mono">
                  BENEFIT: ₹20,000 / YR DIRECT GRANT
                </div>
              </div>

              {/* Box 2: Missing Documents */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between border-1.5 border-manga-ink">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amberwarm-900 tracking-wider font-mono">
                    [02] CERTIFICATE GAP AUDIT
                  </span>
                  <h4 className="text-sm font-bold text-manga-ink mt-1 mb-2.5">
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
                    <li className="flex items-start gap-2 text-manga-vermilion font-bold">
                      <BadgeAlert className="w-3.5 h-3.5 text-manga-vermilion shrink-0 mt-0.5" />
                      <span>Missing: College Bonafide Certificate</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-300 text-[11px] text-warmcharcoal-muted font-mono">
                  REQUIRED: GATHER BEFORE FILING
                </div>
              </div>

              {/* Box 3: Action Plan */}
              <div className="p-4 rounded-xl paper-card-subtle flex flex-col justify-between border-1.5 border-manga-ink">
                <div>
                  <span className="text-[10px] uppercase font-bold text-terracotta-700 tracking-wider font-mono">
                    [03] ACTION SEQUENCE
                  </span>
                  <h4 className="text-sm font-bold text-manga-ink mt-1 mb-2.5">
                    Recommended Sequence
                  </h4>
                  <ol className="space-y-1.5 text-xs text-warmcharcoal-light list-decimal list-inside font-medium">
                    <li>Download bonafide form from college</li>
                    <li>Verify revenue authority stamp</li>
                    <li>Digitize attachments &lt; 2MB</li>
                    <li>Submit directly on official NSP portal</li>
                  </ol>
                </div>
                <div className="mt-4 pt-3 border-t border-sand-300">
                  <Link
                    href="/dashboard?demo=true"
                    className="text-xs font-bold text-manga-ink hover:text-manga-vermilion flex items-center gap-1 font-mono uppercase"
                  >
                    <span>Launch roadmap &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Stories Section with Manga Paneling */}
      <section className="py-16 border-b-2 border-manga-ink bg-manga-parchment/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-wider font-bold text-manga-ink stamp-badge px-2.5 py-0.5 bg-white border border-manga-ink shadow-manga-sm font-mono">
              PANEL ARCHIVE // REAL CASES
            </span>
            <h3 className="text-2xl font-black text-manga-ink mt-3">
              Opportunities Designed Around Actual Circumstances
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-warmcharcoal-light leading-relaxed">
              Whether you are an undergraduate scholar, rural researcher, young artisan, or smallholder farmer, CivicFlow bridges the knowledge gap with dignity and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Story Card 1 */}
            <div className="paper-card rounded-xl p-3 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-sand-200 mb-3 border border-manga-ink">
                <Image
                  src="/images/mentor-guidance.jpg"
                  alt="Student receiving supportive counseling"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-manga-vermilion font-bold uppercase">#01 GUIDANCE</span>
                <h4 className="text-xs font-bold text-manga-ink mt-0.5">Empowering Advisors & Desks</h4>
                <p className="text-[11px] text-warmcharcoal-light mt-1 leading-normal">
                  Community counselors use CivicFlow to audit incoming paperwork in minutes.
                </p>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="paper-card rounded-xl p-3 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-sand-200 mb-3 border border-manga-ink">
                <Image
                  src="/images/documents-desk.jpg"
                  alt="Textured paperwork and certs neatly organized"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-manga-vermilion font-bold uppercase">#02 SCRUTINY</span>
                <h4 className="text-xs font-bold text-manga-ink mt-0.5">Scrutiny Without Surprises</h4>
                <p className="text-[11px] text-warmcharcoal-light mt-1 leading-normal">
                  Pre-identifying missing bonafide and revenue seals before portal deadlines.
                </p>
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="paper-card rounded-xl p-3 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-sand-200 mb-3 border border-manga-ink">
                <Image
                  src="/images/artisan-workshop.jpg"
                  alt="Craftsperson in sunlit workshop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-manga-vermilion font-bold uppercase">#03 TRADES</span>
                <h4 className="text-xs font-bold text-manga-ink mt-0.5">Artisans & Tradespeople</h4>
                <p className="text-[11px] text-warmcharcoal-light mt-1 leading-normal">
                  Unlocking PM SVANidhi collateral-free credit and 7% interest rate relief.
                </p>
              </div>
            </div>

            {/* Story Card 4 */}
            <div className="paper-card rounded-xl p-3 flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-sand-200 mb-3 border border-manga-ink">
                <Image
                  src="/images/rural-agriculture.jpg"
                  alt="Farmer connecting to land in morning light"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-manga-vermilion font-bold uppercase">#04 AGRARIAN</span>
                <h4 className="text-xs font-bold text-manga-ink mt-0.5">Cultivator Households</h4>
                <p className="text-[11px] text-warmcharcoal-light mt-1 leading-normal">
                  Direct transfer grants under PM-KISAN verified with land record 7/12 extracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Explorer Preview */}
      <section className="py-16 bg-sand-50 border-b-2 border-manga-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-manga-ink stamp-badge px-2 py-0.5 bg-amberwarm-100 border border-manga-ink font-mono">
                CATALOG ARCHIVE
              </span>
              <h3 className="text-2xl font-black text-manga-ink mt-2">
                Available Programs & Scholarships
              </h3>
              <p className="mt-1.5 text-warmcharcoal-light max-w-xl text-xs leading-relaxed">
                Curated public schemes across higher education, technical training, doctoral research, and community welfare.
              </p>
            </div>
            <Link
              href="/schemes"
              className="mt-4 md:mt-0 inline-flex items-center gap-1 text-xs font-bold text-manga-ink hover:text-manga-vermilion font-mono"
            >
              <span>Explore all {UNIVERSAL_PROGRAMS.length} programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UNIVERSAL_PROGRAMS.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                className="paper-card rounded-xl p-5 flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-medium mb-2.5">
                    <span className="px-2 py-0.5 rounded stamp-badge bg-manga-parchment text-manga-ink text-[11px] border border-manga-ink font-mono font-bold">
                      {prog.type}
                    </span>
                    <span className="text-sand-700 text-[11px] font-mono">{prog.state}</span>
                  </div>
                  <h4 className="text-sm font-bold text-manga-ink line-clamp-1">
                    {prog.name}
                  </h4>
                  <p className="text-xs text-warmcharcoal-light mt-1.5 line-clamp-3 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-sand-300 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-warmcharcoal-muted block font-mono">
                      Grant / Sanction
                    </span>
                    <span className="text-xs font-bold text-manga-vermilion font-mono">
                      {prog.benefitAmount}
                    </span>
                  </div>
                  <Link
                    href={`/schemes`}
                    className="text-xs font-bold text-manga-ink hover:text-manga-vermilion font-mono uppercase"
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
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-black text-manga-ink">Architectural Guardrails: Deterministic Logic First</h3>
          <p className="mt-2 text-warmcharcoal-light max-w-2xl mx-auto text-xs leading-relaxed">
            CivicFlow separates factual eligibility conditions from language interpretation. Numeric thresholds, domicile requirements, and academic criteria are validated with deterministic code; Groq API handles natural-language interpretation, statement parsing, and contextual action plans.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-lg paper-card-subtle border-1.5 border-manga-ink">
              <span className="text-xs font-bold text-manga-ink block font-mono uppercase">Universal Catalog</span>
              <span className="text-[11px] text-warmcharcoal-muted mt-1 block">Broad coverage across education, skills, and welfare.</span>
            </div>
            <div className="p-3.5 rounded-lg paper-card-subtle border-1.5 border-manga-ink">
              <span className="text-xs font-bold text-manga-ink block font-mono uppercase">Deterministic Core</span>
              <span className="text-[11px] text-warmcharcoal-muted mt-1 block">Exact limits evaluated without LLM guesswork.</span>
            </div>
            <div className="p-3.5 rounded-lg paper-card-subtle border-1.5 border-manga-ink">
              <span className="text-xs font-bold text-manga-ink block font-mono uppercase">Statement Parsing</span>
              <span className="text-[11px] text-warmcharcoal-muted mt-1 block">Parsed into verified profile structures.</span>
            </div>
            <div className="p-3.5 rounded-lg paper-card-subtle border-1.5 border-manga-ink">
              <span className="text-xs font-bold text-manga-ink block font-mono uppercase">Gap Detection</span>
              <span className="text-[11px] text-warmcharcoal-muted mt-1 block">Flags missing forms prior to submission.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
