"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: {
        eyebrow: "FAQ",
        title: "Frequently asked questions",
        subtitle: "Everything you need to know about how BYAN analyzes Terms of Service and Privacy Policies.",
        faqs: [
            {
                q: "What is BYAN?",
                a: "BYAN (Before You Agree) analyzes a website's Terms of Service and Privacy Policy and explains them in plain language, with a Risk Score from 0 to 100 and a list of clauses worth knowing about."
            },
            {
                q: "Is BYAN legal advice?",
                a: "No. BYAN provides automated, informational analysis only. For important decisions, always review the original documents or consult a qualified legal professional."
            },
            {
                q: "Which languages are supported?",
                a: "Arabic and English. Results follow the language of the actual policy, and you can switch any result to the other language with one click."
            },
            {
                q: "Do I need to find the policy page myself?",
                a: "No. Just enter the website's address. BYAN looks for links to the Terms or Privacy Policy and also checks common pages such as /privacy and /terms."
            },
            {
                q: "How is the Risk Score calculated?",
                a: "The policy text is analyzed to identify clauses that may affect you, such as how your data is collected, shared, or retained. Each clause receives a risk weight, and the policy gets an overall score from 0 to 100 in one of three categories: Safe, Moderate Risk, or High Risk."
            },
            {
                q: "What do the clause colors mean?",
                a: "Red marks high-impact clauses (weight 15 or more), amber marks moderate-impact clauses (8–14), and green marks low-impact clauses (below 8)."
            },
            {
                q: "Can I compare two websites?",
                a: "Yes. On any results page, enter a second URL under \"Compare with another URL\" to see both scores, clause counts, and categories side by side."
            },
            {
                q: "Why couldn't BYAN analyze a website?",
                a: "Some websites block automated requests or load their content in ways that can't be read automatically. If that happens, try entering the direct link to the site's privacy policy or terms page."
            },
            {
                q: "Do I need an account?",
                a: "No, you can analyze websites without signing in. Signing in lets you save results and return to them later."
            },
            {
                q: "Is my analysis stored?",
                a: "Each analysis result is stored so it can be opened from its results link. If you're signed in, it's also added to your saved analyses. See our Privacy Policy for details."
            },
            {
                q: "Can the results be wrong?",
                a: "Yes. Automated analysis can miss context or misread a clause, and policies change over time. If you think a result is incorrect, please let us know through the Contact page."
            }
        ],
        stillTitle: "Still have questions?",
        stillText: "We're happy to help.",
        contact: "Contact us",
        backLink: "← Back to Homepage"
    },
    ar: {
        eyebrow: "الأسئلة الشائعة",
        title: "الأسئلة الشائعة",
        subtitle: "كل ما تحتاج معرفته عن طريقة تحليل بيان لشروط الخدمة وسياسات الخصوصية.",
        faqs: [
            {
                q: "ما هو بيان؟",
                a: "بيان (قبل أن توافق) يحلل شروط الخدمة وسياسة الخصوصية لأي موقع ويشرحها بلغة بسيطة، مع درجة مخاطر من 0 إلى 100 وقائمة بالبنود التي تستحق الانتباه."
            },
            {
                q: "هل يُعد بيان استشارة قانونية؟",
                a: "لا. يقدّم بيان تحليلًا آليًا لأغراض معلوماتية فقط. عند اتخاذ القرارات المهمة، راجع المستندات الأصلية أو استشر مختصًا قانونيًا."
            },
            {
                q: "ما اللغات المدعومة؟",
                a: "العربية والإنجليزية. تُعرض النتائج بلغة السياسة الفعلية، ويمكنك تحويل أي نتيجة إلى اللغة الأخرى بنقرة واحدة."
            },
            {
                q: "هل أحتاج إلى البحث عن صفحة السياسة بنفسي؟",
                a: "لا. أدخل عنوان الموقع فقط، وسيبحث بيان عن روابط الشروط أو سياسة الخصوصية، ويتحقق أيضًا من الصفحات الشائعة مثل ‎/privacy‎ و‎/terms‎."
            },
            {
                q: "كيف تُحسب درجة المخاطر؟",
                a: "يُحلَّل نص السياسة لتحديد البنود التي قد تؤثر عليك، مثل طريقة جمع بياناتك أو مشاركتها أو الاحتفاظ بها. يحصل كل بند على وزن مخاطر، وتحصل السياسة على درجة إجمالية من 0 إلى 100 ضمن إحدى ثلاث فئات: آمن، متوسط الخطورة، أو عالي الخطورة."
            },
            {
                q: "ماذا تعني ألوان البنود؟",
                a: "الأحمر للبنود عالية التأثير (وزن 15 أو أكثر)، والأصفر للبنود متوسطة التأثير (8–14)، والأخضر للبنود منخفضة التأثير (أقل من 8)."
            },
            {
                q: "هل يمكنني المقارنة بين موقعين؟",
                a: "نعم. في أي صفحة نتائج، أدخل رابطًا ثانيًا تحت \"قارن مع رابط آخر\" لعرض الدرجات وعدد البنود والفئات جنبًا إلى جنب."
            },
            {
                q: "لماذا لم يتمكن بيان من تحليل موقع ما؟",
                a: "بعض المواقع تحظر الطلبات الآلية أو تعرض محتواها بطريقة لا يمكن قراءتها تلقائيًا. في هذه الحالة، جرّب إدخال الرابط المباشر لصفحة سياسة الخصوصية أو الشروط."
            },
            {
                q: "هل أحتاج إلى حساب؟",
                a: "لا، يمكنك تحليل المواقع دون تسجيل الدخول. يتيح لك تسجيل الدخول حفظ النتائج والرجوع إليها لاحقًا."
            },
            {
                q: "هل يتم حفظ التحليل؟",
                a: "يُحفظ كل تحليل ليمكن فتحه من رابط النتائج الخاص به. وإذا كنت مسجلًا، يُضاف أيضًا إلى تحليلاتك المحفوظة. راجع سياسة الخصوصية لمزيد من التفاصيل."
            },
            {
                q: "هل يمكن أن تكون النتائج خاطئة؟",
                a: "نعم. قد يفوّت التحليل الآلي بعض السياق أو يسيء فهم بند ما، كما أن السياسات تتغير بمرور الوقت. إذا كنت تعتقد أن نتيجة ما غير صحيحة، يرجى إبلاغنا عبر صفحة التواصل."
            }
        ],
        stillTitle: "لديك أسئلة أخرى؟",
        stillText: "يسعدنا مساعدتك.",
        contact: "تواصل معنا",
        backLink: "→ العودة إلى الصفحة الرئيسية"
    }
};

