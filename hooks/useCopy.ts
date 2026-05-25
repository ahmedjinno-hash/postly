"use client";
import { toast } from "sonner";

export function useCopy() {
  async function copy(text: string, label = "تم النسخ!") {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
    } catch {
      toast.error("فشل النسخ — جرّب يدوياً");
    }
  }
  return { copy };
}
