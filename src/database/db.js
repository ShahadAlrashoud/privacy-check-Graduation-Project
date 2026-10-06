import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

const sql = neon(process.env.DATABASE_URL);

function mapUser(r) {
    return r && {
        id: String(r.id),
        username: r.username,
        email: r.email,
        passwordHash: r.password_hash,
        createdAt: r.created_at,
    };
}

function mapAnalysis(r) {
    return {
        id: r.id,
        userId: String(r.user_id),
        title: r.title,
        query: r.query,
        result: r.result,
        riskScore: r.risk_score,
        riskLevel: r.risk_level,
        createdAt: r.created_at,
    };
}

export async function getUserByEmail(email) {
    if (!email) return null;
    const rows = await sql`
    SELECT * FROM users WHERE lower(email) = ${String(email).toLowerCase().trim()} LIMIT 1`;
    return mapUser(rows[0]) || null;
}

export async function getUserById(id) {
    const rows = await sql`SELECT * FROM users WHERE id::text = ${String(id)} LIMIT 1`;
    return mapUser(rows[0]) || null;
}

export async function createUser({ username, email, passwordHash }) {
    const rows = await sql`
    INSERT INTO users (username, email, password_hash)
    VALUES (${username?.trim() || null}, ${String(email).toLowerCase().trim()}, ${passwordHash})
    RETURNING *`;
    return mapUser(rows[0]);
}

export async function saveResult(record) {
    await sql`
    INSERT INTO analysis_results (id, record)
    VALUES (${String(record.id)}, ${JSON.stringify(record)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET record = EXCLUDED.record`;
    return record;
}

export async function getAnalysisById(id) {
    const rows = await sql`SELECT record FROM analysis_results WHERE id = ${String(id)} LIMIT 1`;
    return rows[0]?.record || null;
}

export async function createAnalysis({ id, userId, title, query, result, riskScore, riskLevel }) {
    const rows = await sql`
    INSERT INTO analyses (id, user_id, title, query, result, risk_score, risk_level)
    VALUES (${String(id ?? crypto.randomUUID())}, ${String(userId)}::uuid,
            ${title?.trim() || "Untitled Analysis"}, ${query?.trim() || ""},
            ${result?.trim() || ""}, ${riskScore ?? null}, ${riskLevel ?? null})
    RETURNING *`;
    return mapAnalysis(rows[0]);
}

export async function deleteAnalysis(id, userId) {
    const rows = await sql`
    DELETE FROM analyses WHERE id = ${String(id)} AND user_id = ${String(userId)}::uuid
    RETURNING id`;
    return rows.length > 0;
}

export async function listAnalysesByUser(userId, search = "") {
    const q = `%${search.trim().toLowerCase()}%`;
    const rows = await sql`
    SELECT * FROM analyses
    WHERE user_id = ${String(userId)}::uuid
      AND (lower(title) LIKE ${q} OR lower(query) LIKE ${q} OR lower(result) LIKE ${q})
    ORDER BY created_at DESC`;
    return rows.map(mapAnalysis);
}