const ACCENT = "#6366f1";

export default function FAQPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const align = isAr ? "right" : "left";
    const [open, setOpen] = useState<number | null>(0);

    const colors = {
        bg: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        heading: isDark ? "#f1f1f1" : "#1e293b",
        body: isDark ? "#94a3b8" : "#64748b",
        line: isDark ? "#1e293b" : "#e2e8f0",
        soft: isDark ? "rgba(99, 102, 241, 0.12)" : "#eef0ff",
        softBorder: isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)"
    };

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
                <h1 style={{ margin: "0 0 14px", fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800 }}>{t.title}</h1>
                <p style={{ margin: "0 0 40px", color: colors.body, fontSize: "1.05rem", lineHeight: 1.7 }}>{t.subtitle}</p>

                <div style={{ borderTop: `1px solid ${colors.line}` }}>
                    {t.faqs.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={i} style={{ borderBottom: `1px solid ${colors.line}` }}>
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-${i}`}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: 16,
                                        padding: "20px 0",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: isOpen ? ACCENT : colors.heading,
                                        fontSize: "1.02rem",
                                        fontWeight: 600,
                                        fontFamily: "inherit",
                                        textAlign: align
                                    }}
                                >
                                    <span>{item.q}</span>
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            flexShrink: 0,
                                            fontSize: "1.4rem",
                                            lineHeight: 1,
                                            color: ACCENT,
                                            transform: isOpen ? "rotate(45deg)" : "none",
                                            transition: "transform 0.2s ease"
                                        }}
                                    >
                                        +
                                    </span>
                                </button>
                                {isOpen && (
                                    <p id={`faq-${i}`} style={{ margin: "0 0 20px", color: colors.body, lineHeight: 1.8 }}>
                                        {item.a}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div
                    style={{
                        marginTop: 48,
                        padding: "24px",
                        borderRadius: 12,
                        background: colors.soft,
                        border: `1px solid ${colors.softBorder}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 16,
                        flexWrap: "wrap"
                    }}
                >
                    <div>
                        <h2 style={{ margin: "0 0 4px", fontSize: "1.1rem" }}>{t.stillTitle}</h2>
                        <p style={{ margin: 0, color: colors.body }}>{t.stillText}</p>
                    </div>
                    <Link
                        href="/contact"
                        style={{
                            padding: "11px 24px",
                            borderRadius: 10,
                            background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            textDecoration: "none"
                        }}
                    >
                        {t.contact}
                    </Link>
                </div>

                <Link href="/" style={{ display: "inline-block", marginTop: 36, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                    {t.backLink}
                </Link>
            </div>
        </main>
    );
}