import type { ArticleOutline } from "./article-schema";

type Frontmatter = Record<string, string | string[]>;

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

export function validateArticleDraft(
  markdown: string,
  outline: ArticleOutline,
  existingSlugs: Set<string>,
): ValidationResult {
  const errors: string[] = [];
  const frontmatter = parseFrontmatter(markdown);
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();

  if (!markdown.match(/^---\r?\n[\s\S]*?\r?\n---/)) {
    errors.push("frontmatter block is missing");
  }

  requireString(frontmatter, "title", errors);
  requireString(frontmatter, "description", errors);
  requireString(frontmatter, "publishedAt", errors);
  requireString(frontmatter, "updatedAt", errors);
  requireString(frontmatter, "category", errors);

  const tags = frontmatter.tags;
  if (!Array.isArray(tags) || tags.length === 0) {
    errors.push("tags must include at least one item");
  }

  if (readString(frontmatter.title) !== outline.title) {
    errors.push("title must match the selected topic");
  }

  if (readString(frontmatter.category) !== outline.category) {
    errors.push("category must match the selected topic");
  }

  if (existingSlugs.has(outline.slug)) {
    errors.push(`slug is already in use: ${outline.slug}`);
  }

  if (body.length < 2500) {
    errors.push("body is too short for an AI-generated editorial draft");
  }

  if (!body.includes("##")) {
    errors.push("body must include Markdown headings");
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function parseFrontmatter(markdown: string): Frontmatter {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return {};
  }

  const result: Frontmatter = {};
  const lines = match[1].split(/\r?\n/);
  let currentArrayKey: string | null = null;

  for (const line of lines) {
    const arrayItem = line.match(/^\s*-\s+"?(.*?)"?\s*$/);
    if (arrayItem && currentArrayKey) {
      const current = result[currentArrayKey];
      result[currentArrayKey] = [
        ...(Array.isArray(current) ? current : []),
        arrayItem[1],
      ];
      continue;
    }

    const keyValue = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyValue) {
      continue;
    }

    const [, key, rawValue] = keyValue;
    currentArrayKey = null;

    if (rawValue.trim() === "") {
      result[key] = [];
      currentArrayKey = key;
      continue;
    }

    result[key] = rawValue.trim().replace(/^"|"$/g, "");
  }

  return result;
}

function requireString(
  frontmatter: Frontmatter,
  key: string,
  errors: string[],
): void {
  if (!readString(frontmatter[key])) {
    errors.push(`${key} is required`);
  }
}

function readString(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}
