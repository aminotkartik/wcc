import { ExtractedDocumentFact } from "../types";

/**
 * Intelligent Document Extractor Simulator & Rule-based Parser.
 * Handles income certificates, Aadhaar cards, bonafide letters, caste certificates, etc.
 * Designed to extract verifiable fields with realistic confidence scores,
 * simulating OCR / Multimodal Vision LLM extraction with deterministic safety checks.
 */
export function extractDocumentFacts(
  fileName: string,
  fileType: string,
  rawContentHint?: string
): ExtractedDocumentFact {
  const lowerName = fileName.toLowerCase();

  // 1. Income Certificate
  if (lowerName.includes("income") || lowerName.includes("tahsildar") || lowerName.includes("revenue")) {
    return {
      documentType: "income_certificate",
      fileName,
      confidence: 0.96,
      extractedFields: {
        annualIncome: 240000,
        issueDate: "2026-08-18",
        issuingAuthority: "Office of the Tahsildar / Revenue Department",
        validityPeriod: "Financial Year 2026-27",
        certificateNumber: "MH/INC/2026/89412",
        documentCategory: "Income Assessment"
      },
      verifiedByUser: false,
      uploadedAt: new Date().toISOString()
    };
  }

  // 2. Aadhaar Identity Card
  if (lowerName.includes("aadhaar") || lowerName.includes("uidai") || lowerName.includes("identity") || lowerName.includes("id")) {
    return {
      documentType: "aadhaar_card",
      fileName,
      confidence: 0.98,
      extractedFields: {
        documentCategory: "National Identification",
        stateMatch: "Maharashtra",
        aadhaarMaskedNumber: "XXXX-XXXX-8841",
        dobVerified: true,
        biometricLinked: true
      },
      verifiedByUser: false,
      uploadedAt: new Date().toISOString()
    };
  }

  // 3. Bonafide / Study Certificate
  if (lowerName.includes("bonafide") || lowerName.includes("college") || lowerName.includes("study") || lowerName.includes("student")) {
    return {
      documentType: "bonafide_certificate",
      fileName,
      confidence: 0.94,
      extractedFields: {
        documentCategory: "Institutional Proof of Enrollment",
        courseName: "B.Tech Engineering",
        currentAcademicYear: "2026-2027",
        issuingInstitution: "College of Engineering & Technology",
        verificationStatus: "Active Regular Student"
      },
      verifiedByUser: false,
      uploadedAt: new Date().toISOString()
    };
  }

  // 4. Caste Certificate
  if (lowerName.includes("caste") || lowerName.includes("sc") || lowerName.includes("obc") || lowerName.includes("validity")) {
    return {
      documentType: "caste_certificate",
      fileName,
      confidence: 0.95,
      extractedFields: {
        documentCategory: "Category / Social Welfare Certificate",
        casteClaim: "Recognized Scheduled Category",
        scrutinyStatus: "Formally Validated",
        validityNumber: "MH/CC/VALID/2026/4102"
      },
      verifiedByUser: false,
      uploadedAt: new Date().toISOString()
    };
  }

  // 5. Land Records / Farm Records
  if (lowerName.includes("land") || lowerName.includes("7_12") || lowerName.includes("farm") || lowerName.includes("ror")) {
    return {
      documentType: "land_records",
      fileName,
      confidence: 0.92,
      extractedFields: {
        documentCategory: "Agricultural Landholding Record",
        totalAcreage: "2.4 Acres",
        holderStatus: "Individual Cultivator",
        surveyNumber: "Survey No 142/2A"
      },
      verifiedByUser: false,
      uploadedAt: new Date().toISOString()
    };
  }

  // Generic fallback
  return {
    documentType: "general_document",
    fileName,
    confidence: 0.85,
    extractedFields: {
      documentCategory: "Supporting Proof",
      detectedTitle: fileName.replace(/\.[^/.]+$/, ""),
      verificationState: "Needs user confirmation"
    },
    verifiedByUser: false,
    uploadedAt: new Date().toISOString()
  };
}
