"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../providers";
import { wrap, card, h1, input, btn, muted, PasswordField } from "../components/AuthShared";

const content = {
    en: {
        title: "Log In",
        email: "Email",
        password: "Password",
        button: "Log In",
        loading: "Logging in…",
        forgot: "Forgot password?",
        show: "Show password",
        hide: "Hide password",
        invalid: "Invalid email or password.",
        noAccount: "Don't have an account?",
        signup: "Sign up",
        serverError: "Could not reach auth server."
    },
    ar: {
        title: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        button: "تسجيل الدخول",
        loading: "جارٍ تسجيل الدخول…",
        forgot: "نسيت كلمة المرور؟",
        show: "إظهار كلمة المرور",
        hide: "إخفاء كلمة المرور",
        invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        noAccount: "ليس لديك حساب؟",
        signup: "إنشاء حساب",
        serverError: "تعذر الاتصال بخادم تسجيل الدخول."
    }
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { theme, lang } = useTheme();

    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/"
            });

            if (!result) {
                setError(t.serverError);
                return;
            }
            if (result.error) {
                setError(result.error === "CredentialsSignin" ? t.invalid : t.serverError);
                return;
            }
            router.push(result.url || "/");
        } catch {
            setError(t.serverError);
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
                        type="email"
                        placeholder={t.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        style={input(isDark)}
                    />
                    <PasswordField
                        value={password}
                        onChange={setPassword}
                        placeholder={t.password}
                        isDark={isDark}
                        autoComplete="current-password"
                        showLabel={t.show}
                        hideLabel={t.hide}
                    />

                    <div style={{ textAlign: "end", marginBottom: 16 }}>
                        <Link href="/forgot-password" style={{ color: "#6366f1", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                            {t.forgot}
                        </Link>
                    </div>

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
                    {t.noAccount}{" "}
                    <Link href="/signup" style={{ color: "#6366f1", fontWeight: 600 }}>
                        {t.signup}
                    </Link>
                </p>
            </div>
        </div>
    );
}