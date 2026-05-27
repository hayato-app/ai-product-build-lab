import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const fallbackDraftDirectory = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "../../docs/article-drafts",
);

const draftDirectory = process.env.DRAFT_REVIEW_DIR ?? fallbackDraftDirectory;

export type DraftMeta = {
  slug: string;
  title: string;
  description: string;
  pillar: string;
  status: string;
  reviewStatus: string;
  priority: string;
  estimatedPublishReady: boolean;
  needsFactCheck: boolean;
  category: string;
  tags: string[];
  readingTime: string;
};

export type DraftArticle = DraftMeta & {
  contentHtml: string;
};

function getDraftPath(slug: string) {
  return path.join(draftDirectory, `${slug}.md`);
}

function toDraftMeta(slug: string, fileContents: string): DraftMeta {
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    pillar: data.pillar ?? "",
    status: data.status ?? "draft",
    reviewStatus: data.review_status ?? "needs_review",
    priority: data.priority ?? "normal",
    estimatedPublishReady: Boolean(data.estimated_publish_ready),
    needsFactCheck: Boolean(data.needs_fact_check),
    category: data.category ?? "",
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
  };
}

export function getAllDraftSlugs(): string[] {
  if (!fs.existsSync(draftDirectory)) {
    return [];
  }

  return fs
    .readdirSync(draftDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => !fileName.toLowerCase().startsWith("readme"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .sort();
}

export function getAllDrafts(): DraftMeta[] {
  return getAllDraftSlugs()
    .map((slug) => {
      const fileContents = fs.readFileSync(getDraftPath(slug), "utf8");
      return toDraftMeta(slug, fileContents);
    })
    .sort((a, b) => {
      const priorityRank: Record<string, number> = {
        high: 0,
        normal: 1,
        low: 2,
      };

      return (
        (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1) ||
        a.title.localeCompare(b.title, "ja")
      );
    });
}

export async function getDraftBySlug(slug: string): Promise<DraftArticle | null> {
  const fullPath = getDraftPath(slug);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent
    .toString()
    .replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      '<div class="mermaid">$1</div>',
    );

  return {
    ...toDraftMeta(slug, fileContents),
    contentHtml,
  };
}

export function isDraftReviewAllowed(token: string | undefined): boolean {
  const configuredToken = process.env.DRAFT_REVIEW_TOKEN;

  return Boolean(configuredToken && token && token === configuredToken);
}

export function isDraftReviewConfigured(): boolean {
  return Boolean(process.env.DRAFT_REVIEW_TOKEN);
}
