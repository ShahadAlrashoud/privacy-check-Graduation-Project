"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./providers";
import BYANLogo from "../components/BYANLogo";

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setError("");
        router.push(`/analyze?url=${encodeURIComponent(url.trim())}`);
    }

    const features = [
        { icon: "📄", title: "Terms of Service", text: "Understand what you're agreeing to." },
        { icon: "🛡️", title: "Privacy Policy", text: "See how your data is collected and used." },
        { icon: "⚠️", title: "Potential Risks", text: "Spot clauses that may matter to you." },
        { icon: "✨", title: "Plain English", text: "Complex legal language, made simple." }
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
                fontFamily: "Segoe UI, Arial, sans-serif",
                color: isDark ? "#f1f1f1" : "#1e293b"
            }}
        >
            {/* Hero */}
            <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "60px 24px 40px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                    <BYANLogo isDark={isDark} size="lg" />
                </div>

                <p style={{ margin: 0, fontSize: "0.85rem", color: isDark ? "#94a3b8" : "#64748b" }}>
                    <span style={{ color: "#5b7ba8", fontWeight: 700 }}>B</span>efore{" "}
                    <span style={{ color: "#5b7ba8", fontWeight: 700 }}>Y</span>ou{" "}
                    <span style={{ color: "#5b7ba8", fontWeight: 700 }}>A</span>gree
                </p>

                <h1 style={{ fontSize: "2.6rem", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.2 }}>
                    Before You <span style={{ color: "#5b7ba8" }}>Agree</span>
                </h1>
                <p style={{ fontSize: "1.05rem", color: isDark ? "#94a3b8" : "#64748b", margin: "0 0 32px", lineHeight: 1.6 }}>
                    Know your rights. Understand your terms.
                </p>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        gap: 10,
                        background: isDark ? "#111827" : "#f4f7fb",
                        border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                        borderRadius: 14,
                        padding: 8,
                        maxWidth: 520,
                        margin: "0 auto"
                    }}
                >
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter website URL (e.g. example.com)"
                        style={{
                            flex: 1,
                            border: "none",
                            background: "transparent",
                            outline: "none",
                            padding: "10px 12px",
                            fontSize: "0.95rem",
                            color: isDark ? "#f1f1f1" : "#1e293b"
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            border: "none",
                            borderRadius: 10,
                            padding: "10px 20px",
                            background: "linear-gradient(135deg, #274870 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                        }}
                    >
                        Analyze Website →
                    </button>
                </form>
                                {error && <p style={{ color: "#dc2626", fontSize: "0.85rem", marginTop: 10 }}>{error}</p>}
                <p style={{ marginTop: 14, fontSize: "0.8rem", color: isDark ? "#94a3b8" : "#64748b" }}>
                    Quick. Simple. Clear.
                </p>
            </div>

            {/* Features */}
            <div
                style={{
                    maxWidth: 900,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 24,
                    padding: "20px 24px 80px",
                    textAlign: "center"
                }}
            >
                {features.map((f) => (
                    <div key={f.title}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                margin: "0 auto 12px",
                                borderRadius: 12,
                                background: isDark ? "#1e293b" : "#eef2f8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.4rem"
                            }}
                        >
                            {f.icon}
                        </div>
                        <h3 style={{ margin: "0 0 6px", fontSize: "0.95rem" }}>{f.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: isDark ? "#94a3b8" : "#64748b" }}>{f.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}