# CivicFlow AI

> **“Find the opportunities you may qualify for.”**  
> AI-powered public-service eligibility and opportunity copilot that turns messy applicant situations and supporting documents into an evidence-backed, personalized action plan across scholarships, research fellowships, startup grants, and public welfare programs.

[![Evaluation Benchmark](https://img.shields.io/badge/Evaluation-5%2F5%20Passed%20(100%25)-emerald)](./tests/run-evaluation.js)
[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org)
[![Groq API](https://img.shields.io/badge/Groq%20API-Llama%203.3%2070B%20Inference-f59e0b)](https://groq.com)
[![Theme](https://img.shields.io/badge/Theme-Warm%20Terracotta%20%26%20Amber-dc6838)](./tailwind.config.js)

---

## 1. What It Does

CivicFlow AI solves the acute information bottleneck in public assistance, higher education scholarships, and welfare programs. Instead of acting as another generic chat interface or search bar, CivicFlow transforms a citizen's real-world demographic and financial facts plus uploaded documents into:

1. **Natural-Language Profile Understanding (Groq API):** Users can describe their background in plain English, and Groq parses and normalizes it into verified structured parameters.
2. **Deterministic Universal Eligibility Verification:** Evaluated against exact provider rules (income ceilings, state residency, academic level) without LLM hallucinations.
3. **Missing Document Gap Analysis:** Cross-references required proofs (bonafide letters, revenue stamps, Aadhaar linkage) against verified applicant documents.
4. **The CivicFlow Opportunity Action Plan:** A sequential, interactive timeline guiding the applicant from document procurement to the official authorized portal submission.

---

## 2. Problem Statement

Millions of citizens qualify for welfare, grants, and scholarship programs but drop out during discovery and application because:
* **Scattered Information:** Guidelines are buried inside departmental gazettes, portal notices, and PDFs.
* **Ambiguous Rules:** Complex clauses regarding household income thresholds, academic years, and residency criteria.
* **Document Confusion:** Applicants arrive at portals without understanding which certificates are prerequisite.
* **Lack of Next Steps:** No unified checklist or roadmap exists to shepherd users from "Do I qualify?" to "Submitted".

---

## 3. The 4-Layer Solution

CivicFlow executes a multi-layer pipeline:

* **Layer 1 — Understand the User:** Captures structured demographic, financial, and educational parameters via progressive disclosure or natural-language entry.
* **Layer 2 — Understand Documents:** Extracts verifiable attributes (income certificate values, issuing authorities, dates) and requires user confirmation before ingestion.
* **Layer 3 — Deterministic & Semantic Matching:** Matches candidates from a universal registry of public programs with zero-hallucination mathematical checks.
* **Layer 4 — CivicFlow Action Plan:** Synthesizes an interactive step-by-step roadmap with priority tasks, estimated durations, and direct links to official provider portals.

---

## 4. AI Architecture & Groq Workflow

```text
User Input (Form or Natural Language)
       ↓
Groq-Powered Profile Understanding (llama-3.3-70b-versatile via /lib/ai/groq.ts)
       ↓
Program Retrieval (Universal Catalog: Scholarships, Fellowships, Grants, Subsidies, Welfare)
       ↓
Deterministic Eligibility Checks (Backend Code: Income, Age, Domicile, Student Status)
       ↓
Groq Reasoning & Evidence-Backed Explanations
       ↓
Missing Information & Document Gap Detection
       ↓
Groq Action-Plan Generation
       ↓
Human Review & Interactive Progress Tracking
```

### AI Tools Used
* **Groq API:** Server-side inference for natural-language profile understanding, document interpretation, eligibility explanations, and personalized action-plan synthesis.
* **TypeScript & Next.js 14 App Router:** Server-side isolation ensuring `GROQ_API_KEY` is never exposed to browser bundles or client requests.

---

## 5. Technology Stack

* **Framework:** Next.js 14 (App Router, Server Components & Route Handlers)
* **Language:** TypeScript 5.6
* **Styling:** Tailwind CSS with Warm Human Palette (Cream, Ivory, Terracotta, Amber, Warm Charcoal)
* **AI Backend:** Groq API (`llama-3.3-70b-versatile`) isolated in `/lib/ai/groq.ts`
* **Eligibility Core:** Deterministic criterion evaluation engine with weighted jurisdiction & category specificity
* **Document Parser:** Intelligent document fact extractor with confidence scoring and manual verification guards
* **Testing & Benchmarks:** Standalone automated evaluation suite verifying precision against real-world test cases

---

## 6. Universal Programs in Knowledge Base

CivicFlow ships with a verified sample registry across multiple program domains:
1. **Central Sector Merit-Cum-Means Higher Education Scholarship** (Scholarship / Ministry of Education)
2. **Post-Matric Professional Technical Degree Scholarship** (Scholarship / Higher & Technical Education)
3. **Prime Minister's Research Fellowship (PMRF) Scheme** (Fellowship / Ministry of Education & NRF)
4. **National Youth Innovation Fellowship** (Fellowship / Atal Innovation Mission & NITI Aayog)
5. **Startup India Seed Fund Grant (SISFS)** (Grant / DPIIT, Ministry of Commerce and Industry)
6. **PM-KISAN Direct Farmer Income Support Grant** (Grant / Ministry of Agriculture)
7. **PM SVANidhi Micro-Credit & Interest Subsidy** (Subsidy / Ministry of Housing & Urban Affairs)
8. **Prime Minister's Employment Generation Programme (PMEGP)** (Subsidy / Ministry of MSME)
9. **Karnataka Vidyasiri Higher Education Welfare Grant** (Welfare Scheme / Backward Classes Welfare)
10. **Social Justice Higher Education Accommodation Scheme (Swadhar)** (Welfare Scheme / Social Justice)
11. **PMKVY 4.0 Skill Certification & Apprenticeship Grant** (Skill Program / MSDE)
12. **Stand-Up India Enterprise Credit Support** (Entrepreneurship / Department of Financial Services)

---

## 7. Automated Evaluation Benchmark

CivicFlow includes an evaluation benchmark (`npm test` or `node tests/run-evaluation.js`) executing 5 multi-variable test cases:

| Test Case | Persona Profile | Expected Program | Score | Missing Docs Identified | Result |
|---|---|---|---|---|---|
| **TC-01** | Aarav Sharma (21y, MH Student, ₹2.4L) | Post-Matric Professional Degree Scholarship | 93% | Bonafide | **PASS** |
| **TC-02** | Priya Nair (20y, KA Rural Scholar, ₹1.8L) | Karnataka Vidyasiri Welfare Grant | 91% | Bonafide, Rent Agreement | **PASS** |
| **TC-03** | Rohan Gaikwad (22y, MH SC Student, ₹2.1L) | Swadhar Social Justice Welfare Scheme | 99% | Bonafide, Marksheet | **PASS** |
| **TC-04** | Vikram Jadhav (24y, Self-Employed Artisan) | PM SVANidhi Micro-Credit & Subsidy | 92% | Bank Passbook | **PASS** |
| **TC-05** | Rajesh Patil (42y, Farmer, ₹1.4L) | PM-KISAN Direct Farmer Income Grant | 85% | 7/12 Extract, Passbook | **PASS** |

**Benchmark Score:** 5/5 Test Cases Passed (100% Accuracy)

---

## 8. Getting Started & Running Locally

### Prerequisites
* Node.js 18+ (tested on Node v22)
* npm or pnpm

### Environment Setup
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Provide your `GROQ_API_KEY`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### Installation
```bash
# Clone the repository
git clone https://github.com/aminotkartik/wcc.git
cd wcc

# Install dependencies
npm install

# Run automated tests
npm test

# Build for production
npm run build

# Start production server
npm run start
```

The application will be live at `http://localhost:3000`.

---

## 9. 1-Click Demo for Hackathon Judges

Judges can test the entire pipeline in under 60 seconds:
1. Navigate to `/dashboard?demo=true`
2. Select any fictional persona (e.g., *Aarav Sharma*, *Priya Nair*, *Vikram Jadhav*) or type a natural-language description into the **Natural-Language Entry** bar.
3. Observe instant eligibility evaluation, criteria audit (income limits, domicile, academic degree), missing document detection, and the generated **CivicFlow Action Plan**.

---

## 10. Legal & Anti-Hallucination Disclaimer

CivicFlow AI provides an informational eligibility assessment and tactical application roadmap. It does not provide legal advice, nor does it guarantee government sanctions or disbursements. All final approvals are governed by official scrutiny conducted on authorized provider portals.
