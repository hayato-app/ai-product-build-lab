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
  reviewResult: string;
  reviewedAt: string;
  reviewNotes: string;
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

function assertSafeDraftSlug(slug: string) {
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
    throw new Error(`Invalid draft slug: ${slug}`);
  }
}

function toDraftMeta(slug: string, fileContents: string): DraftMeta {
  const { data, content } = matter(fileContents);
  const reviewStatus = data.review_status ?? "needs_review";

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    pillar: data.pillar ?? "",
    status: data.status ?? "draft",
    reviewStatus,
    reviewResult: data.review_result ?? reviewResultFromStatus(reviewStatus),
    reviewedAt: data.reviewed_at ?? "",
    reviewNotes: data.review_notes ?? "",
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

export type DraftReviewInput = {
  slug: string;
  reviewStatus: "needs_review" | "approved" | "rejected" | "changes_requested";
  reviewResult: "pending" | "ok" | "ng";
  reviewNotes: string;
};

export function updateDraftReview(input: DraftReviewInput): void {
  assertSafeDraftSlug(input.slug);

  const fullPath = getDraftPath(input.slug);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Draft was not found: ${input.slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(fileContents);
  const data = {
    ...parsed.data,
    review_status: input.reviewStatus,
    review_result: input.reviewResult,
    reviewed_at:
      input.reviewStatus === "needs_review" && input.reviewResult === "pending"
        ? ""
        : new Date().toISOString(),
    review_notes: input.reviewNotes.trim(),
  };

  fs.writeFileSync(fullPath, matter.stringify(parsed.content, data), "utf8");
}

function reviewResultFromStatus(status: unknown): string {
  if (status === "approved") {
    return "ok";
  }

  if (status === "rejected") {
    return "ng";
  }

  return "pending";
}
