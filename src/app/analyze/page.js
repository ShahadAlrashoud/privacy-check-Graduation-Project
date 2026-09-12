"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function AnalyzeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const [error, setError] = useState("");

    useEffect(() => {
        async function runAnalysis() {
            if (!url) {
                setError("Missing URL. Go back and paste a valid URL.");
                return;
            }

            try {
                const response = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url })
                });

                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(`Server returned: ${text}`);
                }

                if (!response.ok) {
                    setError(data.error || "Analysis failed.");
                    return;
                }

                router.replace(`/results?id=${data.id}`);
            } catch (error) {
                console.error("Analysis error:", error);
                setError(error.message || "Could not connect to API.");
            }
        }

        runAnalysis();
    }, [url, router]);

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
                    maxWidth: 480,
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    padding: "40px 32px",
                    textAlign: "center"
                }}
            >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <Image src="/logo.png" alt="PrivacyCheck logo" width={70} height={70} priority />
                </div>

                {!error ? (
                    <>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                margin: "0 auto 20px",
                                border: "4px solid #dbe4f0",
                                borderTopColor: "#274870",
                                borderRadius: "50%",
                                animation: "spin 0.9s linear infinite"
                            }}
                        />
                        <h1 style={{ margin: "0 0 8px", fontSize: "1.4rem", color: "#1e3a5f", fontWeight: 700 }}>
                            Analyzing...
                        </h1>
                        <p style={{ margin: "0 0 16px", color: "#64748b", fontSize: "0.95rem" }}>
                            Please wait while we process the policy.
                        </p>
                    </>
                ) : (
                    <h1 style={{ margin: "0 0 16px", fontSize: "1.4rem", color: "#991b1b", fontWeight: 700 }}>
                        Analysis Failed
                    </h1>
                )}

                {url && (
                    <p
                        style={{
                            wordBreak: "break-all",
                            background: "#f4f7fb",
                            border: "1px solid #dbe4f0",
                            borderRadius: 10,
                            padding: "10px 14px",
                            color: "#334155",
                            fontSize: "0.85rem",
                            marginBottom: error ? 20 : 0
                        }}
                    >
                        {url}
                    </p>
                )}

                {error && (
                    <p
                        style={{
                            color: "#dc2626",
                            background: "#fee2e2",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: "0.9rem"
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default function AnalyzePage() {
    return (
        <Suspense fallback={<p style={{ textAlign: "center", padding: "48px" }}>Loading...</p>}>
            <AnalyzeContent />
        </Suspense>
    );
}