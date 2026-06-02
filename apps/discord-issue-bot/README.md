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
- `/article-candidates`: 最新の記事候補を表示します。Issue作成は行いません。
- `/article-candidate-select`: 選択した記事候補からGitHub Issueを作成します。

## MVP Acceptance Criteria

Phase 22のMVPは、以下を満たす状態を完了条件とします。

- Discordから`/issue`で一般作業Issueを作成できる。
- Discordから`/article-review`で既存記事改善Issueを作成できる。
- Discordから`/article-new`で新規記事下書きIssueを作成できる。
- `/status`で直近のopen Issueとopen PRを確認できる。
- `/pr`で直近のopen PRを確認できる。
- `/article-candidates`で最新の記事候補を確認できる。
- `/article-candidate-select`で選択した記事候補をGitHub Issue化できる。
- `/help`でBotの安全境界を確認できる。
- Slash Command登録は`npm run register-commands`で手動実行できる。
- Bot起動時にSlash Command登録を自動実行しない。
- `.env`や実トークンをコミットしない。
- BotはIssue作成と状態確認だけを行い、push、VPS操作、PRマージ、記事公開は行わない。

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

## Smartphone Operation Flow

1. Discordで`/issue`、`/article-review`、または`/article-new`を実行します。
2. BotがGitHub Issueを作成し、Issue URLを返します。
3. CodexはIssue内容、`AGENTS.md`、`docs/operations/codex-issue-workflow.md`を読んで作業計画を提示します。
4. ユーザーがスマホから「OK」「進めてください」などで承認します。
5. Codexが作業し、必要に応じてPRを作成します。
6. ユーザーがスマホでPRを確認し、問題なければマージします。

Issue作成は作業開始の合図ではありません。Codexは必ず承認フローに従います。

## Article Candidate Selection Flow

```txt
/article-candidates
/article-candidates candidate:1
/article-candidate-select candidate:1 note:初心者向けに詳しく
```

`/article-candidate-select` は選択した候補をGitHub Issue化するだけです。
Botはbrief作成、draft作成、本文作成、push、VPS操作、記事公開を行いません。

## Safety Boundary

Botが行うこと:

- Discord Slash Commandを受け取る
- GitHub Issue本文を生成する
- GitHub Issueを作成する
- open Issue / open PRを表示する
- 最新の記事候補を表示する
- 選択された記事候補をGitHub Issue化する

Botが行わないこと:

- Codexを直接実行する
- リポジトリのファイルを編集する
- commit / pushする
- PRを作成またはマージする
- VPSにSSHする
- Dockerを操作する
- 記事を公開する
- 記事候補を自動承認する
- article briefやdraft記事を作成する

Issue作成後の作業は、`AGENTS.md`と`docs/operations/codex-issue-workflow.md`の承認フローに従って進めます。
