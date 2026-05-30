import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const defaultOutputPath = path.join(rootDir, "docs/seo/content-improvement-opportunities.md");
const articlesDir = path.join(rootDir, "apps/web/src/content/articles");

const inputPath = process.argv[2];
const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : defaultOutputPath;

function usage() {
  console.error("Usage: node scripts/analyze-content-opportunities.mjs <analytics.csv> [output.md]");
}

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(field);
      field = "";
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    field += char;
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => normalizeHeader(header));
  return rows.slice(1).map((values) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index]?.trim() ?? "";
    });
    return record;
  });
}

function normalizeHeader(header) {
  return header.trim().replace(/^\uFEFF/, "").toLowerCase().replace(/\s+/g, "");
}

function numberValue(value) {
  if (typeof value !== "string") {
    return 0;
  }

  const cleaned = value.trim().replace(/,/g, "").replace(/%$/, "");
  if (!cleaned) {
    return 0;
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percentValue(value) {
  const parsed = numberValue(value);
  if (typeof value === "string" && value.trim().endsWith("%")) {
    return parsed / 100;
  }
  return parsed > 1 ? parsed / 100 : parsed;
}

function slugFromPage(page) {
  try {
    const url = page.startsWith("http") ? new URL(page) : new URL(page, "https://example.com");
    const pathname = url.pathname.replace(/\/$/, "");
    if (!pathname.startsWith("/articles/")) {
      return "";
    }
    return decodeURIComponent(pathname.slice("/articles/".length));
  } catch {
    return "";
  }
}

function readArticle(slug) {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const titleMatch = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const categoryMatch = raw.match(/^category:\s*["']?(.+?)["']?\s*$/m);
  const body = raw.replace(/^---[\s\S]*?---\r?\n?/, "");
  const internalLinks = [...body.matchAll(/\]\((\/(?:articles|tools|categories|tags)\/[^)\s#?]+)/g)].map(
    (match) => match[1],
  );

  return {
    filePath,
    title: titleMatch?.[1] ?? slug,
    category: categoryMatch?.[1] ?? "",
    internalLinkCount: new Set(internalLinks).size,
  };
}

function normalizeRecord(record) {
  const page = record.page || record.url || record.path || "";
  const slug = slugFromPage(page);

  return {
    page,
    slug,
    clicks: numberValue(record.clicks),
    impressions: numberValue(record.impressions),
    ctr: percentValue(record.ctr),
    position: numberValue(record.position),
    engagedSessions: numberValue(record.engagedsessions),
    averageEngagementTime: numberValue(record.averageengagementtime),
    toolClicks: numberValue(record.toolclicks),
  };
}

function classify(row, article) {
  const reasons = [];

  if (row.impressions >= 1000 && row.ctr > 0 && row.ctr < 0.02) {
    reasons.push("High impressions with low CTR");
  }

  if (row.position >= 11 && row.position <= 30) {
    reasons.push("Search position 11-30");
  }

  if (row.clicks >= 20 && row.averageEngagementTime > 0 && row.averageEngagementTime < 45) {
    reasons.push("Traffic with short engagement");
  }

  if (row.clicks >= 20 && row.toolClicks === 0) {
    reasons.push("No recorded tool clicks");
  }

  if (article && article.internalLinkCount < 2) {
    reasons.push("Few internal links");
  }

  return reasons;
}

function score(row, reasons) {
  return (
    reasons.length * 10 +
    Math.min(row.impressions / 500, 10) +
    Math.min(row.clicks / 20, 10) +
    (row.position >= 11 && row.position <= 30 ? 5 : 0)
  );
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatNumber(value) {
  return Number.isFinite(value) ? String(Math.round(value * 10) / 10) : "0";
}

function buildMarkdown(opportunities, sourcePath) {
  const generatedAt = new Date().toISOString();
  const lines = [
    "# Content Improvement Opportunities",
    "",
    "This report is generated from a local analytics CSV export.",
    "",
    "Raw analytics files should stay under `data/analytics` and must not be committed.",
    "",
    "## Source",
    "",
    `- CSV: \`${path.relative(rootDir, sourcePath).replaceAll(path.sep, "/")}\``,
    `- Generated at: ${generatedAt}`,
    "",
    "## Summary",
    "",
    `- Candidates: ${opportunities.length}`,
    "",
  ];

  if (opportunities.length === 0) {
    lines.push("No improvement candidates were detected with the current rules.", "");
    return `${lines.join("\n")}\n`;
  }

  lines.push("## Top Opportunities", "");

  for (const item of opportunities.slice(0, 20)) {
    lines.push(`### ${item.article?.title ?? item.slug}`);
    lines.push("");
    lines.push(`- Page: \`${item.row.page}\``);
    lines.push(`- Slug: \`${item.slug}\``);
    if (item.article?.category) {
      lines.push(`- Category: ${item.article.category}`);
    }
    lines.push(`- Clicks: ${formatNumber(item.row.clicks)}`);
    lines.push(`- Impressions: ${formatNumber(item.row.impressions)}`);
    lines.push(`- CTR: ${formatPercent(item.row.ctr)}`);
    lines.push(`- Position: ${formatNumber(item.row.position)}`);
    if (item.row.averageEngagementTime > 0) {
      lines.push(`- Average engagement time: ${formatNumber(item.row.averageEngagementTime)} seconds`);
    }
    if (item.row.toolClicks > 0) {
      lines.push(`- Tool clicks: ${formatNumber(item.row.toolClicks)}`);
    }
    if (item.article) {
      lines.push(`- Internal links: ${item.article.internalLinkCount}`);
    }
    lines.push(`- Reasons: ${item.reasons.join(", ")}`);
    lines.push("- Suggested next step: create an `article-review` Issue with a focused improvement goal.");
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

if (!inputPath) {
  usage();
  process.exit(1);
}

const resolvedInputPath = path.resolve(inputPath);
if (!fs.existsSync(resolvedInputPath)) {
  console.error(`Analytics CSV was not found: ${resolvedInputPath}`);
  process.exit(1);
}

const records = parseCsv(fs.readFileSync(resolvedInputPath, "utf8"));
const opportunities = [];

for (const record of records) {
  const row = normalizeRecord(record);
  if (!row.slug) {
    continue;
  }

  const article = readArticle(row.slug);
  if (!article) {
    continue;
  }

  const reasons = classify(row, article);
  if (reasons.length === 0) {
    continue;
  }

  opportunities.push({
    slug: row.slug,
    row,
    article,
    reasons,
    score: score(row, reasons),
  });
}

opportunities.sort((a, b) => b.score - a.score);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, buildMarkdown(opportunities, resolvedInputPath));

console.log(`Wrote ${opportunities.length} content improvement opportunities to ${path.relative(rootDir, outputPath)}.`);
