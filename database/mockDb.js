// database/mockDb.js

const users = [];
const analyses = [];
const results = new Map(); // full analysis records, keyed by id

let userIdCounter = 1;
let analysisIdCounter = 1;

export async function getUserByEmail(email) {
  if (!email) return null;
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id) {
  return users.find((u) => String(u.id) === String(id)) || null;
}

export async function createUser({ username, email, passwordHash }) {
  const user = {
    id: String(userIdCounter++),
    username: username?.trim(),
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return user;
}

export async function saveResult(record) {
  results.set(String(record.id), record);
  return record;
}

export async function getAnalysisById(id) {
  return results.get(String(id)) || null;
}

export async function createAnalysis({ id, userId, title, query, result, riskScore, riskLevel }) {
  const item = {
    id: String(id ?? analysisIdCounter++),
    userId: String(userId),
    title: title?.trim() || "Untitled Analysis",
    query: query?.trim() || "",
    result: result?.trim() || "",
    riskScore: riskScore ?? null,
    riskLevel: riskLevel ?? null,
    createdAt: new Date().toISOString(),
  };
  analyses.push(item);
  return item;
}

export async function deleteAnalysis(id, userId) {
  const index = analyses.findIndex(
    (a) => String(a.id) === String(id) && String(a.userId) === String(userId)
  );
  if (index === -1) return false;
  analyses.splice(index, 1);
  return true;
}

export async function listAnalysesByUser(userId, search = "") {
  const q = search.trim().toLowerCase();

  const items = analyses
    .filter((a) => String(a.userId) === String(userId))
    .filter((a) => {
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.query.toLowerCase().includes(q) ||
        a.result.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return items;
}