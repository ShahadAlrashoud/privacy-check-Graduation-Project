"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
type Clause = {
  category?: string;
  text?: string;
  risk?: number | string;
  riskScore?: number | string;
  level?: string;
};

type AnalysisResult = {
  url?: string;
  websiteName?: string;
  riskScore?: number;
  overallRiskScore?: number;
  summary?: string;
  clauses?: Clause[];
  riskyItems?: string[];
  highRiskClauses?: string[];
};

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      setError("No website URL was provided.");
      setLoading(false);
      return;
    }

    const analyzeWebsite = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Analysis failed.");
        }

        setResult(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong while analyzing the website.");
        }
      } finally {
        setLoading(false);
      }
    };

    analyzeWebsite();
  }, [url]);

  const getRiskLabel = (score?: number) => {
    if (score === undefined) return "Unknown";

    if (score >= 70) return "High Risk";
    if (score >= 40) return "Medium Risk";

    return "Low Risk";
  };

  const getRiskClass = (score?: number) => {
    if (score === undefined) return "text-gray-600";

    if (score >= 70) return "text-red-600";
    if (score >= 40) return "text-yellow-600";

    return "text-green-600";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900 mb-3">
            Analyzing website...
          </div>

          <p className="text-gray-600">
            Please wait while we analyze the Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </main>
    );
  }

    if (error) { 
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Analysis Error
          </h1>
         
          <p className="text-gray-700 mb-6">{error}</p>

          <div className="flex flex-wrap gap-3">
            
  <button
    type="button"
    onClick={() => router.back()}
    className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
  >
    ← Back
  </button>

  <a
    href="/"
    className="inline-block rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700"
  >
    Back to Home
  </a>
</div>
        </div>
      </main>
    );
  }

  if (!result) {
    return null;
  }

  const score = result.overallRiskScore ?? result.riskScore ?? 0;
  const clauses = result.clauses ?? [];
  const riskyItems = result.riskyItems ?? result.highRiskClauses ?? [];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analysis Results
            </h1>

            <p className="text-gray-600 mt-2 break-all">
              {result.websiteName || result.url || url}
            </p>
          </div>

          <a
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 text-center"
          >
            Analyze Another Website
          </a>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">Overall Risk Score</p>

            <p className={`text-4xl font-bold ${getRiskClass(score)}`}>
              {score}
            </p>

            <p className={`mt-2 font-medium ${getRiskClass(score)}`}>
              {getRiskLabel(score)}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2">
            <p className="text-sm text-gray-500 mb-2">Website</p>

            <p className="text-lg font-semibold text-gray-900 break-all">
              {result.websiteName || result.url}
            </p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

          <p className="text-gray-700 leading-7">
            {result.summary || "No summary is available yet."}
          </p>
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Risky Items
          </h2>

          {riskyItems.length === 0 ? (
            <p className="text-gray-600">No high-risk clauses were detected.</p>
          ) : (
            <div className="space-y-3">
              {riskyItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-red-200 bg-red-50 p-4"
                >
                  <p className="text-red-800">{item}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Clause Breakdown
          </h2>

          {clauses.length === 0 ? (
            <p className="text-gray-600">
              No clause details are available yet.
            </p>
          ) : (
            <div className="space-y-4">
              {clauses.map((clause, index) => {
                const clauseRisk = Number(clause.riskScore ?? clause.risk ?? 0);

                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {clause.category || "General"}
                      </h3>

                      <span
                        className={`font-medium ${getRiskClass(clauseRisk)}`}
                      >
                        Risk: {clauseRisk}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-6">
                      {clause.text || "No clause text available."}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
          <div className="text-2xl font-semibold text-gray-900">Loading...</div>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}