# Discord Issue Bot

DiscordからGitHub Issueを作成するための最小Botです。

このBotはIssue作成だけを行います。Codexの実行、ファイル編集、push、VPS操作、
記事公開、PRマージは行いません。

## Commands

- `/issue`: 汎用Codex作業Issueを作成します。
- `/article-review`: 既存記事またはドラフト改善Issueを作成します。
- `/article-new`: 新規記事下書きIssueを作成します。

`/status` と `/pr` は初期実装には含めていません。

## Required Environment Variables

`.env.example` を参考に、実行環境で以下を設定してください。

- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `DISCORD_GUILD_ID`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_ISSUE_TOKEN`

`.env` や実トークンはコミットしないでください。

GitHub tokenは、対象リポジトリへのIssue作成に必要な最小権限だけを付与してください。

## Local Setup

```bash
npm install
npm run build
npm start
```

起動時にSlash Commandを登録します。

`DISCORD_GUILD_ID` が設定されている場合は対象サーバーにGuild Commandとして登録します。
未設定の場合はGlobal Commandとして登録します。

## Safety Boundary

Botが行うこと:

- Discord Slash Commandを受け取る
- GitHub Issue本文を生成する
- GitHub Issueを作成する
- 作成したIssue URLをDiscordに返す

Botが行わないこと:

- Codexを直接実行する
- リポジトリファイルを編集する
- commit / pushする
- PRを作成またはマージする
- VPSにSSHする
- Dockerを操作する
- 記事を公開する

Issue作成後の作業は、`AGENTS.md` と
`docs/operations/codex-issue-workflow.md` の承認フローに従って進めます。
