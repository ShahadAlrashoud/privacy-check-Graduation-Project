import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createAnalysis } from "../../../../database/db";
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { analysisId, title, query, result, riskScore, riskLevel } = await request.json();

        if (!result) {
            return NextResponse.json({ error: "Result is required." }, { status: 400 });
        }

        const item = await createAnalysis({
            id: analysisId,
            userId: session.user.id,
            title: title || "Analysis Result",
            query: query || "",
            result,
            riskScore,
            riskLevel,
        });

        return NextResponse.json({ success: true, item }, { status: 201 });
    } catch (err) {
        console.error("SAVE ANALYSIS ERROR:", err);
        return NextResponse.json({ error: "Failed to save analysis." }, { status: 500 });
    }
}