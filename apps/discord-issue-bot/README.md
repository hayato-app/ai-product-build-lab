# Discord Issue Bot

DiscordからGitHub Issueを作成し、open Issue / open PRを確認するための最小Botです。

このBotは「GitHub Issue作成係」です。Codexの直接実行、ファイル編集、push、VPS操作、記事公開、PRマージは行いません。

## Commands

- `/issue`: Codex向けの一般作業Issueを作成します。
- `/article-review`: 既存記事またはドラフト記事の改善Issueを作成します。
- `/article-new`: 新規記事下書きの作成Issueを作成します。
- `/help`: 利用できるコマンドと安全境界を表示します。
- `/status`: 直近のopen Issueとopen PRを表示します。
- `/pr`: 直近のopen PRを表示します。

## Required Environment Variables

`.env.example`を参考に、実行環境で以下を設定してください。

- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `DISCORD_GUILD_ID`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_ISSUE_TOKEN`

任意で以下を設定できます。未設定の場合は制限しません。

- `DISCORD_ALLOWED_USER_IDS`: カンマ区切りの許可ユーザーID
- `DISCORD_ALLOWED_CHANNEL_IDS`: カンマ区切りの許可チャンネルID

`.env`や実トークンはコミットしないでください。GitHub tokenは対象リポジトリへのIssue作成と、Issue / Pull Requestの読み取りに必要な最小権限だけを付与してください。

## Local Setup

```bash
npm install
npm run build
npm run register-commands
npm start
```

Slash Commandの登録はBot起動時には行いません。コマンド定義を変更したときだけ、`npm run build`の後に`npm run register-commands`を実行してください。

`DISCORD_GUILD_ID`が設定されている場合は対象サーバーのGuild Commandとして登録します。未設定の場合はGlobal Commandとして登録します。

## VPS Update Flow

```bash
git pull
cd apps/discord-issue-bot
npm install
npm run build
npm run register-commands
sudo systemctl restart discord-issue-bot
sudo systemctl status discord-issue-bot --no-pager
```

コマンド定義を変えていない更新では、`npm run register-commands`は省略できます。

## Safety Boundary

Botが行うこと:

- Discord Slash Commandを受け取る
- GitHub Issue本文を生成する
- GitHub Issueを作成する
- open Issue / open PRを表示する

Botが行わないこと:

- Codexを直接実行する
- リポジトリのファイルを編集する
- commit / pushする
- PRを作成またはマージする
- VPSにSSHする
- Dockerを操作する
- 記事を公開する

Issue作成後の作業は、`AGENTS.md`と`docs/operations/codex-issue-workflow.md`の承認フローに従って進めます。
