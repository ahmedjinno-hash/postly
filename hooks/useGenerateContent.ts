"use client";
import { useState } from "react";
import { toast } from "sonner";
import type { GenerateInput } from "@/lib/schemas";

export function useGenerateContent() {
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function generate(input: GenerateInput) {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "حدث خطأ");
      setVariations(data.variations);
    } catch (err: unknown) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function updateVariation(index: number, text: string) {
    setVariations((prev) => prev.map((v, i) => (i === index ? text : v)));
  }

  return { variations, loading, generate, updateVariation, setVariations };
}
