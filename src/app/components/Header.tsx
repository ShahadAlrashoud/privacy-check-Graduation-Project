"use client";

import Link from "next/link";
import { useTheme } from "../providers";
import BYANLogo from "./BYANLogo";

export default function Header() {
    const { isDark, toggleTheme } = (() => {
        const t = useTheme();
        return { isDark: t.theme === "dark", toggleTheme: t.toggleTheme };
    })();

    const linkStyle = {
        color: isDark ? "#dbe4f0" : "#274870",
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: 500
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0"
            }}
        >
            <BYANLogo isDark={isDark} size="sm" rotate={false} />

            <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Link href="/" style={linkStyle}>Home</Link>
                <Link href="/analyze" style={linkStyle}>Analyze</Link>
                <Link href="/about" style={linkStyle}>About</Link>
                <Link href="/login" style={linkStyle}>Login</Link>

                <button
                    onClick={toggleTheme}
                    style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "1.3rem",
                        cursor: "pointer",
                        lineHeight: 1
                    }}
                    aria-label="Toggle theme"
                >
                    {isDark ? "☀️" : "🌙"}
                </button>
            </nav>
        </div>
    );
}