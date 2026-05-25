"use client";
import { useEffect, useState } from "react";
import { getHistory, type HistoryEntry } from "@/hooks/useDraftPersistence";
import { Clock, ChevronDown } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (history.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <Clock size={48} className="mx-auto mb-4 opacity-20" />
        <p style={{ color: "var(--muted)" }}>لا يوجد سجل بعد — ولّد بعض المنشورات أولاً</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">سجل الجلسات</h1>
      <div className="space-y-4">
        {history.map((entry) => (
          <details key={entry.id} className="card p-4 group cursor-pointer">
            <summary className="flex items-center justify-between list-none">
              <div>
                <p className="font-semibold text-sm line-clamp-1">{entry.idea}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                  {entry.platform} · {entry.tone} · {entry.variations.length} منشورات ·{" "}
                  {new Date(entry.date).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <ChevronDown size={16} className="group-open:rotate-180 transition-transform shrink-0" style={{ color: "var(--muted)" }} />
            </summary>
            <div className="mt-4 space-y-3">
              {entry.variations.map((v, i) => (
                <div key={i} className="text-sm p-3 rounded-lg" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
                  <span className="text-xs font-semibold text-sky-500">منشور {i + 1}</span>
                  <p className="mt-1 whitespace-pre-wrap">{v}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
