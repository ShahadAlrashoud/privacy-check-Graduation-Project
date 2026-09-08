"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      if (!id) {
        setError("Missing result ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/result/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Result not found.");
          setLoading(false);
          return;
        }

        setResult(data);
      } catch {
        setError("Could not load result.");
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [id]);

  function badgeClass(level) {
    if (level === "Safe") return "badge safe";
    if (level === "Moderate Risk") return "badge moderate";
    return "badge high";
  }

  return (
    <main className="container">
      <h1>Analysis Results</h1>

      {loading && <p>Loading result...</p>}
      {error && <p className="message error">{error}</p>}

      {!loading && result && (
        <>
          <p><strong>URL:</strong> {result.url}</p>
          <p>
            <strong>Risk Score:</strong> {result.riskScore}/100
            <span className={badgeClass(result.riskLevel)}>{result.riskLevel}</span>
          </p>

          <div className="card">
            <h3>Summary</h3>
            <p>{result.summaryEn}</p>
          </div>

          <div className="card">
            <h3>Detected Clauses</h3>
            {result.clauses.length === 0 ? (
              <p>No risky clauses detected in this basic scaffold.</p>
            ) : (
              <ul>
                {result.clauses.map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.category}:</strong> {c.text} (weight: {c.riskWeight})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <p style={{ marginTop: "16px" }}>
        <Link href="/">← Back to Homepage</Link>
      </p>
    </main>
  );
}