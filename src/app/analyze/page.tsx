"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../providers";
import Link from "next/link";

const content = {
    en: {
        back: "← Back",
        analyzing: "Analyzing...",
        wait: "Please wait while we process the policy.",
        failed: "Analysis Failed",
        missingUrl: "Missing URL. Go back and paste a valid URL.",
        blocked:
            "This site blocks automated tools from reading it directly. Try copying the link to its Terms of Service or Privacy Policy page yourself and paste that instead.",
        connectError: "Could not connect to API."
    },
    ar: {
        back: "→ رجوع",
        analyzing: "جارٍ التحليل...",
        wait: "الرجاء الانتظار بينما نعالج السياسة.",
        failed: "فشل التحليل",
        missingUrl: "الرابط مفقود. ارجع والصق رابطًا صالحًا.",
        blocked:
            "يمنع هذا الموقع الأدوات الآلية من قراءته مباشرة. حاول نسخ رابط صفحة شروط الخدمة أو سياسة الخصوصية بنفسك ولصقه هنا بدلاً من ذلك.",
        connectError: "تعذر الاتصال بالخادم."
    }
};

function AnalyzeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const [error, setError] = useState("");
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    useEffect(() => {
        async function runAnalysis() {
            if (!url) {
                setError(t.missingUrl);
                return;
            }

            try {
                const response = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url, lang })
                });

                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(`Server returned: ${text}`);
                }

                if (!response.ok) {
                    const message = data.error || "Analysis failed.";
                    if (message.startsWith("BLOCKED:")) {
                        setError(t.blocked);
                    } else {
                        setError(message);
                    }
                    return;
                }

                router.replace(`/results?id=${data.id}`);
            } catch (error) {
                console.error("Analysis error:", error);
                setError(error instanceof Error ? error.message : t.connectError);
            }
        }

        runAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, lang, router]);

    return (
        <div
            dir={isAr ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
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
                    background: isDark ? "#111827" : "#f4f7fb",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    borderRadius: 16,
                    boxShadow: isDark
                        ? "0 8px 30px rgba(0, 0, 0, 0.4)"
                        : "0 8px 30px rgba(99, 102, 241, 0.1)",
                    padding: "40px 32px",
                    textAlign: "center"
                }}
            >
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
                    <Link
                        href="/"
                        style={{
                            color: isDark ? "#94a3b8" : "#64748b",
                            textDecoration: "none",
                            fontSize: "0.9rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                        }}
                    >
                        {t.back}
                    </Link>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <Image src="/privacy-check-logo-transparent.png" alt="PrivacyCheck logo" width={70} height={70} priority />
                </div>

                {!error ? (
                    <>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                margin: "0 auto 20px",
                                border: isDark ? "4px solid #334155" : "4px solid #e2e8f0",
                                borderTopColor: "#6366f1",
                                borderRadius: "50%",
                                animation: "spin 0.9s linear infinite"
                            }}
                        />
                        <h1 style={{ margin: "0 0 8px", fontSize: "1.4rem", color: isDark ? "#f1f1f1" : "#1e293b", fontWeight: 700 }}>
                            {t.analyzing}
                        </h1>
                        <p style={{ margin: "0 0 16px", color: isDark ? "#94a3b8" : "#64748b", fontSize: "0.95rem" }}>
                            {t.wait}
                        </p>
                    </>
                ) : (
                    <h1 style={{ margin: "0 0 16px", fontSize: "1.4rem", color: isDark ? "#f87171" : "#991b1b", fontWeight: 700 }}>
                        {t.failed}
                    </h1>
                )}

                {url && (
                    <p
                        dir="ltr"
                        style={{
                            wordBreak: "break-all",
                            background: isDark ? "#1e293b" : "#eef2f8",
                            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                            borderRadius: 10,
                            padding: "10px 14px",
                            color: isDark ? "#cbd5e1" : "#334155",
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
                            color: isDark ? "#fca5a5" : "#dc2626",
                            background: isDark ? "#450a0a" : "#fee2e2",
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