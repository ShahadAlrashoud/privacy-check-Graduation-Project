"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidUrl(value: string) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (must start with http:// or https://).");
      return;
    }

    setLoading(true);
    router.push(`/analyze?url=${encodeURIComponent(url.trim())}`);
  }

  return (
    <main className="container">
      <h1>Wafiq Biwa&apos;i</h1>
      <p>
        Paste a website URL to analyze its Terms of Service / Privacy Policy and get a simple risk summary.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Analyze"}
          </button>
        </div>
      </form>

      {error && <p className="message error">{error}</p>}
    </main>
  );
}