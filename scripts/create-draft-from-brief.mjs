import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicArticlesDir = path.join(rootDir, "apps/web/src/content/articles");
const draftArticlesDir = path.join(rootDir, "docs/article-drafts");

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.brief) {
    throw new Error("Missing required option: --brief <brief-file>");
  }

  const briefPath = path.resolve(args.brief);
  const briefText = fs.readFileSync(briefPath, "utf8");
  const fields = parseBriefFields(briefText);
  const slug = sanitizeSlug(args.slug ?? fields.proposed_slug ?? fields.slug ?? "");

  if (!slug) {
    throw new Error("Could not determine a slug. Add --slug <slug> or include Proposed slug in the brief.");
  }

  const publicArticlePath = path.join(publicArticlesDir, `${slug}.md`);
  const draftPath = path.join(draftArticlesDir, `${slug}.md`);
  const markdown = buildDraftScaffold({ fields, slug, briefPath });

  if (args.dryRun) {
    console.log(markdown);
    process.exit(0);
  }

  if (fs.existsSync(publicArticlePath)) {
    throw new Error(`Published article already exists: ${relative(publicArticlePath)}.`);
  }

  if (fs.existsSync(draftPath) && !args.force) {
    throw new Error(`Draft already exists: ${relative(draftPath)}. Use --force to overwrite.`);
  }

  fs.mkdirSync(draftArticlesDir, { recursive: true });
  fs.writeFileSync(draftPath, markdown, "utf8");
  console.log(`Wrote draft scaffold: ${relative(draftPath)}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Draft scaffold generator failed: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (arg === "--force") {
      parsed.force = true;
      continue;
    }

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = toCamelCase(arg.slice(2));
    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for ${arg}`);
    }

    parsed[key] = value;
    index += 1;
  }

  return parsed;
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parseBriefFields(markdown) {
  const fields = {};
  const fieldRegex = /^- ([^:\n]+):\s*(.*)$/gm;

  for (const match of markdown.matchAll(fieldRegex)) {
    fields[normalizeFieldName(match[1])] = match[2].trim();
  }

  if (!fields.title) {
    const titleMatch = markdown.match(/^# Article Brief:\s*(.+)$/m);
    if (titleMatch) {
      fields.title = titleMatch[1].trim();
    }
  }

  return fields;
}

function normalizeFieldName(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function sanitizeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildDraftScaffold({ fields, slug, briefPath }) {
  const title = requiredField(fields, "title");
  const category = requiredField(fields, "category");
  const pillar = fields.pillar || "未設定";
  const targetReader = fields.target_reader || "TODO: 想定読者を具体化する";
  const searchIntent = fields.search_intent || "TODO: 検索意図を具体化する";
  const readerProblem = fields.reader_problem || "TODO: 読者の課題を具体化する";
  const proposedAngle = fields.proposed_angle || "TODO: 記事の切り口を具体化する";
  const internalLinks = splitList(fields.internal_link_candidates);
  const thumbnailIdea = fields.thumbnail_idea || "TODO: サムネイル案を具体化する";
  const sourceIssue = fields.github_issue || "";
  const sourceCommand = fields.issue_source_command || "";
  const factCheckStatus = resolveFactCheckStatus(fields.fact_check);
  const priority = fields.priority || "normal";
  const tags = inferTags({ title, category, pillar });
  const description = buildDescription({ title, targetReader, readerProblem });
  const date = getJstDate();

  const frontmatter = [
    "---",
    `title: ${quoteYaml(title)}`,
    `description: ${quoteYaml(description)}`,
    `publishedAt: ${quoteYaml(date)}`,
    `updatedAt: ${quoteYaml(date)}`,
    `pillar: ${quoteYaml(pillar)}`,
    'status: "draft"',
    'review_status: "needs_review"',
    'review_result: "pending"',
    'reviewed_at: ""',
    `review_notes: ${quoteYaml(buildReviewNotes({ briefPath, sourceIssue }))}`,
    `priority: ${quoteYaml(priority)}`,
    "estimated_publish_ready: false",
    `needs_fact_check: ${factCheckStatus === "not_started" ? "true" : "false"}`,
    `fact_check_status: ${quoteYaml(factCheckStatus)}`,
    `category: ${quoteYaml(category)}`,
    "tags:",
    ...tags.map((tag) => `  - ${quoteYaml(tag)}`),
    "---",
  ].join("\n");

  const internalLinkLines =
    internalLinks.length > 0
      ? internalLinks.map((link) => `- [ ] ${link}`)
      : ["- [ ] TODO: 関連する公開記事またはツールページを選ぶ"];

  const body = [
    "",
    "## 想定読者",
    "",
    targetReader,
    "",
    "## 読者の課題",
    "",
    readerProblem,
    "",
    "## 検索意図",
    "",
    searchIntent,
    "",
    "## 記事の方向性",
    "",
    proposedAngle,
    "",
    "## 見出し案",
    "",
    "1. 結論",
    "2. この記事の対象読者",
    "3. 基本用語または前提知識",
    "4. 実務で使う場面",
    "5. よくある失敗と避け方",
    "6. 実装または確認のチェックリスト",
    "7. 関連記事と次に読む内容",
    "",
    "## 図・表・チェックリスト案",
    "",
    `- [ ] サムネイル案: ${thumbnailIdea}`,
    "- [ ] サムネイル画像を `apps/web/public/images/drafts` に保存する",
    "- [ ] frontmatter に `thumbnail: \"/images/drafts/<file-name>.png\"` を追加する",
    "- [ ] 本文冒頭付近に同じサムネイル画像をalt付きで挿入する",
    "- [ ] 用語、設定項目、確認ポイントを表で整理する",
    "- [ ] 初心者が迷いやすい判断をチェックリストにする",
    "- [ ] 必要に応じて mermaid 図で全体像を示す",
    "",
    "## 内部リンク候補",
    "",
    ...internalLinkLines,
    "",
    "## ファクトチェックTODO",
    "",
    `- 現在の判定: ${factCheckStatusLabel(factCheckStatus)}`,
    "- [ ] 公式情報または既存記事と矛盾しないか確認する",
    "- [ ] APIキー、環境変数、セキュリティに関する表現を確認する",
    "- [ ] 古くなりやすい情報がある場合は日付または確認元を残す",
    "",
  ].join("\n");

  return `${frontmatter}\n${body}`;
}

function buildReviewNotes({ briefPath, sourceIssue }) {
  const issueText = sourceIssue ? `GitHub Issue ${sourceIssue} / ` : "";
  return `${issueText}Brief ${relative(briefPath)} から生成したreview用draft骨子です。本文、サムネイル、内部リンク、ファクトチェックを管理画面で確認してください。`;
}

function requiredField(fields, name) {
  const value = fields[name];
  if (!value || value.trim() === "") {
    throw new Error(`Brief is missing required field: ${name.replaceAll("_", " ")}.`);
  }
  return value.trim();
}

function splitList(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function resolveFactCheckStatus(value = "") {
  if (value === "required" || value === "codex_decides") {
    return "not_started";
  }
  return "completed";
}

function factCheckStatusLabel(value) {
  return {
    completed: "完了",
    not_started: "未実施",
  }[value] ?? value;
}

function inferTags({ title, category, pillar }) {
  const tags = new Set();

  if (pillar.includes("初心者")) tags.add("AI開発初心者");
  if (category) tags.add(category);
  if (title.includes("環境変数")) tags.add("環境変数");
  if (title.includes("API")) tags.add("AI API");
  if (title.includes("アプリ")) tags.add("AIアプリ開発");
  if (tags.size < 3) tags.add("AIアプリ開発");
  if (tags.size < 4 && pillar.includes("用語")) tags.add("用語解説");

  return [...tags].slice(0, 5);
}

function buildDescription({ title, targetReader, readerProblem }) {
  const normalizedTitle = title.replace(/とは$/, "");
  const base = `${targetReader}向けに、${normalizedTitle}の基本と、${readerProblem}を整理する下書きです。`;
  return base.length > 120 ? `${base.slice(0, 117)}...` : base;
}

function quoteYaml(value) {
  return `"${String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function getJstDate() {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function printHelp() {
  console.log(`Usage:
node scripts/create-draft-from-brief.mjs --brief <brief-file>

Options:
  --brief <file>   Article brief Markdown file.
  --slug <slug>    Override the proposed slug from the brief.
  --force          Overwrite an existing draft scaffold.
  --dry-run        Print the generated draft without writing a file.
  --help           Show this help.
`);
}

function relative(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}
