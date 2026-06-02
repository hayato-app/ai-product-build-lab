import fs from "node:fs";
import path from "node:path";

export type ArticleCandidate = {
  number: number;
  title: string;
  pillar: string;
  category: string;
  targetReader: string;
  searchIntent: string;
  readerProblem: string;
  proposedAngle: string;
  existingOverlap: string;
  internalLinks: string;
  thumbnailIdea: string;
  factCheck: string;
  priority: string;
  draftRecommendation: string;
};

export type CandidateFile = {
  relativePath: string;
  candidates: ArticleCandidate[];
};

const candidateHeadingPattern = /^## Candidate (\d+)\s*$/gm;

export function loadLatestCandidateFile(): CandidateFile {
  const rootDir = findRepositoryRoot();
  const candidatesDir = path.join(rootDir, "docs/article-candidates");

  if (!fs.existsSync(candidatesDir)) {
    throw new Error(`Article candidate directory was not found: ${candidatesDir}`);
  }

  const latestFile = fs
    .readdirSync(candidatesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith(".md"))
    .filter((entry) => !entry.name.toLowerCase().startsWith("readme"))
    .map((entry) => path.join(candidatesDir, entry.name))
    .sort((a, b) => {
      const aStat = fs.statSync(a);
      const bStat = fs.statSync(b);
      return bStat.mtimeMs - aStat.mtimeMs || b.localeCompare(a);
    })[0];

  if (!latestFile) {
    throw new Error("Article candidate files were not found.");
  }

  return {
    relativePath: path.relative(rootDir, latestFile).replaceAll(path.sep, "/"),
    candidates: parseArticleCandidates(fs.readFileSync(latestFile, "utf8")),
  };
}

export function formatCandidateList(file: CandidateFile, limit: number): string {
  const visibleLimit = Math.min(Math.max(limit, 1), 10);
  const visibleCandidates = file.candidates.slice(0, visibleLimit);

  if (visibleCandidates.length === 0) {
    return `最新候補: ${file.relativePath}\n候補が見つかりませんでした。`;
  }

  return [
    `最新候補: ${file.relativePath}`,
    ...visibleCandidates.map((candidate) =>
      [
        `Candidate ${candidate.number}`,
        candidate.title,
        `カテゴリ: ${candidate.category || "未設定"}`,
        `優先度: ${candidate.priority || "normal"}`,
        `概要: ${candidate.searchIntent || candidate.readerProblem || "未設定"}`,
      ].join("\n"),
    ),
    "詳細を見る: /article-candidates candidate:<番号>",
    "候補をIssue化する操作はPhase 32で追加予定です。",
  ].join("\n\n");
}

export function formatCandidateDetail(file: CandidateFile, candidateNumber: number): string {
  const candidate = file.candidates.find((item) => item.number === candidateNumber);

  if (!candidate) {
    return [
      `最新候補: ${file.relativePath}`,
      `Candidate ${candidateNumber} は見つかりませんでした。`,
      `利用可能な番号: ${file.candidates.map((item) => item.number).join(", ") || "なし"}`,
    ].join("\n");
  }

  return [
    `最新候補: ${file.relativePath}`,
    "",
    `Candidate ${candidate.number}`,
    candidate.title,
    "",
    `Pillar: ${candidate.pillar || "未設定"}`,
    `Category: ${candidate.category || "未設定"}`,
    `Priority: ${candidate.priority || "normal"}`,
    `Fact check: ${candidate.factCheck || "codex_decides"}`,
    "",
    `Target reader: ${candidate.targetReader || "未設定"}`,
    `Search intent: ${candidate.searchIntent || "未設定"}`,
    `Reader problem: ${candidate.readerProblem || "未設定"}`,
    `Proposed angle: ${candidate.proposedAngle || "未設定"}`,
    "",
    `Existing overlap: ${candidate.existingOverlap || "未設定"}`,
    `Internal links: ${candidate.internalLinks || "未設定"}`,
    `Thumbnail idea: ${candidate.thumbnailIdea || "未設定"}`,
    "",
    `Draft recommendation: ${candidate.draftRecommendation || "未設定"}`,
    "",
    "このコマンドは確認専用です。候補をIssue化する操作はPhase 32で追加予定です。",
  ].join("\n");
}

export function parseArticleCandidates(markdown: string): ArticleCandidate[] {
  const matches = [...markdown.matchAll(candidateHeadingPattern)];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const fields = parseCandidateFields(markdown.slice(start, end).trim());

    return {
      number: Number.parseInt(match[1], 10),
      title: fields.title ?? "",
      pillar: fields.pillar ?? "",
      category: fields.category ?? "",
      targetReader: fields.target_reader ?? "",
      searchIntent: fields.search_intent ?? "",
      readerProblem: fields.reader_problem ?? "",
      proposedAngle: fields.proposed_angle ?? "",
      existingOverlap: fields.existing_overlap ?? "",
      internalLinks: fields.internal_link_candidates ?? "",
      thumbnailIdea: fields.thumbnail_idea ?? "",
      factCheck: fields.fact_check ?? "",
      priority: fields.priority ?? "",
      draftRecommendation: fields.draft_recommendation ?? "",
    };
  });
}

function parseCandidateFields(block: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const fieldRegex = /^- ([^:\n]+):\s*(.*)$/gm;

  for (const match of block.matchAll(fieldRegex)) {
    fields[normalizeFieldName(match[1])] = match[2].trim();
  }

  return fields;
}

function normalizeFieldName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function findRepositoryRoot(): string {
  let currentDir = process.cwd();

  for (let index = 0; index < 6; index += 1) {
    if (
      fs.existsSync(path.join(currentDir, "AGENTS.md")) &&
      fs.existsSync(path.join(currentDir, "docs/article-candidates"))
    ) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
  }

  return path.resolve(process.cwd(), "../..");
}
