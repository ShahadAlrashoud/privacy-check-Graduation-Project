import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
    try {
        const { email, lang } = await req.json();
        const clean = String(email || "").toLowerCase().trim();

        if (clean) {
            const users = await sql`SELECT id FROM users WHERE email = ${clean} LIMIT 1`;

            if (users.length > 0) {
                const token = crypto.randomBytes(32).toString("hex");
                const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

                await sql`DELETE FROM password_reset_tokens WHERE user_id = ${users[0].id}`;
                await sql`
                    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
                    VALUES (${users[0].id}, ${tokenHash}, now() + interval '1 hour')
                `;

                const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
                const isAr = lang === "ar";

                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        from: process.env.EMAIL_FROM,
                        to: clean,
                        subject: isAr ? "إعادة تعيين كلمة المرور - بيان" : "Reset your BYAN password",
                        html: isAr
                            ? `<div dir="rtl"><p>لإعادة تعيين كلمة المرور، اضغط على الرابط التالي (صالح لمدة ساعة):</p><p><a href="${link}">${link}</a></p><p>إذا لم تطلب ذلك، تجاهل هذه الرسالة.</p></div>`
                            : `<p>To reset your password, click the link below (valid for 1 hour):</p><p><a href="${link}">${link}</a></p><p>If you didn't request this, you can ignore this email.</p>`
                    })
                });
            }
        }
    } catch (err) {
        console.error("forgot-password error:", err);
    }

    // Same response whether or not the email exists
    return NextResponse.json({ ok: true });
}