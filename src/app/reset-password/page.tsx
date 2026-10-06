"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../providers";
import { wrap, card, h1, btn, muted, PasswordField } from "../components/AuthShared";

const content = {
    en: {
        title: "Set New Password",
        password: "New password",
        confirm: "Confirm new password",
        show: "Show password",
        hide: "Hide password",
        button: "Reset password",
        loading: "Saving…",
        mismatch: "Passwords do not match.",
        invalid: "This reset link is invalid or has expired.",
        error: "Something went wrong. Please try again.",
        done: "Your password has been updated.",
        login: "Go to Log in",
        request: "Request a new link"
    },
    ar: {
        title: "تعيين كلمة مرور جديدة",
        password: "كلمة المرور الجديدة",
        confirm: "تأكيد كلمة المرور الجديدة",
        show: "إظهار كلمة المرور",
        hide: "إخفاء كلمة المرور",
        button: "إعادة تعيين كلمة المرور",
        loading: "جارٍ الحفظ…",
        mismatch: "كلمتا المرور غير متطابقتين.",
        invalid: "رابط إعادة التعيين غير صالح أو منتهي الصلاحية.",
        error: "حدث خطأ ما. حاول مرة أخرى.",
        done: "تم تحديث كلمة المرور.",
        login: "الانتقال إلى تسجيل الدخول",
        request: "اطلب رابطًا جديدًا"
    }
};

function ResetForm() {
    const params = useSearchParams();
    const token = params.get("token") || "";
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [invalid, setInvalid] = useState(!token);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const linkStyle = { color: "#6366f1", fontWeight: 600, textDecoration: "none" };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (password !== confirm) {
            setError(t.mismatch);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })
            });
            if (res.status === 400) {
                setInvalid(true);
                return;
            }
            if (!res.ok) throw new Error();
            setDone(true);
            setTimeout(() => router.push("/login"), 2000);
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

                {invalid ? (
                    <div style={{ textAlign: "center" }}>
                        <p role="alert" style={{ color: "#dc2626", marginBottom: 16 }}>{t.invalid}</p>
                        <Link href="/forgot-password" style={linkStyle}>{t.request}</Link>
                    </div>
                ) : done ? (
                    <div style={{ textAlign: "center" }}>
                        <p role="status" style={{ color: muted(isDark), marginBottom: 16 }}>{t.done}</p>
                        <Link href="/login" style={linkStyle}>{t.login}</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <PasswordField value={password} onChange={setPassword} placeholder={t.password} isDark={isDark} autoComplete="new-password" showLabel={t.show} hideLabel={t.hide} minLength={8} />
                        <PasswordField value={confirm} onChange={setConfirm} placeholder={t.confirm} isDark={isDark} autoComplete="new-password" showLabel={t.show} hideLabel={t.hide} minLength={8} />
                        {error && <p role="alert" style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>{error}</p>}
                        <button type="submit" disabled={loading} style={btn(loading)}>
                            {loading ? t.loading : t.button}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <ResetForm />
        </Suspense>
    );
}