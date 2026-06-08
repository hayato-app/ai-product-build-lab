---
title: "AIアプリ開発でよく出るAPI Routeとは"
description: "Next.jsでAIアプリを作り始めた初心者向けに、API RouteやRoute Handlerが何を担当するのか、画面・サーバー側API・AI APIの役割分担から整理する下書きです。"
thumbnail: "/images/drafts/ai-app-api-route-basics-thumbnail.png"
publishedAt: "2026-06-03"
updatedAt: "2026-06-03"
pillar: "開発初心者向けツール紹介/用語解説"
status: "draft"
review_status: "needs_review"
review_result: "pending"
reviewed_at: ""
review_notes: "GitHub Issue #12 / Brief docs/article-briefs/ai-app-api-route-basics.md から作成したreview用draftです。本文、サムネイル、内部リンク、ファクトチェックを管理画面で確認してください。"
priority: "high"
estimated_publish_ready: false
needs_fact_check: false
fact_check_status: "completed"
category: "システム開発用語解説"
tags:
  - "AI開発初心者"
  - "システム開発用語解説"
  - "API Route"
  - "Next.js"
  - "AIアプリ開発"
---

## 結論

API Routeは、画面とサーバー側処理をつなぐ入り口です。

AIアプリでは、ユーザーが画面に入力した内容をそのままAI APIへ送るのではなく、いったんAPI RouteやRoute Handlerのようなサーバー側APIに送るのが基本です。

理由はシンプルです。

| API Routeで守るもの | なぜ必要か |
| --- | --- |
| APIキー | ブラウザに出すと第三者に見える可能性がある |
| 入力チェック | 長すぎる入力や空の入力をAI APIへ送らない |
| エラー処理 | AI APIが失敗したときに画面へ分かりやすく返す |
| ログ | どこで失敗したかを後から調べられる |

![ブラウザ、API Route、AI APIクラウドの3段構成を示したサムネイル](/images/drafts/ai-app-api-route-basics-thumbnail.png)

## この記事の対象読者

この記事は、次のような人向けです。

- Next.jsでAIアプリを作り始めたばかりの人
- API RouteやRoute Handlerという言葉がまだ曖昧な人
- 画面から直接OpenAI APIなどを呼んでよいのか迷っている人
- APIキーをどこで扱うべきか不安な人

この記事では、Next.jsの細かい書き方をすべて説明するのではなく、AIアプリ開発で必要になる範囲に絞って、API Routeの役割を整理します。

## API Routeとは

API Routeは、アプリの中に作る「サーバー側のAPIの入り口」です。

画面から見ると、API Routeは次のような役割を持ちます。

| 画面から見たAPI Route | 役割 |
| --- | --- |
| 入力内容の送り先 | ユーザーの質問やフォーム入力を受け取る |
| サーバー側処理の入り口 | APIキーを読み込み、AI APIを呼ぶ |
| 結果の返却口 | AI APIの結果を画面に返す |
| 安全確認の場所 | 入力チェックやエラー処理を行う |

たとえば、チャット画面でユーザーが質問を入力したとします。

このとき、画面が直接AI APIを呼ぶのではなく、まず自分のアプリ内のAPI Routeへ送ります。

そのAPI Routeが、サーバー側でAPIキーを読み込み、AI APIを呼び、結果を画面に返します。

## Route Handlerとは

Next.jsのApp Routerでは、サーバー側のAPI処理を作る仕組みとしてRoute Handlerがよく使われます。

初心者向けには、まず次のように理解しておけば十分です。

| 用語 | 初心者向けの理解 |
| --- | --- |
| API Route | 画面から呼び出せるサーバー側APIの入り口 |
| Route Handler | Next.js App RouterでAPIの処理を書く場所 |
| `route.ts` | Route Handlerを書くファイル |

厳密な歴史やNext.jsのバージョン差を最初から覚える必要はありません。

AIアプリ開発では、まず「画面で入力を受け取り、Route Handlerでサーバー側処理を行い、AI APIを呼ぶ」と理解すると迷いにくくなります。

## AIアプリでAPI Routeが必要な理由

AIアプリでAPI Routeが重要なのは、AI APIキーを守るためです。

ブラウザ側のJavaScriptは、ユーザーの手元で動きます。そのため、ブラウザ側にAPIキーを書いてしまうと、ユーザーから見えてしまう可能性があります。

一方、API RouteやRoute Handlerはサーバー側で動きます。

つまり、APIキーをサーバー側だけで読み込み、ブラウザには出さない構成にできます。

| 悪い例 | 何が危ないか |
| --- | --- |
| ブラウザ側でAI APIキーを使う | APIキーが見える可能性がある |
| 入力をそのままAI APIへ送る | 長すぎる入力や空入力でコストやエラーが増える |
| エラーをそのまま画面に出す | ユーザーに分かりにくく、内部情報が出ることもある |
| ログを残さない | 失敗時に原因を調べにくい |

