const KEYWORDS = [
    { key: "collect", category: "Data Collection", riskWeight: 15 },
    { key: "third parties", category: "Third-Party Sharing", riskWeight: 30 },
    { key: "retain", category: "Data Retention", riskWeight: 20 },
    { key: "without notice", category: "User Rights Limitation", riskWeight: 25 }
];

export function detectRiskClauses(text) {
    const normalized = text.toLowerCase();
    const matches = [];

    for (const rule of KEYWORDS) {
        if (normalized.includes(rule.key)) {
            matches.push({
                text: `Detected phrase related to "${rule.key}"`,
                category: rule.category,
                riskWeight: rule.riskWeight,
                pdplFlag: rule.category === "Third-Party Sharing"
            });
        }
    }

    return matches;
}