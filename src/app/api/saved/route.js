import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { listAnalysesByUser } from "../../../../../database/db";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await listAnalysesByUser(session.user.id);
    return NextResponse.json({ items }, { status: 200 });
}