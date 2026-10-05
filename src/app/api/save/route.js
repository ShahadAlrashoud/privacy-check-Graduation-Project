import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { authOptions } from "../auth/[...nextauth]/route";
import { createAnalysis } from "@/database/db";

const isUuid = (v) =>
    typeof v === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);

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

        const score =
            riskScore === undefined || riskScore === null || Number.isNaN(Number(riskScore))
                ? null
                : Math.round(Number(riskScore));

        const item = await createAnalysis({
            id: isUuid(analysisId) ? analysisId : crypto.randomUUID(),
            userId: session.user.id,
            title: title || "Analysis Result",
            query: query || "",
            result,
            riskScore: score,
            riskLevel: riskLevel ?? null,
        });

        return NextResponse.json({ success: true, item }, { status: 201 });
    } catch (err) {
        console.error("SAVE ANALYSIS ERROR:", err);
        return NextResponse.json(
            { error: "Failed to save analysis.", details: err.message },
            { status: 500 }
        );
    }
}