import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const publicArticlesDir = path.join(rootDir, "apps/web/src/content/articles");
const draftArticlesDir = path.join(rootDir, "docs/article-drafts");
const candidateDir = path.join(rootDir, "docs/article-candidates");

const pillarAliases = {
  beginner: "開発初心者向けツール紹介/用語解説",
  app: "AIアプリ開発 開発手法/エラー事例・解決法紹介",
  news: "AI関連ニュース解説",
};

const seedCandidates = [
  {
    slug: "beginner-environment-variables-ai-apps",
    title: "AIアプリ開発で使う環境変数とは",
    pillar: pillarAliases.beginner,
    category: "システム開発用語解説",
    targetReader: "AIアプリ開発を始めたばかりで、APIキーの管理に不安がある人",
    searchIntent: "環境変数とは何か、AI APIキーをなぜコードに直接書かないのかを理解したい",
    readerProblem: "APIキー、.env、本番環境の設定の関係が分からず、秘密情報を安全に扱えるか不安",
    proposedAngle: "OpenAI APIキーを例に、ローカル開発、本番環境、GitHub管理で何を避けるべきかを説明する",
    keywords: ["環境変数", "APIキー", ".env", "OpenAI API", "セキュリティ"],
    internalLinks: ["/articles/openai-api-first-setup", "/articles/nextjs-ai-app-basic-architecture"],
    thumbnailIdea: "鍵アイコン、.envファイル、サーバー、AI APIがつながる明るい図",
    factCheck: "not_required",
    priority: "high",
  },
  {
    slug: "beginner-api-route-ai-apps",
    title: "AIアプリ開発でよく出るAPI Routeとは",
    pillar: pillarAliases.beginner,
    category: "システム開発用語解説",
    targetReader: "Next.jsでAIアプリを作り始めた初心者",
    searchIntent: "API RouteやRoute HandlerがAIアプリで何を担当するのか知りたい",
    readerProblem: "画面から直接AI APIを呼んでよいのか、サーバー側処理が必要なのか分からない",
    proposedAngle: "画面、API Route、AI APIの役割分担を図解し、APIキー保護と入力チェックの理由を説明する",
    keywords: ["API Route", "Route Handler", "Next.js", "AI API", "APIキー"],
    internalLinks: ["/articles/nextjs-ai-app-basic-architecture", "/articles/openai-api-first-setup"],
    thumbnailIdea: "ブラウザ、API Route、AI APIクラウドの3段構成の図",
    factCheck: "not_required",
    priority: "high",
  },
  {
    slug: "beginner-prompt-output-format",
    title: "プロンプトで出力形式を指定する基本",
    pillar: pillarAliases.beginner,
    category: "AI用語解説",
    targetReader: "AI APIを使い始めたが、回答が毎回ばらついて困っている人",
    searchIntent: "AIの回答形式を安定させるプロンプトの書き方を知りたい",
    readerProblem: "箇条書き、JSON、短い要約などを期待しても、出力が安定しない",
    proposedAngle: "悪いプロンプトと改善例を並べ、出力形式、対象読者、制約条件を明示する基本を説明する",
    keywords: ["プロンプト", "出力形式", "JSON", "AI API", "初心者"],
    internalLinks: ["/articles/openai-api-first-setup", "/articles/ai-api-cost-estimation-guide"],
    thumbnailIdea: "入力プロンプトから整った回答フォーマットに変換される図",
    factCheck: "not_required",
    priority: "normal",
  },
  {
    slug: "beginner-ai-api-rate-limit",
    title: "AI APIのレート制限とは",
    pillar: pillarAliases.beginner,
    category: "AI用語解説",
    targetReader: "AI APIを使ったアプリを公開前に準備している初心者",
    searchIntent: "rate limitの意味、なぜAPIが一時的に失敗するのかを知りたい",
    readerProblem: "API呼び出しが増えたときに、なぜ失敗するのか、どう備えるべきか分からない",
    proposedAngle: "レート制限を信号待ちのように説明し、リトライ、待機、利用上限の基本を整理する",
    keywords: ["レート制限", "AI API", "リトライ", "エラー", "運用"],
    internalLinks: ["/articles/ai-api-cost-estimation-guide", "/articles/openai-api-first-setup"],
    thumbnailIdea: "APIリクエストの列と制限ゲートを示す図",
    factCheck: "codex_decides",
    priority: "normal",
  },
  {
    slug: "app-ai-api-timeout-investigation",
    title: "AI APIのタイムアウト原因を切り分ける方法",
    pillar: pillarAliases.app,
    category: "エラー解決",
    targetReader: "AI APIの応答待ちやタイムアウトで困っている開発者",
    searchIntent: "AI APIがtimeoutする原因と調査手順を知りたい",
    readerProblem: "AI API、サーバー処理、ネットワーク、入力長のどれが原因か分からない",
    proposedAngle: "ログ項目、curl確認、入力長確認、リトライ設計を実務向けチェックリストで整理する",
    keywords: ["timeout", "AI API", "ログ", "エラー解決", "レスポンス遅延"],
    internalLinks: ["/articles/ai-api-cost-estimation-guide", "/articles/nextjs-ai-app-basic-architecture"],
    thumbnailIdea: "処理時間をフロントエンド、サーバー、AI APIに分解したタイムライン図",
    factCheck: "not_required",
    priority: "high",
  },
  {
    slug: "app-ai-output-json-parse-error",
    title: "AIのJSON出力がパースできない時の原因と対策",
    pillar: pillarAliases.app,
    category: "エラー解決",
    targetReader: "AI APIの出力をJSONとして扱うアプリを作っている開発者",
    searchIntent: "AIのJSON出力が壊れる理由と実装上の対策を知りたい",
    readerProblem: "JSONに説明文が混ざる、括弧が欠ける、型が違うなどで処理が落ちる",
    proposedAngle: "出力スキーマ、再試行、バリデーション、エラー表示の実装観点を整理する",
    keywords: ["JSON", "AI API", "パースエラー", "バリデーション", "プロンプト"],
    internalLinks: ["/articles/openai-api-first-setup", "/articles/nextjs-ai-app-basic-architecture"],
    thumbnailIdea: "壊れたJSONをチェックリストで修正するイメージ図",
    factCheck: "not_required",
    priority: "high",
  },
  {
    slug: "app-ai-api-cost-spike-investigation",
    title: "AI APIコストが急に増えた時の調査手順",
    pillar: pillarAliases.app,
    category: "AIアプリ運用",
    targetReader: "AIアプリ公開後にAPI費用の増加を調べたい開発者",
    searchIntent: "AI APIコスト増加の原因をログや利用量から調べる方法を知りたい",
    readerProblem: "ユーザー数、入力長、出力長、リトライ、モデル変更のどれが費用増の原因か分からない",
    proposedAngle: "コスト増加を実行回数、トークン、リトライ、モデル単価に分解して確認する",
    keywords: ["AI APIコスト", "運用", "ログ", "トークン", "リトライ"],
    internalLinks: ["/articles/ai-api-cost-estimation-guide", "/tools/ai-api-cost-estimator"],
    thumbnailIdea: "コストグラフとログ項目を並べた運用ダッシュボード風の図",
    factCheck: "codex_decides",
    priority: "high",
  },
  {
    slug: "app-rag-search-no-result",
    title: "RAGで検索結果が出ない時の確認ポイント",
    pillar: pillarAliases.app,
    category: "エラー解決",
    targetReader: "RAGを試しているが期待した文書が検索されず困っている開発者",
    searchIntent: "RAGで検索結果が出ない原因と確認手順を知りたい",
    readerProblem: "データ投入、分割、検索クエリ、類似度しきい値のどこが悪いか分からない",
    proposedAngle: "RAGをデータ投入、チャンク分割、検索、プロンプト追加に分けて調査する",
    keywords: ["RAG", "検索", "チャンク", "ベクトル検索", "エラー解決"],
    internalLinks: ["/articles/rag-basic-architecture", "/articles/nextjs-ai-app-basic-architecture"],
    thumbnailIdea: "文書、検索クエリ、検索結果、AI回答の流れを示す図",
    factCheck: "not_required",
    priority: "normal",
  },
  {
    slug: "beginner-codex-work-request-writing",
    title: "Codexに作業依頼を書く時の基本",
    pillar: pillarAliases.beginner,
    category: "AI開発ツール",
    targetReader: "CodexやAI開発エージェントに作業を依頼し始めた初心者",
    searchIntent: "Codexに何をどう依頼すれば安全に作業してもらえるか知りたい",
    readerProblem: "依頼が曖昧で、期待と違う実装や広すぎる変更になりそうで不安",
    proposedAngle: "目的、対象ファイル、変更してよいこと、禁止事項、確認方法をテンプレート化する",
    keywords: ["Codex", "AI開発ツール", "作業依頼", "GitHub Issue", "承認フロー"],
    internalLinks: ["/articles/what-is-ai-product-development", "/articles/ai-development-tools-stack"],
    thumbnailIdea: "IssueテンプレートとCodex作業計画がつながる図",
    factCheck: "not_required",
    priority: "normal",
  },
  {
    slug: "news-ai-agent-development-tools-trend",
    title: "AIエージェント型開発ツールの流れを開発者目線で整理する",
    pillar: pillarAliases.news,
    category: "AIニュース解説",
    targetReader: "AI開発ツールの変化を実務目線で把握したい開発者",
    searchIntent: "AIエージェント型開発ツールが何を変えるのか知りたい",
    readerProblem: "ニュースは多いが、自分の開発運用にどう関係するのか分からない",
    proposedAngle: "ニュース単体ではなく、Issue駆動、PR確認、承認フローへの影響を整理する",
    keywords: ["AIエージェント", "開発ツール", "Codex", "GitHub", "ニュース解説"],
    internalLinks: ["/articles/ai-development-tools-stack", "/articles/what-is-ai-product-development"],
    thumbnailIdea: "人間、Issue、AIエージェント、PRレビューのワークフロー図",
    factCheck: "required",
    priority: "low",
  },
];

