import type { GenerateInput, RewriteInput } from "./schemas";

const platformGuide: Record<string, string> = {
  instagram: "Instagram: استخدم إيموجي، هاشتاقات (#)، نبرة بصرية وجذابة، 150-300 كلمة",
  linkedin: "LinkedIn: محتوى مهني وثقيل، إضافة قيمة، بدون هاشتاقات زائدة، 200-400 كلمة",
  x: "X (تويتر): مختصر وجريء، 280 حرف كحد أقصى، ممكن thread",
  facebook: "Facebook: ودّي واجتماعي، قصة أو سؤال، 100-250 كلمة",
};

const toneGuide: Record<string, string> = {
  professional: "رسمي ومهني",
  casual: "عفوي وودّي",
  persuasive: "إقناعي ومحفّز للاتخاذ قرار",
  funny: "مرح وخفيف الظل",
  inspirational: "ملهم وحماسي",
};

export function buildGenerateMessages(input: GenerateInput) {
  const system = `أنت خبير كتابة محتوى سوشيال ميديا. مهمتك إنتاج منشورات متنوعة وجذابة.
قواعد صارمة:
- أرجع JSON فقط، بدون أي نص خارج الـ JSON
- الشكل: {"variations": ["نص1", "نص2", ...]}
- عدد المنشورات بالضبط: ${input.count}
- كل منشور يجب أن يكون مختلفاً تماماً في الأسلوب والزاوية`;

  const user = `اكتب ${input.count} منشورات لـ:
المنصة: ${platformGuide[input.platform]}
النبرة: ${toneGuide[input.tone]}
الفكرة: ${input.idea}

أرجع JSON فقط.`;

  return { system, user };
}

export function buildRewriteMessages(input: RewriteInput) {
  const instructions: Record<string, string> = {
    shorten: "اختصر النص مع الحفاظ على المعنى الأساسي",
    expand: "وسّع النص بتفاصيل أكثر وقيمة أعمق",
    engaging: "اجعل النص أكثر جذباً وتفاعلاً",
    professional: "اجعل النص أكثر احترافية ومهنية",
    regenerate: "أعد كتابة النص بأسلوب مختلف تماماً",
  };

  const system = `أنت خبير تحرير محتوى سوشيال ميديا. أرجع النص المحسّن فقط بدون أي شرح أو مقدمة.`;

  const user = `المهمة: ${instructions[input.instruction]}
المنصة: ${platformGuide[input.platform]}
النبرة: ${toneGuide[input.tone]}
الموضوع الأصلي: ${input.topic}

النص:
${input.text}`;

  return { system, user };
}
