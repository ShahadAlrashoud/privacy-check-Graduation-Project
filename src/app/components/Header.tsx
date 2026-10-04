"use client";

import Link from "next/link";
import { useTheme } from "../providers";
import BYANLogo from "./BYANLogo";
import UserMenu from "./UserMenu";

function MoonIcon({ color }: { color: string }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
    );
}

function SunIcon({ color }: { color: string }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    );
}

const content = {
    en: { home: "Home", analyze: "Analyze", about: "About" },
    ar: { home: "الرئيسية", analyze: "تحليل", about: "من نحن" }
};

export default function Header() {
    const { isDark, toggleTheme, lang, setLang } = (() => {
        const t = useTheme();
        return { isDark: t.theme === "dark", toggleTheme: t.toggleTheme, lang: t.lang, setLang: t.setLang };
    })();

    const isAr = lang === "ar";
    const t = content[lang];
    const iconColor = "#6366f1";

    const linkStyle = {
        color: isDark ? "#dbe4f0" : "#4338ca",
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: 500
    };

    return (
        <div
            dir={isAr ? "rtl" : "ltr"}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0"
            }}
        >
            <div style={{ justifySelf: "start" }}>
                <BYANLogo isDark={isDark} size="sm" rotate={false} />
            </div>

            <nav style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 28, justifySelf: "center" }}>
                <Link href="/" style={linkStyle}>{t.home}</Link>
                <Link href="/analyze" style={linkStyle}>{t.analyze}</Link>
                <Link href="/about" style={linkStyle}>{t.about}</Link>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 14, justifySelf: "end" }}>
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        type="button"
                        onClick={() => setLang("en")}
                        style={{
                            border: lang === "en" ? "1.5px solid #6366f1" : isDark ? "1.5px solid #334155" : "1.5px solid #e2e8f0",
                            background: lang === "en" ? "#6366f1" : "transparent",
                            color: lang === "en" ? "#fff" : isDark ? "#94a3b8" : "#64748b",
                            borderRadius: 8,
                            padding: "4px 10px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        EN
                    </button>
                    <button
                        type="button"
                        onClick={() => setLang("ar")}
                        style={{
                            border: lang === "ar" ? "1.5px solid #6366f1" : isDark ? "1.5px solid #334155" : "1.5px solid #e2e8f0",
                            background: lang === "ar" ? "#6366f1" : "transparent",
                            color: lang === "ar" ? "#fff" : isDark ? "#94a3b8" : "#64748b",
                            borderRadius: 8,
                            padding: "4px 10px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        AR
                    </button>
                </div>

                <button
                    onClick={toggleTheme}
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center"
                    }}
                    aria-label="Toggle theme"
                >
                    {isDark ? <SunIcon color={iconColor} /> : <MoonIcon color={iconColor} />}
                </button>

                <UserMenu />
            </div>
        </div>
    );
}