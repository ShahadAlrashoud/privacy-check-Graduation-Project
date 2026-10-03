"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./providers";

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

const content = {
    en: {
        heroTitlePrefix: "Before You ",
        heroTitleAccent: "Agree",
        heroSubtitle: "Know your rights. Understand your terms Now.",
        placeholder: "Enter website URL (e.g. example.com)",
        button: "Analyze Website →",
        errorMsg: "Please enter a URL.",
        helperText: "Quick. Simple. Clear. Results follow the language of the actual policy.",
        features: [
            { title: "Terms of Service", text: "Understand what you're agreeing to." },
            { title: "Privacy Policy", text: "See how your data is collected and used." },
            { title: "Potential Risks", text: "Spot clauses that may matter to you." },
            { title: "Plain Language", text: "Complex legal language, made simple — in English or Arabic." }
        ]
    },
    ar: {
        heroTitlePrefix: "قبل أن ",
        heroTitleAccent: "توافق",
        heroSubtitle: "اعرف حقوقك. افهم شروطك الأن.",
        placeholder: "أدخل رابط الموقع (مثال: example.com)",
        button: "← تحليل الموقع",
        errorMsg: "الرجاء إدخال رابط.",
        helperText: "سريع. بسيط. واضح. تُعرض النتائج بلغة السياسة الفعلية.",
        features: [
            { title: "شروط الخدمة", text: "افهم ما الذي توافق عليه." },
            { title: "سياسة الخصوصية", text: "تعرّف على كيفية جمع بياناتك واستخدامها." },
            { title: "المخاطر المحتملة", text: "اكتشف البنود التي قد تهمك." },
            { title: "لغة مبسطة", text: "لغة قانونية معقدة، مبسطة — بالعربية أو الإنجليزية." }
        ]
    }
};

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!url.trim()) {
            setError(t.errorMsg);
            return;
        }
        setError("");
        router.push(`/analyze?url=${encodeURIComponent(url.trim())}&lang=${lang}`);
    }

    const iconColor = "#6366f1";
    const icons = [IconDocument, IconShield, IconWarning, IconSparkle];
    const features = t.features.map((f, i) => ({ ...f, Icon: icons[i] }));

    return (
        <div
            dir={isAr ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
                fontFamily: "Segoe UI, Arial, sans-serif",
                color: isDark ? "#f1f1f1" : "#1e293b",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* Hero */}
            <div
                style={{
                    maxWidth: 700,
                    margin: "0 auto",
                    width: "100%",
                    padding: "90px 24px 50px",
                    textAlign: isAr ? "right" : "left"
                }}
                className="byan-hero"
            >
                <h1 style={{ fontSize: "2.6rem", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.2 }}>
                    {t.heroTitlePrefix}<span style={{ color: "#6366f1" }}>{t.heroTitleAccent}</span>
                </h1>
                <p style={{ fontSize: "1.05rem", color: isDark ? "#94a3b8" : "#64748b", margin: "0 0 24px", lineHeight: 1.6 }}>
                    {t.heroSubtitle}
                </p>

                <form
                    onSubmit={handleSubmit}
                    dir={isAr ? "rtl" : "ltr"}
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
                        placeholder={t.placeholder}
                        style={{
                            flex: 1,
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            padding: "10px 12px",
                            fontSize: "0.95rem",
                            color: isDark ? "#f1f1f1" : "#1e293b",
                            textAlign: isAr ? "right" : "left"
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            border: "none",
                            borderRadius: 10,
                            padding: "13px 26px",
                            background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {t.button}
                    </button>
                </form>
                {error && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 10 }}>{error}</p>}
                <p style={{ marginTop: 14, fontSize: "0.8rem", color: isDark ? "#64748b" : "#94a3b8" }}>
                    {t.helperText}
                </p>
            </div>

            {/* Divider */}
            <div
                style={{
                    width: "100%",
                    height: 1,
                    background: isDark ? "#1e293b" : "#e2e8f0"
                }}
            />

            {/* Features — fills remaining page height */}
            <div
                style={{
                    flex: 1,
                    width: "100%",
                    background: isDark ? "#0f172a" : "#f8fafc",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "60px 24px"
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: 24,
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
            </div>

            <style>{`
                @media (max-width: 760px) {
                    .byan-hero {
                        text-align: center;
                    }
                    .byan-hero form {
                        margin: 0 auto;
                    }
                }
            `}</style>
        </div>
    );
}