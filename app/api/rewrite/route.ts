import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { rewriteSchema } from "@/lib/schemas";
import { buildRewriteMessages } from "@/lib/prompts";
import { groqRewrite } from "@/lib/groq";

export async function POST(req: NextRequest) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const parsed = rewriteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  try {
    const { system, user } = buildRewriteMessages(parsed.data);
    const text = await groqRewrite(system, user);
    return NextResponse.json({ text: text.trim() });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
