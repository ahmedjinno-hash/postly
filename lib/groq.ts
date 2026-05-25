import Groq from "groq-sdk";

const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = Math.min(
  parseInt(process.env.GROQ_MAX_OUTPUT_TOKENS || "1500"),
  2048
);

let client: Groq | null = null;

function getClient() {
  if (!client) {
    if (!process.env.GROQ_API_KEY) throw new Error("GROQ_API_KEY غير موجود في .env.local");
    client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return client;
}

export async function groqGenerate(system: string, user: string): Promise<string> {
  const groq = getClient();
  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    });
    return completion.choices[0]?.message?.content ?? "";
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    if (error?.status === 429) throw new Error("تجاوزت الحد المسموح — انتظر دقيقة وحاول مجدداً");
    if (error?.status === 413) throw new Error("النص طويل جداً، قلّل عدد المنشورات");
    throw new Error(error?.message ?? "خطأ في الاتصال بـ Groq");
  }
}

export async function groqRewrite(system: string, user: string): Promise<string> {
  const groq = getClient();
  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    return completion.choices[0]?.message?.content ?? "";
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    if (error?.status === 429) throw new Error("تجاوزت الحد المسموح — انتظر دقيقة");
    throw new Error(error?.message ?? "خطأ في Groq");
  }
}

export function parseVariations(raw: string, count: number): string[] {
  try {
    const json = JSON.parse(raw);
    const arr: string[] = json.variations ?? [];
    // Pad or trim to exact count
    while (arr.length < count) arr.push(arr[0] ?? "");
    return arr.slice(0, count);
  } catch {
    // fallback: split by double newline
    const parts = raw.split(/\n\n+/).filter(Boolean);
    while (parts.length < count) parts.push(parts[0] ?? "");
    return parts.slice(0, count);
  }
}
