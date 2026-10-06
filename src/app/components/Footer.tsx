"use client";

import Link from "next/link";
import { useTheme } from "../providers";
import BYANLogo from "./BYANLogo";

const content = {
    en: {
        tagline: "Before You Agree",
        subtitle: "Understand what you're agreeing to.",
        description: "Plain-language analysis of Terms of Service and Privacy Policies, grounded in Saudi Arabia's PDPL.",
        product: "Product",
        company: "Company",
        legal: "Legal",
        analyze: "Analyze",
        compare: "Compare",
        howItWorks: "How It Works",
        about: "About",
        contact: "Contact",
        faq: "FAQ",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        disclaimerLink: "Disclaimer",
        disclaimer: "BYAN provides automated, informational analysis and does not constitute legal advice. Always review the original documents for important decisions.",
        rights: "All rights reserved."
    },
    ar: {
        tagline: "قبل أن توافق",
        subtitle: "افهم ما توافق عليه.",
        description: "تحليل مبسّط لشروط الخدمة وسياسات الخصوصية، مستند إلى نظام حماية البيانات الشخصية السعودي (PDPL).",
        product: "المنتج",
        company: "الشركة",
        legal: "قانوني",
        analyze: "تحليل",
        compare: "مقارنة",
        howItWorks: "كيف يعمل",
        about: "من نحن",
        contact: "تواصل معنا",
        faq: "الأسئلة الشائعة",
        privacy: "سياسة الخصوصية",
        terms: "شروط الاستخدام",
        disclaimerLink: "إخلاء المسؤولية",
        disclaimer: "يقدّم بيان تحليلًا آليًا لأغراض معلوماتية فقط، ولا يُعد استشارة قانونية. يُرجى مراجعة المستندات الأصلية عند اتخاذ القرارات المهمة.",
        rights: "جميع الحقوق محفوظة."
    }
};

type FooterKey = keyof typeof content.en;

const sections: { title: FooterKey; links: { key: FooterKey; href: string }[] }[] = [
    {
        title: "product",
        links: [
            { key: "analyze", href: "/" },
            { key: "compare", href: "/compare" },
            { key: "howItWorks", href: "/how-it-works" }
        ]
    },
    {
        title: "company",
        links: [
            { key: "about", href: "/about" },
            { key: "contact", href: "/contact" },
            { key: "faq", href: "/faq" }
        ]
    },
    {
        title: "legal",
        links: [
            { key: "privacy", href: "/privacy" },
            { key: "terms", href: "/terms" },
            { key: "disclaimerLink", href: "/disclaimer" }
        ]
    }
];

export default function Footer() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    const muted = isDark ? "#94a3b8" : "#64748b";
    const heading = isDark ? "#f1f1f1" : "#1e293b";
    const line = isDark ? "#1e293b" : "#e2e8f0";

    const linkStyle = {
        color: muted,
        textDecoration: "none",
        fontSize: "0.88rem"
    };

    const colTitle = {
        margin: "0 0 12px",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: "#6366f1",
        letterSpacing: isAr ? 0 : "0.1em",
        textTransform: "uppercase" as const
    };

    const colList = {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column" as const,
        gap: 10
    };

    return (
        <footer
            dir={isAr ? "rtl" : "ltr"}
            style={{
                borderTop: `1px solid ${line}`,
                padding: "48px 24px 24px",
                marginTop: 48,
                background: isDark ? "#0a0e1a" : "#ffffff",
                color: muted
            }}
        >
            <div
                style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 40
                }}
            >
                {/* Brand */}
                <div style={{ flex: "1 1 280px", maxWidth: 380 }}>
                    <BYANLogo />
                    <p style={{ margin: "14px 0 4px", color: heading, fontWeight: 600, fontSize: "0.95rem" }}>
                        {t.tagline}
                    </p>
                    <p style={{ margin: "0 0 10px", color: heading, fontSize: "0.88rem", opacity: 0.85 }}>
                        {t.subtitle}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem", lineHeight: 1.7 }}>{t.description}</p>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
                    {sections.map((section) => (
                        <nav key={section.title} aria-label={t[section.title]}>
                            <h2 style={colTitle}>{t[section.title]}</h2>
                            <ul style={colList}>
                                {section.links.map((link) => (
                                    <li key={link.key}>
                                        <Link href={link.href} style={linkStyle}>
                                            {t[link.key]}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div
                style={{
                    maxWidth: 1000,
                    margin: "36px auto 0",
                    paddingTop: 20,
                    borderTop: `1px solid ${line}`,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    fontSize: "0.8rem"
                }}
            >
                <p style={{ margin: 0, maxWidth: 640, lineHeight: 1.6 }}>{t.disclaimer}</p>
                <p style={{ margin: 0 }}>
                    © {new Date().getFullYear()} BYAN. {t.rights}
                </p>
            </div>
        </footer>
    );
}