import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "../../../../../database/db";
export async function POST(request) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required." },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters." },
                { status: 400 }
            );
        }

        const existing = await getUserByEmail(email);
        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);
        await createUser({ username, email, passwordHash });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return NextResponse.json({ error: "Could not create account." }, { status: 500 });
    }
}