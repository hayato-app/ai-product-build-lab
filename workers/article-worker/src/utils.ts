import fs from "fs";
import path from "path";

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ensureDirectory(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.join(dir, fileName));
}

export function slugify(input: string): string {
  const dictionary: Record<string, string> = {
    AI: "ai",
    API: "api",
    RAG: "rag",
    OpenAI: "openai",
    Next: "next",
    Nextjs: "nextjs",
  };

  const normalized = input
    .replace(/Next\.js/g, "Nextjs")
    .replace(/OpenAI/g, "OpenAI")
    .replace(/API/g, "API")
    .replace(/RAG/g, "RAG");

  const ascii = normalized
    .split(/[\s、。・/／:：|｜-]+/)
    .map((part) => dictionary[part] ?? romanizeJapaneseKeyword(part))
    .join("-");

  return ascii
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function uniqueSlug(baseSlug: string, existingSlugs: Set<string>): string {
  let slug = baseSlug || "generated-article";
  let suffix = 2;

  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  existingSlugs.add(slug);
  return slug;
}

export function escapeYaml(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function romanizeJapaneseKeyword(input: string): string {
  const replacements: Array<[RegExp, string]> = [
    [/AIアプリ/g, "ai-app-"],
    [/AIエージェント/g, "ai-agent-"],
    [/AI開発/g, "ai-development-"],
    [/OpenAI/g, "openai-"],
    [/Next\.js/g, "nextjs-"],
    [/初心者/g, "beginner"],
    [/開発/g, "development"],
    [/始める/g, "start"],
    [/前/g, "before"],
    [/決める/g, "decide"],
    [/手法/g, "method"],
    [/ツール/g, "tools"],
    [/紹介/g, "guide"],
    [/記事/g, "article"],
    [/生成/g, "generation"],
    [/下書き/g, "draft"],
    [/要件定義/g, "requirements"],
    [/チェックリスト/g, "checklist"],
    [/エラー/g, "error"],
    [/解決/g, "solution"],
    [/事例/g, "case"],
    [/コスト/g, "cost"],
    [/見積/g, "estimate"],
    [/アプリ/g, "app"],
    [/プロダクト/g, "product"],
    [/設計/g, "design"],
    [/運用/g, "operation"],
    [/ニュース/g, "news"],
    [/解説/g, "explain"],
    [/標準化/g, "standardization"],
    [/個人/g, "solo"],
    [/小規模/g, "small"],
    [/応答/g, "response"],
    [/表示/g, "display"],
    [/基本/g, "basic"],
  ];

  return replacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    input,
  );
}
