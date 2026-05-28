import fs from "fs";
import path from "path";
import type { GenerateOptions } from "./article-schema";
import {
  generateArticleWithAi,
  getArticleWorkerModel,
} from "./ai-provider";
import { draftOutputDir, seedTopics } from "./config";
import {
  readExistingArticles,
  readExistingDrafts,
  readExistingDraftSlugs,
} from "./existing-articles";
import { generateMarkdown } from "./generate-markdown";
import { generateOutlines } from "./generate-outline";
import { buildArticlePrompt } from "./prompts";
import { ensureDirectory, todayIsoDate } from "./utils";
import { validateArticleDraft } from "./validate-article";

type WorkerOptions = GenerateOptions & {
  ai: boolean;
};

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const existingArticles = readExistingArticles();
  const existingDrafts = readExistingDrafts(options.outputDir);
  const existingSlugs = readExistingDraftSlugs(options.outputDir);
  const validationSlugs = new Set(existingSlugs);
  const count = options.ai ? Math.min(options.count, 3) : options.count;
  const outlines = generateOutlines(
    seedTopics,
    [...existingArticles, ...existingDrafts],
    existingArticles,
    existingSlugs,
    count,
  );

  console.log(`Article Worker`);
  console.log(`- existing articles: ${existingArticles.length}`);
  console.log(`- existing drafts: ${existingDrafts.length}`);
  console.log(`- output dir: ${options.outputDir}`);
  console.log(`- dry run: ${options.dryRun ? "yes" : "no"}`);
  console.log(`- mode: ${options.ai ? "ai" : "template"}`);
  console.log(
    `- api call: ${options.ai && !options.dryRun ? "required" : "not required"}`,
  );
  if (options.ai) {
    console.log(`- model: ${getArticleWorkerModel()}`);
  }
  console.log(`- count: ${outlines.length}`);

  if (!options.dryRun) {
    ensureDirectory(options.outputDir);
  }

  for (const outline of outlines) {
    const outputPath = path.join(options.outputDir, `${outline.slug}.md`);

    console.log("");
    console.log(`## ${outline.title}`);
    console.log(`slug: ${outline.slug}`);
    console.log(`category: ${outline.category}`);
    console.log(`tags: ${outline.tags.join(", ")}`);
    console.log(
      `related: ${outline.relatedArticles
        .map((article) => article.slug)
        .join(", ") || "none"}`,
    );

    if (options.dryRun) {
      console.log(`would write: ${outputPath}`);
      continue;
    }

    if (fs.existsSync(outputPath)) {
      throw new Error(`Refusing to overwrite existing file: ${outputPath}`);
    }

    const markdown = options.ai
      ? await generateAiMarkdown(outline, existingArticles, validationSlugs)
      : generateMarkdown(outline);

    fs.writeFileSync(outputPath, markdown, "utf8");
    console.log(`written: ${outputPath}`);
  }
}

async function generateAiMarkdown(
  outline: ReturnType<typeof generateOutlines>[number],
  existingArticles: ReturnType<typeof readExistingArticles>,
  validationSlugs: Set<string>,
): Promise<string> {
  const prompt = buildArticlePrompt(outline, existingArticles);
  const generated = await generateArticleWithAi(prompt);
  console.log(`api called: yes`);
  const markdown = generated.replaceAll("{{TODAY}}", todayIsoDate());
  const validation = validateArticleDraft(markdown, outline, validationSlugs);

  console.log(`validation: ${validation.ok ? "passed" : "failed"}`);

  if (!validation.ok) {
    for (const error of validation.errors) {
      console.log(`- ${error}`);
    }

    throw new Error("Generated article failed validation. No file was written.");
  }

  return markdown;
}

function parseArgs(args: string[]): WorkerOptions {
  const count = readNumberArg(args, "--count") ?? 1;
  const outputDirArg = readStringArg(args, "--output-dir");
  const ai = args.includes("--ai");

  return {
    count: ai ? Math.min(Math.max(1, count), 3) : Math.max(1, count),
    dryRun: args.includes("--dry-run"),
    outputDir: outputDirArg
      ? path.resolve(outputDirArg)
      : path.resolve(draftOutputDir),
    ai,
  };
}

function readNumberArg(args: string[], name: string): number | undefined {
  const value = readStringArg(args, name);
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function readStringArg(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index < 0) {
    return undefined;
  }

  return args[index + 1];
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Article Worker failed: ${message}`);
  process.exitCode = 1;
});
