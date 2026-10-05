"use client";

import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: {
        tagline: "Before You Agree",
        backLink: "← Back to Homepage",
        lead: `Every day, we click "I Agree" on Terms of Service and Privacy Policies we never read, not because we don't care, but because they're long, dense, and written in language designed to be skimmed past, not understood.`,
        changes: "BYAN changes that.",
        howTitle: "How it works",
        steps: [
            {
                title: "Enter a URL",
                text: `Just enter a website's URL, and BYAN will automatically locate its Terms of Service and Privacy Policy and extract the legal text.`
            },
            {
                title: "Get a clear summary",
                text: `It breaks the text down using natural language processing built for both Arabic and English. In seconds, you get a clear, plain-language summary highlighting what matters most: the potential risks, the fine print worth knowing, and the clauses genuinely in your favor.`
            },
            {
                title: "See the Risk Score",
                text: `Every policy is distilled into a single Risk Score from 0 to 100, placing it into one of three categories: Safe, Moderate Risk, or High Risk, so you can judge a platform's trustworthiness at a glance. Want to weigh your options? BYAN also lets you compare two platforms side by side.`
            }
        ],
        aboutTitle: "About BYAN",
        about: `BYAN is built bilingually from the ground up, with analysis grounded in Saudi Arabia's Personal Data Protection Law (PDPL), because digital rights shouldn't be lost in translation. It's designed for everyday users across Saudi Arabia and the Arab world, as well as digital rights advocates, legal educators, and compliance professionals who need a faster, clearer way to evaluate the agreements shaping our digital lives.`,
        mission: `Our mission is simple: replace blind clicking with conscious consent. Before you agree, know what you're agreeing to.`
    },
    ar: {
        tagline: "قبل أن توافق",
        backLink: "→ العودة إلى الصفحة الرئيسية",
        lead: `كل يوم، نضغط على "أوافق" لشروط الخدمة وسياسات الخصوصية دون أن نقرأها، ليس لأننا لا نهتم، بل لأنها طويلة ومعقدة ومكتوبة بلغة مصممة لتُستعرض سريعًا لا لتُفهم.`,
        changes: "بيان يغيّر ذلك.",
        howTitle: "كيف يعمل",
        steps: [
            {
                title: "أدخل الرابط",
                text: `ما عليك سوى إدخال رابط الموقع، وسيقوم تلقائيًا بالعثور على شروط الخدمة أو سياسة الخصوصية، واستخراج النص القانوني.`
            },
            {
                title: "احصل على ملخص واضح",
                text: `يتم تحليله باستخدام معالجة اللغة الطبيعية المصممة للعربية والإنجليزية معًا. في ثوانٍ، تحصل على ملخص واضح وبلغة بسيطة يبرز أهم النقاط منها: المخاطر المحتملة، التفاصيل الدقيقة التي تستحق الانتباه، والبنود التي تصب في صالحك فعليًا.`
            },
            {
                title: "اطّلع على درجة المخاطر",
                text: `يتم تلخيص كل سياسة في درجة مخاطر واحدة من 0 إلى 100، تُصنَّف ضمن إحدى ثلاث فئات: آمن، متوسط الخطورة، أو عالي الخطورة، لتتمكن من الحكم على مدى موثوقية المنصة بنظرة واحدة. وإذا أردت المقارنة بين خيارين، يتيح لك بيان مقارنة منصتين جنبًا إلى جنب.`
            }
        ],
        aboutTitle: "عن بيان",
        about: `بُني بيان ليكون ثنائي اللغة من الأساس، مع تحليل مستند إلى نظام حماية البيانات الشخصية السعودي (PDPL)، لأن الحقوق الرقمية لا ينبغي أن تضيع في الترجمة. صُمم للمستخدمين في السعودية والعالم العربي، وكذلك للمدافعين عن الحقوق الرقمية، والمعلمين القانونيين، ومتخصصي الامتثال الذين يحتاجون إلى طريقة أسرع وأوضح لتقييم الاتفاقيات التي تشكل حياتنا الرقمية.`,
        mission: `مهمتنا بسيطة: استبدال النقر الأعمى بموافقة واعية. قبل أن توافق، اعرف على ماذا توافق.`
    }
};

const ACCENT = "#6366f1";

