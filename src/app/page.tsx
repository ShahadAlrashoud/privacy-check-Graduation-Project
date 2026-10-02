"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./providers";
import BYANLogo from "./components/BYANLogo";

function IconDocument({ color }: { color: string }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
    );
}

function IconShield({ color }: { color: string }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    );
}

function IconWarning({ color }: { color: string }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}

function IconSparkle({ color }: { color: string }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.9 4.9l2.8 2.8" />
            <path d="M16.3 16.3l2.8 2.8" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.9 19.1l2.8-2.8" />
            <path d="M16.3 7.7l2.8-2.8" />
        </svg>
    );
}

function IconDoc({ color }: { color: string }) {
    return (
        <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
            <rect x="10" y="5" width="100" height="140" rx="6" stroke={color} strokeWidth="2" fill="none" />
            <line x1="26" y1="35" x2="94" y2="35" stroke={color} strokeWidth="2" />
            <line x1="26" y1="50" x2="94" y2="50" stroke={color} strokeWidth="2" />
            <line x1="26" y1="65" x2="70" y2="65" stroke={color} strokeWidth="2" />
            <circle cx="60" cy="100" r="26" fill={color} opacity="0.12" />
            <path d="M48 100l8 8 16-16" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [lang, setLang] = useState<"en" | "ar">("en");
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setError("");
        router.push(`/analyze?url=${encodeURIComponent(url.trim())}&lang=${lang}`);
    }

    const iconColor = "#5b7ba8";

    const features = [
        { Icon: IconDocument, title: "Terms of Service", text: "Understand what you're agreeing to." },
        { Icon: IconShield, title: "Privacy Policy", text: "See how your data is collected and used." },
        { Icon: IconWarning, title: "Potential Risks", text: "Spot clauses that may matter to you." },
        { Icon: IconSparkle, title: "Plain Language", text: "Complex legal language, made simple — in English or Arabic." }
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
                fontFamily: "Segoe UI, Arial, sans-serif",
                color: isDark ? "#f1f1f1" : "#1e293b"
            }}
        >
            {/* Hero: two columns */}
            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "70px 24px 50px",
                    display: "grid",
                    gridTemplateColumns: "1.1fr 0.9fr",
                    gap: 40,
                    alignItems: "center"
                }}
                className="byan-hero"
            >
                <div>
                    <div style={{ marginBottom: 28 }}>
                        <BYANLogo isDark={isDark} size="lg" />
                    </div>

                    <h1 style={{ fontSize: "2.6rem", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.2 }}>
                        Before You <span style={{ color: "#5b7ba8" }}>Agree</span>
                    </h1>
                    <p style={{ fontSize: "1.05rem", color: isDark ? "#94a3b8" : "#64748b", margin: "0 0 24px", lineHeight: 1.6 }}>
                        Know your rights. Understand your terms.
                    </p>

                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        <button
                            type="button"
                            onClick={() => setLang("en")}
                            style={{
                                border: lang === "en" ? "1.5px solid #274870" : isDark ? "1.5px solid #334155" : "1.5px solid #e2e8f0",
                                background: lang === "en" ? "#274870" : "transparent",
                                color: lang === "en" ? "#fff" : isDark ? "#94a3b8" : "#64748b",
                                borderRadius: 8,
                                padding: "6px 14px",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            EN
                        </button>
                        <button
                            type="button"
                            onClick={() => setLang("ar")}
                            style={{
                                border: lang === "ar" ? "1.5px solid #274870" : isDark ? "1.5px solid #334155" : "1.5px solid #e2e8f0",
                                background: lang === "ar" ? "#274870" : "transparent",
                                color: lang === "ar" ? "#fff" : isDark ? "#94a3b8" : "#64748b",
                                borderRadius: 8,
                                padding: "6px 14px",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                cursor: "pointer"
                            }}
                        >
                            AR
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            gap: 10,
                            background: isDark ? "#111827" : "#f4f7fb",
                            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                            borderRadius: 14,
                            padding: 8,
                            maxWidth: 480
                        }}
                    >
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter website URL (e.g. example.com)"
                            style={{
                                flex: 1,
                                border: "none",
                                background: "transparent",
                                outline: "none",
                                padding: "10px 12px",
                                fontSize: "0.95rem",
                                color: isDark ? "#f1f1f1" : "#1e293b"
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                border: "none",
                                borderRadius: 10,
                                padding: "13px 26px",
                                background: "linear-gradient(135deg, #274870 0%, #5b7ba8 100%)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                cursor: "pointer",
                                whiteSpace: "nowrap"
                            }}
                        >
                            Analyze Website →
                        </button>
                    </form>
                    {error && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 10 }}>{error}</p>}
                    <p style={{ marginTop: 14, fontSize: "0.8rem", color: isDark ? "#64748b" : "#94a3b8" }}>
                        Quick. Simple. Clear. Results follow the language of the actual policy.
                    </p>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }} className="byan-hero-art">
                    <IconDoc color={iconColor} />
                </div>
            </div>

            {/* Features */}
            <div
                style={{
                    maxWidth: 900,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 24,
                    padding: "20px 24px 80px",
                    textAlign: "center"
                }}
            >
                {features.map((f) => (
                    <div key={f.title}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                margin: "0 auto 12px",
                                borderRadius: 12,
                                background: isDark ? "#1e293b" : "#eef2f8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <f.Icon color={iconColor} />
                        </div>
                        <h3 style={{ margin: "0 0 6px", fontSize: "0.95rem" }}>{f.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: isDark ? "#94a3b8" : "#64748b" }}>{f.text}</p>
                    </div>
                ))}
            </div>

            <style>{`
                @media (max-width: 760px) {
                    .byan-hero {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                    .byan-hero-art {
                        order: -1;
                    }
                    .byan-hero form {
                        margin: 0 auto;
                    }
                }
            `}</style>
        </div>
    );
}