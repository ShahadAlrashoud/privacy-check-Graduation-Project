"use client";

import Link from "next/link";
import { useTheme } from "../providers";

export type LegalContent = {
    title: string;
    updated: string;
    intro: string;
    sections: { title: string; body: string[] }[];
    backLink: string;
};

const ACCENT = "#6366f1";

export default function LegalLayout({ content }: { content: Record<"en" | "ar", LegalContent> }) {
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

    return (
        <main
            dir={isAr ? "rtl" : "ltr"}
            style={{ minHeight: "100vh", background: colors.bg, fontFamily: "Segoe UI, Arial, sans-serif" }}
        >
            <div style={{ maxWidth: 760, margin: "0 auto", padding: "72px 24px" }}>
                <h1
                    style={{
                        margin: "0 0 8px",
                        color: colors.heading,
                        fontSize: "clamp(2rem, 5vw, 2.6rem)",
                        fontWeight: 800,
                        textAlign: align
                    }}
                >
                    {t.title}
                </h1>
                <p style={{ margin: "0 0 28px", color: ACCENT, fontSize: "0.9rem", fontWeight: 600, textAlign: align }}>
                    {t.updated}
                </p>
                <p style={{ margin: "0 0 40px", color: colors.body, lineHeight: 1.8, textAlign: align }}>{t.intro}</p>

                {t.sections.map((s, i) => (
                    <section
                        key={i}
                        style={{ borderTop: `1px solid ${colors.line}`, padding: "28px 0", textAlign: align }}
                    >
                        <h2 style={{ margin: "0 0 12px", color: colors.heading, fontSize: "1.2rem", fontWeight: 700 }}>
                            {isAr ? (i + 1).toLocaleString("ar-SA") : i + 1}. {s.title}
                        </h2>
                        {s.body.map((p, j) => (
                            <p key={j} style={{ margin: "0 0 10px", color: colors.body, lineHeight: 1.8 }}>
                                {p}
                            </p>
                        ))}
                    </section>
                ))}

                <Link
                    href="/"
                    style={{
                        display: "inline-block",
                        marginTop: 24,
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