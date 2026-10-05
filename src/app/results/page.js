"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const RISK_COLORS = {
    safe: { ring: "#86d9a4", bg: "#eafcf1", text: "#4a8f68" },
    moderate: { ring: "#f2c96b", bg: "#fdf6e3", text: "#a17f2d" },
    high: { ring: "#f19a9a", bg: "#fdecec", text: "#c06a6a" }
};

function getRiskTier(riskLevel) {
    if (!riskLevel) return "moderate";
    const level = riskLevel.toLowerCase();
    if (level.includes("safe")) return "safe";
    if (level.includes("high")) return "high";
    return "moderate";
}

const CLAUSE_COLORS = {
    high: "#c06a6a",
    moderate: "#a17f2d",
    safe: "#4a8f68"
};

function clauseColor(weight) {
    if (weight >= 15) return CLAUSE_COLORS.high;
    if (weight >= 8) return CLAUSE_COLORS.moderate;
    return CLAUSE_COLORS.safe;
}

function ScoreCircle({ score, tier }) {
    const colors = RISK_COLORS[tier];
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(score), 100);
        return () => clearTimeout(timeout);
    }, [score]);

    const offset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ position: "relative", width: 180, height: 180 }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
                <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={colors.ring}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 90 90)"
                    style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#1e3a5f" }}>{score}</span>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>/ 100</span>
            </div>
        </div>
    );
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const [saveStatus, setSaveStatus] = useState("");

    // Translation state
    const [displayLang, setDisplayLang] = useState(null); // set once result loads
    const [translatedData, setTranslatedData] = useState(null); // cached translation
    const [translating, setTranslating] = useState(false);
    const [translateError, setTranslateError] = useState("");

    useEffect(() => {
        async function fetchResult() {
            if (!id) {
                setError("Missing result ID.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/result/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Result not found.");
                    setLoading(false);
                    return;
                }

                setResult(data);
                setDisplayLang(data.lang === "ar" ? "ar" : "en");
            } catch {
                setError("Could not load result.");
            } finally {
                setLoading(false);
            }
        }

        fetchResult();
    }, [id]);

    async function handleSave() {
        if (!result?.id) return;
        setSaveStatus("saving");
        try {
            const res = await fetch("/api/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    analysisId: result.id,
                    title: result.resolvedUrl || result.url,
                    query: result.url,
                    result: result.summaryEn,
                    riskScore: result.riskScore,
                    riskLevel: result.riskLevel,
                })
            });
            if (!res.ok) throw new Error();
            setSaveStatus("saved");
        } catch {
            setSaveStatus("error");
        }
    }

    async function handleToggleLanguage() {
        if (!result) return;
        const targetLang = displayLang === "ar" ? "en" : "ar";

        // If we're switching back to the original language, no API call needed
        const originalLang = result.lang === "ar" ? "ar" : "en";
        if (targetLang === originalLang) {
            setDisplayLang(targetLang);
            return;
        }

        // If we already translated to this target language before, reuse it
        if (translatedData && translatedData.lang === targetLang) {
            setDisplayLang(targetLang);
            return;
        }

        setTranslating(true);
        setTranslateError("");
        try {
            const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    summaryEn: result.summaryEn,
                    clauses: result.clauses,
                    targetLang
                })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Translation failed.");
            }

            setTranslatedData({ ...data, lang: targetLang });
            setDisplayLang(targetLang);
        } catch (err) {
            setTranslateError(err instanceof Error ? err.message : "Translation failed.");
        } finally {
            setTranslating(false);
        }
    }

    const tier = result ? getRiskTier(result.riskLevel) : "moderate";
    const colors = RISK_COLORS[tier];

    const originalLang = result?.lang === "ar" ? "ar" : "en";
    const isShowingTranslated = displayLang && displayLang !== originalLang;
    const activeSummary = isShowingTranslated && translatedData ? translatedData.summaryEn : result?.summaryEn;
    const activeClauses = isShowingTranslated && translatedData ? translatedData.clauses : result?.clauses;

    const isArabic = displayLang === "ar";
    const dir = isArabic ? "rtl" : "ltr";
    const textAlign = isArabic ? "right" : "left";

    return (
        <div
            dir={dir}
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #eef2f8 0%, #dbe4f0 100%)",
                padding: "48px 16px",
                fontFamily: isArabic ? "'Segoe UI', Tahoma, Arial, sans-serif" : "Segoe UI, Arial, sans-serif"
            }}
        >
            <div
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg, #274870 0%, #5b7ba8 100%)",
                        padding: "28px 32px",
                        color: "#fff",
                        textAlign,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 16,
                        flexWrap: "wrap"
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
                            {isArabic ? "نتائج التحليل" : "Analysis Results"}
                        </h1>
                        {result && (
                            <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: "0.9rem", wordBreak: "break-all" }}>
                                {result.url}
                            </p>
                        )}
                    </div>

                    {result && (
                        <button
                            onClick={handleToggleLanguage}
                            disabled={translating}
                            style={{
                                flexShrink: 0,
                                padding: "8px 16px",
                                borderRadius: 8,
                                border: "1px solid rgba(255,255,255,0.6)",
                                background: "rgba(255,255,255,0.12)",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                cursor: translating ? "wait" : "pointer"
                            }}
                        >
                            {translating
                                ? (isArabic ? "جارٍ الترجمة..." : "Translating...")
                                : displayLang === "ar"
                                    ? "View in English"
                                    : "عرض بالعربية"}
                        </button>
                    )}
                </div>

                <div style={{ padding: "32px", textAlign }}>
                    {loading && (
                        <p style={{ textAlign: "center", color: "#64748b" }}>
                            {isArabic ? "جارٍ تحميل النتيجة..." : "Loading result..."}
                        </p>
                    )}
                    {error && <p style={{ textAlign: "center", color: "#dc2626" }}>{error}</p>}
                    {translateError && (
                        <p style={{ textAlign: "center", color: "#dc2626", marginBottom: 16 }}>{translateError}</p>
                    )}

                    {!loading && result && (
                        <>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
                                <ScoreCircle score={result.riskScore} tier={tier} />
                                <span
                                    style={{
                                        marginTop: 16,
                                        padding: "6px 18px",
                                        borderRadius: 999,
                                        background: colors.bg,
                                        color: colors.text,
                                        fontWeight: 600,
                                        fontSize: "0.95rem"
                                    }}
                                >
                                    {result.riskLevel}
                                </span>

                                {session?.user && (
                                    <button
                                        onClick={handleSave}
                                        disabled={saveStatus === "saving" || saveStatus === "saved"}
                                        style={{
                                            marginTop: 12,
                                            padding: "8px 20px",
                                            borderRadius: 8,
                                            border: "1px solid #274870",
                                            background: saveStatus === "saved" ? "#274870" : "#fff",
                                            color: saveStatus === "saved" ? "#fff" : "#274870",
                                            fontWeight: 600,
                                            fontSize: "0.85rem",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {saveStatus === "saved"
                                            ? isArabic ? "تم الحفظ ✓" : "Saved ✓"
                                            : saveStatus === "saving"
                                                ? isArabic ? "جارٍ الحفظ..." : "Saving..."
                                                : isArabic ? "حفظ النتيجة" : "Save Result"}
                                    </button>
                                )}
                            </div>

                            <div
                                style={{
                                    background: "#f4f7fb",
                                    border: "1px solid #dbe4f0",
                                    [isArabic ? "borderRight" : "borderLeft"]: `4px solid ${colors.ring}`,
                                    borderRadius: 10,
                                    padding: "18px 20px",
                                    marginBottom: 32
                                }}
                            >
                                <h3 style={{ margin: "0 0 8px", color: "#1e3a5f", fontSize: "1rem" }}>
                                    {isArabic ? "الملخص" : "Summary"}
                                </h3>
                                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6, fontSize: "0.95rem" }}>
                                    {activeSummary}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ margin: "0 0 12px", color: "#1e3a5f", fontSize: "1rem" }}>
                                    {isArabic ? "البنود المكتشفة" : "Detected Clauses"}
                                </h3>
                                {activeClauses.length === 0 ? (
                                    <p style={{ color: "#64748b" }}>
                                        {isArabic
                                            ? "لم يتم اكتشاف بنود خطرة في هذا التحليل الأساسي."
                                            : "No risky clauses detected in this basic scaffold."}
                                    </p>
                                ) : (
                                    <ul style={{ [isArabic ? "paddingRight" : "paddingLeft"]: 20, margin: 0 }}>
                                        {activeClauses.map((c, idx) => (
                                            <li
                                                key={idx}
                                                style={{
                                                    marginBottom: 14,
                                                    color: clauseColor(c.riskWeight),
                                                    lineHeight: 1.6
                                                }}
                                            >
                                                <strong>{c.category}:</strong> {c.text}{" "}
                                                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                                                    ({isArabic ? "الوزن" : "weight"}: {c.riskWeight})
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                {result && (
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            background: "#274870",
                            color: "#fff",
                            padding: "10px 22px",
                            borderRadius: 8,
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            textDecoration: "none"
                        }}
                    >
                        {isArabic ? "تحليل رابط آخر" : "Analyze another URL"}
                    </Link>
                )}
                <Link href="/" style={{ color: "#274870", textDecoration: "none", fontWeight: 500 }}>
                    {isArabic ? "→ العودة إلى الصفحة الرئيسية" : "← Back to Homepage"}
                </Link>
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<p style={{ textAlign: "center", padding: "48px" }}>Loading...</p>}>
            <ResultsContent />
        </Suspense>
    );
}