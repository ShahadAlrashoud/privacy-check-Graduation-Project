"use client";

import { useTheme } from "../providers";
import BYANLogo from "./BYANLogo";


export default function Header() {
    const { isDark, toggleTheme } = (() => {
        const t = useTheme();
        return { isDark: t.theme === "dark", toggleTheme: t.toggleTheme };
    })();

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
        </div>
    );
}