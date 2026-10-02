import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { summaryEn, clauses, targetLang } = body;

        if (!summaryEn || !clauses || !targetLang) {
            return NextResponse.json(
                { error: "summaryEn, clauses, and targetLang are required." },
                { status: 400 }
            );
        }

        const languageName = targetLang === "ar" ? "Arabic (Modern Standard Arabic)" : "English";

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        {
                            role: "system",
                            content: `You are a translator. Translate the given JSON content into ${languageName}. Keep the exact same JSON structure and keys. Do not add commentary. Return ONLY valid JSON in this format:

{
  "summaryEn": string,
  "clauses": [
    { "category": string, "text": string, "riskWeight": number }
  ]
}`
                        },
                        {
                            role: "user",
                            content: JSON.stringify({ summaryEn, clauses })
                        }
                    ],
                    response_format: { type: "json_object" }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Translate API error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        const translated = JSON.parse(data.choices[0].message.content);

        return NextResponse.json(translated, { status: 200 });
    } catch (error) {
        console.error("TRANSLATE API ERROR:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Translation failed." },
            { status: 500 }
        );
    }
}