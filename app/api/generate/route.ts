import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { generateSchema } from "@/lib/schemas";
import { buildGenerateMessages } from "@/lib/prompts";
import { groqGenerate, parseVariations } from "@/lib/groq";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  try {
    const { system, user } = buildGenerateMessages(parsed.data);
    const raw = await groqGenerate(system, user);
    const variations = parseVariations(raw, parsed.data.count);
    return NextResponse.json({ variations });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
