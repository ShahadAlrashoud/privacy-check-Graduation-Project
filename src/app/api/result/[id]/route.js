import { NextResponse } from "next/server";
import { getAnalysisById } from "../../../../../database/db";

export async function GET(_request, { params }) {
    const { id } = await params;
    const record = await getAnalysisById(id);

    if (!record) {
        return NextResponse.json(
            { error: "Result not found." },
            { status: 404 }
        );
    }

    return NextResponse.json(record, { status: 200 });
}