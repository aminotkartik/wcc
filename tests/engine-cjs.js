const { CURATED_SCHEMES, DEMO_PERSONAS } = require("../lib/data/curated-schemes-cjs.js");

function evaluateCriterion(criterion, user) {
  const userVal = user[criterion.field];
  if (userVal === undefined || userVal === null) {
    return { pass: false, userVal: "Not provided" };
  }
  switch (criterion.operator) {
    case "boolean_equals":
      return { pass: Boolean(userVal) === Boolean(criterion.value), userVal };
    case "equals":
      return {
        pass: String(userVal).trim().toLowerCase() === String(criterion.value).trim().toLowerCase(),
        userVal
      };
    case "less_than_or_equal":
      return { pass: Number(userVal) <= Number(criterion.value), userVal };
    case "greater_than_or_equal":
      return { pass: Number(userVal) >= Number(criterion.value), userVal };
    case "in":
      if (Array.isArray(criterion.value)) {
        const pass = criterion.value.some((val) =>
          String(val).toLowerCase() === String(userVal).toLowerCase()
        );
        return { pass, userVal };
      }
      return { pass: false, userVal };
    default:
      return { pass: false, userVal };
  }
}

function evaluateSchemeEligibility(scheme, user, documents = []) {
  let reconciledIncome = user.annualIncome;
  let verifiedDocTypes = new Set();

  for (const doc of documents) {
    if (doc.verifiedByUser) {
      verifiedDocTypes.add(doc.documentType.toLowerCase());
    }
    if (doc.documentType === "income_certificate" && doc.extractedFields && doc.extractedFields.annualIncome) {
      reconciledIncome = Number(doc.extractedFields.annualIncome);
    }
  }

  const activeUser = { ...user, annualIncome: reconciledIncome };
  const matchedCriteria = [];
  const unmetCriteria = [];
  const uncertainCriteria = [];

  // Regional constraint check
  if (scheme.region !== "All India" && scheme.region.toLowerCase() !== user.state.toLowerCase()) {
    unmetCriteria.push({
      label: `State Residency Requirement (${scheme.region})`,
      userValue: user.state,
      requiredValue: scheme.region
    });
  }

  for (const crit of scheme.eligibilityCriteria) {
    const { pass, userVal } = evaluateCriterion(crit, activeUser);
    if (pass) {
      matchedCriteria.push({ label: crit.label, userValue: userVal, requiredValue: crit.value });
    } else {
      if (userVal === "Not provided") {
        uncertainCriteria.push({ label: crit.label, reason: "Missing in profile" });
      } else {
        unmetCriteria.push({ label: crit.label, userValue: userVal, requiredValue: crit.value });
      }
    }
  }

  const missingDocs = [];
  const verifiedDocIds = [];
  for (const reqDoc of scheme.requiredDocuments) {
    if (verifiedDocTypes.has(reqDoc.id.toLowerCase())) {
      verifiedDocIds.push(reqDoc.name);
    } else {
      missingDocs.push(reqDoc);
    }
  }

  const totalCriteria = scheme.eligibilityCriteria.length + (scheme.region !== "All India" ? 1 : 0);
  const passedCriteriaCount = matchedCriteria.length;
  const unmetCount = unmetCriteria.length;

  let baseScore = 0;
  if (unmetCount > 0) {
    baseScore = Math.max(10, Math.round((passedCriteriaCount / (totalCriteria + 1)) * 40));
  } else {
    // Specific state match boost
    const stateSpecificityBoost = scheme.region !== "All India" && scheme.region.toLowerCase() === user.state.toLowerCase() ? 8 : 0;
    // Specific category boost
    const categorySpecificityBoost = scheme.eligibilityCriteria.some(c => c.field === "category" && c.value === user.category) ? 6 : 0;

    const critRatio = passedCriteriaCount / totalCriteria;
    baseScore = Math.round(60 + critRatio * 25 + stateSpecificityBoost + categorySpecificityBoost);
  }

  if (verifiedDocIds.length > 0 && unmetCount === 0) {
    baseScore = Math.min(99, baseScore + Math.round((verifiedDocIds.length / scheme.requiredDocuments.length) * 5));
  }

  let status = "unlikely";
  let confidenceLabel = "LOW";
  if (unmetCount === 0 && uncertainCriteria.length === 0 && baseScore >= 75) {
    status = "likely_eligible";
    confidenceLabel = "HIGH";
  } else if (unmetCount === 0 && baseScore >= 60) {
    status = "likely_eligible";
    confidenceLabel = "MEDIUM";
  } else if (unmetCount === 1 && baseScore >= 40) {
    status = "borderline";
    confidenceLabel = "MEDIUM";
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    matchScore: baseScore,
    confidenceLabel,
    status,
    matchedCriteria,
    unmetCriteria,
    uncertainCriteria,
    missingDocuments: missingDocs,
    verifiedDocuments: verifiedDocIds
  };
}

function assessAllSchemes(user, documents = []) {
  return CURATED_SCHEMES
    .map((s) => evaluateSchemeEligibility(s, user, documents))
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  assessAllSchemes,
  evaluateSchemeEligibility
};
