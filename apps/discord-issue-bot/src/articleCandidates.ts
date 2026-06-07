import fs from "node:fs";
import path from "node:path";

export type ArticleCandidate = {
  number: number;
  status: string;
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

export type CandidateFileType = "daily" | "weekly";

const candidateHeadingPattern = /^## Candidate (\d+)\s*$/gm;
const datedCandidateFilePattern = /^(weekly-)?(\d{4}-\d{2}-\d{2})\.md$/i;

export function loadLatestCandidateFile(type?: CandidateFileType): CandidateFile {
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
    .filter((entry) => matchesCandidateFileType(entry.name, type))
    .map((entry) => path.join(candidatesDir, entry.name))
    .sort(compareCandidateFiles)[0];

  if (!latestFile) {
    throw new Error(`Article candidate files were not found${type ? ` for type ${type}` : ""}.`);
  }

  return {
    relativePath: path.relative(rootDir, latestFile).replaceAll(path.sep, "/"),
    candidates: parseArticleCandidates(fs.readFileSync(latestFile, "utf8")),
  };
}

function matchesCandidateFileType(fileName: string, type?: CandidateFileType): boolean {
  const match = fileName.match(datedCandidateFilePattern);

  if (!match) {
    return !type;
  }

  const isWeekly = Boolean(match[1]);

  if (type === "weekly") {
    return isWeekly;
  }

  if (type === "daily") {
    return !isWeekly;
  }

  return true;
}

function compareCandidateFiles(a: string, b: string): number {
  const aDate = extractCandidateFileDate(path.basename(a));
  const bDate = extractCandidateFileDate(path.basename(b));

  if (aDate !== bDate) {
    return bDate.localeCompare(aDate);
  }

  if (aDate) {
    return path.basename(b).localeCompare(path.basename(a));
  }

  const aStat = fs.statSync(a);
  const bStat = fs.statSync(b);
  return bStat.mtimeMs - aStat.mtimeMs || path.basename(b).localeCompare(path.basename(a));
}

function extractCandidateFileDate(fileName: string): string {
  return fileName.match(datedCandidateFilePattern)?.[2] ?? "";
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
        `ステータス: ${formatCandidateStatus(candidate.status)}`,
        `カテゴリ: ${candidate.category || "未設定"}`,
        `優先度: ${candidate.priority || "normal"}`,
        `概要: ${candidate.searchIntent || candidate.readerProblem || "未設定"}`,
      ].join("\n"),
    ),
    "詳細を見る: /article-candidates candidate:<番号>",
    "Issue化する場合は、表示時と同じtypeを指定して /article-candidate-select type:<daily|weekly> candidate:<番号> を実行してください。",
  ].join("\n\n");
}

export function formatCandidateDetail(file: CandidateFile, candidateNumber: number): string {
  const candidate = findArticleCandidate(file, candidateNumber);

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
    `Status: ${formatCandidateStatus(candidate.status)}`,
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
    "Issue化する場合は、表示時と同じtypeを指定して /article-candidate-select type:<daily|weekly> candidate:<番号> を実行してください。",
  ].join("\n");
}

export function findArticleCandidate(
  file: CandidateFile,
  candidateNumber: number,
): ArticleCandidate | undefined {
  return file.candidates.find((item) => item.number === candidateNumber);
}

export function parseArticleCandidates(markdown: string): ArticleCandidate[] {
  const matches = [...markdown.matchAll(candidateHeadingPattern)];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end = matches[index + 1]?.index ?? markdown.length;
    const fields = parseCandidateFields(markdown.slice(start, end).trim());

    return {
      number: Number.parseInt(match[1], 10),
      status: fields.status ?? "available",
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

export function isSelectableCandidate(candidate: ArticleCandidate): boolean {
  return normalizeCandidateStatus(candidate.status) === "available";
}

export function formatCandidateStatus(status: string): string {
  return normalizeCandidateStatus(status) || "available";
}

function normalizeCandidateStatus(status: string): string {
  return status.trim().toLowerCase() || "available";
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
