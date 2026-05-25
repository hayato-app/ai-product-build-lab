import fs from "fs";
import path from "path";
import type { ArticleMeta } from "./article-schema";
import { existingArticlesDir } from "./config";
import { listMarkdownFiles } from "./utils";

type Frontmatter = Record<string, string | string[]>;

export function readExistingArticles(): ArticleMeta[] {
  return listMarkdownFiles(existingArticlesDir).map((filePath) => {
    const slug = path.basename(filePath, ".md");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const frontmatter = parseFrontmatter(fileContents);

    return {
      slug,
      title: readString(frontmatter.title),
      description: readString(frontmatter.description),
      publishedAt: readString(frontmatter.publishedAt),
      updatedAt: readString(frontmatter.updatedAt),
      category: readString(frontmatter.category),
      tags: readStringArray(frontmatter.tags),
    };
  });
}

export function readExistingDraftSlugs(outputDir: string): Set<string> {
  const articleSlugs = readExistingArticles().map((article) => article.slug);
  const draftSlugs = listMarkdownFiles(outputDir).map((filePath) =>
    path.basename(filePath, ".md"),
  );

  return new Set([...articleSlugs, ...draftSlugs]);
}

export function readExistingDrafts(outputDir: string): ArticleMeta[] {
  return listMarkdownFiles(outputDir)
    .filter((filePath) => !path.basename(filePath).toLowerCase().startsWith("readme"))
    .map((filePath) => {
      const slug = path.basename(filePath, ".md");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const frontmatter = parseFrontmatter(fileContents);

      return {
        slug,
        title: readString(frontmatter.title),
        description: readString(frontmatter.description),
        publishedAt: readString(frontmatter.publishedAt),
        updatedAt: readString(frontmatter.updatedAt),
        category: readString(frontmatter.category),
        tags: readStringArray(frontmatter.tags),
      };
    });
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

function readString(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function readStringArray(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : [];
}
