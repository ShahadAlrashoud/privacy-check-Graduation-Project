import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { saveForUser } from "../../../../database/mockDb";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "You must be logged in to save results." }, { status: 401 });
    }

    const { analysisId } = await request.json();
    if (!analysisId) {
        return NextResponse.json({ error: "Missing analysisId." }, { status: 400 });
    }

    try {
        await saveForUser(session.user.id, analysisId);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("SAVE ERROR:", error);
        return NextResponse.json({ error: "Could not save analysis." }, { status: 500 });
    }
}