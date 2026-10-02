"use client";

import { useTheme } from "../providers";

export default function Header() {
    const { isDark, toggleTheme } = (() => {
        const t = useTheme();
        return { isDark: t.theme === "dark", toggleTheme: t.toggleTheme };
    })();

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px" }}>
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