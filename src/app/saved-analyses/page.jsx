"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useTheme } from "../providers";

const content = {
  en: {
    title: "Saved Analysis Results",
    search: "Search your analyses...",
    noResults: "No analyses found.",
    noAnalyses: "You haven't saved any analyses yet.",
    loading: "Loading...",
    pleaseLogin: "Please",
    logIn: "log in",
    sortLabel: "Sort by:",
    sortWorst: "Risk: Worst first",
    sortBest: "Risk: Best first",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    delete: "Delete",
    deleting: "Deleting...",
    viewDetails: "View clauses",
    hideDetails: "Hide clauses",
    loadingDetails: "Loading details...",
    noClauses: "No risky clauses detected.",
    weight: "weight",
  },
  ar: {
    title: "نتائج التحليل المحفوظة",
    search: "ابحث في تحليلاتك...",
    noResults: "لم يتم العثور على نتائج.",
    noAnalyses: "لم تقم بحفظ أي تحليلات بعد.",
    loading: "جارٍ التحميل...",
    pleaseLogin: "يرجى",
    logIn: "تسجيل الدخول",
    sortLabel: "ترتيب حسب:",
    sortWorst: "الخطورة: الأسوأ أولاً",
    sortBest: "الخطورة: الأفضل أولاً",
    sortNewest: "الأحدث أولاً",
    sortOldest: "الأقدم أولاً",
    delete: "حذف",
    deleting: "جارٍ الحذف...",
    viewDetails: "عرض البنود",
    hideDetails: "إخفاء البنود",
    loadingDetails: "جارٍ تحميل التفاصيل...",
    noClauses: "لم يتم اكتشاف بنود خطرة.",
    weight: "الوزن",
  },
};

function getRiskTier(riskLevel) {
  if (!riskLevel) return "unknown";
  const level = riskLevel.toLowerCase();
  if (level.includes("safe")) return "safe";
  if (level.includes("high")) return "high";
  return "moderate";
}

const TIER_COLORS = {
  safe: { bg: "#eafcf1", text: "#4a8f68", ring: "#86d9a4" },
  moderate: { bg: "#fdf6e3", text: "#a17f2d", ring: "#f2c96b" },
  high: { bg: "#fdecec", text: "#c06a6a", ring: "#f19a9a" },
  unknown: { bg: "#f1f5f9", text: "#64748b", ring: "#cbd5e1" },
};

function RiskBadge({ score, tier }) {
  const colors = TIER_COLORS[tier];
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        insetInlineEnd: 12,
        minWidth: 42,
        height: 42,
        borderRadius: "50%",
        background: colors.bg,
        border: `2px solid ${colors.ring}`,
        color: colors.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 13,
      }}
      title={`Risk score: ${score ?? "N/A"}`}
    >
      {score ?? "–"}
    </div>
  );
}

export default function SavedAnalysesPage() {
  const { data: session, status } = useSession();
  const { theme, lang } = useTheme();
  const isDark = theme === "dark";
  const isAr = lang === "ar";
  const t = content[lang];

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [detailsCache, setDetailsCache] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const controller = new AbortController();
    setLoading(true);

    fetch(`/api/analyze/list?search=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query, status]);

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/analyze/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleDetails(id) {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);

    if (!detailsCache[id]) {
      setDetailsLoading(id);
      try {
        const res = await fetch(`/api/result/${id}`);
        const data = await res.json();
        if (res.ok) {
          setDetailsCache((prev) => ({ ...prev, [id]: data }));
        }
      } catch {
        // ignore
      } finally {
        setDetailsLoading(null);
      }
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "worst") return (b.riskScore ?? -1) - (a.riskScore ?? -1);
    if (sortBy === "best") return (a.riskScore ?? 999) - (b.riskScore ?? 999);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return new Date(b.createdAt) - new Date(a.createdAt); // newest
  });

  if (status === "loading") return <div style={{ padding: 20 }}>{t.loading}</div>;

  if (!session?.user) {
    return (
      <div dir={isAr ? "rtl" : "ltr"} style={{ padding: 20 }}>
        {t.pleaseLogin} <Link href="/login">{t.logIn}</Link>.
      </div>
    );
  }

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{ maxWidth: 800, margin: "20px auto", padding: "0 16px" }}
    >
      <h1 style={{ color: isDark ? "#f1f5f9" : "#111827" }}>{t.title}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.search}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 10,
          border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          background: isDark ? "#1e293b" : "#fff",
          color: isDark ? "#f1f5f9" : "#111827",
          marginBottom: 12,
          fontSize: 14,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <label style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
          {t.sortLabel}
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
            background: isDark ? "#1e293b" : "#fff",
            color: isDark ? "#f1f5f9" : "#111827",
            fontSize: 13,
          }}
        >
          <option value="newest">{t.sortNewest}</option>
          <option value="oldest">{t.sortOldest}</option>
          <option value="worst">{t.sortWorst}</option>
          <option value="best">{t.sortBest}</option>
        </select>
      </div>

      {loading ? (
        <p>{t.loading}</p>
      ) : sortedItems.length === 0 ? (
        <p style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          {query ? t.noResults : t.noAnalyses}
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sortedItems.map((item) => {
            const tier = getRiskTier(item.riskLevel);
            const isExpanded = expandedId === item.id;
            const details = detailsCache[item.id];

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "16px 56px 16px 16px",
                  background: isDark ? "#1e293b" : "#fff",
                }}
              >
                <RiskBadge score={item.riskScore} tier={tier} />

                <div
                  onClick={() => handleToggleDetails(item.id)}
                  style={{
                    fontWeight: 700,
                    color: isDark ? "#f1f5f9" : "#111827",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {item.title}
                </div>
                {item.query && (
                  <div style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b", marginTop: 4 }}>
                    {item.query}
                  </div>
                )}
                <div style={{ fontSize: 12, color: isDark ? "#64748b" : "#94a3b8", marginTop: 8 }}>
                  {new Date(item.createdAt).toLocaleString(isAr ? "ar" : "en-US")}
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  style={{
                    marginTop: 12,
                    padding: "6px 14px",
                    borderRadius: 8,
                    border: "1px solid #c06a6a",
                    background: "transparent",
                    color: "#c06a6a",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {deletingId === item.id ? t.deleting : t.delete}
                </button>

                {isExpanded && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    }}
                  >
                    {detailsLoading === item.id ? (
                      <p style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
                        {t.loadingDetails}
                      </p>
                    ) : details?.clauses?.length ? (
                      <ul style={{ margin: 0, paddingInlineStart: 18 }}>
                        {details.clauses.map((c, idx) => (
                          <li
                            key={idx}
                            style={{
                              marginBottom: 10,
                              fontSize: 13,
                              lineHeight: 1.5,
                              color: isDark ? "#e2e8f0" : "#334155",
                            }}
                          >
                            <strong>{c.category}:</strong> {c.text}{" "}
                            <span style={{ color: "#94a3b8", fontSize: 12 }}>
                              ({t.weight}: {c.riskWeight})
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: 13, color: isDark ? "#94a3b8" : "#64748b" }}>
                        {t.noClauses}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}