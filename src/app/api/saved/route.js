import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getSavedAnalysesForUser } from "../../../../database/mockDb";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const results = await getSavedAnalysesForUser(session.user.id);
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error("SAVED FETCH ERROR:", error);
        return NextResponse.json({ error: "Could not fetch saved results." }, { status: 500 });
    }
}