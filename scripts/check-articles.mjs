import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicArticlesDir = path.join(rootDir, "apps/web/src/content/articles");
const draftArticlesDir = path.join(rootDir, "docs/article-drafts");
const appDir = path.join(rootDir, "apps/web/src/app");

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function walkFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        ["node_modules", ".git", ".next", "dist", "build"].includes(entry.name) ||
        entry.name.startsWith("_")
      ) {
        continue;
      }
      results.push(...walkFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function readMarkdownFiles(dir) {
  return walkFiles(dir, (filePath) => {
    if (!filePath.endsWith(".md")) {
      return false;
    }

    const name = path.basename(filePath).toLowerCase();
    return name !== "readme.md" && name !== "readme_jp.md";
  });
}

function relative(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const normalized = raw.replace(/^\uFEFF/, "");

  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) {
    fail(`${relative(filePath)} is missing frontmatter delimiters.`);
    return { data: {}, content: normalized };
  }

  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    fail(`${relative(filePath)} has malformed frontmatter.`);
    return { data: {}, content: normalized };
  }

  const data = {};
  let currentArrayKey = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) {
      continue;
    }

    const arrayItem = line.match(/^\s*-\s*(.*)$/);
    if (arrayItem && currentArrayKey) {
      data[currentArrayKey].push(stripQuotes(arrayItem[1]));
      continue;
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) {
      continue;
    }

    const [, key, rawValue] = pair;
    if (rawValue.trim() === "") {
      data[key] = [];
      currentArrayKey = key;
      continue;
    }

    data[key] = stripQuotes(rawValue);
    currentArrayKey = null;
  }

  return {
    data,
    content: normalized.slice(match[0].length).trim(),
  };
}

function assertStringField(filePath, data, fieldName) {
  if (typeof data[fieldName] !== "string" || data[fieldName].trim() === "") {
    fail(`${relative(filePath)} is missing required frontmatter field: ${fieldName}.`);
  }
}

function assertTags(filePath, data) {
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    fail(`${relative(filePath)} must define at least one tag.`);
  }
}

function validateArticleFile(filePath, { strictDates, draftMode = false }) {
  const { data, content } = parseFrontmatter(filePath);

  for (const fieldName of ["title", "category"]) {
    assertStringField(filePath, data, fieldName);
  }

  if (draftMode) {
    if (typeof data.description !== "string" || data.description.trim() === "") {
      warn(`${relative(filePath)} is missing recommended draft frontmatter field: description.`);
    }
  } else {
    assertStringField(filePath, data, "description");
  }

  assertTags(filePath, data);

  if (strictDates) {
    for (const fieldName of ["publishedAt", "updatedAt"]) {
      assertStringField(filePath, data, fieldName);
      if (
        typeof data[fieldName] === "string" &&
        data[fieldName] &&
        !/^\d{4}-\d{2}-\d{2}$/.test(data[fieldName])
      ) {
        fail(`${relative(filePath)} has invalid ${fieldName}; expected YYYY-MM-DD.`);
      }
    }
  }

  if (!content) {
    fail(`${relative(filePath)} must include Markdown body content.`);
  }

  return { data, content };
}

function collectArticleSlugs(files) {
  const slugs = new Map();
  for (const filePath of files) {
    const slug = path.basename(filePath, ".md");
    if (!slugs.has(slug)) {
      slugs.set(slug, []);
    }
    slugs.get(slug).push(relative(filePath));
  }
  return slugs;
}

function validateDuplicateSlugs(publicFiles, draftFiles) {
  const allSlugs = collectArticleSlugs([...publicFiles, ...draftFiles]);

  for (const [slug, locations] of allSlugs.entries()) {
    if (locations.length > 1) {
      fail(`Duplicate article slug "${slug}" found in: ${locations.join(", ")}.`);
    }
  }
}

function collectAppRoutes() {
  const routes = new Set(["/", "/articles", "/categories", "/tags", "/tools"]);

  if (fs.existsSync(appDir)) {
    for (const pagePath of walkFiles(appDir, (filePath) => path.basename(filePath) === "page.tsx")) {
      const route = "/" + path.relative(appDir, path.dirname(pagePath)).replaceAll(path.sep, "/");
      if (!route.includes("[") && route !== "/.") {
        routes.add(route === "/" ? "/" : route);
      }
    }
  }

  return routes;
}

function extractInternalLinks(content) {
  const links = [];
  const markdownLinkPattern = /\[[^\]]+\]\((\/[^)\s#?]+)(?:[#?][^)]*)?\)/g;
  let match;

  while ((match = markdownLinkPattern.exec(content)) !== null) {
    links.push(match[1].replace(/\/$/, ""));
  }

  return links;
}

function validateInternalLinks(files, publishedSlugs, categories, tags, appRoutes) {
  const toolRoutes = new Set([...appRoutes].filter((route) => route.startsWith("/tools/")));

  for (const filePath of files) {
    const { content } = parseFrontmatter(filePath);

    for (const link of extractInternalLinks(content)) {
      const decodedLink = decodeURIComponent(link);

      if (decodedLink.startsWith("/articles/")) {
        const slug = decodedLink.slice("/articles/".length);
        if (!publishedSlugs.has(slug)) {
          fail(`${relative(filePath)} links to missing article: ${decodedLink}.`);
        }
        continue;
      }

      if (decodedLink.startsWith("/categories/")) {
        const category = decodedLink.slice("/categories/".length);
        if (!categories.has(category)) {
          fail(`${relative(filePath)} links to missing category: ${decodedLink}.`);
        }
        continue;
      }

      if (decodedLink.startsWith("/tags/")) {
        const tag = decodedLink.slice("/tags/".length);
        if (!tags.has(tag)) {
          fail(`${relative(filePath)} links to missing tag: ${decodedLink}.`);
        }
        continue;
      }

      if (decodedLink.startsWith("/tools/")) {
        if (!toolRoutes.has(decodedLink)) {
          fail(`${relative(filePath)} links to missing tool route: ${decodedLink}.`);
        }
        continue;
      }
    }
  }
}

function validateNoCommittedEnvFiles() {
  for (const filePath of walkFiles(rootDir)) {
    const name = path.basename(filePath);
    if (name.startsWith(".env") && name !== ".env.example") {
      fail(`Environment file must not be committed: ${relative(filePath)}.`);
    }
  }
}

const publicFiles = readMarkdownFiles(publicArticlesDir);
const draftFiles = readMarkdownFiles(draftArticlesDir);
const publishedSlugs = new Set(publicFiles.map((filePath) => path.basename(filePath, ".md")));
const categories = new Set();
const tags = new Set();

for (const filePath of publicFiles) {
  const { data } = validateArticleFile(filePath, { strictDates: true });
  if (typeof data.category === "string") {
    categories.add(data.category);
  }
  if (Array.isArray(data.tags)) {
    for (const tag of data.tags) {
      tags.add(tag);
    }
  }
}

for (const filePath of draftFiles) {
  validateArticleFile(filePath, { strictDates: false, draftMode: true });
}

validateDuplicateSlugs(publicFiles, draftFiles);
validateInternalLinks([...publicFiles, ...draftFiles], publishedSlugs, categories, tags, collectAppRoutes());
validateNoCommittedEnvFiles();

if (errors.length > 0) {
  console.error("Article quality checks failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  if (warnings.length > 0) {
    console.warn("Article quality warnings:");
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }

  console.log(
    `Article quality checks passed: ${publicFiles.length} published articles, ${draftFiles.length} drafts.`,
  );
}
