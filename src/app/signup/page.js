"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../providers";

const content = {
    en: {
        title: "Sign Up",
        email: "Email",
        password: "Password",
        button: "Sign Up",
        genericError: "Could not create account.",
        connectError: "Could not connect to server.",
        haveAccount: "Already have an account?",
        login: "Log in"
    },
    ar: {
        title: "إنشاء حساب",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        button: "إنشاء حساب",
        genericError: "تعذر إنشاء الحساب.",
        connectError: "تعذر الاتصال بالخادم.",
        haveAccount: "لديك حساب بالفعل؟",
        login: "تسجيل الدخول"
    }
};

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { theme, lang, setLang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || t.genericError);
                return;
            }

            router.push("/login");
        } catch {
            setError(t.connectError);
        }
    }

    return (
        <div
            dir={isAr ? "rtl" : "ltr"}
            style={{
                minHeight: "100vh",
                background: isDark
                    ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)"
                    : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                fontFamily: "Segoe UI, Arial, sans-serif"
            }}
        >
            <div
                style={{
                    maxWidth: 420,
                    width: "100%",
                    background: isDark ? "#111827" : "#f4f7fb",
                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    borderRadius: 16,
                    boxShadow: isDark
                        ? "0 8px 30px rgba(0, 0, 0, 0.4)"
                        : "0 8px 30px rgba(99, 102, 241, 0.1)",
                    padding: "40px 32px"
                }}
            >


                <h1 style={{ margin: "0 0 24px", fontSize: "1.5rem", color: isDark ? "#f1f1f1" : "#1e293b", textAlign: "center" }}>
                    {t.title}
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder={t.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        dir={isAr ? "rtl" : "ltr"}
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: isDark ? "1px solid #334155" : "1px solid #dbe4f0",
                            background: isDark ? "#0f172a" : "#ffffff",
                            color: isDark ? "#f1f1f1" : "#1e293b",
                            fontSize: "0.95rem",
                            marginBottom: 12,
                            boxSizing: "border-box",
                            outline: "none"
                        }}
                    />
                    <input
                        type="password"
                        placeholder={t.password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        dir={isAr ? "rtl" : "ltr"}
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: isDark ? "1px solid #334155" : "1px solid #dbe4f0",
                            background: isDark ? "#0f172a" : "#ffffff",
                            color: isDark ? "#f1f1f1" : "#1e293b",
                            fontSize: "0.95rem",
                            marginBottom: 16,
                            boxSizing: "border-box",
                            outline: "none"
                        }}
                    />

                    {error && (
                        <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "none",
                            background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            cursor: "pointer"
                        }}
                    >
                        {t.button}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b" }}>
                    {t.haveAccount}{" "}
                    <Link href="/login" style={{ color: "#6366f1", fontWeight: 600 }}>
                        {t.login}
                    </Link>
                </p>
            </div>
        </div>
    );
}