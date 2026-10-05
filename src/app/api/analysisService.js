import { detectRiskClauses } from "../../../nlp/extractClauses";
import { scoreRisk } from "../../../nlp/riskScorer";
import { createAnalysis, saveResult } from "../../../ database / db";

function isValidHttpUrl(value) {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

const POLICY_KEYWORDS = [
    "terms of service",
    "terms and conditions",
    "terms of use",
    "privacy policy",
    "privacy notice",
    "tos",
    "legal",
    "privacy"
];

const FALLBACK_PATHS = [
    "/privacy",
    "/privacy-policy",
    "/legal/privacy",
    "/terms",
    "/terms-of-service",
    "/tos",
    "/legal/terms",
    "/legal"
];

function buildHeaders(url) {
    const isArabicHint = /[?&]hl=ar\b/i.test(url) || /\/ar\//i.test(url);
    return {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": isArabicHint ? "ar,en;q=0.5" : "en-US,en;q=0.9"
    };
}

async function fetchHtml(url) {
    let response;
    try {
        response = await fetch(url, { headers: buildHeaders(url) });
    } catch {
        throw new Error("BLOCKED: This site could not be reached automatically.");
    }

    if (!response.ok) {
        if ([403, 429, 503].includes(response.status)) {
            throw new Error("BLOCKED: This site is blocking automated requests.");
        }
        throw new Error(`Could not fetch the page (status ${response.status}).`);
    }
    return response.text();
}

function htmlToText(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Scans the homepage HTML for a link that looks like a ToS / Privacy Policy page
function findPolicyLink(html, baseUrl) {
    const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    const candidates = [];

    while ((match = anchorRegex.exec(html)) !== null) {
        const href = match[1];
        const text = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
        const hrefLower = href.toLowerCase();

        const score = POLICY_KEYWORDS.reduce((acc, kw) => {
            if (text.includes(kw)) acc += 2;
            if (hrefLower.includes(kw.replace(/\s+/g, ""))) acc += 1;
            if (hrefLower.includes(kw.replace(/\s+/g, "-"))) acc += 1;
            return acc;
        }, 0);

        if (score > 0) {
            candidates.push({ href, score });
        }
    }

    if (candidates.length === 0) return null;

    candidates.sort((a, b) => b.score - a.score || a.href.length - b.href.length);

    try {
        return new URL(candidates[0].href, baseUrl).toString();
    } catch {
        return null;
    }
}

// Tries a list of common policy URL paths against the site's origin
async function tryFallbackPaths(baseUrl) {
    let origin;
    try {
        origin = new URL(baseUrl).origin;
    } catch {
        return null;
    }

    for (const path of FALLBACK_PATHS) {
        const candidateUrl = origin + path;
        try {
            const response = await fetch(candidateUrl, {
                method: "GET",
                headers: buildHeaders(candidateUrl)
            });
            if (response.ok) {
                const html = await response.text();
                if (html && html.length > 200) {
                    return { url: candidateUrl, html };
                }
            }
        } catch {
            // Ignore and try the next path
        }
    }

    return null;
}

async function fetchPolicyText(url) {
    const homepageHtml = await fetchHtml(url);

    const policyUrl = findPolicyLink(homepageHtml, url);

    if (policyUrl && policyUrl !== url) {
        try {
            const policyHtml = await fetchHtml(policyUrl);
            return { text: htmlToText(policyHtml), resolvedUrl: policyUrl };
        } catch {
            // Fall back to trying common paths below
        }
    }

    const fallback = await tryFallbackPaths(url);
    if (fallback) {
        return { text: htmlToText(fallback.html), resolvedUrl: fallback.url };
    }

    return { text: htmlToText(homepageHtml), resolvedUrl: url };
}

function detectLanguage(text) {
    const arabicMatches = text.match(/[\u0600-\u06FF]/g) || [];
    const ratio = arabicMatches.length / Math.max(text.length, 1);
    return ratio > 0.08 ? "ar" : "en";
}

async function assessWithAI(policyText, lang) {
    const languageInstruction =
        lang === "ar"
            ? `Write the "summaryEn" field and all "category"/"text" fields in Arabic (Modern Standard Arabic), even though the field is named "summaryEn".`
            : `Write all fields in English.`;

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

${languageInstruction}

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

export async function runAnalysisForUrl(url, preferredLang = "en", userId = null) {
    if (!isValidHttpUrl(url)) {
        throw new Error("Invalid URL");
    }

    const { text: policyText, resolvedUrl } = await fetchPolicyText(url);

    const detectedLang = detectLanguage(policyText);
    const lang = detectedLang; // result always follows the actual document's language

    const keywordClauses = detectRiskClauses(policyText);
    const keywordScoring = scoreRisk(keywordClauses);

    let aiScoring;

    try {
        aiScoring = await assessWithAI(policyText, lang);
    } catch (error) {
        console.error("AI ANALYSIS ERROR:", error);
        aiScoring = null;
    }

    const record = {
        id: crypto.randomUUID(),
        userId,
        url,
        resolvedUrl,
        lang,
        preferredLang,
        riskScore: Math.round(aiScoring?.riskScore ?? keywordScoring.riskScore),
        riskLevel: aiScoring?.riskLevel ?? keywordScoring.riskLevel,
        summaryEn: aiScoring?.summaryEn ?? keywordScoring.summaryEn,
        clauses: aiScoring?.clauses?.length ? aiScoring.clauses : keywordClauses,
        createdAt: new Date().toISOString()
    };

    // Always save the full record so /api/result/[id] can retrieve it
    await saveResult(record);

    // Only add to the user's saved-analyses list if they're logged in
    if (userId) {
        await createAnalysis({
            id: record.id,
            userId: record.userId,
            title: record.resolvedUrl || record.url,
            query: record.url,
            result: record.summaryEn,
        });
    }

    return record;

    return record;
    return record;
}