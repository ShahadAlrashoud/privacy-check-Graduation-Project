"use client";

import Link from "next/link";
import { useTheme } from "../providers";

// TODO: update whenever you change this page
const LAST_UPDATED = { en: "[Date]", ar: "[التاريخ]" };

const content = {
    en: {
        eyebrow: "Legal",
        title: "Disclaimer",
        updated: "Last updated:",
        intro: "Please read this disclaimer carefully before using BYAN. By using the service, you acknowledge and accept the points below.",
        sections: [
            {
                title: "Not legal advice",
                text: "BYAN provides automated analysis of publicly available Terms of Service and Privacy Policies for general informational purposes only. Nothing on this website, including summaries, Risk Scores, or clause descriptions, constitutes legal advice, and using BYAN does not create a lawyer–client relationship."
            },
            {
                title: "Automated analysis",
                text: "Results are generated automatically using natural language processing and AI models. They may be incomplete, inaccurate, or miss important context. Risk Scores are indicative estimates, not a definitive assessment of any company's practices."
            },
            {
                title: "Always review the original documents",
                text: "Summaries are not a replacement for the full legal text. Before making any important decision, read the original Terms of Service and Privacy Policy on the website concerned, and consult a qualified legal professional where appropriate."
            },
            {
                title: "Policies change",
                text: "Websites can update their policies at any time. An analysis reflects the document BYAN retrieved at the time it was run and may not reflect the current version."
            },
            {
                title: "Reference to the PDPL",
                text: "BYAN's analysis references principles of Saudi Arabia's Personal Data Protection Law (PDPL). This does not certify, confirm, or deny any organization's legal compliance with the PDPL or any other law."
            },
            {
                title: "Third-party websites",
                text: "BYAN is not affiliated with, endorsed by, or sponsored by any website it analyzes. All trademarks and policy contents belong to their respective owners. We are not responsible for the content or practices of third-party websites."
            },
            {
                title: "Limitation of liability",
                text: "BYAN is provided \"as is\" without warranties of any kind. To the fullest extent permitted by law, BYAN and its creators are not liable for any decision made, or action taken, in reliance on the information provided by the service."
            }
        ],
        questions: "Questions about this disclaimer?",
        contact: "Contact us",
        backLink: "← Back to Homepage"
    },
    ar: {
        eyebrow: "قانوني",
        title: "إخلاء المسؤولية",
        updated: "آخر تحديث:",
        intro: "يرجى قراءة إخلاء المسؤولية هذا بعناية قبل استخدام بيان. باستخدامك للخدمة، فإنك تقرّ وتوافق على النقاط التالية.",
        sections: [
            {
                title: "ليس استشارة قانونية",
                text: "يقدّم بيان تحليلًا آليًا لشروط الخدمة وسياسات الخصوصية المتاحة للعامة لأغراض معلوماتية عامة فقط. لا يُعد أي محتوى في هذا الموقع، بما في ذلك الملخصات ودرجات المخاطر وأوصاف البنود، استشارة قانونية، ولا ينشئ استخدام بيان علاقة بين محامٍ وموكّل."
            },
            {
                title: "تحليل آلي",
                text: "تُنتَج النتائج تلقائيًا باستخدام معالجة اللغة الطبيعية ونماذج الذكاء الاصطناعي، وقد تكون غير مكتملة أو غير دقيقة أو تفتقد سياقًا مهمًا. درجات المخاطر تقديرات استرشادية وليست تقييمًا نهائيًا لممارسات أي جهة."
            },
            {
                title: "راجع المستندات الأصلية دائمًا",
                text: "الملخصات لا تغني عن النص القانوني الكامل. قبل اتخاذ أي قرار مهم، اقرأ شروط الخدمة وسياسة الخصوصية الأصلية في الموقع المعني، واستشر مختصًا قانونيًا عند الحاجة."
            },
            {
                title: "السياسات تتغير",
                text: "يمكن للمواقع تحديث سياساتها في أي وقت. يعكس التحليل المستند الذي استرجعه بيان وقت إجرائه، وقد لا يعكس النسخة الحالية."
            },
            {
                title: "الإشارة إلى نظام حماية البيانات الشخصية",
                text: "يستند تحليل بيان إلى مبادئ نظام حماية البيانات الشخصية السعودي (PDPL)، ولا يُعد ذلك شهادة أو تأكيدًا أو نفيًا لامتثال أي جهة لهذا النظام أو لأي نظام آخر."
            },
            {
                title: "مواقع الأطراف الثالثة",
                text: "بيان غير تابع لأي موقع يحلله ولا معتمد أو مموّل منه. جميع العلامات التجارية ومحتويات السياسات مملوكة لأصحابها. لا نتحمل مسؤولية محتوى مواقع الأطراف الثالثة أو ممارساتها."
            },
            {
                title: "حدود المسؤولية",
                text: "يُقدَّم بيان \"كما هو\" دون أي ضمانات. وإلى أقصى حد يسمح به النظام، لا يتحمل بيان ولا القائمون عليه أي مسؤولية عن أي قرار يُتخذ أو إجراء يُتخذ بناءً على المعلومات التي تقدمها الخدمة."
            }
        ],
        questions: "لديك أسئلة حول إخلاء المسؤولية؟",
        contact: "تواصل معنا",
        backLink: "→ العودة إلى الصفحة الرئيسية"
    }
};

