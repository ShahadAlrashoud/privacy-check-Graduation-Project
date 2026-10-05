"use client";

import { useState, type CSSProperties } from "react";

export function wrap(isDark: boolean): CSSProperties {
    return {
        minHeight: "100vh",
        background: isDark ? "linear-gradient(180deg, #0a0e1a 0%, #111827 100%)" : "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Segoe UI, Arial, sans-serif"
    };
}

export function card(isDark: boolean): CSSProperties {
    return {
        maxWidth: 420,
        width: "100%",
        background: isDark ? "#111827" : "#f4f7fb",
        border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
        borderRadius: 16,
        boxShadow: isDark ? "0 8px 30px rgba(0,0,0,0.4)" : "0 8px 30px rgba(99,102,241,0.1)",
        padding: "40px 32px"
    };
}

export function h1(isDark: boolean): CSSProperties {
    return { margin: "0 0 24px", fontSize: "1.5rem", color: isDark ? "#f1f1f1" : "#1e293b", textAlign: "center" };
}

export function input(isDark: boolean): CSSProperties {
    return {
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
    };
}

export function btn(disabled = false): CSSProperties {
    return {
        width: "100%",
        padding: "12px 16px",
        borderRadius: 10,
        border: "none",
        background: "linear-gradient(135deg, #6366f1 0%, #5b7ba8 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: "0.95rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1
    };
}

export function muted(isDark: boolean) {
    return isDark ? "#94a3b8" : "#64748b";
}

function EyeIcon({ off }: { off: boolean }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
            {off && <line x1="3" y1="3" x2="21" y2="21" />}
        </svg>
    );
}

type PasswordFieldProps = {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    isDark: boolean;
    autoComplete: "current-password" | "new-password";
    showLabel: string;
    hideLabel: string;
    minLength?: number;
};

export function PasswordField({ value, onChange, placeholder, isDark, autoComplete, showLabel, hideLabel, minLength }: PasswordFieldProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div style={{ position: "relative" }}>
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required
                minLength={minLength}
                style={{ ...input(isDark), paddingInlineEnd: 46 }}
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                aria-label={visible ? hideLabel : showLabel}
                aria-pressed={visible}
                style={{
                    position: "absolute",
                    insetInlineEnd: 10,
                    top: 8,
                    width: 32,
                    height: 32,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <EyeIcon off={visible} />
            </button>
        </div>
    );
}