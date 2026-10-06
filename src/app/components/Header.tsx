"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "../providers";
import BYANLogo from "./BYANLogo";
import UserMenu from "./UserMenu";

/* ---------- Icons ---------- */

function MoonIcon({ color }: { color: string }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
    );
}

function SunIcon({ color }: { color: string }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
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

function MenuIcon({ color, open }: { color: string; open: boolean }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
        >
            {open ? (
                <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                </>
            ) : (
                <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                </>
            )}
        </svg>
    );
}

/* ---------- Content ---------- */

const content = {
    en: {
        home: "Home",
        howItWorks: "How It Works",
        about: "About",
        toggleTheme: "Toggle theme",
        language: "Language",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        mainNav: "Main navigation",
    },
    ar: {
        home: "الرئيسية",
        howItWorks: "كيف يعمل",
        about: "من نحن",
        toggleTheme: "تبديل المظهر",
        language: "اللغة",
        openMenu: "فتح القائمة",
        closeMenu: "إغلاق القائمة",
        mainNav: "التنقل الرئيسي",
    },
};

/* ---------- Navigation ---------- */

const navItems = [
    { href: "/", key: "home" },
    { href: "/how-it-works", key: "howItWorks" },
    { href: "/about", key: "about" },
] as const;

/* ---------- Theme tokens ---------- */

const ACCENT = "#6366f1";

function getColors(isDark: boolean) {
    return {
        accent: ACCENT,
        border: isDark ? "#1e293b" : "#e2e8f0",
        bg: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
        mobileBg: isDark ? "#0f172a" : "#ffffff",
        link: isDark ? "#dbe4f0" : "#4338ca",
        langBorder: isDark ? "#334155" : "#e2e8f0",
        langText: isDark ? "#94a3b8" : "#64748b",
    };
}

/* ---------- Hooks ---------- */

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const update = () => setIsMobile(mq.matches);

        update();
        mq.addEventListener("change", update);

        return () => mq.removeEventListener("change", update);
    }, [breakpoint]);

    return isMobile;
}

/* ---------- Component ---------- */

export default function Header() {
    const { theme, toggleTheme, lang, setLang } = useTheme();
    const pathname = usePathname();

    const isMobile = useIsMobile();
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const c = getColors(isDark);

    /* Close mobile menu on navigation */
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    /* Close mobile menu when switching to desktop */
    useEffect(() => {
        if (!isMobile) {
            setMenuOpen(false);
        }
    }, [isMobile]);

    /* Close mobile menu with Escape */
    useEffect(() => {
        if (!menuOpen) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", onKey);

        return () => window.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    /* Active navigation item */
    const isActive = (href: string) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname?.startsWith(href + "/");

    /* Desktop navigation link */
    const navLinkStyle = (href: string): CSSProperties => ({
        color: c.link,
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: isActive(href) ? 700 : 500,
        paddingBottom: 4,
        borderBottom: isActive(href)
            ? `2px solid ${c.accent}`
            : "2px solid transparent",
        transition: "border-color 0.2s ease",
    });

    /* Mobile navigation link */
    const mobileLinkStyle = (href: string): CSSProperties => ({
        color: isActive(href) ? c.accent : c.link,
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: isActive(href) ? 700 : 500,
        padding: "12px 4px",
        borderBottom: `1px solid ${c.border}`,
    });

    /* Compact language switch */
    const langToggle = (
        <div
            role="group"
            aria-label={t.language}
            style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${c.langBorder}`,
                borderRadius: 999,
                padding: 2,
                background: isDark
                    ? "rgba(30, 41, 59, 0.55)"
                    : "rgba(248, 250, 252, 0.9)",
            }}
        >
            {(["en", "ar"] as const).map((l) => {
                const active = lang === l;

                return (
                    <button
                        key={l}
                        type="button"
                        onClick={() => setLang(l)}
                        aria-pressed={active}
                        aria-label={l === "en" ? "English" : "العربية"}
                        style={{
                            border: "none",
                            background: active ? c.accent : "transparent",
                            color: active ? "#fff" : c.langText,
                            borderRadius: 999,
                            padding: "4px 9px",
                            minWidth: 34,
                            fontSize: "0.72rem",
                            fontWeight: active ? 700 : 600,
                            cursor: "pointer",
                            lineHeight: 1.2,
                            transition: "background 0.2s ease, color 0.2s ease",
                        }}
                    >
                        {l.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );

    /* Theme toggle */
    const themeToggle = (
        <button
            type="button"
            onClick={toggleTheme}
            style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                padding: 4,
            }}
            aria-label={t.toggleTheme}
        >
            {isDark ? (
                <SunIcon color={c.accent} />
            ) : (
                <MoonIcon color={c.accent} />
            )}
        </button>
    );

    return (
        <header
            dir={isAr ? "rtl" : "ltr"}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: c.bg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderBottom: `1px solid ${c.border}`,
            }}
        >
            {/* Main bar */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr auto" : "1fr auto 1fr",
                    alignItems: "center",
                    padding: isMobile ? "12px 16px" : "14px 24px",
                }}
            >
                {/* Logo */}
                <div dir="ltr" style={{ justifySelf: "start" }}>
                    <Link
                        href="/"
                        aria-label="BYAN"
                        style={{
                            display: "inline-flex",
                            unicodeBidi: "bidi-override",
                        }}
                    >
                        <BYANLogo isDark={isDark} size="sm" rotate={false} />
                    </Link>
                </div>

                {/* Desktop navigation */}
                {!isMobile && (
                    <nav
                        aria-label={t.mainNav}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 30,
                            justifySelf: "center",
                        }}
                    >
                        {navItems.map(({ href, key }) => (
                            <Link
                                key={href}
                                href={href}
                                style={navLinkStyle(href)}
                                aria-current={isActive(href) ? "page" : undefined}
                            >
                                {t[key]}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* Right cluster */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? 10 : 12,
                        justifySelf: "end",
                    }}
                >
                    {!isMobile && (
                        <>
                            {langToggle}
                            {themeToggle}
                        </>
                    )}

                    <UserMenu />

                    {isMobile && (
                        <button
                            type="button"
                            onClick={() => setMenuOpen((o) => !o)}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                lineHeight: 1,
                                display: "flex",
                                alignItems: "center",
                                padding: 4,
                            }}
                            aria-label={menuOpen ? t.closeMenu : t.openMenu}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <MenuIcon color={c.accent} open={menuOpen} />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile menu */}
            {isMobile && menuOpen && (
                <div
                    id="mobile-menu"
                    style={{
                        background: c.mobileBg,
                        borderTop: `1px solid ${c.border}`,
                        padding: "8px 16px 16px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <nav
                        aria-label={t.mainNav}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        {navItems.map(({ href, key }) => (
                            <Link
                                key={href}
                                href={href}
                                style={mobileLinkStyle(href)}
                                aria-current={isActive(href) ? "page" : undefined}
                            >
                                {t[key]}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile controls */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "14px 4px",
                        }}
                    >
                        {langToggle}
                        {themeToggle}
                    </div>
                </div>
            )}
        </header>
    );
}