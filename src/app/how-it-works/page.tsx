"use client";

import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: {
        eyebrow: "How It Works",
        title: "From a link to a clear answer",
        subtitle: "Paste a website address. BYAN finds the fine print, reads it, and tells you what matters in plain language.",
        stepsTitle: "The process",
        steps: [
            {
                title: "Enter a URL",
                text: "Paste any website's address. You don't need to find the policy page yourself. The homepage is enough."
            },
            {
                title: "We find the policy",
                text: "BYAN scans the site for links to its Terms of Service or Privacy Policy. If none are found, it checks common pages such as /privacy, /terms, and /legal."
            },
            {
                title: "We read the fine print",
                text: "The document's language is detected automatically, and the text is analyzed in Arabic or English to identify clauses that may affect you."
            },
            {
                title: "You get your results",
                text: "A Risk Score from 0 to 100, a plain-language summary, and a list of detected clauses, each with its own risk weight."
            }
        ],
        readTitle: "Reading your results",
        scoreTitle: "The Risk Score",
        scoreText: "Every policy receives a single score from 0 to 100 and is placed in one of three categories:",
        tiers: ["Safe", "Moderate Risk", "High Risk"],
        clauseTitle: "Clause weights",
        clauseText: "Each detected clause is given a weight showing how much it contributes to the overall risk:",
        weights: [
            { label: "High impact", range: "15+" },
            { label: "Moderate impact", range: "8–14" },
            { label: "Low impact", range: "0–7" }
        ],
        moreTitle: "More you can do",
        more: [
            { title: "Compare two sites", text: "From any result, enter a second URL to see both scores, clause counts, and categories side by side." },
            { title: "Switch languages", text: "View any result in Arabic or English with one click, regardless of the policy's original language." },
            { title: "Save your results", text: "Signed-in users can save analyses and come back to them later." }
        ],
        noteText: "BYAN provides automated, informational analysis and is not legal advice.",
        noteLink: "Read the disclaimer",
        cta: "Analyze a website",
        backLink: "← Back to Homepage"
    },
    ar: {
        eyebrow: "كيف يعمل",
        title: "من رابط إلى إجابة واضحة",
        subtitle: "الصق عنوان أي موقع، وسيعثر بيان على التفاصيل الدقيقة، ويقرأها، ويخبرك بما يهمك بلغة بسيطة.",
        stepsTitle: "الخطوات",
        steps: [
            {
                title: "أدخل الرابط",
                text: "الصق عنوان أي موقع. لا تحتاج إلى البحث عن صفحة السياسة بنفسك، فالصفحة الرئيسية تكفي."
            },
            {
                title: "نعثر على السياسة",
                text: "يبحث بيان في الموقع عن روابط شروط الخدمة أو سياسة الخصوصية. وإذا لم يجدها، يتحقق من الصفحات الشائعة مثل ‎/privacy‎ و‎/terms‎ و‎/legal‎."
            },
            {
                title: "نقرأ التفاصيل الدقيقة",
                text: "يتم اكتشاف لغة المستند تلقائيًا، ويُحلَّل النص بالعربية أو الإنجليزية لتحديد البنود التي قد تؤثر عليك."
            },
            {
                title: "احصل على النتائج",
                text: "درجة مخاطر من 0 إلى 100، وملخص بلغة بسيطة، وقائمة بالبنود المكتشفة مع وزن المخاطر لكل منها."
            }
        ],
        readTitle: "قراءة النتائج",
        scoreTitle: "درجة المخاطر",
        scoreText: "تحصل كل سياسة على درجة واحدة من 0 إلى 100، وتُصنَّف ضمن إحدى ثلاث فئات:",
        tiers: ["آمن", "متوسط الخطورة", "عالي الخطورة"],
        clauseTitle: "أوزان البنود",
        clauseText: "يُمنح كل بند مكتشف وزنًا يوضح مدى مساهمته في مستوى الخطورة العام:",
        weights: [
            { label: "تأثير مرتفع", range: "15+" },
            { label: "تأثير متوسط", range: "8–14" },
            { label: "تأثير منخفض", range: "0–7" }
        ],
        moreTitle: "ميزات إضافية",
        more: [
            { title: "قارن بين موقعين", text: "من أي نتيجة، أدخل رابطًا ثانيًا لعرض الدرجات وعدد البنود والفئات جنبًا إلى جنب." },
            { title: "بدّل اللغة", text: "اعرض أي نتيجة بالعربية أو الإنجليزية بنقرة واحدة، بغض النظر عن لغة السياسة الأصلية." },
            { title: "احفظ نتائجك", text: "يمكن للمستخدمين المسجلين حفظ التحليلات والرجوع إليها لاحقًا." }
        ],
        noteText: "يقدّم بيان تحليلًا آليًا لأغراض معلوماتية فقط، ولا يُعد استشارة قانونية.",
        noteLink: "اقرأ إخلاء المسؤولية",
        cta: "حلّل موقعًا",
        backLink: "→ العودة إلى الصفحة الرئيسية"
    }
};

const ACCENT = "#6366f1";

const RISK_COLORS = [
    { ring: "#86d9a4", bg: "#eafcf1", text: "#4a8f68" },
    { ring: "#f2c96b", bg: "#fdf6e3", text: "#a17f2d" },
    { ring: "#f19a9a", bg: "#fdecec", text: "#c06a6a" }
];
const WEIGHT_COLORS = ["#c06a6a", "#a17f2d", "#4a8f68"];

