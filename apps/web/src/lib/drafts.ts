import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import readingTime from "reading-time";

const fallbackDraftDirectory = path.join(
  /* turbopackIgnore: true */ process.cwd(),
  "../../docs/article-drafts",
);

const draftDirectory = process.env.DRAFT_REVIEW_DIR ?? fallbackDraftDirectory;
const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export type DraftMeta = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  pillar: string;
  status: string;
  reviewStatus: string;
  reviewResult: string;
  reviewedAt: string;
  reviewNotes: string;
  factCheckStatus: string;
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

function getArticlePath(slug: string) {
  return path.join(articlesDirectory, `${slug}.md`);
}

function assertSafeDraftSlug(slug: string) {
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
    throw new Error(`Invalid draft slug: ${slug}`);
  }
}

function toDraftMeta(slug: string, fileContents: string): DraftMeta {
  const { data, content } = matter(fileContents);
  const reviewStatus = data.review_status ?? "needs_review";
  const factCheckStatus =
    data.fact_check_status ??
    (Boolean(data.needs_fact_check) ? "not_started" : "completed");

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    thumbnail: data.thumbnail ?? "",
    pillar: data.pillar ?? "",
    status: data.status ?? "draft",
    reviewStatus,
    reviewResult: data.review_result ?? reviewResultFromStatus(reviewStatus),
    reviewedAt: data.reviewed_at ?? "",
    reviewNotes: data.review_notes ?? "",
    factCheckStatus,
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
  const processedContent = await remark().use(gfm).use(html).process(content);
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

export function updateDraftFactCheck(
  slug: string,
  status: "not_started" | "required" | "completed",
): void {
  assertSafeDraftSlug(slug);

  const fullPath = getDraftPath(slug);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Draft was not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(fileContents);
  const data = {
    ...parsed.data,
    fact_check_status: status,
    needs_fact_check: status !== "completed",
  };

  fs.writeFileSync(fullPath, matter.stringify(parsed.content, data), "utf8");
}

export function publishApprovedDraft(slug: string): void {
  assertSafeDraftSlug(slug);

  const draftPath = getDraftPath(slug);
  const articlePath = getArticlePath(slug);

  if (!fs.existsSync(draftPath)) {
    throw new Error(`Draft was not found: ${slug}`);
  }

  if (fs.existsSync(articlePath)) {
    throw new Error(`Published article already exists: ${slug}`);
  }

  const fileContents = fs.readFileSync(draftPath, "utf8");
  const parsed = matter(fileContents);
  const errors = validatePublishableDraft(parsed.data, parsed.content);

  if (errors.length > 0) {
    throw new Error(errors.join(" / "));
  }

  const today = new Date().toISOString().slice(0, 10);
  const data = {
    ...parsed.data,
    status: "published",
    estimated_publish_ready: true,
    publishedAt: parsed.data.publishedAt || today,
    updatedAt: today,
  };

  fs.mkdirSync(articlesDirectory, { recursive: true });
  fs.writeFileSync(articlePath, matter.stringify(parsed.content, data), "utf8");
  fs.unlinkSync(draftPath);
}

function validatePublishableDraft(
  data: matter.GrayMatterFile<string>["data"],
  content: string,
): string[] {
  const errors: string[] = [];

  if (data.review_status !== "approved") {
    errors.push("レビュー結果がOKではありません。");
  }

  if (data.review_result !== "ok") {
    errors.push("レビュー判定がOKではありません。");
  }

  if (data.fact_check_status !== "completed" || Boolean(data.needs_fact_check)) {
    errors.push("ファクトチェックが完了していません。");
  }

  if (!data.title) {
    errors.push("title が未設定です。記事タイトルをfrontmatterに追加してください。");
  }

  if (!data.description) {
    errors.push(
      "description が未設定です。記事の概要文をfrontmatterに追加してください。",
    );
  }

  if (!data.category) {
    errors.push("category が未設定です。記事カテゴリをfrontmatterに追加してください。");
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push("tags が未設定です。1つ以上のタグをfrontmatterに追加してください。");
  }

  if (!content.trim()) {
    errors.push("本文が空です。記事本文を追加してください。");
  }

  return errors;
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
