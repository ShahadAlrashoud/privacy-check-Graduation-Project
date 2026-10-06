import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || typeof password !== "string" || password.length < 8) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const tokenHash = crypto.createHash("sha256").update(String(token)).digest("hex");
        const rows = await sql`
            SELECT user_id FROM password_reset_tokens
            WHERE token_hash = ${tokenHash} AND expires_at > now()
            LIMIT 1
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const hashed = await bcrypt.hash(password, 10);
await sql`UPDATE users SET password_hash = ${hashed} WHERE id = ${rows[0].user_id}`;
        await sql`DELETE FROM password_reset_tokens WHERE user_id = ${rows[0].user_id}`;

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("reset-password error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}