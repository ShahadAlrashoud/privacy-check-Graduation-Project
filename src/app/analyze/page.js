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

                const text = await response.text();

                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(`Server returned: ${text}`);
                }

                if (!response.ok) {
                    setError(data.error || "Analysis failed.");
                    return;
                }

                router.replace(`/results?id=${data.id}`);
            } catch (error) {
                console.error("Analysis error:", error);
                setError(error.message || "Could not connect to API.");
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