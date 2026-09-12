import Link from "next/link";

export default function AboutPage() {
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
                    maxWidth: 600,
                    width: "100%",
                    background: "#ffffff",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(30, 58, 95, 0.12)",
                    padding: "40px 32px"
                }}
            >
                <h1 style={{ margin: "0 0 16px", color: "#1e3a5f", fontSize: "1.6rem" }}>About PrivacyCheck</h1>
                <p style={{ color: "#334155", lineHeight: 1.7, fontSize: "0.95rem" }}>
                    [Add your project description here — e.g. what PrivacyCheck does,
                    why you built it, and any relevant background.]
                </p>
                <Link href="/" style={{ color: "#274870", fontWeight: 500, display: "inline-block", marginTop: 20 }}>
                    ← Back to Homepage
                </Link>
            </div>
        </div>
    );
}