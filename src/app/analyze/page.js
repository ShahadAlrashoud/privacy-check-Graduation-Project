"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnalyzePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get("url");
    const [error, setError] = useState("");

    useEffect(() => {
        async function runAnalysis() {
            if (!url) {
                setError("Missing URL. Go back and paste a valid URL.");
                return;
            }

            try {
                const response = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url })
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || "Analysis failed.");
                    return;
                }

                router.replace(`/results?id=${data.id}`);
            } catch {
                setError("Could not connect to API.");
            }
        }

        runAnalysis();
    }, [url, router]);

    return (
        <main className="container">
            <h1>Analyzing...</h1>
            <p>Please wait while we process the policy.</p>
            {url && <p><strong>URL:</strong> {url}</p>}
            {error && <p className="message error">{error}</p>}
        </main>
    );
}