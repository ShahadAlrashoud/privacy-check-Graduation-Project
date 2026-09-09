import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function saveAnalysis(record) {
    await sql`
    INSERT INTO analyses (id, url, risk_score, risk_level, summary_en, clauses, created_at)
    VALUES (
      ${record.id},
      ${record.url},
      ${record.riskScore},
      ${record.riskLevel},
      ${record.summaryEn},
      ${JSON.stringify(record.clauses)},
      ${record.createdAt}
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
        createdAt: row.created_at
    };
}