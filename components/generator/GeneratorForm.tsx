"use client";
import { useState, useEffect, useCallback } from "react";
import { Wand2, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { useGenerateContent } from "@/hooks/useGenerateContent";
import { useCopy } from "@/hooks/useCopy";
import { useDraftPersistence, appendHistory, type Draft } from "@/hooks/useDraftPersistence";
import { VariationCard } from "./VariationCard";

const platforms = [
  { value: "instagram", label: "🟣 Instagram" },
  { value: "linkedin", label: "🔵 LinkedIn" },
  { value: "x", label: "⚫ X" },
  { value: "facebook", label: "🔵 Facebook" },
];

const tones = [
  { value: "professional", label: "🎩 رسمي" },
  { value: "casual", label: "😊 عفوي" },
  { value: "persuasive", label: "💪 إقناعي" },
  { value: "funny", label: "😂 مرح" },
  { value: "inspirational", label: "✨ ملهم" },
];

const counts = [3, 5, 7];

const exampleIdeas = [
  "إطلاق منتج جديد لعناية البشرة الطبيعية",
  "نصيحة يومية عن الإنتاجية وإدارة الوقت",
  "إعلان عن ورشة عمل تصوير للمبتدئين",
];

export function GeneratorForm() {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("casual");
  const [count, setCount] = useState<3 | 5 | 7>(3);

  const { variations, loading, generate, updateVariation } = useGenerateContent();
  const { copy } = useCopy();

  const draft: Draft = { idea, platform, tone, count };
  useDraftPersistence(draft, (saved) => {
    setIdea(saved.idea);
    setPlatform(saved.platform);
    setTone(saved.tone);
    setCount(saved.count as 3 | 5 | 7);
  });

  const handleGenerate = useCallback(async () => {
    if (!idea.trim() || idea.length < 10) {
      toast.error("اكتب فكرة أطول قليلاً (10 أحرف على الأقل)");
      return;
    }
    await generate({ idea, platform: platform as "instagram" | "linkedin" | "x" | "facebook", tone: tone as "professional" | "casual" | "persuasive" | "funny" | "inspirational", count });
  }, [idea, platform, tone, count, generate]);

  // Save to history after generation
  useEffect(() => {
    if (variations.length > 0) {
      appendHistory({ idea, platform, tone, variations });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variations]);

  // Keyboard shortcut Ctrl+Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleGenerate();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleGenerate]);

  function copyAll() {
    const all = variations.filter(Boolean).join("\n\n---\n\n");
    copy(all, "تم نسخ جميع المنشورات!");
  }

  const selectClass = "w-full text-sm p-2.5 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500";
  const borderStyle = { borderColor: "var(--border)" };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">مولّد المحتوى</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>صف فكرتك وانتظر المنشورات الجاهزة</p>
      </div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* Inputs col */}
        <div className="md:col-span-2 space-y-4">
          {/* Idea textarea */}
          <div className="card p-4 space-y-3">
            <label className="text-sm font-semibold">💡 فكرة المنشور</label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={5}
              placeholder="مثال: إطلاق خدمة جديدة لتصميم المواقع..."
              className="w-full text-sm p-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
              style={borderStyle}
            />
            {/* Example chips */}
            <div className="space-y-1">
              <p className="text-xs" style={{ color: "var(--muted)" }}>أمثلة:</p>
              <div className="flex flex-wrap gap-2">
                {exampleIdeas.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setIdea(ex)}
                    className="text-xs px-2 py-1 rounded-full border hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:border-sky-400 transition"
                    style={borderStyle}
                  >
                    {ex.slice(0, 25)}…
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="card p-4 space-y-3">
            <div>
              <label className="text-sm font-semibold mb-1.5 block">📱 المنصة</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={selectClass} style={borderStyle}>
                {platforms.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 block">🎨 النبرة</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className={selectClass} style={borderStyle}>
                {tones.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 block">🔢 عدد المنشورات</label>
              <div className="flex gap-2">
                {counts.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCount(c as 3 | 5 | 7)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition ${count === c ? "bg-sky-500 border-sky-500 text-white" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    style={count !== c ? borderStyle : {}}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
            {loading ? "جاري الإنشاء..." : "ولّد المنشورات"}
          </button>
          <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
            أو اضغط <kbd className="px-1 py-0.5 rounded border text-xs font-mono" style={borderStyle}>Ctrl+Enter</kbd>
          </p>
        </div>

        {/* Results col */}
        <div className="md:col-span-3 space-y-4">
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="card p-4 h-40 animate-pulse" style={{ background: "var(--border)" }} />
              ))}
            </div>
          )}

          {!loading && variations.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{variations.length} منشورات جاهزة</p>
                <button
                  onClick={copyAll}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  style={borderStyle}
                >
                  <Copy size={13} /> نسخ الكل
                </button>
              </div>
              {variations.map((v, i) => (
                <VariationCard
                  key={i}
                  index={i}
                  text={v}
                  platform={platform}
                  tone={tone}
                  topic={idea}
                  onChange={(text) => updateVariation(i, text)}
                />
              ))}
            </>
          )}

          {!loading && variations.length === 0 && (
            <div className="card p-12 text-center" style={{ color: "var(--muted)" }}>
              <Wand2 size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-sm">أدخل فكرتك واضغط &quot;ولّد المنشورات&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
