"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, RefreshCw, ChevronDown, Loader2 } from "lucide-react";
import { useCopy } from "@/hooks/useCopy";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  text: string;
  platform: string;
  tone: string;
  topic: string;
  onChange: (text: string) => void;
}

const improveOptions = [
  { key: "shorten", label: "اختصر" },
  { key: "expand", label: "وسّع" },
  { key: "engaging", label: "أكثر جذباً" },
  { key: "professional", label: "أكثر احترافية" },
  { key: "regenerate", label: "أعد الكتابة" },
] as const;

export function VariationCard({ index, text, platform, tone, topic, onChange }: Props) {
  const { copy } = useCopy();
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function rewrite(instruction: string) {
    setMenuOpen(false);
    setLoading(true);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, instruction, platform, tone, topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "خطأ");
      onChange(data.text);
    } catch (err: unknown) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-300">
          منشور {index + 1}
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>{text.length} حرف</span>
      </div>

      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full text-sm p-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
        style={{ borderColor: "var(--border)" }}
      />

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => copy(text, "تم نسخ المنشور!")}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          style={{ borderColor: "var(--border)" }}
        >
          <Copy size={13} /> نسخ
        </button>

        {/* Improve dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            disabled={loading}
            className={cn(
              "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition",
              loading && "opacity-50 cursor-not-allowed"
            )}
            style={{ borderColor: "var(--border)" }}
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
            تحسين
            <ChevronDown size={12} className={cn("transition-transform", menuOpen && "rotate-180")} />
          </button>
          {menuOpen && (
            <div className="absolute top-full mt-1 left-0 z-20 card shadow-lg py-1 min-w-[140px]">
              {improveOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => rewrite(opt.key)}
                  className="w-full text-right text-sm px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
