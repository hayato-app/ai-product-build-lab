# Phase 21: Discord Bot Operations

## Purpose

Improve the Discord Issue Bot so it is easier to operate safely from a smartphone while keeping the bot limited to GitHub Issue creation and read-only status checks.

## Scope

- Keep the bot as an Issue creation assistant.
- Do not allow the bot to edit files, push commits, run Codex, run VPS commands, publish articles, or merge PRs.
- Separate slash command registration from normal bot startup.
- Add read-only operational commands.
- Add optional user and channel allowlists.

## Implemented Commands

- `/issue`: Create a general Codex task Issue.
- `/article-review`: Create an Issue for improving an existing article or draft.
- `/article-new`: Create an Issue for a new draft article.
- `/help`: Show the bot's commands and safety boundary.
- `/status`: Show recent open Issues and open PRs.
- `/pr`: Show recent open PRs.

## Operational Rules

- Slash commands are registered manually with `npm run register-commands`.
- The systemd service should only start the bot runtime with `npm start`.
- Command registration should be run after command definition changes, not on every bot restart.
- Access can be restricted with `DISCORD_ALLOWED_USER_IDS` and `DISCORD_ALLOWED_CHANNEL_IDS`.
- If allowlists are empty, the bot accepts commands from any user/channel where the bot is available.

## Verification

Run from `apps/discord-issue-bot`:

```bash
npm run typecheck
npm run build
```

When command definitions change, run:

```bash
npm run register-commands
```

On VPS, restart and verify the service:

```bash
sudo systemctl restart discord-issue-bot
sudo systemctl status discord-issue-bot --no-pager
```
