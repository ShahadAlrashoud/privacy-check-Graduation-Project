"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

function getHostname(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return url || "";
    }
}

function normalizeUrl(value) {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// Groups clauses from both results by category so they can be compared row by row
function buildCategoryComparison(clausesA = [], clausesB = []) {
    const map = new Map();

    function add(clauses, side) {
        for (const c of clauses) {
            const label = (c.category || "Other").trim();
            const key = label.toLowerCase();
            if (!map.has(key)) {
                map.set(key, {
                    label,
                    a: { count: 0, weight: 0 },
                    b: { count: 0, weight: 0 }
                });
            }
            const entry = map.get(key);
            entry[side].count += 1;
            entry[side].weight += Number(c.riskWeight) || 0;
        }
    }

    add(clausesA, "a");
    add(clausesB, "b");

    return Array.from(map.values()).sort(
        (x, y) =>
            Math.max(y.a.weight, y.b.weight) - Math.max(x.a.weight, x.b.weight)
    );
}

function ScoreCircle({ score, tier, size = 180 }) {
    const colors = RISK_COLORS[tier];
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const [progress, setProgress] = useState(0);
    const scale = size / 180;

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(score), 100);
        return () => clearTimeout(timeout);
    }, [score]);

    const offset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 180 180">
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
                <span style={{ fontSize: `${2.2 * scale}rem`, fontWeight: 700, color: "#1e3a5f" }}>{score}</span>
                <span style={{ fontSize: `${Math.max(0.85 * scale, 0.7)}rem`, color: "#64748b" }}>/ 100</span>
            </div>
        </div>
    );
}

