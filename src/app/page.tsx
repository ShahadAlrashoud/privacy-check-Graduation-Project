"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./providers";

/* ---------- Icons ---------- */

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

/* ---------- Content ---------- */

const content = {
    en: {
        heroTitlePrefix: "Before you ",
        heroTitleAccent: "agree",
        heroSubtitle: "Know your rights. Understand your terms. Now.",
        placeholder: "Enter website URL (e.g. example.com)",
        button: "Analyze Website →",
        errorMsg: "Please enter a URL.",
        helperText: "Fast. Simple. Clear. Results follow the language of the actual policy.",

        howTitle: "How It Works",
        steps: [
            { title: "Enter a URL", text: "Paste any website's address." },
            { title: "We read the fine print", text: "BYAN finds and analyzes the Terms and Privacy Policy in Arabic or English." },
            { title: "Get your risk score", text: "A clear 0–100 score with a plain-language summary." },
        ],

        featuresTitle: "What You Get",
        features: [
            { title: "Terms of Service", text: "Understand what you're agreeing to." },
            { title: "Privacy Policy", text: "See how your data is collected and used." },
            { title: "Potential Risks", text: "Spot clauses that may concern you." },
            { title: "Plain Language", text: "Complex legal language, simplified — in English or Arabic." },
        ],

        legendTitle: "Know the risk at a glance",
        legendText: "Every policy is summarized in a single risk score from 0 to 100, classified into one of three levels.",
        legend: ["Safe", "Medium Risk", "High Risk"],

        disclaimerTitle: "Disclaimer",
        disclaimerText:
            "BYAN provides automated, informational analysis only. It is not legal advice, and results may be incomplete or inaccurate. Please read the original policies before agreeing.",
        disclaimerLink: "Read full disclaimer",

        ctaTitle: "Before you agree, know what you're agreeing to.",
        ctaButton: "Try it now",
    },

    ar: {
        disclaimerTitle: "تنبيه",
        disclaimerText:
            "يقدّم بيان تحليلاً آلياً للأغراض المعلوماتية فقط، وهو ليس استشارة قانونية، وقد تكون النتائج ناقصة أو غير دقيقة. يرجى قراءة السياسات الأصلية قبل الموافقة.",
        disclaimerLink: "اقرأ إخلاء المسؤولية كاملاً",

        heroTitlePrefix: "قبل أن ",
        heroTitleAccent: "توافق",
        heroSubtitle: "اعرف حقوقك. افهم شروطك الآن.",
        placeholder: "أدخل رابط الموقع (مثال: example.com)",
        button: "← تحليل الموقع",
        errorMsg: "الرجاء إدخال رابط.",
        helperText: "سريع. بسيط. واضح. تظهر النتائج بلغة السياسة الفعلية.",

        howTitle: "كيف يعمل",
        steps: [
            { title: "أدخل الرابط", text: "الصق عنوان أي موقع." },
            { title: "نقرأ التفاصيل الدقيقة", text: "يعثر بيان على شروط الخدمة وسياسة الخصوصية ويحللها بالعربية أو الإنجليزية." },
            { title: "احصل على درجة المخاطر", text: "درجة واضحة من 0 إلى 100 مع ملخص بلغة بسيطة." },
        ],

        featuresTitle: "ماذا ستحصل عليه",
        features: [
            { title: "شروط الخدمة", text: "افهم ما الذي توافق عليه." },
            { title: "سياسة الخصوصية", text: "اطلع على كيفية جمع بياناتك واستخدامها." },
            { title: "المخاطر المحتملة", text: "اكتشف البنود التي قد تهمك." },
            { title: "لغة بسيطة", text: "لغة قانونية معقدة، مبسّطة — بالعربية أو الإنجليزية." },
        ],

        legendTitle: "اعرف مستوى الخطر بنظرة واحدة",
        legendText:
            "يتم تلخيص كل سياسة في درجة مخاطر واحدة من 0 إلى 100، وتُصنَّف ضمن واحد من ثلاثة مستويات.",
        legend: ["آمن", "خطر متوسط", "خطر مرتفع"],

        ctaTitle: "قبل أن توافق، اعرف على ماذا توافق.",
        ctaButton: "جرّب الآن",
    },
};