API Routeは、AI APIを安全に使うための境界線です。

## 基本の流れ

AIアプリの基本の流れは、次のように分けて考えると分かりやすくなります。

| 順番 | 場所 | 担当すること |
| --- | --- | --- |
| 1 | ブラウザ | ユーザーが質問や文章を入力する |
| 2 | ブラウザ | API Routeへ入力内容を送る |
| 3 | API Route | 入力が空でないか、長すぎないか確認する |
| 4 | API Route | 環境変数からAPIキーを読み込む |
| 5 | API Route | AI APIを呼び出す |
| 6 | API Route | 結果またはエラーを画面に返す |
| 7 | ブラウザ | 結果をユーザーに表示する |

このように役割を分けると、画面は「入力と表示」に集中できます。

API Routeは「安全確認とAI API呼び出し」に集中できます。

## 最小コード例

Next.js App RouterでRoute Handlerを書く場合、イメージは次のようになります。

これは説明用の最小例です。実際のアプリでは、エラー処理やAI API呼び出し部分をもう少し丁寧に作ります。

```ts
// app/api/chat/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const message = String(body.message ?? "");

  if (!message.trim()) {
    return Response.json(
      { error: "message is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "AI API key is not configured" },
      { status: 500 },
    );
  }

  // ここでAI APIを呼び出す
  // const result = await callAiApi({ apiKey, message });

  return Response.json({
    answer: "ここにAI APIの結果を返します",
  });
}
```

この例で大事なのは、`OPENAI_API_KEY` をブラウザ側ではなくRoute Handler側で読んでいる点です。

画面側は、このAPI Routeに対して `fetch("/api/chat")` のようにリクエストを送るだけにします。

## API Routeで確認すること

AI APIを呼び出す前に、API Routeでは最低限次の確認をします。

| 確認項目 | 目的 |
| --- | --- |
| 入力が空でないか | 無駄なAI API呼び出しを避ける |
| 入力が長すぎないか | コスト増加やタイムアウトを避ける |
| APIキーが設定されているか | 本番環境だけ失敗する問題を早く見つける |
| AI APIが失敗した場合 | 画面へ分かりやすいエラーを返す |
| ログに秘密情報が出ていないか | APIキーや個人情報を守る |

初心者のうちは、AI APIを呼ぶコードを書くことに意識が向きがちです。

しかし、本番に近い使い方をするなら「呼ぶ前に確認する」「失敗したときに返す」「後で調べられるようにする」ことも同じくらい大切です。

## よくある勘違い

API Routeまわりでは、次のような勘違いがよくあります。

| 勘違い | 正しい考え方 |
| --- | --- |
| 画面から直接AI APIを呼んでもよい | APIキー保護のため、サーバー側APIを経由する |
| API RouteはAI APIそのもの | API Routeは自分のアプリ側の入り口。AI APIは外部のAIサービス |
| `.env` に書けばどこでも安全 | ブラウザ側で読める形にすると危険。サーバー側だけで使う |
| エラーはAI API側の問題だけ | 入力、環境変数、サーバー処理、ネットワークも原因になる |
| 動けば入力チェックはいらない | 長すぎる入力や空入力はコストや品質に影響する |

API Routeは、AI APIをただ中継するだけの場所ではありません。

安全に呼ぶための準備、入力の整形、失敗時の扱いを決める場所です。

## 公開前チェックリスト

AIアプリのAPI Routeを作ったら、公開前に次を確認します。

- [ ] APIキーをブラウザ側のコードに書いていない
- [ ] APIキーはサーバー側の環境変数から読んでいる
- [ ] 入力が空のときにAI APIを呼ばない
- [ ] 入力が長すぎるときの制限を決めている
- [ ] AI API失敗時に分かりやすいエラーを返している
- [ ] APIキーや個人情報をログに出していない
- [ ] 本番環境にも必要な環境変数を設定している

このチェックができていれば、最初のAIアプリとしてはかなり安全な形に近づきます。

## 関連記事

- [Next.jsでAIアプリを作る基本構成：画面・API・AI API・ログの役割](/articles/nextjs-ai-app-basic-architecture)
- [OpenAI APIを使ったAIアプリ開発の始め方](/articles/openai-api-first-setup)
- [AI APIの料金を見積もる方法：トークン・実行回数・月間コストの考え方](/articles/ai-api-cost-estimation-guide)

## まとめ

API Routeは、画面とサーバー側処理をつなぐ入り口です。

AIアプリでは、API RouteやRoute Handlerを使って、APIキーをサーバー側に置き、入力チェックを行い、AI APIの結果を画面へ返します。

最初は難しく見えますが、役割は大きく分けると「受け取る」「確認する」「AI APIを呼ぶ」「返す」の4つです。

この境界を理解しておくと、AI APIキーの漏えいや、本番環境での原因不明なエラーを避けやすくなります。
