import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const defaultOutDir = path.join(rootDir, "docs/article-briefs");

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.source) {
    throw new Error("Missing required option: --source <candidate-file>");
  }

  if (!args.candidate) {
    throw new Error("Missing required option: --candidate <number[,number]>");
  }

  const sourcePath = path.resolve(args.source);
  const outDir = path.resolve(args.outDir ?? defaultOutDir);
  const requestedNumbers = parseCandidateNumbers(args.candidate);

  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const candidates = parseCandidates(sourceText);
  const selectedCandidates = requestedNumbers.map((number) => {
    const candidate = candidates.find((item) => item.number === number);
    if (!candidate) {
      throw new Error(`Candidate ${number} was not found in ${relative(sourcePath)}.`);
    }
    return candidate;
  });

  fs.mkdirSync(outDir, { recursive: true });

  const writtenFiles = [];

  selectedCandidates.forEach((candidate) => {
    const proposedSlug = resolveSlug(candidate, args.slug, selectedCandidates.length);
    const outputPath = path.join(outDir, `${proposedSlug}.md`);

    if (fs.existsSync(outputPath) && !args.force) {
      throw new Error(`Output file already exists: ${relative(outputPath)}. Use --force to overwrite.`);
    }

    const markdown = buildBriefMarkdown({
      candidate,
      proposedSlug,
      sourcePath,
    });

    fs.writeFileSync(outputPath, markdown, "utf8");
    writtenFiles.push(outputPath);
  });

  writtenFiles.forEach((filePath) => {
    console.log(`Wrote article brief: ${relative(filePath)}`);
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Article brief generator failed: ${message}`);
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

function parseCandidateNumbers(value) {
  const numbers = value
    .split(",")
    .map((item) => Number.parseInt(item.trim(), 10))
    .filter((number) => Number.isInteger(number) && number > 0);

  if (numbers.length === 0) {
    throw new Error("--candidate must contain at least one positive number.");
  }

  return [...new Set(numbers)];
}

function parseCandidates(markdown) {
  const candidateRegex = /^## Candidate (\d+)\s*$/gm;
  const matches = [...markdown.matchAll(candidateRegex)];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const block = markdown.slice(start, end).trim();
    const fields = parseCandidateFields(block);

    return {
      number: Number.parseInt(match[1], 10),
      block,
      fields,
    };
  });
}

function parseCandidateFields(block) {
  const fields = {};
  const fieldRegex = /^- ([^:\n]+):\s*(.*)$/gm;

  for (const match of block.matchAll(fieldRegex)) {
    fields[normalizeFieldName(match[1])] = match[2].trim();
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

function resolveSlug(candidate, overrideSlug, selectedCount) {
  if (overrideSlug) {
    if (selectedCount > 1) {
      throw new Error("--slug can only be used when selecting one candidate.");
    }
    return sanitizeSlug(overrideSlug);
  }

  const explicitSlug = candidate.fields.slug;
  if (explicitSlug) {
    return sanitizeSlug(explicitSlug);
  }

  const title = candidate.fields.title ?? `candidate-${candidate.number}`;
  return sanitizeSlug(slugFromTitle(title, candidate.number));
}

function slugFromTitle(title, number) {
  const lower = title.toLowerCase();
  const tokens = [];

  if (lower.includes("ai")) tokens.push("ai");
  if (title.includes("アプリ")) tokens.push("app");
  if (title.includes("開発")) tokens.push("development");
  if (title.includes("初心者")) tokens.push("beginner");
  if (title.includes("環境変数")) tokens.push("environment-variables");
  if (title.includes("API Route")) tokens.push("api-route");
  if (title.includes("Route Handler")) tokens.push("route-handler");
  if (title.includes("タイムアウト")) tokens.push("timeout");
  if (title.includes("JSON")) tokens.push("json-output");
  if (title.includes("コスト")) tokens.push("cost");
  if (title.includes("RAG")) tokens.push("rag");
  if (title.includes("検索")) tokens.push("search");
  if (title.includes("Issue")) tokens.push("github-issue");
  if (title.includes("エージェント")) tokens.push("agent");
  if (title.includes("ニュース")) tokens.push("news");
  if (title.includes("用語")) tokens.push("terms");
  if (title.includes("原因")) tokens.push("causes");
  if (title.includes("対策")) tokens.push("solutions");
  if (title.includes("方法")) tokens.push("guide");

  if (tokens.length > 0) {
    return [...new Set(tokens)].join("-");
  }

  const ascii = title
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return ascii || `article-candidate-${number}`;
}

function sanitizeSlug(value) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    throw new Error(`Invalid slug: ${value}`);
  }

  return slug;
}

function buildBriefMarkdown({ candidate, proposedSlug, sourcePath }) {
  const field = (name, fallback = "TBD") => candidate.fields[name] || fallback;

  const lines = [
    `# Article Brief: ${field("title")}`,
    "",
    "This brief was generated from an approved article candidate.",
    "It is not an article draft and should not be published directly.",
    "",
    "## Source",
    "",
    `- Source candidate file: ${relative(sourcePath)}`,
    `- Candidate number: ${candidate.number}`,
    "",
    "## Candidate Summary",
    "",
    `- Title: ${field("title")}`,
    `- Proposed slug: ${proposedSlug}`,
    `- Pillar: ${field("pillar")}`,
    `- Category: ${field("category")}`,
    `- Target reader: ${field("target_reader")}`,
    `- Search intent: ${field("search_intent")}`,
    `- Reader problem: ${field("reader_problem")}`,
    `- Proposed angle: ${field("proposed_angle")}`,
    `- Existing overlap: ${field("existing_overlap")}`,
    `- Difference from existing content: ${field("difference_from_existing_content")}`,
    `- Internal link candidates: ${field("internal_link_candidates")}`,
    `- Thumbnail idea: ${field("thumbnail_idea")}`,
    `- Fact check: ${field("fact_check", "codex_decides")}`,
    `- Priority: ${field("priority", "normal")}`,
    `- Draft recommendation: ${field("draft_recommendation")}`,
    "",
    "## Draft Creation Notes",
    "",
    "- Create the article as a draft under `docs/article-drafts` only after explicit user approval.",
    "- Keep the proposed slug stable unless the user approves a better slug.",
    "- Add `description` to the draft frontmatter.",
    "- Add `thumbnail` to the draft frontmatter by default.",
    "- Store the thumbnail under `apps/web/public/images/drafts`.",
    "- Insert the same thumbnail near the beginning of the draft body with useful alt text.",
    "- Include tables, diagrams, checklists, or command examples when useful.",
    "- Keep existing published articles, drafts, routes, and Markdown structure intact.",
    "- Do not publish the draft automatically.",
    "",
    "## Required Reading Before Draft Creation",
    "",
    "- `AGENTS.md`",
    "- `docs/project-brief.md`",
    "- `docs/editorial/article-operation-rules.md`",
    "- `docs/editorial/article-quality-checklist.md`",
    "- `docs/editorial/category-policy.md`",
    "- `docs/editorial/internal-link-policy.md`",
    "- `docs/editorial/codex-article-instructions.md`",
    "- `docs/operations/article-candidate-flow.md`",
    "- `docs/operations/ai-article-pr-workflow.md`",
    "",
    "## Approval Boundary",
    "",
    "This brief is approved planning material only. Before creating or editing a",
    "draft article, Codex must present a Japanese implementation plan and wait for",
    "explicit user approval.",
    "",
    "## Original Candidate Block",
    "",
    "```md",
    candidate.block,
    "```",
    "",
  ];

  return `${lines.join("\n")}`;
}

function printHelp() {
  console.log(`Usage:
node scripts/create-article-brief-from-candidate.mjs --source <file> --candidate <number[,number]>

Options:
  --source <file>       Candidate list Markdown file.
  --candidate <list>    Candidate number or comma-separated numbers.
  --out-dir <dir>       Output directory. Defaults to docs/article-briefs.
  --slug <slug>         Override output slug when selecting one candidate.
  --force               Overwrite existing brief files.
  --help                Show this help.
`);
}

function relative(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}
