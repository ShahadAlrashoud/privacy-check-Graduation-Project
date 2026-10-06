"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../providers";
import { wrap, card, h1, input, btn, muted } from "../components/AuthShared";

const content = {
    en: {
        title: "Forgot Password",
        text: "Enter your email and we'll send you a link to reset your password.",
        email: "Email",
        button: "Send reset link",
        loading: "Sending…",
        done: "If an account exists for that email, a reset link has been sent. Check your inbox.",
        error: "Something went wrong. Please try again.",
        back: "← Back to Log in"
    },
    ar: {
        title: "نسيت كلمة المرور",
        text: "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
        email: "البريد الإلكتروني",
        button: "إرسال رابط إعادة التعيين",
        loading: "جارٍ الإرسال…",
        done: "إذا كان هناك حساب بهذا البريد، فقد تم إرسال رابط إعادة التعيين. تحقق من بريدك.",
        error: "حدث خطأ ما. حاول مرة أخرى.",
        back: "→ العودة إلى تسجيل الدخول"
    }
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, lang })
            });
            if (!res.ok) throw new Error();
            setSent(true);
        } catch {
            setError(t.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div dir={isAr ? "rtl" : "ltr"} style={wrap(isDark)}>
            <div style={card(isDark)}>
                <h1 style={h1(isDark)}>{t.title}</h1>

                {sent ? (
                    <p role="status" style={{ color: muted(isDark), lineHeight: 1.7, textAlign: "center" }}>{t.done}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <p style={{ margin: "0 0 16px", color: muted(isDark), fontSize: "0.9rem", lineHeight: 1.6 }}>{t.text}</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.email}
                            autoComplete="email"
                            required
                            style={input(isDark)}
                        />
                        {error && <p role="alert" style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>{error}</p>}
                        <button type="submit" disabled={loading} style={btn(loading)}>
                            {loading ? t.loading : t.button}
                        </button>
                    </form>
                )}

                <p style={{ textAlign: "center", marginTop: 20 }}>
                    <Link href="/login" style={{ color: "#6366f1", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                        {t.back}
                    </Link>
                </p>
            </div>
        </div>
    );
}