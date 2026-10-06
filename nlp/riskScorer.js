export function scoreRisk(clauses) {
    const total = clauses.reduce((sum, c) => sum + c.riskWeight, 0);
    const riskScore = Math.max(0, Math.min(100, total));

    let riskLevel = "Safe";
    if (riskScore >= 67) riskLevel = "High Risk";
    else if (riskScore >= 34) riskLevel = "Moderate Risk";

    const summaryEn =
        riskLevel === "Safe"
            ? "Low-risk indicators were found in this basic analysis."
            : riskLevel === "Moderate Risk"
                ? "Some potentially risky clauses were detected. Review before accepting."
                : "Multiple high-risk indicators were detected. Proceed carefully.";

    return { riskScore, riskLevel, summaryEn };
}