export default function HowItWorksPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const align = isAr ? "right" : "left";

    const colors = {
        bg: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        altBg: isDark ? "#0f172a" : "#f8fafc",
        heading: isDark ? "#f1f1f1" : "#1e293b",
        body: isDark ? "#94a3b8" : "#64748b",
        line: isDark ? "#1e293b" : "#e2e8f0",
        connector: isDark ? "#334155" : "#c7d2fe",
        soft: isDark ? "rgba(99, 102, 241, 0.12)" : "#eef0ff",
        softBorder: isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)",
        card: isDark ? "#111827" : "#ffffff"
    };

    const sectionLabel = {
        margin: "0 0 24px",
        color: ACCENT,
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: isAr ? 0 : "0.12em",
        textTransform: "uppercase" as const,
        textAlign: align as "left" | "right"
    };

    const num = (n: number) => (isAr ? n.toLocaleString("ar-SA") : n);

    return (
        <main
            dir={isAr ? "rtl" : "ltr"}
            style={{ minHeight: "100vh", background: colors.bg, fontFamily: "Segoe UI, Arial, sans-serif", color: colors.heading }}
        >
            {/* Hero */}
            <section style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px 40px", textAlign: align }}>
                <p style={{ ...sectionLabel, margin: "0 0 12px" }}>{t.eyebrow}</p>
                <h1 style={{ margin: "0 0 16px", fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800, lineHeight: 1.2 }}>
                    {t.title}
                </h1>
                <p style={{ margin: 0, color: colors.body, fontSize: "1.05rem", lineHeight: 1.7 }}>{t.subtitle}</p>
            </section>

            {/* Steps */}
            <section style={{ maxWidth: 760, margin: "0 auto", padding: "16px 24px 56px" }}>
                <h2 style={sectionLabel}>{t.stepsTitle}</h2>
                {t.steps.map((step, i) => {
                    const isLast = i === t.steps.length - 1;
                    return (
                        <div key={i} style={{ display: "flex", gap: 20 }}>
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
                                        fontWeight: 800,
                                        fontSize: "1.1rem",
                                        boxShadow: `0 0 0 6px ${colors.soft}`
                                    }}
                                >
                                    {num(i + 1)}
                                </div>
                                {!isLast && <div style={{ flex: 1, width: 2, background: colors.connector, margin: "8px 0" }} />}
                            </div>
                            <div style={{ paddingBottom: isLast ? 0 : 32, textAlign: align }}>
                                <h3 style={{ margin: "8px 0 8px", fontSize: "1.15rem", fontWeight: 700 }}>{step.title}</h3>
                                <p style={{ margin: 0, color: colors.body, lineHeight: 1.8 }}>{step.text}</p>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Reading results */}
            <section style={{ background: colors.altBg, padding: "56px 24px", borderTop: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}` }}>
                <div style={{ maxWidth: 760, margin: "0 auto", textAlign: align }}>
                    <h2 style={sectionLabel}>{t.readTitle}</h2>

                    <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>{t.scoreTitle}</h3>
                    <p style={{ margin: "0 0 16px", color: colors.body, lineHeight: 1.7 }}>{t.scoreText}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
                        {t.tiers.map((label, i) => (
                            <span
                                key={label}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "8px 18px",
                                    borderRadius: 999,
                                    background: RISK_COLORS[i].bg,
                                    color: RISK_COLORS[i].text,
                                    border: `1.5px solid ${RISK_COLORS[i].ring}`,
                                    fontWeight: 600,
                                    fontSize: "0.9rem"
                                }}
                            >
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: RISK_COLORS[i].ring }} />
                                {label}
                            </span>
                        ))}
                    </div>

                    <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>{t.clauseTitle}</h3>
                    <p style={{ margin: "0 0 16px", color: colors.body, lineHeight: 1.7 }}>{t.clauseText}</p>
                    <div style={{ border: `1px solid ${colors.line}`, borderRadius: 10, overflow: "hidden", background: colors.card }}>
                        {t.weights.map((w, i) => (
                            <div
                                key={w.label}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    borderTop: i === 0 ? "none" : `1px solid ${colors.line}`
                                }}
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: 10, color: WEIGHT_COLORS[i], fontWeight: 600 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: WEIGHT_COLORS[i] }} />
                                    {w.label}
                                </span>
                                <span dir="ltr" style={{ color: colors.body, fontVariantNumeric: "tabular-nums" }}>{w.range}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* More */}
            <section style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
                <h2 style={sectionLabel}>{t.moreTitle}</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
                    {t.more.map((m) => (
                        <div key={m.title} style={{ textAlign: align, [isAr ? "borderRight" : "borderLeft"]: `3px solid ${ACCENT}`, padding: "4px 16px" }}>
                            <h3 style={{ margin: "0 0 6px", fontSize: "1rem" }}>{m.title}</h3>
                            <p style={{ margin: 0, color: colors.body, fontSize: "0.9rem", lineHeight: 1.7 }}>{m.text}</p>
                        </div>
                    ))}
                </div>

                <p style={{ margin: "40px 0 0", color: colors.body, fontSize: "0.88rem", textAlign: align }}>
                    {t.noteText}{" "}
                    <Link href="/disclaimer" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                        {t.noteLink}
                    </Link>
                </p>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 40 }}>
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "13px 32px",
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textDecoration: "none"
                        }}
                    >
                        {t.cta}
                    </Link>
                    <Link href="/" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                        {t.backLink}
                    </Link>
                </div>
            </section>
        </main>
    );
}