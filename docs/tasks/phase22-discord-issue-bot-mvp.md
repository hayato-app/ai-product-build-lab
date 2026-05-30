# Phase 22: Discord Issue Bot MVP

## Purpose

Prepare a minimal Discord Bot that lets the user create GitHub Issues from a smartphone and check current GitHub work status without giving the bot direct execution privileges.

This phase completes the MVP boundary for smartphone-based work requests.

## Current MVP Scope

The bot is allowed to:

- Receive Discord Slash Commands.
- Create GitHub Issues for Codex work requests.
- Create GitHub Issues for existing article improvement requests.
- Create GitHub Issues for new draft article requests.
- Show recent open Issues and open Pull Requests.
- Show help text that explains the safe operating boundary.

The bot is not allowed to:

- Run Codex directly.
- Edit repository files.
- Commit or push changes.
- Create, merge, or close Pull Requests.
- SSH into the VPS.
- Run Docker or deployment commands.
- Publish articles.
- Store or print secrets.

## Implemented Commands

- `/issue`
- `/article-review`
- `/article-new`
- `/help`
- `/status`
- `/pr`

## Required Environment

The runtime environment must provide:

- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `DISCORD_GUILD_ID`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_ISSUE_TOKEN`

Optional access restrictions:

- `DISCORD_ALLOWED_USER_IDS`
- `DISCORD_ALLOWED_CHANNEL_IDS`

## Operations

Use this command only when Slash Command definitions change:

```bash
npm run register-commands
```

Normal bot startup should only run:

```bash
npm start
```

On VPS:

```bash
git pull
cd apps/discord-issue-bot
npm install
npm run build
sudo systemctl restart discord-issue-bot
sudo systemctl status discord-issue-bot --no-pager
```

If command definitions changed, run `npm run register-commands` after `npm run build` and before restarting the service.

## Acceptance Checklist

- `/issue` creates a GitHub Issue.
- `/article-review` creates a GitHub Issue.
- `/article-new` creates a GitHub Issue.
- `/help` returns the command list and safety boundary.
- `/status` returns recent open Issues and open PRs.
- `/pr` returns recent open PRs.
- The bot does not register Slash Commands on every startup.
- The bot service remains active after restart.
- `.env` is not committed.
- User approval is still required before Codex edits files or implements code.

## Next Phase Candidates

- Improve command input validation and Japanese field guidance.
- Add issue label normalization.
- Add a small troubleshooting guide for Discord interaction errors.
- Add GitHub Actions or smoke checks for the bot package.