const ACCENT = "#6366f1";

const LEGEND_COLORS = [
    { ring: "#86d9a4", bg: "#eafcf1", text: "#4a8f68" },
    { ring: "#f2c96b", bg: "#fdf6e3", text: "#a17f2d" },
    { ring: "#f19a9a", bg: "#fdecec", text: "#c06a6a" },
];

/* ---------- Page ---------- */

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

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

        router.push(
            `/analyze?url=${encodeURIComponent(url.trim())}&lang=${lang}`
        );
    }

    function focusInput() {
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
            inputRef.current?.focus();
        }, 400);
    }

    const icons = [
        IconDocument,
        IconShield,
        IconWarning,
        IconSparkle,
    ];

    const features = t.features.map((f, i) => ({
        ...f,
        Icon: icons[i],
    }));

    const colors = {
        pageBg: isDark
            ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
            : "#ffffff",

        altBg: isDark ? "#0f172a" : "#f8fafc",

        heading: isDark ? "#f1f1f1" : "#1e293b",

        body: isDark ? "#94a3b8" : "#64748b",

        line: isDark ? "#1e293b" : "#e2e8f0",

        iconBox: isDark ? "#1e293b" : "#eef2f8",

        soft: isDark
            ? "rgba(99, 102, 241, 0.15)"
            : "#eef0ff",
    };

    const sectionTitle = {
        margin: "0 0 32px",
        textAlign: "center" as const,
        fontSize: "1.4rem",
        fontWeight: 800,
        color: colors.heading,
    };

    return (
        <div
            dir={isAr ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: colors.pageBg,
                fontFamily: "'Segoe UI', Arial, sans-serif",
                color: colors.heading,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Hero */}

            <div
                className="byan-hero"
                style={{
                    maxWidth: 700,
                    margin: "0 auto",
                    width: "100%",
                    padding: "90px 24px 50px",
                    textAlign: isAr ? "right" : "left",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.6rem",
                        fontWeight: 800,
                        margin: "0 0 20px",
                        lineHeight: 1.2,
                    }}
                >
                    {t.heroTitlePrefix}

                    <span style={{ color: ACCENT }}>
                        {t.heroTitleAccent}
                    </span>
                </h1>

                <p
                    style={{
                        fontSize: "1.05rem",
                        color: colors.body,
                        margin: "0 0 24px",
                        lineHeight: 1.6,
                    }}
                >
                    {t.heroSubtitle}
                </p>

                <form
                    onSubmit={handleSubmit}
                    dir={isAr ? "rtl" : "ltr"}
                    style={{
                        display: "flex",
                        gap: 10,
                        background: isDark ? "#111827" : "#f4f7fb",
                        border: isDark
                            ? "1px solid #334155"
                            : "1px solid #e2e8f0",
                        borderRadius: 14,
                        padding: 8,
                        maxWidth: 480,
                    }}
                >
                    <input
                        ref={inputRef}
                        id="analyze-input"
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
                            color: colors.heading,
                            textAlign: isAr ? "right" : "left",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            border: "none",
                            borderRadius: 10,
                            padding: "13px 26px",
                            background:
                                "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {t.button}
                    </button>
                </form>

                {error && (
                    <p
                        style={{
                            color: "#dc2626",
                            fontSize: "0.85rem",
                            marginTop: 10,
                        }}
                    >
                        {error}
                    </p>
                )}

                <p
                    style={{
                        marginTop: 14,
                        fontSize: "0.8rem",
                        color: isDark ? "#64748b" : "#94a3b8",
                    }}
                >
                    {t.helperText}
                </p>
            </div>

            {/* Divider */}

            <div
                style={{
                    width: "100%",
                    height: 1,
                    background: colors.line,
                }}
            />

            {/* How it works */}

            <section
                style={{
                    width: "100%",
                    padding: "60px 24px",
                    background: colors.altBg,
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                    }}
                >
                    <h2 style={sectionTitle}>
                        {t.howTitle}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: 28,
                        }}
                    >
                        {t.steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        margin: "0 auto 14px",
                                        borderRadius: "50%",
                                        background: ACCENT,
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 800,
                                        boxShadow:
                                            `0 0 0 6px ${colors.soft}`,
                                    }}
                                >
                                    {isAr
                                        ? (i + 1).toLocaleString("ar-SA")
                                        : i + 1}
                                </div>

                                <h3
                                    style={{
                                        margin: "0 0 6px",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {s.title}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "0.88rem",
                                        lineHeight: 1.6,
                                        color: colors.body,
                                    }}
                                >
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What you get */}

            <section
                style={{
                    width: "100%",
                    padding: "60px 24px",
                }}
            >
                <div
                    style={{
                        maxWidth: 900,
                        margin: "0 auto",
                    }}
                >
                    <h2 style={sectionTitle}>
                        {t.featuresTitle}
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: 24,
                            textAlign: "center",
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
                                        background: colors.iconBox,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <f.Icon color={ACCENT} />
                                </div>

                                <h3
                                    style={{
                                        margin: "0 0 6px",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {f.title}
                                </h3>

                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "0.8rem",
                                        color: colors.body,
                                    }}
                                >
                                    {f.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Risk score legend */}

            <section
                style={{
                    width: "100%",
                    padding: "60px 24px",
                    background: colors.altBg,
                }}
            >
                <div
                    style={{
                        maxWidth: 700,
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <h2
                        style={{
                            ...sectionTitle,
                            margin: "0 0 12px",
                        }}
                    >
                        {t.legendTitle}
                    </h2>

                    <p
                        style={{
                            margin: "0 0 28px",
                            fontSize: "0.95rem",
                            lineHeight: 1.7,
                            color: colors.body,
                        }}
                    >
                        {t.legendText}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 12,
                        }}
                    >
                        {t.legend.map((label, i) => (
                            <span
                                key={label}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "8px 18px",
                                    borderRadius: 999,
                                    background:
                                        LEGEND_COLORS[i].bg,
                                    color:
                                        LEGEND_COLORS[i].text,
                                    border:
                                        `1.5px solid ${LEGEND_COLORS[i].ring}`,
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                }}
                            >
                                <span
                                    style={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        background:
                                            LEGEND_COLORS[i].ring,
                                    }}
                                />

                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Disclaimer */}

            <section
                style={{
                    width: "100%",
                    padding: "28px 24px",
                    background: isDark ? "#111827" : "#f8fafc",
                    borderTop: `1px solid ${colors.line}`,
                    borderBottom: `1px solid ${colors.line}`,
                }}
            >
                <div
                    style={{
                        maxWidth: 850,
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            marginBottom: 8,
                        }}
                    >
                        <IconWarning color="#d89b32" />

                        <h3
                            style={{
                                margin: 0,
                                fontSize: "0.95rem",
                                fontWeight: 800,
                                color: colors.heading,
                            }}
                        >
                            {t.disclaimerTitle}
                        </h3>
                    </div>

                    <p
                        style={{
                            maxWidth: 760,
                            margin: "0 auto 8px",
                            fontSize: "0.78rem",
                            lineHeight: 1.7,
                            color: colors.body,
                        }}
                    >
                        {t.disclaimerText}
                    </p>

                    <Link
                        href="/disclaimer"
                        style={{
                            fontSize: "0.78rem",
                            color: ACCENT,
                            fontWeight: 700,
                            textDecoration: "none",
                        }}
                    >
                        {t.disclaimerLink}
                    </Link>
                </div>
            </section>

            {/* Final CTA */}

            <section
                style={{
                    width: "100%",
                    padding: "70px 24px",
                    textAlign: "center",
                    flex: 1,
                }}
            >
                <h2
                    style={{
                        margin: "0 auto 24px",
                        maxWidth: 560,
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        lineHeight: 1.4,
                    }}
                >
                    {t.ctaTitle}
                </h2>

                <button
                    type="button"
                    onClick={focusInput}
                    style={{
                        border: "none",
                        borderRadius: 10,
                        padding: "13px 32px",
                        background:
                            "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                    }}
                >
                    {t.ctaButton}
                </button>
            </section>

            {/* Responsive */}

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