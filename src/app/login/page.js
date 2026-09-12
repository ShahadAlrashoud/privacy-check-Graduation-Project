"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            setError("Invalid email or password.");
            return;
        }

        router.push("/");
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #eef2f8 0%, #dbe4f0 100%)",
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
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    padding: "40px 32px"
                }}
            >
                <h1 style={{ margin: "0 0 24px", fontSize: "1.5rem", color: "#1e3a5f", textAlign: "center" }}>
                    Log In
                </h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "1px solid #dbe4f0",
                            fontSize: "0.95rem",
                            marginBottom: 12,
                            boxSizing: "border-box"
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: 10,
                            border: "1px solid #dbe4f0",
                            fontSize: "0.95rem",
                            marginBottom: 16,
                            boxSizing: "border-box"
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
                            background: "linear-gradient(135deg, #274870 0%, #5b7ba8 100%)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            cursor: "pointer"
                        }}
                    >
                        Log In
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.9rem", color: "#64748b" }}>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" style={{ color: "#274870", fontWeight: 600 }}>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}