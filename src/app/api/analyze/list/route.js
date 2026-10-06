import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { listAnalysesByUser } from "@/database/db";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const q = searchParams.get("q") || "";

        const items = await listAnalysesByUser(session.user.id, q);
        return NextResponse.json({ items }, { status: 200 });
    } catch (err) {
        console.error("LIST ANALYSES ERROR:", err);
        return NextResponse.json({ error: "Failed to load analyses." }, { status: 500 });
    }
}