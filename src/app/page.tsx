"use client";

import { useRef, useState } from "react";
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

const content = {
    en: {
        heroTitlePrefix: "Before You ",
        heroTitleAccent: "Agree",
        heroSubtitle: "Know your rights. Understand your terms.",
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
        heroSubtitle: "اعرف حقوقك. افهم شروطك.",
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
    const groupRef = useRef<HTMLDivElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!url.trim()) {
            setError(t.errorMsg);
            return;
        }
        setError("");
        router.push(`/analyze?url=${encodeURIComponent(url.trim())}&lang=${lang}`);
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const el = groupRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const moveX = (x - centerX) / centerX;
        const moveY = (y - centerY) / centerY;
        el.style.setProperty("--mx", moveX.toString());
        el.style.setProperty("--my", moveY.toString());
    }

    function handleMouseLeave() {
        const el = groupRef.current;
        if (!el) return;
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        el.style.setProperty("--mx", "0");
        el.style.setProperty("--my", "0");
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
                    gridTemplateColumns: isAr ? "0.9fr 1.1fr" : "1.1fr 0.9fr",
                    gap: 40,
                    alignItems: "center"
                }}
                className="byan-hero"
            >
                <div style={{ order: isAr ? 2 : 1, textAlign: isAr ? "right" : "left" }}>
                   <div style={{ marginBottom: 28 }} dir="ltr">  
    <BYANLogo isDark={isDark} size="lg" />  
</div>

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
                            maxWidth: 480,
                            marginInline: isAr ? "0 0 0 auto" : undefined
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

                <div style={{ display: "flex", justifyContent: "center", order: isAr ? 1 : 2 }} className="byan-hero-art">
                    <div
                        ref={groupRef}
                        className="illustration-group"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img className="illustration-blob" src="/blob-bg.png" alt="" />
                        <img className="illustration-card illustration-card-1" src="/document-card.png" alt="Terms of Service" />
                        <img className="illustration-card illustration-card-2" src="/document-card-2.png" alt="Privacy Policy" />
                        <img className="illustration-sparkle illustration-sparkle-1" src="/sparkle-accent.png" alt="" />
                        <img className="illustration-sparkle illustration-sparkle-2" src="/sparkle-accent.png" alt="" />
                    </div>
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
                        order: -1 !important;
                    }
                    .byan-hero form {
                        margin: 0 auto;
                    }
                }

                .illustration-group {
                    position: relative;
                    width: 320px;
                    height: 300px;
                    transition: transform 0.15s ease-out;
                    transform-style: preserve-3d;
                }

                .illustration-blob {
                    position: absolute;
                    inset: -40px;
                    width: calc(100% + 80px);
                    z-index: 0;
                    transition: transform 0.2s ease-out;
                    transform: translate(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -10px));
                }

                .illustration-card {
                    position: absolute;
                    width: 220px;
                    border-radius: 12px;
                    transition: transform 0.2s ease-out;
                }
                .illustration-card-1 {
                    top: 10px; left: 0px; z-index: 1;
                    transform: rotate(-4deg) translateZ(20px) translate(calc(var(--mx, 0) * 6px), calc(var(--my, 0) * 6px));
                }
                .illustration-card-2 {
                    top: 60px; left: 70px; z-index: 2;
                    transform: rotate(3deg) translateZ(40px) translate(calc(var(--mx, 0) * 10px), calc(var(--my, 0) * 10px));
                }

                .illustration-sparkle {
                    position: absolute;
                    width: 20px;
                    z-index: 4;
                    transition: transform 0.2s ease-out;
                }
                .illustration-sparkle-1 {
                    top: 0; right: 10px;
                    transform: translateZ(70px) translate(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 18px));
                }
                .illustration-sparkle-2 {
                    top: 80px; right: -10px;
                    transform: translateZ(70px) translate(calc(var(--mx, 0) * -16px), calc(var(--my, 0) * -16px));
                }
            `}</style>
        </div>
    );
}