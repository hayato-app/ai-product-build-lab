import type { ArticleOutline } from "./article-schema";
import { escapeYaml, todayIsoDate } from "./utils";

export function generateMarkdown(outline: ArticleOutline): string {
  const today = todayIsoDate();

  return `---
title: "${escapeYaml(outline.title)}"
description: "${escapeYaml(outline.description)}"
publishedAt: "${today}"
updatedAt: "${today}"
pillar: "${escapeYaml(outline.pillar)}"
status: "draft"
review_status: "needs_review"
priority: "normal"
estimated_publish_ready: false
needs_fact_check: false
category: "${escapeYaml(outline.category)}"
tags:
${outline.tags.map((tag) => `  - "${escapeYaml(tag)}"`).join("\n")}
---

## この記事で分かること

- ${outline.description}
- 想定読者: ${outline.targetReader}
- 観点: ${outline.angle}
- 公開前に確認すべき実装・運用上の注意点

## 結論

${outline.title}で大切なのは、最初から大きな仕組みを作ることではなく、目的、入力、出力、評価方法を小さく決めて検証できる状態にすることです。
AIアプリやAIプロダクトでは、モデルの性能だけでなく、失敗時の表示、コスト上限、ログ、改善サイクルまで含めて設計する必要があります。

## 想定読者

${outline.targetReader}

## 全体像

| 観点 | 確認すること | 後回しにしてよいこと |
| --- | --- | --- |
| 目的 | 何を短時間で解決する機能か | 大きな事業計画 |
| 入力 | ユーザーが渡す文章、ファイル、条件 | 複雑な管理画面 |
| 出力 | AIが返す形式、長さ、粒度 | 派手なUI演出 |
| 品質 | 正しさ、使いやすさ、再現性 | 完全自動化 |
| 運用 | コスト、ログ、エラー時の扱い | ログイン、決済、SaaS機能 |

${outline.sections
  .filter(
    (section) =>
      section !== "この記事で分かること" &&
      section !== "公開前チェックリスト",
  )
  .map((section, index) => renderSection(section, index))
  .join("\n\n")}

## 公開前チェックリスト

- タイトルが検索ユーザーの悩みと一致している
- 想定読者が明確である
- 手順、判断基準、注意点が含まれている
- 既存記事と内容が重複しすぎていない
- 外部サービスの価格や仕様に依存する箇所は事実確認済みである
- SaaS、ログイン、決済、ダッシュボード機能を前提にしていない

## 関連記事

${renderRelatedArticles(outline)}

## まとめ

${outline.title}は、AI開発の現場で早めに整理しておくほど後戻りを減らせるテーマです。
まずは小さな検証単位で試し、読者がそのまま使える判断基準やチェックリストとして磨き込むと、公開記事としての価値が高まります。
`;
}

function renderSection(section: string, index: number): string {
  const examples = [
    "まずは現状の課題を一文で書き出し、AIを使う理由が明確かを確認します。AIを使わないほうが早い処理まで含めると、実装も運用も複雑になります。",
    "実装前に、入力、処理、出力の境界を決めます。境界が曖昧なまま作ると、プロンプト、UI、ログのどこを直せばよいか分かりにくくなります。",
    "最初の検証では、機能を増やすよりも失敗パターンを集めることが重要です。うまくいかない入力を残しておくと、改善の優先順位を決めやすくなります。",
    "公開前には、費用、速度、エラー時の説明を確認します。特にAI APIを使う機能では、成功時だけでなく失敗時の体験が信頼性に直結します。",
  ];

  return `## ${section}

${examples[index % examples.length]}

| 確認項目 | 見るポイント |
| --- | --- |
| 読者の課題 | この記事で解決する悩みが具体的か |
| 実装判断 | すぐ試せる手順や判断基準があるか |
| 運用視点 | コスト、ログ、エラー時の扱いに触れているか |`;
}

function renderRelatedArticles(outline: ArticleOutline): string {
  if (outline.relatedArticles.length === 0) {
    return "- 関連候補は生成時点では見つかりませんでした。公開前に手動で確認してください。";
  }

  return outline.relatedArticles
    .map(
      (article) =>
        `- [${article.title}](/articles/${article.slug}) - ${article.category}`,
    )
    .join("\n");
}
