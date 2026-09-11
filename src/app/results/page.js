"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const RISK_COLORS = {
    safe: { ring: "#16a34a", bg: "#dcfce7", text: "#166534" },
    moderate: { ring: "#ca8a04", bg: "#fef9c3", text: "#854d0e" },
    high: { ring: "#dc2626", bg: "#fee2e2", text: "#991b1b" }
};

function getRiskTier(riskLevel) {
    if (!riskLevel) return "moderate";
    const level = riskLevel.toLowerCase();
    if (level.includes("safe")) return "safe";
    if (level.includes("high")) return "high";
    return "moderate";
}

function clauseColor(weight) {
    if (weight >= 15) return RISK_COLORS.high.text;
    if (weight >= 8) return RISK_COLORS.moderate.text;
    return RISK_COLORS.safe.text;
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

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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
            } catch {
                setError("Could not load result.");
            } finally {
                setLoading(false);
            }
        }

        fetchResult();
    }, [id]);

    const tier = result ? getRiskTier(result.riskLevel) : "moderate";
    const colors = RISK_COLORS[tier];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #eef2f8 0%, #dbe4f0 100%)",
                padding: "48px 16px",
                fontFamily: "Segoe UI, Arial, sans-serif"
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
                        color: "#fff"
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Analysis Results</h1>
                    {result && (
                        <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: "0.9rem", wordBreak: "break-all" }}>
                            {result.url}
                        </p>
                    )}
                </div>

                <div style={{ padding: "32px" }}>
                    {loading && <p style={{ textAlign: "center", color: "#64748b" }}>Loading result...</p>}
                    {error && <p style={{ textAlign: "center", color: "#dc2626" }}>{error}</p>}

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
                            </div>

                            <div
                                style={{
                                    background: "#f4f7fb",
                                    border: "1px solid #dbe4f0",
                                    borderLeft: `4px solid ${colors.ring}`,
                                    borderRadius: 10,
                                    padding: "18px 20px",
                                    marginBottom: 32
                                }}
                            >
                                <h3 style={{ margin: "0 0 8px", color: "#1e3a5f", fontSize: "1rem" }}>Summary</h3>
                                <p style={{ margin: 0, color: "#334155", lineHeight: 1.6, fontSize: "0.95rem" }}>
                                    {result.summaryEn}
                                </p>
                            </div>

                            <div>
                                <h3 style={{ margin: "0 0 12px", color: "#1e3a5f", fontSize: "1rem" }}>Detected Clauses</h3>
                                {result.clauses.length === 0 ? (
                                    <p style={{ color: "#64748b" }}>No risky clauses detected in this basic scaffold.</p>
                                ) : (
                                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                                        {result.clauses.map((c, idx) => (
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
                                                    (weight: {c.riskWeight})
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

            <div style={{ textAlign: "center", marginTop: 24 }}>
                <Link href="/" style={{ color: "#274870", textDecoration: "none", fontWeight: 500 }}>
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}