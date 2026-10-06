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
  const { lang, theme } = useTheme();

  const isAr = lang === "ar";
  const isDark = theme === "dark";
  const t = content[lang];

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  if (status === "loading") return null;

  // LOGGED OUT
  if (!session?.user) {
    return (
      <div
        dir={isAr ? "rtl" : "ltr"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Link
          href="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            padding: "0 12px",
            borderRadius: 8,
            color: isDark ? "#e5e7eb" : "#374151",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {t.login}
        </Link>

        <Link
          href="/signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 36,
            padding: "0 14px",
            borderRadius: 8,
            background: "#6366f1",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.08)",
          }}
        >
          {t.signup}
        </Link>
      </div>
    );
  }

  // LOGGED IN
  const name = session.user.username || session.user.email || "User";
  const initial = name[0]?.toUpperCase() || "U";

  const menuBackground = isDark ? "#111827" : "#ffffff";
  const menuBorder = isDark ? "#374151" : "#e2e8f0";
  const primaryText = isDark ? "#f3f4f6" : "#111827";
  const secondaryText = isDark ? "#9ca3af" : "#64748b";
  const divider = isDark ? "#374151" : "#f1f5f9";

  return (
    <div
      ref={ref}
      dir={isAr ? "rtl" : "ltr"}
      style={{
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={isAr ? "فتح قائمة الحساب" : "Open account menu"}
        aria-expanded={open}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: isDark
            ? "1px solid #4f46e5"
            : "1px solid rgba(99, 102, 241, 0.25)",
          background: "#6366f1",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? "0 0 0 3px rgba(99, 102, 241, 0.15)"
            : "none",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {initial}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            [isAr ? "left" : "right"]: 0,
            top: 46,
            width: 270,
            background: menuBackground,
            border: `1px solid ${menuBorder}`,
            borderRadius: 12,
            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.35)"
              : "0 10px 30px rgba(0,0,0,0.12)",
            padding: 8,
            zIndex: 200,
            textAlign: isAr ? "right" : "left",
          }}
        >
          {/* Account information */}
          <div
            style={{
              padding: "10px 10px 12px",
              borderBottom: `1px solid ${divider}`,
              marginBottom: 6,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: primaryText,
                marginBottom: 3,
              }}
            >
              {session.user.username || "User"}
            </div>

            <div
              style={{
                fontSize: 12,
                color: secondaryText,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {session.user.email}
            </div>
          </div>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            style={itemStyle(primaryText)}
          >
            {t.profile}
          </Link>

          <Link
            href="/saved-analyses"
            onClick={() => setOpen(false)}
            style={itemStyle(primaryText)}
          >
            {t.saved}
          </Link>

          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            style={itemStyle(primaryText)}
          >
            {t.settings}
          </Link>

          <div
            style={{
              height: 1,
              background: divider,
              margin: "6px 4px",
            }}
          />

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              ...itemStyle("#dc2626"),
              width: "100%",
              textAlign: isAr ? "right" : "left",
              border: "none",
              background: "transparent",
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

function itemStyle(color) {
  return {
    display: "block",
    width: "100%",
    padding: "9px 10px",
    borderRadius: 8,
    color,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    boxSizing: "border-box",
  };
}