const ACCENT = "#6366f1";

export default function DisclaimerPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const align = isAr ? "right" : "left";

    const colors = {
        bg: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        heading: isDark ? "#f1f1f1" : "#1e293b",
        body: isDark ? "#94a3b8" : "#64748b",
        line: isDark ? "#1e293b" : "#e2e8f0"
    };

    const num = (n: number) => (isAr ? n.toLocaleString("ar-SA") : String(n).padStart(2, "0"));

    return (
        <main
            dir={isAr ? "rtl" : "ltr"}
            style={{ minHeight: "100vh", background: colors.bg, fontFamily: "Segoe UI, Arial, sans-serif", color: colors.heading }}
        >
            <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px", textAlign: align }}>
                <p
                    style={{
                        margin: "0 0 12px",
                        color: ACCENT,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: isAr ? 0 : "0.12em",
                        textTransform: "uppercase"
                    }}
                >
                    {t.eyebrow}
                </p>
                <h1 style={{ margin: "0 0 10px", fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800 }}>{t.title}</h1>
                <p style={{ margin: "0 0 28px", color: colors.body, fontSize: "0.85rem" }}>
                    {t.updated} {LAST_UPDATED[lang]}
                </p>
                <p style={{ margin: "0 0 40px", color: colors.heading, fontSize: "1.05rem", lineHeight: 1.8 }}>{t.intro}</p>

                <div style={{ borderTop: `1px solid ${colors.line}` }}>
                    {t.sections.map((s, i) => (
                        <section
                            key={s.title}
                            style={{ display: "flex", gap: 20, padding: "24px 0", borderBottom: `1px solid ${colors.line}` }}
                        >
                            <span
                                style={{
                                    flexShrink: 0,
                                    width: 32,
                                    color: ACCENT,
                                    fontWeight: 700,
                                    fontSize: "0.9rem",
                                    paddingTop: 2,
                                    fontVariantNumeric: "tabular-nums"
                                }}
                            >
                                {num(i + 1)}
                            </span>
                            <div>
                                <h2 style={{ margin: "0 0 8px", fontSize: "1.1rem", fontWeight: 700 }}>{s.title}</h2>
                                <p style={{ margin: 0, color: colors.body, lineHeight: 1.8 }}>{s.text}</p>
                            </div>
                        </section>
                    ))}
                </div>

                <p style={{ margin: "36px 0 0", color: colors.body }}>
                    {t.questions}{" "}
                    <Link href="/contact" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                        {t.contact}
                    </Link>
                </p>

                <Link href="/" style={{ display: "inline-block", marginTop: 28, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                    {t.backLink}
                </Link>
            </div>
        </main>
    );
}