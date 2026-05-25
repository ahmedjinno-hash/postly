import { z } from "zod";

export const generateSchema = z.object({
  idea: z.string().min(10, "الفكرة قصيرة جداً").max(1000, "الفكرة طويلة جداً"),
  platform: z.enum(["instagram", "linkedin", "x", "facebook"]),
  tone: z.enum(["professional", "casual", "persuasive", "funny", "inspirational"]),
  count: z.union([z.literal(3), z.literal(5), z.literal(7)]),
});

export const rewriteSchema = z.object({
  text: z.string().min(1).max(2000),
  instruction: z.enum(["shorten", "expand", "engaging", "professional", "regenerate"]),
  platform: z.enum(["instagram", "linkedin", "x", "facebook"]),
  tone: z.enum(["professional", "casual", "persuasive", "funny", "inspirational"]),
  topic: z.string().max(1000),
});

export type GenerateInput = z.infer<typeof generateSchema>;
export type RewriteInput = z.infer<typeof rewriteSchema>;
