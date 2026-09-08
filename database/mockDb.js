const analyses = new Map();

export function saveAnalysis(record) {
  analyses.set(record.id, record);
}

export function getAnalysisById(id) {
  return analyses.get(id);
}