

const CURATED_SCHEMES = [
  {
    id: "scheme_001",
    name: "MahaDBT Post-Matric Professional Scholarship",
    category: "Education & Scholarships",
    shortDescription: "Tuition fee reimbursement and maintenance stipend for post-matric professional & technical higher education.",
    fullDescription: "Comprehensive financial support provided by the Directorate of Higher & Technical Education for eligible students enrolled in recognized diploma/degree technical courses (engineering, medicine, architecture) with family income under ₹2.5 Lakhs.",
    benefitAmount: "Up to ₹60,000 / year + Tuition Waiver",
    benefitType: "Tuition Fee Waiver",
    targetAudience: "Undergraduate/Postgraduate technical college students residing in Maharashtra",
    region: "Maharashtra",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Must be actively enrolled student", mandatory: true },
      { field: "state", operator: "equals", value: "Maharashtra", label: "Resident of Maharashtra", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Annual family income ≤ ₹2,50,000", mandatory: true },
      { field: "educationLevel", operator: "in", value: ["Undergraduate", "Postgraduate", "Diploma"], label: "Pursuing higher professional degree", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Valid Income Certificate", description: "Issued by Tahsildar/Sub-Divisional Magistrate for current financial year" },
      { id: "aadhaar_card", name: "Aadhaar Identity Card", description: "Linked with bank account for Direct Benefit Transfer" },
      { id: "bonafide_certificate", name: "Bonafide Student Certificate", description: "From current college/university verifying current academic semester" },
      { id: "marksheet_last_exam", name: "Previous Academic Marksheet", description: "Passing certificate/marksheet of prior qualifying degree" }
    ],
    applicationMethod: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://mahadbt.maharashtra.gov.in",
    sourceMinistry: "Dept of Higher & Technical Education, Govt of Maharashtra",
    lastVerifiedDate: "2026-09-15",
    isDemoReference: true,
    importantNotes: ["Income certificate must be dated within current assessment year.", "Bank account must be seeded with Aadhaar."]
  },
  {
    id: "scheme_002",
    name: "Central Sector Scheme for College and University Students (NSP)",
    category: "Education & Scholarships",
    shortDescription: "Merit-cum-means scholarship for undergraduate and postgraduate university students across India.",
    fullDescription: "Centrally sponsored scholarship scheme implemented via National Scholarship Portal for meritorious students from low-income families to meet day-to-day college expenses while pursuing higher degrees.",
    benefitAmount: "₹12,000 - ₹20,000 / year",
    benefitType: "Monthly Stipend",
    targetAudience: "Undergraduate university students with family income under ₹4.5 Lakhs across all states",
    region: "All India",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Regular full-time enrolled student", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 450000, label: "Annual family income ≤ ₹4,50,000", mandatory: true },
      { field: "age", operator: "less_than_or_equal", value: 25, label: "Age ≤ 25 years", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Income Certificate", description: "Competent authority document showing parental income" },
      { id: "aadhaar_card", name: "Aadhaar Proof", description: "National Identity card" },
      { id: "bonafide_certificate", name: "College Bonafide/Admission Letter", description: "Enrollment letter from college registrar" }
    ],
    applicationMethod: "Online Portal",
    applicationUrl: "https://scholarships.gov.in",
    sourceMinistry: "Ministry of Education, Dept of Higher Education, Govt of India",
    lastVerifiedDate: "2026-08-30",
    isDemoReference: true,
    importantNotes: ["Students receiving other central scholarships are not eligible for dual benefit."]
  },
  {
    id: "scheme_003",
    name: "PM SVANidhi Micro-Credit Scheme",
    category: "Entrepreneurship",
    shortDescription: "Affordable working capital collateral-free microloans for urban micro-vendors and self-employed youth.",
    fullDescription: "Special micro-credit facility providing working capital loans starting at ₹10,000 up to ₹50,000 with 7% interest subsidy upon timely repayment and digital transaction cashbacks.",
    benefitAmount: "Collateral-free loan up to ₹50,000 + 7% Interest Subsidy",
    benefitType: "Subsidized Loan",
    targetAudience: "Self-employed micro-entrepreneurs, street vendors, and urban youth starting small businesses",
    region: "All India",
    eligibilityCriteria: [
      { field: "occupation", operator: "in", value: ["Self-Employed", "Vendor", "Artisan", "Unemployed"], label: "Self-employed or small tradesperson", mandatory: true },
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Minimum age 18 years", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity and biometric proof" },
      { id: "bank_passbook", name: "Bank Account Passbook / Statement", description: "Active savings or Jan Dhan account" }
    ],
    applicationMethod: "Common Service Center (CSC)",
    applicationUrl: "https://pmsvanidhi.mohua.gov.in",
    sourceMinistry: "Ministry of Housing and Urban Affairs, Govt of India",
    lastVerifiedDate: "2026-09-01",
    isDemoReference: true,
    importantNotes: ["Digital cashback up to ₹1,200 per year on UPI merchant transactions."]
  },
  {
    id: "scheme_004",
    name: "PMKVY 4.0 Skill Certification & Apprenticeship Grant",
    category: "Skill & Employment",
    shortDescription: "Free industry-aligned skill certification courses with stipend for Indian youth seeking formal employment.",
    fullDescription: "Pradhan Mantri Kaushal Vikas Yojana 4.0 delivers industry-curated technical training in Industry 4.0 fields, AI, digital marketing, CNC machining, and green energy with 100% government sponsorship and direct assessment vouchers.",
    benefitAmount: "100% Free Course + ₹8,000 Training Stipend",
    benefitType: "Skill Voucher",
    targetAudience: "Unemployed youth, recent graduates, or high school leavers aged 18 to 35",
    region: "All India",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Age ≥ 18", mandatory: true },
      { field: "age", operator: "less_than_or_equal", value: 35, label: "Age ≤ 35", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Government photo ID" },
      { id: "education_certificate", name: "Highest Educational Certificate", description: "10th/12th/Diploma or Degree certificate" }
    ],
    applicationMethod: "Online Portal",
    applicationUrl: "https://www.pmkvyofficial.org",
    sourceMinistry: "Ministry of Skill Development and Entrepreneurship, Govt of India",
    lastVerifiedDate: "2026-09-10",
    isDemoReference: true
  },
  {
    id: "scheme_005",
    name: "Dr. Ambedkar Post-Matric EBC Financial Assistance",
    category: "Education & Scholarships",
    shortDescription: "Targeted educational assistance for Economically Backward Class (EBC) students in post-matric courses.",
    fullDescription: "Centrally sponsored scheme designed to provide financial assistance to General category EBC students whose total parental income does not exceed ₹2.5 Lakhs per annum to pursue higher education.",
    benefitAmount: "Tuition waiver up to ₹45,000 / year",
    benefitType: "Tuition Fee Waiver",
    targetAudience: "Economically Backward Class (EBC/General Low Income) higher education students",
    region: "All India",
    eligibilityCriteria: [
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Regular student enrolled in college", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Annual family income ≤ ₹2,50,000", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Official Income Certificate", description: "Certified by revenue authority" },
      { id: "aadhaar_card", name: "Aadhaar ID", description: "Verified UIDAI credential" },
      { id: "fee_receipt", name: "College Fee Receipt", description: "Proof of fee deposit at recognized institution" }
    ],
    applicationMethod: "Online Portal",
    applicationUrl: "https://socialjustice.gov.in",
    sourceMinistry: "Ministry of Social Justice and Empowerment, Govt of India",
    lastVerifiedDate: "2026-08-20",
    isDemoReference: true
  },
  {
    id: "scheme_006",
    name: "Karnataka Vidyasiri - Food & Accommodation Scheme",
    category: "Education & Scholarships",
    shortDescription: "Monthly financial grant for post-matric students living away from home without hostel facility.",
    fullDescription: "Special welfare initiative by Dept of Backward Classes Welfare, Govt of Karnataka, providing ₹1,500 monthly stipend for 10 months annually to rural students studying in urban colleges.",
    benefitAmount: "₹15,000 / year (₹1,500/month)",
    benefitType: "Direct Financial Grant",
    targetAudience: "Students with family income below ₹2.5 Lakhs studying in Karnataka institutions",
    region: "Karnataka",
    eligibilityCriteria: [
      { field: "state", operator: "equals", value: "Karnataka", label: "Karnataka Resident/Institution", mandatory: true },
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Actively enrolled student", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Income ≤ ₹2,50,000", mandatory: true }
    ],
    requiredDocuments: [
      { id: "income_certificate", name: "Income Certificate", description: "Issued by Karnataka Revenue Department" },
      { id: "bonafide_certificate", name: "College Study Certificate", description: "Affiliated institution bonafide" },
      { id: "rent_agreement", name: "Rental Proof / Hostel Non-Availability", description: "Proof of living in private rented room" }
    ],
    applicationMethod: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://karepass.cgg.gov.in",
    sourceMinistry: "Backward Classes Welfare Department, Govt of Karnataka",
    lastVerifiedDate: "2026-07-25",
    isDemoReference: true
  },
  {
    id: "scheme_007",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    category: "Entrepreneurship",
    shortDescription: "Credit-linked subsidy up to 35% for establishing new micro-enterprises in manufacturing and services.",
    fullDescription: "Major flagship self-employment program under Ministry of MSME providing bank-financed project capital up to ₹50 Lakhs for manufacturing units and ₹20 Lakhs for service businesses, with government margin money subsidy between 15% and 35%.",
    benefitAmount: "Subsidy up to 35% on project costs up to ₹50 Lakhs",
    benefitType: "Subsidized Loan",
    targetAudience: "Individuals aged 18+ aiming to establish new micro enterprises or manufacturing/service startups",
    region: "All India",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 18, label: "Minimum age 18 years", mandatory: true },
      { field: "occupation", operator: "in", value: ["Self-Employed", "Unemployed", "Entrepreneur"], label: "Individual entrepreneur / youth", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity & proof of address" },
      { id: "project_report", name: "Detailed Project Report (DPR)", description: "Summary of proposed business model, costs, and cashflows" },
      { id: "education_certificate", name: "Educational Certificate", description: "Minimum 8th pass proof for projects > ₹10L" }
    ],
    applicationMethod: "Online Portal",
    applicationUrl: "https://www.kviconline.gov.in/pmegpeportal",
    sourceMinistry: "Ministry of Micro, Small and Medium Enterprises (MSME), Govt of India",
    lastVerifiedDate: "2026-09-05",
    isDemoReference: true
  },
  {
    id: "scheme_008",
    name: "PM-KISAN Samman Nidhi Scheme",
    category: "Agriculture & Rural",
    shortDescription: "Direct income support of ₹6,000 per year in three equal installments to cultivable landholding farmer families.",
    fullDescription: "Direct cash transfer scheme transferring ₹2,000 every 4 months directly into Aadhaar-seeded bank accounts of eligible farmer households across the nation.",
    benefitAmount: "₹6,000 / year (₹2,000 every 4 months)",
    benefitType: "Direct Financial Grant",
    targetAudience: "Farmers and rural agricultural families",
    region: "All India",
    eligibilityCriteria: [
      { field: "occupation", operator: "equals", value: "Farmer", label: "Occupation must be Farmer/Agriculture", mandatory: true }
    ],
    requiredDocuments: [
      { id: "land_records", name: "Land Ownership Record (7/12 Extract or RoR)", description: "Official revenue land records in farmer's name" },
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Linked to bank account" },
      { id: "bank_passbook", name: "Bank Passbook", description: "Active DBT enabled account" }
    ],
    applicationMethod: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://pmkisan.gov.in",
    sourceMinistry: "Ministry of Agriculture and Farmers Welfare, Govt of India",
    lastVerifiedDate: "2026-09-20",
    isDemoReference: true
  },
  {
    id: "scheme_009",
    name: "National Apprenticeship Promotion Scheme (NAPS-2)",
    category: "Skill & Employment",
    shortDescription: "Government stipend support of 25% (up to ₹1,500/month) for candidates undergoing apprenticeship training.",
    fullDescription: "National scheme directly sharing cost of monthly stipend paid by corporate/industrial employers to registered youth apprentices undergoing hands-on practical shop-floor training.",
    benefitAmount: "Up to ₹1,500 / month direct government subsidy",
    benefitType: "Monthly Stipend",
    targetAudience: "Technical graduates, ITI holders, and youth entering on-the-job apprenticeship",
    region: "All India",
    eligibilityCriteria: [
      { field: "age", operator: "greater_than_or_equal", value: 16, label: "Minimum age 16 years", mandatory: true },
      { field: "educationLevel", operator: "in", value: ["High School", "Diploma", "Undergraduate", "Postgraduate"], label: "Valid educational qualification", mandatory: true }
    ],
    requiredDocuments: [
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Identity proof" },
      { id: "education_certificate", name: "Degree/Diploma/ITI Certificate", description: "Proof of technical or academic training" },
      { id: "bank_passbook", name: "Bank Account Details", description: "For Direct Benefit Transfer" }
    ],
    applicationMethod: "Online Portal",
    applicationUrl: "https://www.apprenticeshipindia.gov.in",
    sourceMinistry: "Ministry of Skill Development and Entrepreneurship, Govt of India",
    lastVerifiedDate: "2026-08-15",
    isDemoReference: true
  },
  {
    id: "scheme_010",
    name: "Maharashtra Swadhar Yojana (Higher Education)",
    category: "Social Welfare",
    shortDescription: "Special annual accommodation and food allowance of ₹51,000 for SC/Nav-buddha students in higher education.",
    fullDescription: "Direct financial grant provided by Social Justice & Special Assistance Department, Maharashtra, for scheduled caste students who could not get admission into government-managed hostels, covering living, meals, and books.",
    benefitAmount: "₹51,000 / year (Direct DBT to bank account)",
    benefitType: "Direct Financial Grant",
    targetAudience: "SC students studying in Maharashtra colleges who do not have government hostel accommodation",
    region: "Maharashtra",
    eligibilityCriteria: [
      { field: "state", operator: "equals", value: "Maharashtra", label: "Maharashtra Resident", mandatory: true },
      { field: "studentStatus", operator: "boolean_equals", value: true, label: "Enrolled student", mandatory: true },
      { field: "category", operator: "equals", value: "SC", label: "Scheduled Caste (SC) category", mandatory: true },
      { field: "annualIncome", operator: "less_than_or_equal", value: 250000, label: "Family income ≤ ₹2,50,000", mandatory: true }
    ],
    requiredDocuments: [
      { id: "caste_certificate", name: "Caste Certificate & Validity", description: "Recognized SC certificate with validity stamp" },
      { id: "income_certificate", name: "Income Certificate", description: "Issued by authorized revenue magistrate" },
      { id: "bonafide_certificate", name: "College Bonafide Certificate", description: "Proof of full-time degree program" },
      { id: "aadhaar_card", name: "Aadhaar Card", description: "Bank-linked identification" }
    ],
    applicationMethod: "Direct Benefit Transfer (DBT)",
    applicationUrl: "https://sjsa.maharashtra.gov.in",
    sourceMinistry: "Social Justice and Special Assistance Department, Govt of Maharashtra",
    lastVerifiedDate: "2026-09-08",
    isDemoReference: true
  }
];

const DEMO_PERSONAS = [
  {
    id: "persona_1",
    label: "Aarav Sharma — Engineering Student (Recommended)",
    description: "21-year-old Undergraduate Engineering student in Maharashtra, family income ₹2,40,000",
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
    label: "Priya Nair — Rural Degree Scholar (Karnataka)",
    description: "20-year-old female college student in Karnataka, family income ₹1,80,000",
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
    label: "Rohan Gaikwad — SC Higher Studies Candidate",
    description: "22-year-old SC student in Maharashtra pursuing Master's, family income ₹2,10,000",
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
    label: "Vikram Jadhav — Youth Micro-Entrepreneur",
    description: "24-year-old self-employed craftsman seeking working capital loan",
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
    label: "Rajesh Patil — Smallholder Farmer",
    description: "42-year-old farmer in rural Maharashtra",
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
      disabilityStatus: false,
      minorityStatus: false,
      ruralArea: true
    },
    sampleExtractedDocs: []
  }
];

module.exports = { CURATED_SCHEMES, DEMO_PERSONAS };