const args = parseArgs(process.argv.slice(2));
const today = args.date ?? new Date().toISOString().slice(0, 10);
const count = Number.parseInt(args.count ?? "10", 10);
const candidateType = normalizeCandidateType(args.type ?? "daily");
const outputPath = path.resolve(args.out ?? path.join(candidateDir, defaultCandidateFileName(today, candidateType)));
const requestedPillar = args.pillar ? normalizePillar(args.pillar) : "";
const force = Boolean(args.force);

if (!Number.isInteger(count) || count <= 0) {
  fail("`--count` must be a positive number.");
}

if (fs.existsSync(outputPath) && !force) {
  fail(`Output file already exists: ${relative(outputPath)}. Use --force to overwrite.`);
}

const publishedArticles = readMarkdownArticles(publicArticlesDir);
const draftArticles = readMarkdownArticles(draftArticlesDir);
const candidateFiles = readExistingCandidateFiles(candidateDir);
const selectedCandidates = selectCandidates({
  publishedArticles,
  draftArticles,
  existingCandidateText: candidateFiles.map((file) => file.content).join("\n"),
  requestedPillar,
  count,
});

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(
  outputPath,
  buildMarkdown({
    candidates: selectedCandidates,
    candidateType,
    publishedArticles,
    draftArticles,
    today,
    requestedPillar,
  }),
  "utf8",
);

