import path from "path";
import type { SeedTopic } from "./article-schema";

export const repoRoot = path.resolve(__dirname, "../../..");

export const existingArticlesDir = path.join(
  repoRoot,
  "apps/web/src/content/articles",
);

export const defaultDraftOutputDir = path.join(repoRoot, "docs/article-drafts");

export const draftOutputDir =
  process.env.ARTICLE_DRAFT_OUTPUT_DIR || defaultDraftOutputDir;

export const contentPillars = {
  beginner: "AI開発初心者向け開発手法/ツール紹介",
  app: "AIアプリ開発 開発手法/エラー事例・解決法紹介",
  news: "AI関連ニュース解説",
} as const;

export const seedTopics: SeedTopic[] = [
  {
    id: "beginner-ai-app-requirements",
    pillar: contentPillars.beginner,
    title: "AIアプリ開発を始める前に決める要件定義チェックリスト",
    description:
      "AIアプリを作り始める前に、目的、入力、出力、評価方法、コスト上限を整理するための実践チェックリストです。",
    category: "AI開発初心者",
    tags: ["AIアプリ", "要件定義", "初心者", "プロダクト設計"],
    targetReader:
      "AIアプリを作りたいが、最初に何を決めればよいか迷っている開発初心者",
    angle:
      "実装前の判断を整理し、作りながら迷走しないための最低限の要件定義に絞る",
    sections: [
      "この記事で分かること",
      "AIアプリの要件定義で最初に決める5項目",
      "入力と出力を具体化する",
      "AIの品質をどう評価するか",
      "コストと制限を先に決める",
      "公開前チェックリスト",
    ],
  },
  {
    id: "beginner-rag-tool-selection",
    pillar: contentPillars.beginner,
    title: "RAGを始めるときのツール選定ガイド",
    description:
      "RAG開発で必要になるドキュメント管理、検索、ベクトルDB、回答生成の役割を初心者向けに整理します。",
    category: "RAG",
    tags: ["RAG", "ベクトルDB", "AI開発初心者", "ツール選定"],
    targetReader:
      "RAGを試したいが、どのツールから選べばよいか分からない開発者",
    angle:
      "最初から大きな構成にせず、検証段階で必要な部品と後から足せばよい部品を分ける",
    sections: [
      "この記事で分かること",
      "RAGの基本構成",
      "最初に選ぶべきツール",
      "後回しにしてよい機能",
      "小さく検証する手順",
      "よくある失敗",
    ],
  },
  {
    id: "app-openai-api-error-handling",
    pillar: contentPillars.app,
    title: "OpenAI APIエラーに強いAIアプリを作る基本設計",
    description:
      "タイムアウト、レート制限、予期しない応答に備えて、AIアプリ側で実装しておきたいエラー処理を整理します。",
    category: "OpenAI API",
    tags: ["OpenAI API", "エラー処理", "AIアプリ", "運用"],
    targetReader:
      "AI APIを組み込んだアプリを公開前に安定させたい開発者",
    angle:
      "AI APIの失敗を例外扱いせず、通常のプロダクト運用で起こるものとして設計する",
    sections: [
      "この記事で分かること",
      "AI APIで起こりやすいエラー",
      "ユーザー体験を壊さない失敗時表示",
      "リトライとタイムアウトの考え方",
      "ログに残すべき情報",
      "公開前チェックリスト",
    ],
  },
  {
    id: "app-nextjs-streaming-ai-response",
    pillar: contentPillars.app,
    title: "Next.jsでAI応答をストリーミング表示するときの実装ポイント",
    description:
      "AIの回答待ち時間を短く感じさせるために、Next.jsでストリーミング表示を使う際の設計ポイントを解説します。",
    category: "Next.js AI開発",
    tags: ["Next.js", "AIアプリ", "ストリーミング", "UX"],
    targetReader:
      "Next.jsでAIチャットや生成機能を作っている開発者",
    angle:
      "高度なUIよりも、待ち時間、キャンセル、エラー時の自然な挙動に焦点を当てる",
    sections: [
      "この記事で分かること",
      "ストリーミング表示が必要になる場面",
      "基本構成",
      "UIで気をつけること",
      "エラーとキャンセルの扱い",
      "実装前チェックリスト",
    ],
  },
  {
    id: "news-agent-tools-standardization",
    pillar: contentPillars.news,
    title: "AIエージェント開発ツール標準化の流れを開発者目線で整理する",
    description:
      "AIエージェント向けのツール接続やワークフロー標準化が、アプリ開発にどのような影響を与えるかを解説します。",
    category: "AIニュース解説",
    tags: ["AIエージェント", "MCP", "開発ツール", "ニュース解説"],
    targetReader:
      "AIエージェント関連ニュースを、実装やプロダクト設計にどう活かすか知りたい開発者",
    angle:
      "ニュースの事実、開発者への影響、今すぐ準備できることを分けて説明する",
    sections: [
      "この記事で分かること",
      "何が標準化されようとしているのか",
      "開発者にとってのメリット",
      "まだ注意すべき点",
      "小さく試すなら何から始めるか",
      "まとめ",
    ],
  },
  {
    id: "news-ai-api-cost-shift",
    pillar: contentPillars.news,
    title: "AI APIコスト低下が個人開発と小規模プロダクトに与える影響",
    description:
      "AI APIの低価格化や高性能化が、個人開発者や小規模チームのプロダクト作りにどう影響するかを整理します。",
    category: "AIニュース解説",
    tags: ["AI API", "コスト", "個人開発", "ニュース解説"],
    targetReader:
      "AI APIの価格変化をプロダクト企画や機能設計に反映したい開発者",
    angle:
      "価格そのものではなく、作れる機能、検証速度、運用設計の変化に注目する",
    sections: [
      "この記事で分かること",
      "AI APIコスト低下で変わること",
      "個人開発で試しやすくなる機能",
      "それでも残るコストリスク",
      "公開前に決めるべき上限",
      "まとめ",
    ],
  },
];
