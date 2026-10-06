"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../providers";
import { wrap, card, h1, input, btn, muted, PasswordField } from "../components/AuthShared";

const content = {
    en: {
        title: "Sign Up",
        username: "Username",
        email: "Email",
        password: "Password",
        confirm: "Confirm password",
        hint: "At least 6 characters.",
        show: "Show password",
        hide: "Hide password",
        agreePrefix: "I agree to the ",
        terms: "Terms of Use",
        and: " and ",
        privacy: "Privacy Policy",
        button: "Sign Up",
        loading: "Creating account…",
        mismatch: "Passwords do not match.",
        genericError: "Could not create account.",
        connectError: "Could not connect to server.",
        haveAccount: "Already have an account?",
        login: "Log in"
    },
    ar: {
        title: "إنشاء حساب",
        username: "اسم المستخدم",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        confirm: "تأكيد كلمة المرور",
        hint: "٨ أحرف على الأقل.",
        show: "إظهار كلمة المرور",
        hide: "إخفاء كلمة المرور",
        agreePrefix: "أوافق على ",
        terms: "شروط الاستخدام",
        and: " و",
        privacy: "سياسة الخصوصية",
        button: "إنشاء حساب",
        loading: "جارٍ إنشاء الحساب…",
        mismatch: "كلمتا المرور غير متطابقتين.",
        genericError: "تعذر إنشاء الحساب.",
        connectError: "تعذر الاتصال بالخادم.",
        haveAccount: "لديك حساب بالفعل؟",
        login: "تسجيل الدخول"
    }
};

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { theme, lang } = useTheme();

    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const linkStyle = { color: "#6366f1", fontWeight: 600 };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError(t.mismatch);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || t.genericError);
                return;
            }
            router.push("/login");
        } catch {
            setError(t.connectError);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div dir={isAr ? "rtl" : "ltr"} style={wrap(isDark)}>
            <div style={card(isDark)}>
                <h1 style={h1(isDark)}>{t.title}</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={t.username}
                        autoComplete="username"
                        required
                        style={input(isDark)}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.email}
                        autoComplete="email"
                        required
                        style={input(isDark)}
                    />
                    <PasswordField
                        value={password}
                        onChange={setPassword}
                        placeholder={t.password}
                        isDark={isDark}
                        autoComplete="new-password"
                        showLabel={t.show}
                        hideLabel={t.hide}
                        minLength={8}
                    />
                    <PasswordField
                        value={confirm}
                        onChange={setConfirm}
                        placeholder={t.confirm}
                        isDark={isDark}
                        autoComplete="new-password"
                        showLabel={t.show}
                        hideLabel={t.hide}
                        minLength={8}
                    />
                    <p style={{ margin: "-4px 0 14px", fontSize: "0.8rem", color: muted(isDark) }}>{t.hint}</p>

                    <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 16, fontSize: "0.85rem", color: muted(isDark), lineHeight: 1.5 }}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            required
                            style={{ marginTop: 3, accentColor: "#6366f1" }}
                        />
                        <span>
                            {t.agreePrefix}
                            <Link href="/terms" style={linkStyle}>{t.terms}</Link>
                            {t.and}
                            <Link href="/privacy" style={linkStyle}>{t.privacy}</Link>
                        </span>
                    </label>

                    {error && (
                        <p role="alert" style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" disabled={loading} style={btn(loading)}>
                        {loading ? t.loading : t.button}
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem", color: muted(isDark) }}>
                    {t.haveAccount}{" "}
                    <Link href="/login" style={linkStyle}>{t.login}</Link>
                </p>
            </div>
        </div>
    );
}