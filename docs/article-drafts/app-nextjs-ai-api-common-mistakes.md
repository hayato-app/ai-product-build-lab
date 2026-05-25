---
title: "Next.jsでAI APIを呼ぶ時のよくあるミス"
pillar: "AIアプリ開発 開発手法/エラー事例・解決法紹介"
status: "draft"
category: "AIアプリ開発"
tags:
  - "Next.js"
  - "AI API"
  - "API Routes"
  - "エラー解決"
---

## この記事で扱うこと

Next.jsでAI APIを呼ぶときに起きやすい設計ミスと、その解決方法を紹介します。

## よくあるミス

もっとも危険なのは、クライアントコンポーネントから直接AI APIを呼び、APIキーをブラウザ側に出してしまうことです。APIキーは必ずサーバー側で扱います。

また、Server ComponentとClient Componentの役割を混同すると、環境変数が読めない、イベントハンドラが使えない、ビルド時にエラーになるといった問題が起きます。

## チェックポイント

- APIキーをブラウザに出していないか
- Route HandlerやServer Actionで呼び出しているか
- タイムアウト時の処理があるか
- 入力値を検証しているか
- streamingを使う場合のUI設計があるか

## 基本構成

フロントエンドは入力と表示を担当し、AI APIの呼び出しは`/api`配下のRoute Handlerに置きます。Route Handler内でAPIキーを読み、AI APIにリクエストし、必要な結果だけをクライアントに返します。

## まとめ

Next.jsでAI APIを使うときは、セキュリティ境界を意識することが重要です。APIキー、入力検証、タイムアウト、エラー処理を最初から設計に含めましょう。
