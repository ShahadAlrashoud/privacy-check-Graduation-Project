"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "../providers";

const content = {
  en: {
    login: "Log in",
    signup: "Sign up",
    profile: "Account / Profile",
    saved: "Saved Analysis Results",
    settings: "Settings",
    signout: "Sign out",
  },
  ar: {
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    profile: "الحساب / الملف الشخصي",
    saved: "نتائج التحليل المحفوظة",
    settings: "الإعدادات",
    signout: "تسجيل الخروج",
  },
};

export default function UserMenu() {
  const { data: session, status } = useSession();
  const { lang } = useTheme();
  const isAr = lang === "ar";
  const t = content[lang];
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (status === "loading") return null;

  if (!session?.user) {
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Link href="/login">{t.login}</Link>
        <Link href="/signup">{t.signup}</Link>
      </div>
    );
  }

  const name = session.user.username || session.user.email || "User";
  const initial = name[0]?.toUpperCase() || "U";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1px solid #cbd5e1",
          background: "#6366f1",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {initial}
      </button>

      {open && (
        <div
          dir={isAr ? "rtl" : "ltr"}
          style={{
            position: "absolute",
            [isAr ? "left" : "right"]: 0,
            top: 46,
            width: 270,
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            padding: 10,
            zIndex: 200,
            textAlign: isAr ? "right" : "left",
          }}
        >
          <div style={{ padding: 10, borderBottom: "1px solid #f1f5f9", marginBottom: 8 }}>
            <div style={{ fontWeight: 700 }}>{session.user.username || "User"}</div>
            <div style={{ fontSize: 13, color: "#64748b" }}>{session.user.email}</div>
          </div>

          <Link href="/profile" style={itemStyle}>{t.profile}</Link>
          <Link href="/saved-analyses" style={itemStyle}>{t.saved}</Link>
          <Link href="/settings" style={itemStyle}>{t.settings}</Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              ...itemStyle,
              width: "100%",
              textAlign: isAr ? "right" : "left",
              border: "none",
              background: "transparent",
              color: "#dc2626",
              cursor: "pointer",
            }}
          >
            {t.signout}
          </button>
        </div>
      )}
    </div>
  );
}

const itemStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  color: "#111827",
  textDecoration: "none",
  fontSize: 14,
};