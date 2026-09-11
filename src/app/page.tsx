"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!url.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setError("");
        router.push(`/analyze?url=${encodeURIComponent(url.trim())}`);
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #eef2f8 0%, #dbe4f0 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "Segoe UI, Arial, sans-serif"
            }}
        >
            <div
                style={{
                    maxWidth: 520,
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    padding: "40px 32px",
                    textAlign: "center"
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <Image
                        src="/privacy-check-logo-transparent.png"
                        alt="PrivacyCheck logo"
                        width={120}
                        height={120}
                        priority
                    />
                </div>

                <h1
                    style={{
                        margin: "0 0 12px",
                        fontSize: "1.8rem",
                        color: "#1e3a5f",
                        fontWeight: 700
                    }}
                >
                    PrivacyCheck
                </h1>

                <p
                    style={{
                        margin: "0 0 28px",
                        color: "#64748b",
                        fontSize: "0.95rem",
                        lineHeight: 1.6
                    }}
                >
                    Paste a website URL to analyze its Terms of Service / Privacy Policy
                    and get an analysis of the risks involved.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "1px solid #dbe4f0",
                            fontSize: "0.95rem",
                            marginBottom: 16,
                            boxSizing: "border-box",
                            outline: "none",
                            color: "#1e3a5f"
                        }}
                    />

                    {error && (
                        <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "none",
                            background: "linear-gradient(135deg, #274870 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            cursor: "pointer"
                        }}
                    >
                        Analyze
                    </button>
                </form>
            </div>
        </div>
    );
}