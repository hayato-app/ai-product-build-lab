---
title: "AI APIのレスポンスが遅い時の原因と対策"
description: "AI APIの応答が遅いときに確認するべき原因、ログの見方、切り分け手順、実装上の対策を実用向けに整理します。"
publishedAt: "2026-05-28"
updatedAt: "2026-05-28"
pillar: "AIアプリ開発 開発手法/エラー事例・解決法紹介"
status: "draft"
review_status: "approved"
review_result: "ok"
reviewed_at: "2026-05-28T14:00:13.710Z"
review_notes: ""
priority: "high"
estimated_publish_ready: false
needs_fact_check: false
fact_check_status: "completed"
category: "エラー解決"
tags:
  - "AI API"
  - "パフォーマンス"
  - "ログ"
  - "エラー解決"
---

## 結論

AI APIのレスポンスが遅いときは、まず「AI APIそのものが遅い」と決めつけず、処理を分解して確認します。

見るべきポイントは次の4つです。

- リクエストを送る前の処理が遅い
- AI APIの応答待ちが長い
- 出力が長すぎる
- 画面表示や保存処理が詰まっている

ログで時間を分けて測ると、改善すべき場所が見えます。

## 対象読者

- AI APIを組み込んだアプリの応答が遅くて困っている人
- Next.jsなどでAIアプリを作っている人
- タイムアウト、待ち時間、体感速度を改善したい人
- どこから調べればよいか分からない人

## よくある症状

| 症状 | まず疑うこと |
| --- | --- |
| ボタンを押してからずっと待つ | 入力処理、API待ち、画面表示のどこかが詰まっている |
| ときどきだけ遅い | 入力量、外部API、ネットワーク、リトライを確認する |
| 長文生成だけ遅い | 出力トークンが多すぎる可能性がある |
| ローカルでは速いが本番で遅い | サーバー環境、リージョン、ログ、タイムアウトを確認する |

## 切り分けの基本

最初に、処理時間を3つに分けて記録します。

```mermaid
sequenceDiagram
  participant UI as 画面
  participant Server as サーバー処理
  participant AI as AI API
  UI->>Server: リクエスト送信
  Server->>Server: 入力チェック・前処理
  Server->>AI: AI API呼び出し
  AI-->>Server: 応答
  Server->>Server: 保存・整形
  Server-->>UI: 結果表示
```

この中で、どこに時間がかかっているかをログで分けます。

## ログで確認する項目

サーバー側では、少なくとも次の時刻を記録します。

```ts
const startedAt = Date.now();

console.log("ai.request.start", {
  inputLength: userInput.length,
});

const apiStartedAt = Date.now();
const result = await callAiApi(userInput);
const apiFinishedAt = Date.now();

console.log("ai.request.finish", {
  apiMs: apiFinishedAt - apiStartedAt,
  totalMs: Date.now() - startedAt,
  outputLength: result.length,
});
```

見るべき値は `apiMs` と `totalMs` の差です。

- `apiMs` が長い: AI API待ちが主因
- `totalMs` だけ長い: 前処理、後処理、保存、画面表示が主因
- `outputLength` が大きい: 出力を短くする余地がある

## 原因別の対策

| 原因 | 対策 |
| --- | --- |
| 入力が長すぎる | 必要な情報だけ送る、履歴を要約する |
| 出力が長すぎる | 文字数、形式、見出し数を指定する |
| リトライが多い | 最大回数と待機時間を決める |
| 保存処理が重い | AI応答表示と保存処理を分ける |
| 画面が待ちっぱなし | ローディング、進行中表示、キャンセル導線を用意する |

## すぐ使えるプロンプト調整例

出力が長すぎる場合は、プロンプトで制限します。

```txt
以下の条件で回答してください。
- 800文字以内
- 見出しは最大3つ
- 箇条書き中心
- 不明な点は推測せず「追加確認が必要」と書く
```

JSONで受けたい場合は、形式も指定します。

```txt
次のJSON形式だけで返してください。
{
  "summary": "100文字以内の要約",
  "actions": ["次に行うこと1", "次に行うこと2"]
}
```

## UXでできる改善

AI APIの応答時間をゼロにはできません。体感速度を改善する設計も必要です。

- 実行中ボタンを無効化する
- 「生成中」と表示する
- キャンセルできるようにする
- 長文はストリーミング表示にする
- 失敗時に再実行ボタンを出す

## 確認チェックリスト

- API呼び出し前後の時刻をログに残している
- 入力文字数と出力文字数を確認している
- タイムアウトとリトライ回数を決めている
- 長文出力に上限を設けている
- ユーザーに待ち時間が分かるUIを出している
- 失敗時に原因が分かるログを残している

## 関連記事

- [Next.jsでAIアプリを作る基本構成](/articles/nextjs-ai-app-basic-architecture)
- [AI APIコスト見積もりガイド](/articles/ai-api-cost-estimation-guide)

## まとめ

AI APIのレスポンスが遅いときは、まず処理時間を分けて測ります。AI API待ちなのか、前処理なのか、保存や画面表示なのかを分けるだけで、対策はかなり具体的になります。

速度改善は、API設定だけではなく、入力削減、出力制御、ログ設計、UI設計を組み合わせて進めるのが現実的です。