import { UniversalProgram } from "../types";

export const UNIVERSAL_PROGRAMS: UniversalProgram[] = [
  // 1. Scholarship (Universal)
  {
    id: "prog_001",
    name: "Central Sector Merit-Cum-Means Higher Education Scholarship",
    type: "Scholarship",
    provider: "Ministry of Education, Department of Higher Education",
    country: "India",
    state: "All India",
    description: "Merit-cum-means scholarship for undergraduate and postgraduate university students across all Indian states and Union Territories.",
    targetUsers: "Regular college and university students with family income under ₹4.5 Lakhs",
    benefitAmount: "₹12,000 – ₹20,000 / year",
    benefitDescription: "Direct annual financial grant transferred to student's bank account",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Regular full-time enrolled student", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 450000, label: "Annual family income ≤ ₹4,50,000", mandatory: true },
      { field: "age", operator: "less_than_or_equal", value: 25, label: "Age ≤ 25 years", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Valid Income Certificate", description: "Issued by authorized revenue magistrate or Tahsildar" },
      { id: "aadhaar_card", name: "Aadhaar Identity Card", description: "UIDAI identification linked to bank account" },
      { id: "bonafide_certificate", name: "College Bonafide / Enrollment Letter", description: "Enrollment letter from college registrar" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://scholarships.gov.in",
    sourceUrl: "https://scholarships.gov.in",
    sourceName: "National Scholarship Portal (NSP)",
    lastVerifiedAt: "2026-09-20",
    status: "Active"
  },

  // 2. Scholarship (State specific - Maharashtra)
  {
    id: "prog_002",
    name: "Post-Matric Professional Technical Degree Scholarship",
    type: "Scholarship",
    provider: "Directorate of Higher & Technical Education",
    country: "India",
    state: "Maharashtra",
    description: "Tuition fee reimbursement and monthly living stipend for professional & technical degree programs (engineering, architecture, pharmacy).",
    targetUsers: "Undergraduate and diploma students residing in Maharashtra with annual family income under ₹2.5 Lakhs",
    benefitAmount: "Up to ₹60,000 / year + Tuition Fee Waiver",
    benefitDescription: "100% government tuition concession + maintenance allowance",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Actively enrolled college student", mandatory: true },
      { field: "state", operator: "equals", value: "Maharashtra", label: "Resident of Maharashtra", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Annual family income ≤ ₹2,50,000", mandatory: true },
      { field: "educationLevel", operator: "in", value: ["Undergraduate", "Postgraduate", "Diploma"], label: "Higher technical degree or diploma", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Current Financial Year Income Certificate", description: "Issued by Tahsildar or revenue authority" },
      { id: "aadhaar_card", name: "Aadhaar Identity Proof", description: "Seeded with active DBT bank account" },
      { id: "bonafide_certificate", name: "College Bonafide Study Certificate", description: "Issued by dean or college principal" }
    ],
    applicationProcess: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://mahadbt.maharashtra.gov.in",
    sourceUrl: "https://mahadbt.maharashtra.gov.in",
    sourceName: "Aaple Sarkar DBT Portal",
    lastVerifiedAt: "2026-09-18",
    status: "Active"
  },

  // 3. Fellowship (Research & Advanced Studies)
  {
    id: "prog_003",
    name: "Prime Minister's Research Fellowship (PMRF) Scheme",
    type: "Fellowship",
    provider: "Ministry of Education & National Research Foundation",
    country: "India",
    state: "All India",
    description: "Prestigious national research fellowship attracting meritorious doctoral scholars for Ph.D. programs in science, technology, and engineering.",
    targetUsers: "Doctoral and postgraduate research scholars in STEM and interdisciplinary fields",
    benefitAmount: "₹70,000 – ₹80,000 / month + ₹2 Lakh Annual Research Contingency",
    benefitDescription: "Direct monthly stipend for up to 5 years + annual travel/research grant",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Enrolled in postgraduate or doctoral study", mandatory: true },
      { field: "educationLevel", operator: "in", value: ["Postgraduate", "Doctorate", "Undergraduate"], label: "Graduate/Doctoral scholar in engineering/science", mandatory: true }
    ],
    requiredDocuments: [
      { id: "education_certificate", name: "Postgraduate Marksheets & Degrees", description: "Certified qualifying degree transcripts" },
      { id: "project_report", name: "Research Project Proposal (DPR)", description: "Detailed 5-page doctoral research proposal" },
      { id: "bonafide_certificate", name: "Institutional Admission Letter", description: "Letter of registration from host university" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://www.pmrf.in",
    sourceUrl: "https://www.pmrf.in",
    sourceName: "National PMRF Secretariat",
    lastVerifiedAt: "2026-09-10",
    status: "Active"
  },

  // 4. Fellowship (Young Innovators)
  {
    id: "prog_004",
    name: "National Youth Innovation Fellowship",
    type: "Fellowship",
    provider: "Atal Innovation Mission & NITI Aayog",
    country: "India",
    state: "All India",
    description: "One-year paid fellowship pairing technical graduates with grassroots community labs and public challenges.",
    targetUsers: "Graduates and young professionals aged 21-30 seeking social impact innovation experience",
    benefitAmount: "₹45,000 / month Stipend + Mentorship Grant",
    benefitDescription: "Living stipend and access to national maker spaces",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 21, label: "Minimum age 21 years", mandatory: true },
      { field: "age", operator: "less_than_or_equal", value: 30, label: "Maximum age 30 years", mandatory: true },
      { field: "educationLevel", operator: "in", value: ["Undergraduate", "Postgraduate", "Diploma"], label: "Completed diploma, bachelor's, or higher", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Proof of nationality and age" },
      { id: "education_certificate", name: "Degree Completion Certificate", description: "Transcript or provisional certificate" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://aim.gov.in",
    sourceUrl: "https://aim.gov.in",
    sourceName: "NITI Aayog Official Innovation Desk",
    lastVerifiedAt: "2026-08-28",
    status: "Active"
  },

  // 5. Grant (Startups & Innovators)
  {
    id: "prog_005",
    name: "Startup India Seed Fund Grant (SISFS)",
    type: "Grant",
    provider: "DPIIT, Ministry of Commerce and Industry",
    country: "India",
    state: "All India",
    description: "Financial grant assistance to early-stage entrepreneurs for proof of concept, prototype development, product trials, and market entry.",
    targetUsers: "Early-stage founders, technical innovators, and young entrepreneurs with a viable concept",
    benefitAmount: "Grant up to ₹20 Lakhs for Proof of Concept (Non-dilutive)",
    benefitDescription: "100% equity-free milestone grant channeled through approved incubators",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Age ≥ 18 years", mandatory: true },
      { field: "occupation", operator: "in", value: ["Self-Employed", "Entrepreneur", "Student", "Unemployed"], label: "Individual entrepreneur or innovator", mandatory: true }
    ],
    requiredDocuments: [
      { id: "project_report", name: "Detailed Pitch Deck / Project Report", description: "Problem statement, solution prototype, and budget breakdown" },
      { id: "aadhaar_card", name: "Founder Identity Proof", description: "UIDAI Aadhaar of lead founder" },
      { id: "bank_passbook", name: "Bank Account Details", description: "Dedicated account for seed grant disbursements" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://seedfund.startupindia.gov.in",
    sourceUrl: "https://seedfund.startupindia.gov.in",
    sourceName: "DPIIT Startup India Portal",
    lastVerifiedAt: "2026-09-02",
    status: "Active"
  },

  // 6. Grant (Agriculture & Farmers)
  {
    id: "prog_006",
    name: "PM-KISAN Direct Farmer Income Support Grant",
    type: "Grant",
    provider: "Ministry of Agriculture and Farmers Welfare",
    country: "India",
    state: "All India",
    description: "Direct annual financial assistance transferred in 3 equal installments to cultivable landholding farmer households.",
    targetUsers: "Smallholder and marginal farmers with cultivable agricultural land",
    benefitAmount: "₹6,000 / year (₹2,000 every 4 months)",
    benefitDescription: "Direct unconditional income transfer to bank account",
    eligibilityCriteria: [
      { field: "occupation", operator: "equals", value: "Farmer", label: "Occupation must be Farmer or Agriculturalist", mandatory: true }
    ],
    requiredDocuments: [
      { id: "land_records", name: "Land Ownership Record (7/12 Extract or RoR)", description: "Revenue land ownership document in farmer's name" },
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Mandatory Aadhaar credential linked to NPCI bank server" },
      { id: "bank_passbook", name: "Bank Passbook", description: "Active DBT-enabled savings bank account" }
    ],
    applicationProcess: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://pmkisan.gov.in",
    sourceUrl: "https://pmkisan.gov.in",
    sourceName: "PM-KISAN National Portal",
    lastVerifiedAt: "2026-09-22",
    status: "Active"
  },

  // 7. Subsidy (Credit Linked - Self Employed / Micro Enterprises)
  {
    id: "prog_007",
    name: "PM SVANidhi Micro-Credit & Interest Subsidy",
    type: "Subsidy",
    provider: "Ministry of Housing and Urban Affairs",
    country: "India",
    state: "All India",
    description: "Collateral-free working capital microloans with 7% interest rate subsidy and digital transaction cashbacks for micro-entrepreneurs and vendors.",
    targetUsers: "Self-employed micro-tradespersons, artisans, and urban informal vendors",
    benefitAmount: "Working Capital Loan up to ₹50,000 + 7% Interest Subsidy",
    benefitDescription: "Affordable credit with progressive limits and zero collateral",
    eligibilityCriteria: [
      { field: "occupation", operator: "in", value: ["Self-Employed", "Artisan", "Vendor", "Unemployed"], label: "Self-employed or small tradesperson", mandatory: true },
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Minimum age 18 years", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity and biometric proof" },
      { id: "bank_passbook", name: "Bank Account Passbook / Statement", description: "Active savings or Jan Dhan account" }
    ],
    applicationProcess: "Common Service Center (CSC)",
    applicationUrl: "https://pmsvanidhi.mohua.gov.in",
    sourceUrl: "https://pmsvanidhi.mohua.gov.in",
    sourceName: "PM SVANidhi Portal",
    lastVerifiedAt: "2026-09-05",
    status: "Active"
  },

  // 8. Subsidy (Capital MSME - Entrepreneurship)
  {
    id: "prog_008",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    type: "Subsidy",
    provider: "Ministry of Micro, Small and Medium Enterprises (MSME)",
    country: "India",
    state: "All India",
    description: "Credit-linked capital subsidy up to 35% for establishing new micro-enterprises in manufacturing and service sectors.",
    targetUsers: "Aspiring entrepreneurs and youth establishing new business units",
    benefitAmount: "Subsidy up to 35% on project costs up to ₹50 Lakhs",
    benefitDescription: "Government margin money contribution reduces loan burden",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Minimum age 18 years", mandatory: true },
      { field: "occupation", operator: "in", value: ["Self-Employed", "Unemployed", "Entrepreneur", "Artisan"], label: "Aspiring entrepreneur / youth", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity and proof of address" },
      { id: "project_report", name: "Detailed Project Report (DPR)", description: "Summary of proposed business model, costs, and cashflows" },
      { id: "education_certificate", name: "Educational Certificate", description: "Minimum 8th pass proof for projects > ₹10L" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://www.kviconline.gov.in/pmegpeportal",
    sourceUrl: "https://www.kviconline.gov.in/pmegpeportal",
    sourceName: "KVIC MSME Portal",
    lastVerifiedAt: "2026-09-12",
    status: "Active"
  },

  // 9. Welfare Scheme (Social Security & Food/Accommodation Grant)
  {
    id: "prog_009",
    name: "Karnataka Vidyasiri Higher Education Welfare Grant",
    type: "Welfare Scheme",
    provider: "Backward Classes Welfare Department, Govt of Karnataka",
    country: "India",
    state: "Karnataka",
    description: "Monthly living and food subsidy for rural post-matric scholars studying in urban colleges without access to government hostels.",
    targetUsers: "Students from Karnataka with family income below ₹2.5 Lakhs studying away from home",
    benefitAmount: "₹15,000 / year (₹1,500/month for 10 months)",
    benefitDescription: "Direct DBT accommodation allowance into student's bank account",
    eligibilityCriteria: [
      { field: "state", operator: "equals", value: "Karnataka", label: "Karnataka Resident / Institution", mandatory: true },
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Actively enrolled college student", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Family income ≤ ₹2,50,000", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Karnataka Revenue Income Certificate", description: "Issued by Karnataka Revenue Department" },
      { id: "bonafide_certificate", name: "College Study / Bonafide Certificate", description: "Affiliated institution study proof" },
      { id: "rent_agreement", name: "Rent Proof / Hostel Non-Availability", description: "Proof of living in private rented room" }
    ],
    applicationProcess: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://karepass.cgg.gov.in",
    sourceUrl: "https://karepass.cgg.gov.in",
    sourceName: "Karnataka ePASS Welfare Portal",
    lastVerifiedAt: "2026-08-15",
    status: "Active"
  },

  // 10. Welfare Scheme (Social Assistance / SC Accommodation)
  {
    id: "prog_010",
    name: "Social Justice Higher Education Accommodation Scheme (Swadhar)",
    type: "Welfare Scheme",
    provider: "Social Justice and Special Assistance Department",
    country: "India",
    state: "Maharashtra",
    description: "Financial allowance of ₹51,000/year for SC/Nav-buddha students pursuing higher education who could not secure government hostel seats.",
    targetUsers: "Scheduled Caste (SC) higher education students residing in Maharashtra",
    benefitAmount: "₹51,000 / year (Direct DBT Allowance)",
    benefitDescription: "Living, meals, and books allowance for college scholars",
    eligibilityCriteria: [
      { field: "state", operator: "equals", value: "Maharashtra", label: "Maharashtra Resident", mandatory: true },
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Enrolled in college degree", mandatory: true },
      { field: "category", operator: "equals", value: "SC", label: "Scheduled Caste (SC) category", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Family income ≤ ₹2,50,000", mandatory: true }
    ],
    requiredDocuments: [
      { id: "caste_certificate", name: "Caste Certificate & Validity", description: "Recognized SC certificate with scrutiny committee validity" },
      { id: "income_certificate", name: "Revenue Income Certificate", description: "Certified by authorized executive magistrate" },
      { id: "bonafide_certificate", name: "College Bonafide Study Certificate", description: "Proof of full-time degree program" },
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Bank-linked identification" }
    ],
    applicationProcess: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://sjsa.maharashtra.gov.in",
    sourceUrl: "https://sjsa.maharashtra.gov.in",
    sourceName: "Social Justice Dept Official Portal",
    lastVerifiedAt: "2026-09-08",
    status: "Active"
  },

  // 11. Skill Program
  {
    id: "prog_011",
    name: "PMKVY 4.0 Skill Certification & Apprenticeship Grant",
    type: "Skill Program",
    provider: "Ministry of Skill Development and Entrepreneurship (MSDE)",
    country: "India",
    state: "All India",
    description: "100% government-sponsored industry skill training courses in AI, digital manufacturing, and robotics with a monthly training stipend.",
    targetUsers: "Unemployed youth, recent graduates, or high school leavers aged 18-35",
    benefitAmount: "100% Free Course + ₹8,000 Training Stipend",
    benefitDescription: "Skill voucher, exam fee waiver, and placement assistance",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Age ≥ 18", mandatory: true },
      { field: "age", operator: "less_than_or_equal", value: 35, label: "Age ≤ 35", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Government photo ID" },
      { id: "education_certificate", name: "Educational Certificate", description: "10th/12th/Diploma or Degree certificate" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://www.pmkvyofficial.org",
    sourceUrl: "https://www.pmkvyofficial.org",
    sourceName: "Skill India Digital Portal",
    lastVerifiedAt: "2026-09-15",
    status: "Active"
  },

  // 12. Entrepreneurship Program
  {
    id: "prog_012",
    name: "Stand-Up India Enterprise Credit Support",
    type: "Entrepreneurship",
    provider: "Department of Financial Services, Ministry of Finance",
    country: "India",
    state: "All India",
    description: "Bank loans between ₹10 Lakhs and ₹1 Crore to at least one SC/ST or woman borrower per bank branch for setting up greenfield enterprises.",
    targetUsers: "Women entrepreneurs and SC/ST founders setting up manufacturing, services, or trading enterprises",
    benefitAmount: "Bank Loan from ₹10 Lakhs to ₹1 Crore with Subsidized Margin Money",
    benefitDescription: "Low-interest credit facility with government guarantee cover",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Minimum age 18 years", mandatory: true },
      { field: "occupation", operator: "in", value: ["Self-Employed", "Entrepreneur", "Artisan", "Unemployed"], label: "Individual entrepreneur", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity & address proof" },
      { id: "project_report", name: "Business Project Report", description: "Financial viability and market analysis document" }
    ],
    applicationProcess: "Online Portal",
    applicationUrl: "https://www.standupmitra.in",
    sourceUrl: "https://www.standupmitra.in",
    sourceName: "Stand-Up Mitra Portal",
    lastVerifiedAt: "2026-08-30",
    status: "Active"
  }
];

export const DEMO_PERSONAS = [
  {
    id: "persona_1",
    label: "Aarav Sharma — Engineering Student (Scholarships)",
    description: "21y, Undergraduate Engineering student in Maharashtra, family income ₹2,40,000",
    profile: {
      fullName: "Aarav Sharma",
      age: 21,
      gender: "Male",
      state: "Maharashtra",
      occupation: "Student",
      studentStatus: true,
      educationLevel: "Undergraduate",
      course: "B.Tech Computer Engineering",
      institutionType: "Government-Aided Engineering College",
      annualIncome: 240000,
      category: "General / EWS",
      goalOrNeed: "Tuition fee waiver and scholarship",
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: false
    },
    sampleExtractedDocs: [
      {
        documentType: "income_certificate",
        fileName: "Aarav_Income_Certificate_2026.pdf",
        confidence: 0.96,
        extractedFields: {
          annualIncome: 240000,
          issueDate: "2026-08-18",
          issuingAuthority: "Tahsildar Pune City",
          certificateNumber: "MH/REV/2026/89412"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:00:00Z"
      },
      {
        documentType: "aadhaar_card",
        fileName: "Aadhaar_Card_Verified.pdf",
        confidence: 0.98,
        extractedFields: {
          nameMatch: "Aarav Sharma",
          dob: "2005-04-12",
          stateMatch: "Maharashtra",
          aadhaarLastFour: "8841"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:01:00Z"
      }
    ]
  },
  {
    id: "persona_2",
    label: "Priya Nair — Rural Degree Scholar (Karnataka Welfare)",
    description: "20y female college student in Karnataka, family income ₹1,80,000",
    profile: {
      fullName: "Priya Nair",
      age: 20,
      gender: "Female",
      state: "Karnataka",
      occupation: "Student",
      studentStatus: true,
      educationLevel: "Undergraduate",
      course: "B.Sc Biotechnology",
      institutionType: "Recognized University College",
      annualIncome: 180000,
      category: "OBC",
      goalOrNeed: "Living allowance and hostel assistance",
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: true
    },
    sampleExtractedDocs: [
      {
        documentType: "income_certificate",
        fileName: "Priya_Revenue_Income.pdf",
        confidence: 0.95,
        extractedFields: {
          annualIncome: 180000,
          issueDate: "2026-07-12",
          issuingAuthority: "Tahsildar Mysuru",
          certificateNumber: "KA/RD/2026/41209"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:02:00Z"
      }
    ]
  },
  {
    id: "persona_3",
    label: "Rohan Gaikwad — SC Master's Scholar (Social Justice)",
    description: "22y SC student in Maharashtra pursuing Master's, family income ₹2,10,000",
    profile: {
      fullName: "Rohan Gaikwad",
      age: 22,
      gender: "Male",
      state: "Maharashtra",
      occupation: "Student",
      studentStatus: true,
      educationLevel: "Postgraduate",
      course: "M.Sc Data Science",
      institutionType: "University Department",
      annualIncome: 210000,
      category: "SC",
      goalOrNeed: "Higher education accommodation grant",
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: false
    },
    sampleExtractedDocs: [
      {
        documentType: "income_certificate",
        fileName: "Rohan_Income_Cert.pdf",
        confidence: 0.94,
        extractedFields: {
          annualIncome: 210000,
          issueDate: "2026-06-20",
          issuingAuthority: "Sub-Divisional Magistrate Nagpur",
          certificateNumber: "MH/EBC/2026/10294"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:03:00Z"
      },
      {
        documentType: "caste_certificate",
        fileName: "SC_Caste_Validity.pdf",
        confidence: 0.97,
        extractedFields: {
          casteCategory: "SC",
          validityCommittee: "Nagpur Divisional Caste Scrutiny Committee",
          verificationStatus: "Certified Valid"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:03:30Z"
      }
    ]
  },
  {
    id: "persona_4",
    label: "Vikram Jadhav — Youth Micro-Artisan (Subsidies & Credit)",
    description: "24y self-employed craftsperson seeking working capital loan",
    profile: {
      fullName: "Vikram Jadhav",
      age: 24,
      gender: "Male",
      state: "Maharashtra",
      occupation: "Self-Employed",
      studentStatus: false,
      educationLevel: "Diploma",
      course: "Electrical Technical Vocational",
      annualIncome: 190000,
      category: "General",
      goalOrNeed: "Working capital loan and equipment subsidy",
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: true
    },
    sampleExtractedDocs: [
      {
        documentType: "aadhaar_card",
        fileName: "Vikram_Aadhaar.pdf",
        confidence: 0.99,
        extractedFields: {
          nameMatch: "Vikram Jadhav",
          dob: "2002-09-15",
          stateMatch: "Maharashtra"
        },
        verifiedByUser: true,
        uploadedAt: "2026-10-04T05:04:00Z"
      }
    ]
  },
  {
    id: "persona_5",
    label: "Rajesh Patil — Smallholder Farmer (Agricultural Grants)",
    description: "42y cultivator in rural Maharashtra",
    profile: {
      fullName: "Rajesh Patil",
      age: 42,
      gender: "Male",
      state: "Maharashtra",
      occupation: "Farmer",
      studentStatus: false,
      educationLevel: "High School",
      annualIncome: 140000,
      category: "General",
      goalOrNeed: "Direct farm support grant",
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: true
    },
    sampleExtractedDocs: []
  }
];
