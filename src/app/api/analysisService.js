import { detectRiskClauses } from "../../../nlp/extractClauses";
import { scoreRisk } from "../../../nlp/riskScorer";
import { saveAnalysis } from "../../../database/mockDb";

function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

async function fetchPolicyText(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Could not fetch the page.");
    }
    const html = await response.text();
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

async function assessWithAI(policyText) {
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: `You are a privacy policy risk analyzer.

Return ONLY valid JSON in this exact format:

{
  "riskScore": number,
  "riskLevel": "Safe" | "Moderate Risk" | "High Risk",
  "summaryEn": string,
  "clauses": [
    {
      "category": string,
      "text": string,
      "riskWeight": number
    }
  ]
}`
                    },
                    {
                        role: "user",
                        content: policyText.slice(0, 12000)
                    }
                ],
                response_format: { type: "json_object" }
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
        throw new Error("AI returned an unexpected response.");
    }

    return JSON.parse(data.choices[0].message.content);
}

export async function runAnalysisForUrl(url) {
    if (!isValidHttpUrl(url)) {
        throw new Error("Invalid URL");
    }

    const policyText = await fetchPolicyText(url);

    const keywordClauses = detectRiskClauses(policyText);
    const keywordScoring = scoreRisk(keywordClauses);

    let aiScoring;

    try {
        aiScoring = await assessWithAI(policyText);
    } catch (error) {
        console.error("AI ANALYSIS ERROR:", error);
        aiScoring = null;
    }

    const record = {
        id: crypto.randomUUID(),
        url,
        riskScore: aiScoring?.riskScore ?? keywordScoring.riskScore,
        riskLevel: aiScoring?.riskLevel ?? keywordScoring.riskLevel,
        summaryEn: aiScoring?.summaryEn ?? keywordScoring.summaryEn,
        clauses: aiScoring?.clauses?.length ? aiScoring.clauses : keywordClauses,
        createdAt: new Date().toISOString()
    };

    await saveAnalysis(record);
    return record;
}