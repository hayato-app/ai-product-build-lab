import {
  commandNames,
  type SupportedCommandName,
} from "./commands.js";

export type IssuePayload = {
  title: string;
  body: string;
  labels: string[];
};

export type IssueCommandInput = {
  summary: string;
  purpose: string;
  scope?: string;
  allowedChanges?: string;
  forbiddenChanges?: string;
  verification?: string;
};

export type ArticleReviewCommandInput = {
  slug: string;
  source: string;
  goal: string;
  additions?: string;
  internalLinks?: string;
  factCheck: string;
  forbiddenChanges?: string;
};

export type ArticleNewCommandInput = {
  topic: string;
  category?: string;
  targetReader: string;
  searchIntent?: string;
  difference?: string;
  internalLinks?: string;
  factCheck: string;
};

const emptyValue = "_Not provided_";

function field(value: string | undefined): string {
  return value?.trim() ? value.trim() : emptyValue;
}

function commonCodexInstructions(commandName: SupportedCommandName): string {
  return [
    "## Codex instructions",
    "",
    `- Source command: \`/${commandName}\``,
    "- Read `AGENTS.md` before planning.",
    "- Follow `docs/operations/codex-issue-workflow.md`.",
    "- Present an implementation plan in Japanese before file creation, file editing, or code implementation.",
    "- Wait for explicit user approval such as \"OK\" before editing files.",
    "- Keep the work inside this Issue scope.",
    "- Submit changes as a pull request when files change.",
    "- Do not run VPS commands unless the user explicitly approves that deployment step.",
  ].join("\n");
}

function articleCodexInstructions(): string {
  return [
    "- Read `docs/project-brief.md`.",
    "- Read all documents under `docs/editorial`.",
    "- Do not delete existing articles.",
    "- Do not change existing slugs or URLs unless explicitly approved.",
    "- Do not automatically publish drafts.",
  ].join("\n");
}

export function buildIssuePayload(input: IssueCommandInput): IssuePayload {
  return {
    title: `[Codex Task] ${input.summary}`,
    labels: ["codex", "task"],
    body: [
      "# Codex task request",
      "",
      "## Request",
      "",
      `- Summary: ${field(input.summary)}`,
      `- Purpose: ${field(input.purpose)}`,
      `- Scope: ${field(input.scope)}`,
      `- Allowed changes: ${field(input.allowedChanges)}`,
      `- Forbidden changes: ${field(input.forbiddenChanges)}`,
      `- Verification: ${field(input.verification)}`,
      "",
      commonCodexInstructions(commandNames.issue),
    ].join("\n"),
  };
}

export function buildArticleReviewPayload(input: ArticleReviewCommandInput): IssuePayload {
  return {
    title: `[Article Review] ${input.slug}`,
    labels: ["codex", "article", "review"],
    body: [
      "# Article review / improvement request",
      "",
      "## Request",
      "",
      `- Slug: ${field(input.slug)}`,
      `- Source: ${field(input.source)}`,
      `- Goal: ${field(input.goal)}`,
      `- Additions: ${field(input.additions)}`,
      `- Internal links: ${field(input.internalLinks)}`,
      `- Fact check: ${field(input.factCheck)}`,
      `- Forbidden changes: ${field(input.forbiddenChanges)}`,
      "",
      commonCodexInstructions(commandNames.articleReview),
      articleCodexInstructions(),
    ].join("\n"),
  };
}

export function buildArticleNewPayload(input: ArticleNewCommandInput): IssuePayload {
  return {
    title: `[Article New] ${input.topic}`,
    labels: ["codex", "article", "draft"],
    body: [
      "# New draft article request",
      "",
      "## Request",
      "",
      `- Topic: ${field(input.topic)}`,
      `- Category: ${field(input.category)}`,
      `- Target reader: ${field(input.targetReader)}`,
      `- Search intent: ${field(input.searchIntent)}`,
      `- Difference from existing articles: ${field(input.difference)}`,
      `- Internal links: ${field(input.internalLinks)}`,
      `- Fact check: ${field(input.factCheck)}`,
      "",
      commonCodexInstructions(commandNames.articleNew),
      articleCodexInstructions(),
      "- Check existing published articles and drafts for duplication.",
      "- Create new content only under `docs/article-drafts` unless another path is explicitly approved.",
    ].join("\n"),
  };
}
