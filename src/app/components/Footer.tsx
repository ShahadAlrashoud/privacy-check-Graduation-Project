"use client";

import Link from "next/link";
import { useTheme } from "../providers";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const linkStyle = {
        color: isDark ? "#94a3b8" : "#64748b",
        textDecoration: "none",
        fontSize: "0.85rem"
    };

    return (
        <footer
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
                <Link href="/" style={linkStyle}>Home</Link>
                <Link href="/analyze" style={linkStyle}>Analyze</Link>
                <Link href="/about" style={linkStyle}>About</Link>
            </div>
            © {new Date().getFullYear()} BYAN. All rights reserved.
        </footer>
    );
}