export default function AboutPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const align = isAr ? "right" : "left";

    const colors = {
        bg: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        heading: isDark ? "#f1f1f1" : "#1e293b",
        body: isDark ? "#94a3b8" : "#64748b",
        lead: isDark ? "#e2e8f0" : "#334155",
        line: isDark ? "#334155" : "#c7d2fe",
        divider: isDark ? "#1e293b" : "#e2e8f0",
        glow: isDark ? "rgba(99, 102, 241, 0.18)" : "rgba(99, 102, 241, 0.10)",
        soft: isDark ? "rgba(99, 102, 241, 0.12)" : "#eef0ff",
        softBorder: isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)"
    };

    const sectionLabel = {
        margin: "0 0 28px",
        color: ACCENT,
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: isAr ? 0 : "0.12em",
        textTransform: "uppercase" as const,
        textAlign: align as "left" | "right"
    };

    return (
        <main
            dir={isAr ? "rtl" : "ltr"}
            style={{ minHeight: "100vh", background: colors.bg, fontFamily: "Segoe UI, Arial, sans-serif" }}
        >
            {/* Hero */}
            <section
                style={{
                    textAlign: "center",
                    padding: "72px 24px 48px",
                    background: `radial-gradient(ellipse 60% 70% at 50% 0%, ${colors.glow} 0%, transparent 70%)`
                }}
            >
                <img
                    src="/privacy-check-logo-transparent.png"
                    alt="BYAN logo"
                    style={{ width: 88, height: 88, objectFit: "contain", margin: "0 auto 16px", display: "block" }}
                />
                <h1
                    style={{
                        margin: "0 0 10px",
                        color: colors.heading,
                        fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
                        fontWeight: 800,
                        letterSpacing: isAr ? 0 : "0.04em"
                    }}
                >
                    BYAN
                </h1>
                <span
                    style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        borderRadius: 999,
                        border: `1px solid ${colors.softBorder}`,
                        background: colors.soft,
                        color: ACCENT,
                        fontSize: "0.9rem",
                        fontWeight: 600
                    }}
                >
                    {t.tagline}
                </span>
            </section>

            <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 72px" }}>
                {/* Problem */}
                <p
                    style={{
                        margin: "0 0 12px",
                        color: colors.lead,
                        fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
                        lineHeight: 1.7,
                        fontWeight: 500,
                        textAlign: align
                    }}
                >
                    {t.lead}
                </p>
                <p
                    style={{
                        margin: "0 0 56px",
                        color: ACCENT,
                        fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
                        fontWeight: 700,
                        textAlign: align
                    }}
                >
                    {t.changes}
                </p>

                {/* How it works (steps) */}
                <h2 style={sectionLabel}>{t.howTitle}</h2>
                <div style={{ marginBottom: 56 }}>
                    {t.steps.map((step, i) => {
                        const isLast = i === t.steps.length - 1;
                        return (
                            <div key={i} style={{ display: "flex", gap: 20 }}>
                                {/* Number + connector */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            background: ACCENT,
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.1rem",
                                            fontWeight: 800,
                                            boxShadow: `0 0 0 6px ${colors.soft}`
                                        }}
                                    >
                                        {isAr ? (i + 1).toLocaleString("ar-SA") : i + 1}
                                    </div>
                                    {!isLast && (
                                        <div style={{ flex: 1, width: 2, background: colors.line, margin: "8px 0" }} />
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ paddingBottom: isLast ? 0 : 36, textAlign: align }}>
                                    <h3
                                        style={{
                                            margin: "8px 0 8px",
                                            color: colors.heading,
                                            fontSize: "1.2rem",
                                            fontWeight: 700
                                        }}
                                    >
                                        {step.title}
                                    </h3>
                                    <p style={{ margin: 0, color: colors.body, lineHeight: 1.8, fontSize: "1rem" }}>
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* About */}
                <div style={{ borderTop: `1px solid ${colors.divider}`, paddingTop: 48 }}>
                    <h2 style={sectionLabel}>{t.aboutTitle}</h2>
                    <p
                        style={{
                            margin: "0 0 48px",
                            color: colors.body,
                            lineHeight: 1.8,
                            fontSize: "1rem",
                            textAlign: align
                        }}
                    >
                        {t.about}
                    </p>

                    {/* Mission */}
                    <blockquote
                        style={{
                            margin: 0,
                            padding: "32px 28px",
                            background: colors.soft,
                            border: `1px solid ${colors.softBorder}`,
                            [isAr ? "borderRight" : "borderLeft"]: `5px solid ${ACCENT}`,
                            borderRadius: 12,
                            color: colors.heading,
                            fontSize: "clamp(1.1rem, 2.4vw, 1.3rem)",
                            fontWeight: 600,
                            lineHeight: 1.7,
                            textAlign: align
                        }}
                    >
                        {t.mission}
                    </blockquote>
                </div>

                <Link
                    href="/"
                    style={{
                        display: "inline-block",
                        marginTop: 36,
                        color: ACCENT,
                        fontWeight: 600,
                        textDecoration: "none"
                    }}
                >
                    {t.backLink}
                </Link>
            </div>
        </main>
    );
}