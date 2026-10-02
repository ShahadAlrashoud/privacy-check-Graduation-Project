import { NextResponse } from "next/server";
import { runAnalysisForUrl } from "../analysisService";

export async function POST(request) {
    try {
        const body = await request.json();
        const url = body?.url?.trim();
        const preferredLang = body?.lang === "ar" ? "ar" : "en";

        if (!url) {
            return NextResponse.json(
                { error: "URL is required." },
                { status: 400 }
            );
        }

        const result = await runAnalysisForUrl(url, preferredLang);

        return NextResponse.json(
            { id: result.id },
            { status: 200 }
        );

    } catch (error) {
        console.error("ANALYSIS API ERROR:", error);

        return NextResponse.json(
            {
                error: error instanceof Error
                    ? error.message
                    : "An unknown server error occurred."
            },
            { status: 500 }
        );
    }
}