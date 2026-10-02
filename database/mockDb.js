import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function saveAnalysis(record) {
  await sql`
    INSERT INTO analyses (id, url, risk_score, risk_level, summary_en, clauses, created_at, lang)
    VALUES (
      ${record.id},
      ${record.url},
      ${record.riskScore},
      ${record.riskLevel},
      ${record.summaryEn},
      ${JSON.stringify(record.clauses)},
      ${record.createdAt},
      ${record.lang || "en"}
    )
  `;
}

export async function getAnalysisById(id) {
  const rows = await sql`SELECT * FROM analyses WHERE id = ${id}`;
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    url: row.url,
    riskScore: row.risk_score,
    riskLevel: row.risk_level,
    summaryEn: row.summary_en,
    clauses: row.clauses,
    createdAt: row.created_at,
    lang: row.lang || "en"
  };
}

export async function createUser({ email, passwordHash }) {
  const rows = await sql`
        INSERT INTO users (email, password_hash)
        VALUES (${email}, ${passwordHash})
        RETURNING id, email, created_at
    `;
  return rows[0];
}

export async function getUserByEmail(email) {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at
  };
}
export async function saveForUser(userId, analysisId) {
  await sql`
        INSERT INTO saved_analyses (user_id, analysis_id)
        VALUES (${userId}, ${analysisId})
        ON CONFLICT (user_id, analysis_id) DO NOTHING
    `;
}

export async function getSavedAnalysesForUser(userId) {
  const rows = await sql`
        SELECT a.id, a.url, a.risk_score, a.risk_level, a.summary_en, a.created_at
        FROM saved_analyses sa
        JOIN analyses a ON a.id = sa.analysis_id
        WHERE sa.user_id = ${userId}
        ORDER BY sa.created_at DESC
    `;
  return rows.map((row) => ({
    id: row.id,
    url: row.url,
    riskScore: row.risk_score,
    riskLevel: row.risk_level,
    summaryEn: row.summary_en,
    createdAt: row.created_at
  }));
}