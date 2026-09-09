import { NextResponse } from "next/server";
import { runAnalysisForUrl } from "../analysisService";

export async function POST(request) {
    try {
        const body = await request.json();
        const url = body?.url?.trim();

        if (!url) {
            return NextResponse.json({ error: "URL is required." }, { status: 400 });
        }

        const result = await runAnalysisForUrl(url);
        return NextResponse.json({ id: result.id }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
}