"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../providers";

// TODO: replace with your real contact address
const CONTACT_EMAIL = "contact@example.com";

const content = {
    en: {
        eyebrow: "Contact",
        title: "Get in touch",
        subtitle: "Questions, feedback, or a result that doesn't look right? We'd like to hear from you.",
        name: "Name",
        email: "Email",
        topic: "Topic",
        message: "Message",
        topics: ["General question", "Feedback", "Report an incorrect result", "Partnership"],
        messagePlaceholder: "Tell us how we can help. If you're reporting a result, include the website URL.",
        send: "Send message",
        errors: {
            required: "Please fill in all fields.",
            email: "Please enter a valid email address."
        },
        sent: "Your email app should open with your message. If it didn't, email us directly at:",
        directTitle: "Prefer email?",
        directText: "Write to us directly at",
        backLink: "← Back to Homepage"
    },
    ar: {
        eyebrow: "تواصل معنا",
        title: "تواصل معنا",
        subtitle: "لديك سؤال أو ملاحظة أو نتيجة تبدو غير صحيحة؟ يسعدنا أن نسمع منك.",
        name: "الاسم",
        email: "البريد الإلكتروني",
        topic: "الموضوع",
        message: "الرسالة",
        topics: ["سؤال عام", "ملاحظات", "الإبلاغ عن نتيجة غير صحيحة", "شراكة"],
        messagePlaceholder: "أخبرنا كيف يمكننا مساعدتك. إذا كنت تبلّغ عن نتيجة، فأرفق رابط الموقع.",
        send: "إرسال الرسالة",
        errors: {
            required: "يرجى تعبئة جميع الحقول.",
            email: "يرجى إدخال بريد إلكتروني صحيح."
        },
        sent: "من المفترض أن يُفتح تطبيق البريد لديك مع رسالتك. إذا لم يحدث ذلك، راسلنا مباشرة على:",
        directTitle: "تفضّل البريد الإلكتروني؟",
        directText: "راسلنا مباشرة على",
        backLink: "→ العودة إلى الصفحة الرئيسية"
    }
};

const ACCENT = "#6366f1";

export default function ContactPage() {
    const { theme, lang } = useTheme();
    const isDark = theme === "dark";
    const isAr = lang === "ar";
    const t = content[lang];
    const align = isAr ? "right" : "left";

    const [form, setForm] = useState({ name: "", email: "", topic: 0, message: "" });
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const colors = {
        bg: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        heading: isDark ? "#f1f1f1" : "#1e293b",
        body: isDark ? "#94a3b8" : "#64748b",
        line: isDark ? "#334155" : "#e2e8f0",
        input: isDark ? "#111827" : "#f8fafc",
        soft: isDark ? "rgba(99, 102, 241, 0.12)" : "#eef0ff",
        softBorder: isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.25)"
    };

    const labelStyle = { display: "block", margin: "0 0 6px", fontSize: "0.85rem", fontWeight: 600, color: colors.heading };
    const inputStyle = {
        width: "100%",
        boxSizing: "border-box" as const,
        padding: "11px 14px",
        borderRadius: 8,
        border: `1px solid ${colors.line}`,
        background: colors.input,
        color: colors.heading,
        fontSize: "0.95rem",
        fontFamily: "inherit",
        outline: "none",
        textAlign: align as "left" | "right"
    };

    function update(field: string, value: string | number) {
        setForm((f) => ({ ...f, [field]: value }));
        setError("");
        setSent(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError(t.errors.required);
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setError(t.errors.email);
            return;
        }

        const subject = `[BYAN] ${content.en.topics[form.topic]}`;
        const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
    }

    return (
        <main
            dir={isAr ? "rtl" : "ltr"}
            style={{ minHeight: "100vh", background: colors.bg, fontFamily: "Segoe UI, Arial, sans-serif", color: colors.heading }}
        >
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px", textAlign: align }}>
                <p
                    style={{
                        margin: "0 0 12px",
                        color: ACCENT,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: isAr ? 0 : "0.12em",
                        textTransform: "uppercase"
                    }}
                >
                    {t.eyebrow}
                </p>
                <h1 style={{ margin: "0 0 14px", fontSize: "clamp(2rem, 5vw, 2.6rem)", fontWeight: 800 }}>{t.title}</h1>
                <p style={{ margin: "0 0 36px", color: colors.body, fontSize: "1.05rem", lineHeight: 1.7 }}>{t.subtitle}</p>

                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
                        <div>
                            <label htmlFor="name" style={labelStyle}>{t.name}</label>
                            <input id="name" type="text" value={form.name} onChange={(e) => update("name", e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor="email" style={labelStyle}>{t.email}</label>
                            <input
                                id="email"
                                type="email"
                                dir="ltr"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                style={{ ...inputStyle, textAlign: "left" }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="topic" style={labelStyle}>{t.topic}</label>
                        <select id="topic" value={form.topic} onChange={(e) => update("topic", Number(e.target.value))} style={inputStyle}>
                            {t.topics.map((topic, i) => (
                                <option key={topic} value={i}>{topic}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" style={labelStyle}>{t.message}</label>
                        <textarea
                            id="message"
                            rows={6}
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            placeholder={t.messagePlaceholder}
                            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                        />
                    </div>

                    {error && <p style={{ margin: 0, color: "#dc2626", fontSize: "0.88rem" }}>{error}</p>}
                    {sent && (
                        <p style={{ margin: 0, color: "#4a8f68", fontSize: "0.88rem", lineHeight: 1.6 }}>
                            {t.sent} <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: ACCENT }}>{CONTACT_EMAIL}</a>
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            alignSelf: isAr ? "flex-end" : "flex-start",
                            border: "none",
                            borderRadius: 10,
                            padding: "13px 30px",
                            background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            cursor: "pointer"
                        }}
                    >
                        {t.send}
                    </button>
                </form>

                <div
                    style={{
                        marginTop: 40,
                        padding: "20px 22px",
                        borderRadius: 12,
                        background: colors.soft,
                        border: `1px solid ${colors.softBorder}`
                    }}
                >
                    <h2 style={{ margin: "0 0 6px", fontSize: "1rem" }}>{t.directTitle}</h2>
                    <p style={{ margin: 0, color: colors.body, fontSize: "0.92rem" }}>
                        {t.directText}{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                </div>

                <Link href="/" style={{ display: "inline-block", marginTop: 36, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                    {t.backLink}
                </Link>
            </div>
        </main>
    );
}