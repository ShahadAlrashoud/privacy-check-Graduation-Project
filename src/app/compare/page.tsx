use client";

import { FormEvent, useState } from "react";

type WebsiteResult = {

  url: string;

  websiteName?: string;

  riskScore?: number;

  overallRiskScore?: number;

  summary?: string;

  clauses?: {

    category?: string;

    text?: string;

    risk?: number | string;

    riskScore?: number | string;

  }[];

};

export default function ComparePage() {

  const [url1, setUrl1] = useState("");

  const [url2, setUrl2] = useState("");

  const [result1, setResult1] = useState<WebsiteResult | null>(null);

  const [result2, setResult2] = useState<WebsiteResult | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const validateUrl = (value: string) => {

    try {

      const parsedUrl = new URL(value);

      return (

        parsedUrl.protocol === "http:" ||

        parsedUrl.protocol === "https:"

      );

    } catch {

      return false;

    }

  };

  const analyzeWebsite = async (

    websiteUrl: string

  ): Promise<WebsiteResult> => {

    const response = await fetch("/api/analyze", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        url: websiteUrl,

      }),

    });

    const data = await response.json();

    if (!response.ok) {

      throw new Error(

        data.message || `Failed to analyze ${websiteUrl}`

      );

    }

    return {

      ...data,

      url: data.url || websiteUrl,

    };

  };

  const handleCompare = async (

    event: FormEvent<HTMLFormElement>

  ) => {

    event.preventDefault();

    setError("");

    setResult1(null);

    setResult2(null);

    const firstUrl = url1.trim();

    const secondUrl = url2.trim();

    if (!firstUrl || !secondUrl) {

      setError("Please enter both website URLs.");

      return;

    }

    if (!validateUrl(firstUrl)) {

      setError("The first URL is not valid.");

      return;

    }

    if (!validateUrl(secondUrl)) {

      setError("The second URL is not valid.");

      return;

    }

    setLoading(true);

    try {

      const [firstResult, secondResult] = await Promise.all([

        analyzeWebsite(firstUrl),

        analyzeWebsite(secondUrl),

      ]);

      setResult1(firstResult);

      setResult2(secondResult);

    } catch (err) {

      if (err instanceof Error) {

        setError(err.message);

      } else {

        setError("Something went wrong while comparing websites.");

      }

    } finally {

      setLoading(false);

    }

  };

  const getScore = (result: WebsiteResult | null) => {

    if (!result) return 0;

    return (

      result.overallRiskScore ??

      result.riskScore ??

      0

    );

  };

  const getRiskLabel = (score: number) => {

    if (score >= 70) return "High Risk";

    if (score >= 40) return "Medium Risk";

    return "Low Risk";

  };

  const getRiskClass = (score: number) => {

    if (score >= 70) return "text-red-600";

    if (score >= 40) return "text-yellow-600";

    return "text-green-600";

  };

  return (

    <main className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-gray-900">

            Compare Websites

          </h1>

          <p className="text-gray-600 mt-3">

            Compare the Terms of Service and Privacy Policies of

            two websites.

          </p>

        </div>

        <form

          onSubmit={handleCompare}

          className="bg-white rounded-2xl shadow-sm p-6 mb-8"

        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label

                htmlFor="url1"

                className="block text-sm font-medium text-gray-700 mb-2"

              >

                First Website

              </label>

              <input

                id="url1"

                type="text"

                value={url1}

                onChange={(event) =>
                    setUrl1(event.target.value)

                }

                placeholder="https://example.com"

                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"

              />

            </div>

            <div>

              <label

                htmlFor="url2"

                className="block text-sm font-medium text-gray-700 mb-2"

              >

                Second Website

              </label>

              <input

                id="url2"

                type="text"

                value={url2}

                onChange={(event) =>

                  setUrl2(event.target.value)

                }

                placeholder="https://example.org"

                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"

              />

            </div>

          </div>

          {error && (

            <p className="text-red-600 text-sm mt-4">

              {error}

            </p>

          )}

          <button

            type="submit"

            disabled={loading}

            className="w-full mt-6 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"

          >

            {loading ? "Comparing..." : "Compare Websites"}

          </button>

        </form>

        {result1 && result2 && (

          <>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              {[result1, result2].map((result, index) => {

                const score = getScore(result);

                return (

                  <div

                    key={index}

                    className="bg-white rounded-2xl shadow-sm p-6"

                  >

                    <p className="text-sm text-gray-500 mb-2">

                      Website {index + 1}

                    </p>

                    <h2 className="text-xl font-bold text-gray-900 break-all">

                      {result.websiteName || result.url}

                    </h2>

                    <div className="mt-6">

                      <p className="text-sm text-gray-500">

                        Risk Score

                      </p>

                      <p

                        className={`text-4xl font-bold mt-1 ${getRiskClass(

                          score

                        )}`}

                      >

                        {score}

                      </p>

                      <p

                        className={`font-medium mt-2 ${getRiskClass(

                          score

                        )}`}

                      >

                        {getRiskLabel(score)}

                      </p>

                    </div>

                    <div className="mt-6">

                      <p className="text-sm text-gray-500 mb-2">

                        Summary

                      </p>

                      <p className="text-gray-700 leading-6">

                        {result.summary ||

                          "No summary is available."}

                      </p>

                    </div>

                  </div>

                );

              })}

            </section>

            <section className="bg-white rounded-2xl shadow-sm p-6 mb-8">

              <h2 className="text-xl font-bold text-gray-900 mb-5">

                Key Clause Differences

              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {[result1, result2].map((result, index) => (

                  <div key={index}>

                    <h3 className="font-semibold text-gray-900 mb-4">

                      Website {index + 1}

                    </h3>

                    <div className="space-y-3">

                      {(result.clauses || []).map(

                        (clause, clauseIndex) => (

                          <div

                            key={clauseIndex}

                            className="border border-gray-200 rounded-lg p-4"
                            >

                            <p className="font-medium text-gray-900">

                              {clause.category ||

                                "General"}

                            </p>

                            <p className="text-sm text-gray-600 mt-2">

                              {clause.text ||

                                "No clause text available."}

                            </p>

                            <p

                              className={`text-sm font-medium mt-2 ${getRiskClass(

                                Number(

                                  clause.riskScore ??

                                    clause.risk ??

                                    0

                                )

                              )}`}

                            >

                              Risk:{" "}

                              {Number(

                                clause.riskScore ??

                                  clause.risk ??

                                  0

                              )}

                            </p>

                          </div>

                        )

                      )}

                    </div>

                  </div>

                ))}

              </div>

            </section>

          </>

        )}

      </div>

    </main>

  );

}
