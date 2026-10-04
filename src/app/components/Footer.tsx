"use client";

import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: { home: "Home", analyze: "Analyze", about: "About", rights: "All rights reserved." },
    ar: { home: "الرئيسية", analyze: "تحليل", about: "من نحن", rights: "جميع الحقوق محفوظة." },
};

export default function Footer() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    const linkStyle = {
        color: isDark ? "#94a3b8" : "#64748b",
        textDecoration: "none",
        fontSize: "0.85rem"
    };

    return (
        <footer
            dir={isAr ? "rtl" : "ltr"}
            style={{
                borderTop: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
                padding: "24px",
                marginTop: 48,
                textAlign: "center",
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "0.85rem"
            }}
        >
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
                <Link href="/" style={linkStyle}>{t.home}</Link>
                <Link href="/analyze" style={linkStyle}>{t.analyze}</Link>
                <Link href="/about" style={linkStyle}>{t.about}</Link>
            </div>
            © {new Date().getFullYear()} BYAN. {t.rights}
        </footer>
    );
}