console.log(`Wrote ${selectedCandidates.length} candidates to ${relative(outputPath)}.`);

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--force") {
      parsed.force = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      fail(`Unknown positional argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      fail(`Missing value for ${arg}.`);
    }
    parsed[key] = value;
    index += 1;
  }

  return parsed;
}

function normalizeCandidateType(value) {
  if (value === "daily" || value === "weekly") {
    return value;
  }

  fail(`Unknown candidate type: ${value}. Use daily or weekly.`);
}

function defaultCandidateFileName(date, candidateType) {
  if (candidateType === "weekly") {
    return `weekly-${date}.md`;
  }

  return `${date}.md`;
}

function normalizePillar(value) {
  if (pillarAliases[value]) {
    return pillarAliases[value];
  }

  const matched = Object.values(pillarAliases).find((pillar) => pillar === value);
  if (matched) {
    return matched;
  }

  fail(`Unknown pillar: ${value}. Use beginner, app, news, or the full pillar name.`);
}

function readMarkdownArticles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith(".md"))
    .filter((entry) => !["README.md", "README_JP.md"].includes(entry.name))
    .map((entry) => {
      const filePath = path.join(dir, entry.name);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug: path.basename(entry.name, ".md"),
        title: data.title ?? path.basename(entry.name, ".md"),
        category: data.category ?? "",
        tags: data.tags ?? [],
        filePath,
        content,
      };
    });
}

function readExistingCandidateFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith(".md"))
    .filter((entry) => entry.name !== "README.md")
    .map((entry) => {
      const filePath = path.join(dir, entry.name);
      return {
        filePath,
        content: fs.readFileSync(filePath, "utf8"),
      };
    });
}

function parseFrontmatter(raw) {
  const match = raw.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const data = {};
  let currentArrayKey = "";

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
    currentArrayKey = "";
  }

  return {
    data,
    content: raw.slice(match[0].length).trim(),
  };
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function selectCandidates({
  publishedArticles,
  draftArticles,
  existingCandidateText,
  requestedPillar,
  count,
}) {
  const existingArticles = [...publishedArticles, ...draftArticles];
  const existingSlugs = new Set(existingArticles.map((article) => article.slug));
  const normalizedExistingTitles = existingArticles.map((article) => normalizeText(article.title));
  const normalizedCandidateText = normalizeText(existingCandidateText);

  return seedCandidates
    .filter((candidate) => !requestedPillar || candidate.pillar === requestedPillar)
    .map((candidate) => ({
      ...candidate,
      overlap: findOverlap(candidate, existingArticles, normalizedExistingTitles),
      score: scoreCandidate(candidate, existingArticles),
    }))
    .filter((candidate) => !existingSlugs.has(candidate.slug))
    .filter((candidate) => !normalizedCandidateText.includes(normalizeText(candidate.slug)))
    .filter((candidate) => candidate.overlap.level !== "duplicate")
    .sort((a, b) => b.score - a.score || priorityRank(a.priority) - priorityRank(b.priority))
    .slice(0, count);
}

function findOverlap(candidate, existingArticles, normalizedExistingTitles) {
  const normalizedTitle = normalizeText(candidate.title);

  if (normalizedExistingTitles.includes(normalizedTitle)) {
    return {
      level: "duplicate",
      articles: existingArticles.filter((article) => normalizeText(article.title) === normalizedTitle),
    };
  }

  const matched = existingArticles
    .map((article) => ({
      article,
      matchedKeywords: candidate.keywords.filter((keyword) =>
        normalizeText(`${article.title} ${article.category} ${article.tags.join(" ")} ${article.content}`).includes(
          normalizeText(keyword),
        ),
      ),
    }))
    .filter((entry) => entry.matchedKeywords.length > 0)
    .sort((a, b) => b.matchedKeywords.length - a.matchedKeywords.length)
    .slice(0, 3);

  return {
    level: matched.length >= 2 && matched[0].matchedKeywords.length >= 3 ? "overlap" : "related",
    articles: matched.map((entry) => entry.article),
  };
}

function scoreCandidate(candidate, existingArticles) {
  const base = {
    high: 30,
    normal: 20,
    low: 10,
  }[candidate.priority] ?? 20;

  const linkScore = candidate.internalLinks.length * 3;
  const evergreenScore = candidate.factCheck === "required" ? 0 : 8;
  const categoryGapScore = existingArticles.some((article) => article.category === candidate.category) ? 3 : 8;

  return base + linkScore + evergreenScore + categoryGapScore;
}

function priorityRank(priority) {
  return {
    high: 0,
    normal: 1,
    low: 2,
  }[priority] ?? 1;
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\s+/g, "");
}

function buildMarkdown({ candidates, candidateType, publishedArticles, draftArticles, today, requestedPillar }) {
  const lines = [
    `# Article Candidates - ${today}`,
    "",
    "This candidate list was generated locally without external API calls.",
    "",
    "## Scope",
    "",
    `- Published articles checked: ${publishedArticles.length}`,
    `- Draft articles checked: ${draftArticles.length}`,
    `- Candidate type: ${candidateType}`,
    `- Pillar filter: ${requestedPillar || "all"}`,
    "- Drafts are not created by this report.",
    "- User approval is required before any candidate becomes a draft.",
    "",
    "## Recommended Use",
    "",
    "1. Review the candidates below.",
    "2. Select the candidates that should become drafts.",
    "3. Ask Codex to present a Japanese implementation plan for selected candidates.",
    "4. Approve the plan before draft creation.",
    "",
  ];

  if (candidates.length === 0) {
    lines.push("## Candidates", "", "No candidates matched the current rules.", "");
    return `${lines.join("\n")}\n`;
  }

  lines.push("## Candidates", "");

  candidates.forEach((candidate, index) => {
    lines.push(
      `## Candidate ${index + 1}`,
      "",
      "- Status: available",
      `- Title: ${candidate.title}`,
      `- Pillar: ${candidate.pillar}`,
      `- Category: ${candidate.category}`,
      `- Target reader: ${candidate.targetReader}`,
      `- Search intent: ${candidate.searchIntent}`,
      `- Reader problem: ${candidate.readerProblem}`,
      `- Proposed angle: ${candidate.proposedAngle}`,
      `- Existing overlap: ${formatOverlap(candidate.overlap)}`,
      `- Difference from existing content: ${differenceFromExisting(candidate)}`,
      `- Internal link candidates: ${candidate.internalLinks.join(", ")}`,
      `- Thumbnail idea: ${candidate.thumbnailIdea}`,
      `- Fact check: ${candidate.factCheck}`,
      `- Priority: ${candidate.priority}`,
      `- Draft recommendation: ${draftRecommendation(candidate)}`,
      "",
    );
  });

  lines.push(
    "## Notes",
    "",
    "- This list is planning material only.",
    "- Do not create drafts for all candidates automatically.",
    "- New drafts should follow `docs/operations/article-candidate-flow.md`.",
    "- New drafts should include a local thumbnail by default.",
    "",
  );

  return `${lines.join("\n")}\n`;
}

function formatOverlap(overlap) {
  if (!overlap.articles.length) {
    return "No strong overlap detected.";
  }

  return overlap.articles
    .map((article) => `${article.title} (${article.slug})`)
    .join("; ");
}

function differenceFromExisting(candidate) {
  const differences = {
    beginner: "Beginner-focused terminology explanation with practical AI app context.",
    app: "Troubleshooting-oriented article with investigation steps and practical checks.",
    news: "Builder-focused commentary that connects trends to development operation.",
  };

  if (candidate.pillar === pillarAliases.beginner) {
    return differences.beginner;
  }

  if (candidate.pillar === pillarAliases.app) {
    return differences.app;
  }

  return differences.news;
}

function draftRecommendation(candidate) {
  if (candidate.priority === "high") {
    return "Recommended for the next draft batch after user approval.";
  }

  if (candidate.factCheck === "required") {
    return "Useful candidate, but prepare fact-check notes before drafting.";
  }

  return "Good candidate when the current high-priority batch is complete.";
}

function relative(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}

function fail(message) {
  console.error(`Article candidate generator failed: ${message}`);
  process.exit(1);
}
