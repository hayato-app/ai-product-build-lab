# Discord Issue Bot Design

This document defines the initial design for a Discord bot that helps create
GitHub Issues from a smartphone.

The bot is intentionally limited. It should only collect structured inputs and
create GitHub Issues. Codex work must still happen through the Issue and pull
request workflow defined in `docs/operations/codex-issue-workflow.md`.

## Purpose

The bot should make it easier to request Codex work when the user is away from
a PC.

Primary goals:

- Create well-structured GitHub Issues from Discord slash commands.
- Reduce missing information in smartphone-created requests.
- Keep Codex work reviewable and approval-based.
- Avoid direct repository, VPS, or publishing operations from Discord.

## Initial Scope

The first bot should support only GitHub Issue creation.

Initial commands:

- `/issue`
- `/article-review`
- `/article-new`

Read-only helper commands can be added later:

- `/status`
- `/pr`

## Explicit Non-Goals

The bot must not:

- Execute Codex directly.
- Edit repository files.
- Push commits.
- Create branches.
- Merge pull requests.
- Run VPS commands.
- Restart Docker.
- Publish articles.
- Move draft articles into the public article directory.
- Store API keys or secrets in Issue bodies.

## Command Design

### `/issue`

Creates a general Codex task Issue.

Recommended inputs:

- `summary`: short task summary
- `purpose`: why the task is needed
- `scope`: target page, feature, file, or area
- `allowed_changes`: what may be changed
- `forbidden_changes`: what must not be changed
- `verification`: expected verification method

Generated Issue should map to the `Codex task` Issue template.

### `/article-review`

Creates an Issue to improve an existing published article or draft.

Recommended inputs:

- `slug`: target article or draft slug
- `source`: `draft article`, `published article`, or `unsure`
- `goal`: improvement goal
- `additions`: content that should be added
- `internal_links`: candidate internal links
- `fact_check`: whether fact check is required
- `forbidden_changes`: slug, URL, or content constraints

Generated Issue should map to the `Article review / improvement` Issue
template.

### `/article-new`

Creates an Issue to request a new draft article.

Recommended inputs:

- `topic`: article topic
- `category`: expected category
- `target_reader`: target reader
- `search_intent`: reader problem or search intent
- `difference`: difference from existing articles
- `internal_links`: candidate internal links
- `fact_check`: whether fact check is required

Generated Issue should map to the `New draft article` Issue template.

### `/status`

Optional later command.

Shows a short list of open Issues and open pull requests.

The command should be read-only.

### `/pr`

Optional later command.

Shows the latest pull request or pull requests waiting for review.

The command should be read-only.

## Generated Issue Requirements

Every Issue created by the bot should include:

- The original Discord command name.
- The structured input values.
- A note that Codex must read `AGENTS.md`.
- A note that Codex must follow `docs/operations/codex-issue-workflow.md`.
- A note that Codex must present a Japanese implementation plan before file
  creation, file editing, or code implementation.
- A note that Codex must wait for explicit user approval.
- A note that work should be submitted as a pull request when files change.

Article-related Issues should also include:

- A note to read `docs/project-brief.md`.
- A note to read all documents under `docs/editorial`.
- A note to avoid automatic publication.
- A note to preserve existing slugs and URLs unless explicitly approved.

## GitHub Permissions

Use the minimum permissions needed to create Issues.

Recommended options:

- GitHub App with repository Issues write permission.
- Fine-grained personal access token limited to the target repository and
  Issues write permission.

Avoid broad classic tokens when possible.

The bot should not require repository Contents write permission for the initial
Issue-only phase.

## Environment Variables

Expected environment variables:

- `DISCORD_BOT_TOKEN`
- `DISCORD_APPLICATION_ID`
- `DISCORD_GUILD_ID` for development or limited rollout
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_ISSUE_TOKEN` or GitHub App credentials

Secrets must not be committed to the repository.

If an `.env.example` is created in a future implementation phase, it must
contain only placeholder values.

## Error Handling

The bot should return short, actionable Discord responses.

Expected errors:

- Missing required command input
- GitHub authentication failure
- GitHub API rate limit
- Repository or Issue creation permission failure
- Network error

Error messages should not expose tokens, stack traces, or full request payloads.

## Logging Policy

Logs may include:

- Command name
- Discord user ID
- Created Issue number and URL
- GitHub API status code
- Short error category

Logs must not include:

- Discord bot token
- GitHub token
- Raw environment variables
- Private connection information
- Full Issue body if it may contain sensitive notes

## User Confirmation

For the first implementation, the bot may create Issues immediately after a
slash command submission because the Issue is only a request, not execution.

If a command becomes capable of triggering repository writes, VPS actions, or
publication in the future, a separate confirmation step must be required. Those
capabilities are outside the initial scope.

## Smartphone Operation Flow

Recommended flow:

1. User opens Discord on smartphone.
2. User runs `/issue`, `/article-review`, or `/article-new`.
3. Bot creates a GitHub Issue.
4. Codex reads the Issue.
5. Codex presents a Japanese implementation plan.
6. User approves from smartphone.
7. Codex works and creates a pull request.
8. User reviews and merges the pull request from smartphone.

## Phase 13-4 Preconditions

Before implementing the bot, confirm:

- Hosting location for the bot.
- Whether to use a GitHub App or fine-grained token.
- Target Discord server and allowed channels.
- Whether commands are limited to specific Discord user IDs or roles.
- Repository owner and repository name.
- Logging destination and retention policy.

The first implementation should remain limited to Issue creation.
