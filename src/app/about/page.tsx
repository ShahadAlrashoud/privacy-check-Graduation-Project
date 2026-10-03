"use client";

import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: {
        tagline: "Before You Agree",
        backLink: "← Back to Homepage",
        paragraphs: [
            `Every day, we click "I Agree" on Terms of Service and Privacy Policies we never read, not because we don't care, but because they're long, dense, and written in language designed to be skimmed past, not understood.`,
            `BYAN changes that. Just enter a website's URL, and it will automatically locate its Terms of Service and Privacy Policy, extract the legal text, and break it down using natural language processing built for both Arabic and English. In seconds, you get a clear, plain-language summary highlighting what matters most: the potential risks, the fine print worth knowing, and the clauses genuinely in your favor.`,
            `Every policy is distilled into a single Risk Score from 0 to 100, placing it into one of three categories: Safe, Moderate Risk, or High Risk, so you can judge a platform's trustworthiness at a glance. Want to weigh your options? BYAN also lets you compare two platforms side by side.`,
            `BYAN is built bilingually from the ground up, with analysis grounded in Saudi Arabia's Personal Data Protection Law (PDPL), because digital rights shouldn't be lost in translation. It's designed for everyday users across Saudi Arabia and the Arab world, as well as digital rights advocates, legal educators, and compliance professionals who need a faster, clearer way to evaluate the agreements shaping our digital lives.`,
            `Our mission is simple: replace blind clicking with conscious consent. Before you agree, know what you're agreeing to.`
        ]
    },
    ar: {
        tagline: "قبل أن توافق",
        backLink: "→ العودة إلى الصفحة الرئيسية",
        paragraphs: [
            `كل يوم، نضغط على "أوافق"  لشروط الخدمة وسياسات الخصوصية دون أن نقرأها، ليس لأننا لا نهتم، بل لأنها طويلة ومعقدة ومكتوبة بلغة مصممة لتُستعرض سريعًا لا لتُفهم.`,
            `بيان يغيّر ذلك. ما عليك سوى إدخال رابط الموقع، وسيقوم تلقائيًا بالعثور على شروط الخدمة أو سياسة الخصوصية، واستخراج النص القانوني، وتحليله باستخدام معالجة اللغة الطبيعية المصممة للعربية والإنجليزية معًا. في ثوانٍ، تحصل على ملخص واضح وبلغة بسيطة يبرز أهم النقاط منهاالمخاطر المحتملة، التفاصيل الدقيقة التي تستحق الانتباه، والبنود التي تصب في صالحك فعليًا.`,
            `يتم تلخيص كل سياسة في درجة مخاطر واحدة من 0 إلى 100، تُصنَّف ضمن إحدى ثلاث فئات: آمن، متوسط الخطورة، أو عالي الخطورة، لتتمكن من الحكم على مدى موثوقية المنصة بنظرة واحدة. وإذا أردت المقارنة بين خيارين، يتيح لك بيان مقارنة منصتين جنبًا إلى جنب.`,
            `بُني بيان ليكون ثنائي اللغة من الأساس، مع تحليل مستند إلى نظام حماية البيانات الشخصية السعودي (PDPL)، لأن الحقوق الرقمية لا ينبغي أن تضيع في الترجمة. صُمم للمستخدمين في السعودية والعالم العربي، وكذلك للمدافعين عن الحقوق الرقمية، والمعلمين القانونيين، ومتخصصي الامتثال الذين يحتاجون إلى طريقة أسرع وأوضح لتقييم الاتفاقيات التي تشكل حياتنا الرقمية.`,
            `مهمتنا بسيطة: استبدال النقر الأعمى بموافقة واعية. قبل أن توافق، اعرف على ماذا توافق.`
        ]
    }
};

export default function AboutPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "Segoe UI, Arial, sans-serif"
            }}
        >
            <div
                dir={isAr ? "rtl" : "ltr"}
                style={{
                    maxWidth: 600,
                    width: "100%",
                    background: isDark ? "#111827" : "#f4f7fb",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    borderRadius: 16,
                    boxShadow: isDark
                        ? "0 8px 30px rgba(0, 0, 0, 0.4)"
                        : "0 8px 30px rgba(99, 102, 241, 0.1)",
                    padding: "40px 32px",
                    textAlign: "center"
                }}
            >
                <img
                    src="/privacy-check-logo-transparent.png"
                    alt="BYAN logo"
                    style={{ width: 72, height: 72, objectFit: "contain", margin: "0 auto 14px" }}
                />

                <h1 style={{ margin: "0 0 4px", color: isDark ? "#f1f1f1" : "#1e293b", fontSize: "1.8rem", fontWeight: 800, letterSpacing: "0.02em" }}>
                    BYAN
                </h1>

                <p style={{ margin: "0 0 28px", fontSize: "0.85rem", color: "#6366f1", fontWeight: 600 }}>
                    {t.tagline}
                </p>

                <div style={{ color: isDark ? "#94a3b8" : "#64748b", lineHeight: 1.7, fontSize: "0.95rem", textAlign: isAr ? "right" : "left" }}>
                    {t.paragraphs.map((p, i) => (
                        <p key={i} style={{ margin: i === t.paragraphs.length - 1 ? 0 : "0 0 16px" }}>
                            {p}
                        </p>
                    ))}
                </div>

                <Link
                    href="/"
                    style={{
                        color: "#6366f1",
                        fontWeight: 600,
                        display: "block",
                        textAlign: isAr ? "right" : "left",
                        marginTop: 20,
                        textDecoration: "none"
                    }}
                >
                    {t.backLink}
                </Link>
            </div>
        </div>
    );
}