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
                padding: "16px 24px"
            }}
        >
            <BYANLogo isDark={isDark} size="md" />

            <button
                onClick={toggleTheme}
                style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "1.4rem",
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