function ComparisonPanel({ current, other, isArabic, onClear }) {
    const tierA = getRiskTier(current.riskLevel);
    const tierB = getRiskTier(other.riskLevel);
    const hostA = getHostname(current.url);
    const hostB = getHostname(other.url);

    const diff = other.riskScore - current.riskScore;
    const absDiff = Math.abs(diff);
    const SIMILAR_THRESHOLD = 5;

    let verdict;
    let verdictTier;
    if (absDiff <= SIMILAR_THRESHOLD) {
        verdictTier = "moderate";
        verdict = isArabic
            ? `مستوى المخاطر متقارب (فرق ${absDiff} نقاط).`
            : `Both sites have a similar risk level (${absDiff} point difference).`;
    } else if (diff > 0) {
        verdictTier = "safe";
        verdict = isArabic
            ? `${hostA} أكثر أمانًا بفارق ${absDiff} نقطة.`
            : `${hostA} is safer by ${absDiff} points.`;
    } else {
        verdictTier = "high";
        verdict = isArabic
            ? `${hostB} أكثر أمانًا بفارق ${absDiff} نقطة.`
            : `${hostB} is safer by ${absDiff} points.`;
    }

    const clausesA = current.clauses || [];
    const clausesB = other.clauses || [];
    const highA = clausesA.filter((c) => c.riskWeight >= 15).length;
    const highB = clausesB.filter((c) => c.riskWeight >= 15).length;
    const categories = buildCategoryComparison(clausesA, clausesB);

    const stats = [
        {
            label: isArabic ? "درجة المخاطر" : "Risk score",
            a: current.riskScore,
            b: other.riskScore,
            lowerIsBetter: true
        },
        {
            label: isArabic ? "البنود المكتشفة" : "Clauses detected",
            a: clausesA.length,
            b: clausesB.length,
            lowerIsBetter: true
        },
        {
            label: isArabic ? "بنود عالية الخطورة" : "High-risk clauses",
            a: highA,
            b: highB,
            lowerIsBetter: true
        }
    ];

    const cellStyle = {
        padding: "10px 8px",
        borderBottom: "1px solid #e5e7eb",
        fontSize: "0.9rem",
        textAlign: "center"
    };
    const labelCellStyle = {
        ...cellStyle,
        textAlign: isArabic ? "right" : "left",
        color: "#334155",
        fontWeight: 500
    };

    function better(a, b, lowerIsBetter) {
        if (a === b) return { a: false, b: false };
        const aWins = lowerIsBetter ? a < b : a > b;
        return { a: aWins, b: !aWins };
    }

    function SiteColumn({ data, tier, label, host }) {
        const colors = RISK_COLORS[tier];
        return (
            <div
                style={{
                    flex: "1 1 220px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "18px 12px",
                    border: "1px solid #dbe4f0",
                    borderRadius: 10,
                    background: "#fff"
                }}
            >
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>
                    {label}
                </span>
                <span
                    style={{
                        margin: "4px 0 12px",
                        fontWeight: 600,
                        color: "#1e3a5f",
                        wordBreak: "break-all",
                        textAlign: "center"
                    }}
                    title={data.url}
                >
                    {host}
                </span>
                <ScoreCircle score={data.riskScore} tier={tier} size={130} />
                <span
                    style={{
                        marginTop: 12,
                        padding: "4px 14px",
                        borderRadius: 999,
                        background: colors.bg,
                        color: colors.text,
                        fontWeight: 600,
                        fontSize: "0.85rem"
                    }}
                >
                    {data.riskLevel}
                </span>
            </div>
        );
    }

    return (
        <div style={{ marginTop: 32 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                    gap: 12,
                    flexWrap: "wrap"
                }}
            >
                <h3 style={{ margin: 0, color: "#1e3a5f", fontSize: "1rem" }}>
                    {isArabic ? "المقارنة" : "Comparison"}
                </h3>
                <button
                    onClick={onClear}
                    style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        background: "#fff",
                        color: "#475569",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}
                >
                    {isArabic ? "إزالة المقارنة" : "Remove comparison"}
                </button>
            </div>

            {/* Side-by-side scores */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
                <SiteColumn
                    data={current}
                    tier={tierA}
                    label={isArabic ? "هذا الموقع" : "This site"}
                    host={hostA}
                />
                <SiteColumn
                    data={other}
                    tier={tierB}
                    label={isArabic ? "الموقع المقارن" : "Compared site"}
                    host={hostB}
                />
            </div>

            {/* Verdict */}
            <div
                style={{
                    background: RISK_COLORS[verdictTier].bg,
                    color: RISK_COLORS[verdictTier].text,
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginBottom: 20,
                    textAlign: "center"
                }}
            >
                {verdict}
            </div>

            {/* Stats table */}
            <div style={{ overflowX: "auto", marginBottom: 24 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f4f7fb" }}>
                            <th style={{ ...labelCellStyle, color: "#64748b", fontWeight: 600 }}>
                                {isArabic ? "المقياس" : "Metric"}
                            </th>
                            <th style={{ ...cellStyle, color: "#64748b", fontWeight: 600 }}>{hostA}</th>
                            <th style={{ ...cellStyle, color: "#64748b", fontWeight: 600 }}>{hostB}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map((s) => {
                            const win = better(s.a, s.b, s.lowerIsBetter);
                            return (
                                <tr key={s.label}>
                                    <td style={labelCellStyle}>{s.label}</td>
                                    <td
                                        style={{
                                            ...cellStyle,
                                            fontWeight: win.a ? 700 : 400,
                                            color: win.a ? CLAUSE_COLORS.safe : "#334155"
                                        }}
                                    >
                                        {s.a}
                                    </td>
                                    <td
                                        style={{
                                            ...cellStyle,
                                            fontWeight: win.b ? 700 : 400,
                                            color: win.b ? CLAUSE_COLORS.safe : "#334155"
                                        }}
                                    >
                                        {s.b}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Category breakdown */}
            <h4 style={{ margin: "0 0 10px", color: "#1e3a5f", fontSize: "0.95rem" }}>
                {isArabic ? "مقارنة الفئات" : "Category breakdown"}
            </h4>
            {categories.length === 0 ? (
                <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    {isArabic ? "لا توجد بنود للمقارنة." : "No clauses to compare."}
                </p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f4f7fb" }}>
                                <th style={{ ...labelCellStyle, color: "#64748b", fontWeight: 600 }}>
                                    {isArabic ? "الفئة" : "Category"}
                                </th>
                                <th style={{ ...cellStyle, color: "#64748b", fontWeight: 600 }}>{hostA}</th>
                                <th style={{ ...cellStyle, color: "#64748b", fontWeight: 600 }}>{hostB}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.label}>
                                    <td style={labelCellStyle}>{cat.label}</td>
                                    {["a", "b"].map((side) => {
                                        const v = cat[side];
                                        return (
                                            <td key={side} style={cellStyle}>
                                                {v.count === 0 ? (
                                                    <span style={{ color: "#94a3b8" }}>
                                                        {isArabic ? "غير موجود" : "Not found"}
                                                    </span>
                                                ) : (
                                                    <span style={{ color: clauseColor(v.weight), fontWeight: 600 }}>
                                                        {v.weight}
                                                        {v.count > 1 && (
                                                            <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: "0.8rem" }}>
                                                                {" "}({v.count})
                                                            </span>
                                                        )}
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: "0.8rem" }}>
                        {isArabic
                            ? "الأرقام تمثل مجموع أوزان المخاطر لكل فئة، وعدد البنود بين قوسين."
                            : "Numbers show the total risk weight per category; clause count in parentheses."}
                    </p>
                </div>
            )}
        </div>
    );
}

function ResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");
    const compareId = searchParams.get("compare");
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

    // Comparison state
    const [compareInput, setCompareInput] = useState("");
    const [compareResult, setCompareResult] = useState(null);
    const [comparing, setComparing] = useState(false);
    const [compareError, setCompareError] = useState("");

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

    // Load an existing comparison from the URL (?compare=<id>) so refresh/share keeps it
    useEffect(() => {
        if (!compareId) {
            setCompareResult(null);
            return;
        }
        if (compareResult?.id === compareId) return;

        let cancelled = false;
        async function loadCompare() {
            setComparing(true);
            setCompareError("");
            try {
                const res = await fetch(`/api/result/${compareId}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Comparison result not found.");
                if (!cancelled) setCompareResult(data);
            } catch (err) {
                if (!cancelled) {
                    setCompareError(err instanceof Error ? err.message : "Could not load comparison.");
                }
            } finally {
                if (!cancelled) setComparing(false);
            }
        }
        loadCompare();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compareId]);

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

    async function handleCompare(e) {
        e.preventDefault();
        if (!result || comparing) return;

        const url = normalizeUrl(compareInput);
        if (!url) {
            setCompareError(isArabic ? "يرجى إدخال رابط." : "Please enter a URL.");
            return;
        }
        if (getHostname(url) === getHostname(result.url)) {
            setCompareError(
                isArabic ? "يرجى إدخال رابط لموقع مختلف." : "Please enter a URL for a different site."
            );
            return;
        }

        setComparing(true);
        setCompareError("");
        try {
            const analyzeRes = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, lang: displayLang })
            });
            const analyzeData = await analyzeRes.json();
            if (!analyzeRes.ok) throw new Error(analyzeData.error || "Analysis failed.");

            const res = await fetch(`/api/result/${analyzeData.id}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Could not load comparison result.");

            setCompareResult(data);
            setCompareInput("");
            router.replace(`/results?id=${id}&compare=${data.id}`, { scroll: false });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Comparison failed.";
            setCompareError(message.replace(/^BLOCKED:\s*/, ""));
        } finally {
            setComparing(false);
        }
    }

    function handleClearComparison() {
        setCompareResult(null);
        setCompareError("");
        router.replace(`/results?id=${id}`, { scroll: false });
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
    const activeClauses = (isShowingTranslated && translatedData ? translatedData.clauses : result?.clauses) || [];

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

                            {/* ---------- Comparison ---------- */}
                            <div
                                style={{
                                    marginTop: 36,
                                    paddingTop: 28,
                                    borderTop: "1px solid #e5e7eb"
                                }}
                            >
                                {!compareResult && (
                                    <>
                                        <h3 style={{ margin: "0 0 6px", color: "#1e3a5f", fontSize: "1rem" }}>
                                            {isArabic ? "قارن مع رابط آخر" : "Compare with another URL"}
                                        </h3>
                                        <p style={{ margin: "0 0 14px", color: "#64748b", fontSize: "0.9rem" }}>
                                            {isArabic
                                                ? "حلّل موقعًا آخر واعرض النتائج جنبًا إلى جنب."
                                                : "Analyze another site and see the results side by side."}
                                        </p>
                                        <form
                                            onSubmit={handleCompare}
                                            style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                                        >
                                            <input
                                                type="text"
                                                dir="ltr"
                                                value={compareInput}
                                                onChange={(e) => setCompareInput(e.target.value)}
                                                placeholder="https://example.com"
                                                disabled={comparing}
                                                style={{
                                                    flex: "1 1 260px",
                                                    padding: "10px 14px",
                                                    borderRadius: 8,
                                                    border: "1px solid #cbd5e1",
                                                    fontSize: "0.9rem",
                                                    outline: "none"
                                                }}
                                            />
                                            <button
                                                type="submit"
                                                disabled={comparing}
                                                style={{
                                                    padding: "10px 20px",
                                                    borderRadius: 8,
                                                    border: "none",
                                                    background: "#274870",
                                                    color: "#fff",
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    cursor: comparing ? "wait" : "pointer",
                                                    opacity: comparing ? 0.7 : 1
                                                }}
                                            >
                                                {comparing
                                                    ? isArabic ? "جارٍ التحليل..." : "Analyzing..."
                                                    : isArabic ? "قارن" : "Compare"}
                                            </button>
                                        </form>
                                    </>
                                )}

                                {compareError && (
                                    <p style={{ color: "#dc2626", marginTop: 12, fontSize: "0.9rem" }}>{compareError}</p>
                                )}

                                {compareResult && (
                                    <ComparisonPanel
                                        current={result}
                                        other={compareResult}
                                        isArabic={isArabic}
                                        onClear={handleClearComparison}
                                    />
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