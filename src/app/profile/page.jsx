"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "../providers";

const content = {
  en: {
    title: "Profile",
    username: "Username",
    email: "Email",
    userId: "User ID",
    notSet: "N/A",
    loading: "Loading...",
    pleaseLogin: "Please",
    logIn: "log in",
  },
  ar: {
    title: "الملف الشخصي",
    username: "اسم المستخدم",
    email: "البريد الإلكتروني",
    userId: "رقم المستخدم",
    notSet: "غير متوفر",
    loading: "جارٍ التحميل...",
    pleaseLogin: "يرجى",
    logIn: "تسجيل الدخول",
  },
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { lang } = useTheme();
  const isAr = lang === "ar";
  const t = content[lang];

  if (status === "loading") return <div style={{ padding: 20 }}>{t.loading}</div>;

  if (!session?.user) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} style={{ padding: 20 }}>
        {t.pleaseLogin} <Link href="/login">{t.logIn}</Link>.
      </div>
    );
  }

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{ maxWidth: 700, margin: "20px auto", padding: "0 16px" }}
    >
      <h1>{t.title}</h1>
      <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
        <p><b>{t.username}:</b> {session.user.username || t.notSet}</p>
        <p><b>{t.email}:</b> {session.user.email}</p>
        <p><b>{t.userId}:</b> {session.user.id}</p>
      </div>
    </div>
  );
}