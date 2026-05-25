import fs from "fs";
import path from "path";
import type { GenerateOptions } from "./article-schema";
import { draftOutputDir, seedTopics } from "./config";
import {
  readExistingArticles,
  readExistingDrafts,
  readExistingDraftSlugs,
} from "./existing-articles";
import { generateMarkdown } from "./generate-markdown";
import { generateOutlines } from "./generate-outline";
import { ensureDirectory } from "./utils";

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  const existingArticles = readExistingArticles();
  const existingDrafts = readExistingDrafts(options.outputDir);
  const existingSlugs = readExistingDraftSlugs(options.outputDir);
  const outlines = generateOutlines(
    seedTopics,
    [...existingArticles, ...existingDrafts],
    existingArticles,
    existingSlugs,
    options.count,
  );

  console.log(`Article Worker`);
  console.log(`- existing articles: ${existingArticles.length}`);
  console.log(`- existing drafts: ${existingDrafts.length}`);
  console.log(`- output dir: ${options.outputDir}`);
  console.log(`- dry run: ${options.dryRun ? "yes" : "no"}`);
  console.log(`- count: ${outlines.length}`);

  if (!options.dryRun) {
    ensureDirectory(options.outputDir);
  }

  for (const outline of outlines) {
    const markdown = generateMarkdown(outline);
    const outputPath = path.join(options.outputDir, `${outline.slug}.md`);

    console.log("");
    console.log(`## ${outline.title}`);
    console.log(`slug: ${outline.slug}`);
    console.log(`category: ${outline.category}`);
    console.log(`tags: ${outline.tags.join(", ")}`);
    console.log(`related: ${outline.relatedArticles.length}`);

    if (options.dryRun) {
      console.log(`would write: ${outputPath}`);
      continue;
    }

    if (fs.existsSync(outputPath)) {
      throw new Error(`Refusing to overwrite existing file: ${outputPath}`);
    }

    fs.writeFileSync(outputPath, markdown, "utf8");
    console.log(`written: ${outputPath}`);
  }
}

function parseArgs(args: string[]): GenerateOptions {
  const count = readNumberArg(args, "--count") ?? 1;
  const outputDirArg = readStringArg(args, "--output-dir");

  return {
    count: Math.max(1, count),
    dryRun: args.includes("--dry-run"),
    outputDir: outputDirArg
      ? path.resolve(outputDirArg)
      : path.resolve(draftOutputDir),
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

main();
