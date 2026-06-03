# Smartphone Codex Operation

This document explains the practical operating flow for requesting Codex work
from a smartphone using Discord, GitHub Issues, GitHub Pull Requests, and VPS
deployment only when needed.

The goal is to make remote operation possible without giving the Discord bot
direct write, deploy, or execution permissions.

## Current Operating Model

The current model is:

1. User creates a GitHub Issue from Discord or the GitHub mobile app.
2. Codex reads the Issue and related project documents.
3. Codex presents a Japanese implementation plan.
4. User approves the plan from smartphone.
5. Codex implements the approved scope.
6. Codex commits, pushes, and creates or updates a PR when appropriate.
7. User reviews the PR from smartphone.
8. User merges only when the review checklist is satisfied.
9. VPS is updated only when the live site or running bot needs the change.

An Issue is a work request, not an automatic execution command.

## What Already Works

The implemented Discord bot can:

- Create general Codex task Issues with `/issue`.
- Create existing article improvement Issues with `/article-review`.
- Create new draft article Issues with `/article-new`.
- Show available commands and the safety boundary with `/help`.
- Show recent open Issues and open PRs with `/status`.
- Show recent open PRs with `/pr`.
- Show latest article candidates with `/article-candidates`.
- Create candidate selection Issues with `/article-candidate-select`.

The bot is deployed on the VPS as a systemd service and runs as:

```bash
discord-issue-bot.service
```

Slash command registration is separated from normal startup. Command
registration is run manually only when command definitions change:

```bash
npm run register-commands
```

## What Is Still Manual

The following steps are not automated yet:

- Codex does not automatically monitor new GitHub Issues.
- After creating an Issue, the user still needs to ask Codex to work from that
  Issue or paste the Issue URL into the Codex thread.
- Codex still waits for explicit approval before editing files.
- PR review and merge are performed by the user.
- VPS pull, build, restart, and deployment checks are performed only when
  needed and only after approval.
- Article drafts are not automatically published.

This is intentional. The current priority is safe smartphone operation, not
full automation.

## Standard Flow: Discord to Codex

Use this flow for most smartphone requests.

1. Open Discord on smartphone.
2. Run the closest command:
   - `/issue` for general site, bot, worker, or operations tasks.
   - `/article-review` for improving an existing article or draft.
   - `/article-new` for requesting a new draft article.
   - `/article-candidates` for checking the latest article candidates.
   - `/article-candidate-select` for turning a selected candidate into a GitHub Issue.
3. Fill in the fields as specifically as possible.
4. Submit the command.
5. Confirm that the bot returns a GitHub Issue URL.
6. Open Codex and ask it to read the Issue.
7. Codex should read:
   - `AGENTS.md`
   - `docs/operations/codex-issue-workflow.md`
   - `docs/operations/smartphone-pr-review-flow.md`
   - `docs/editorial` documents for article work
   - The target files or articles
8. Codex presents a Japanese implementation plan.
9. Reply with `OK`, `進めてください`, or another clear approval only if the
   plan is acceptable.
10. Codex implements the approved scope.

## Standard Flow: GitHub App to Codex

Use this flow when Discord is unavailable or when the Issue template is easier
to fill from GitHub.

1. Open the GitHub mobile app.
2. Create a new Issue with the closest template.
3. Include target files, URLs, article slugs, allowed changes, forbidden
   changes, and expected verification.
4. Open Codex and ask it to read the Issue.
5. Codex presents a Japanese implementation plan.
6. Approve the plan only when the scope is correct.
7. Codex implements and prepares reviewable changes.

## Codex Approval Rules

Before approval, Codex may:

- Read files.
- Inspect Issues.
- Search for relevant code and documents.
- Run non-destructive read-only checks.
- Present an implementation plan.

Before approval, Codex must not:

- Create files.
- Edit files.
- Delete files.
- Commit changes.
- Push changes.
- Deploy to VPS.
- Publish articles.

Approval must be explicit. Good approval examples:

- `OK`
- `進めてください`
- `承認します`
- `その方針でお願いします`

If the plan is too broad, ask Codex to narrow it before approval.

## PR Review From Smartphone

When Codex creates or updates a PR, review the following from the GitHub mobile
app:

- PR title and summary are understandable.
- Changed files match the approved scope.
- No unexpected files are included.
- No `.env`, token, key, private IP note, or connection file is included.
- Verification results are written in the PR or Codex summary.
- Skipped verification is explained.
- Article drafts remain drafts unless publication was explicitly requested.
- The PR states whether VPS deployment is needed.

Merge from smartphone only when the change is small enough to understand and
the checklist in `docs/operations/smartphone-pr-review-flow.md` is satisfied.

Use PC review for high-risk changes such as:

- Authentication or environment handling.
- Docker, reverse proxy, or deployment changes.
- Large UI changes without clear screenshots.
- Public URL, slug, sitemap, or routing changes.
- Dependency upgrades.
- Article publication with unresolved fact-check needs.

## VPS Deployment Decision

VPS update is usually needed after:

- Public site UI changes.
- Admin draft review UI changes.
- Published article changes.
- Discord bot code changes.
- Worker or script changes that must run on the VPS.
- Docker or environment-related changes.

VPS update is usually not needed after:

- Planning documents.
- Operations documents.
- GitHub Issue templates.
- SEO strategy documents.
- Discord bot design documents.

For the public web app, the normal VPS idea is:

```bash
git pull
docker compose stop
docker compose up -d --build
docker ps
```

For the Discord bot, the normal VPS idea is:

```bash
git pull
cd apps/discord-issue-bot
npm install
npm run build
sudo systemctl restart discord-issue-bot
sudo systemctl status discord-issue-bot --no-pager
```

Run this only when the live runtime needs the change. Command definition
changes also require:

```bash
npm run register-commands
```

## Article Work Flow

For article work, use the project editorial flow:

1. Create an Issue with `/article-review` or `/article-new`.
2. Codex reads `AGENTS.md`, `docs/project-brief.md`, and `docs/editorial`.
3. Codex presents a Japanese plan.
4. User approves.
5. Codex edits existing articles or creates drafts according to the approved
   scope.
6. AI-generated or heavily revised content remains draft/review content.
7. User reviews article quality, internal links, and fact-check notes.
8. Publication happens only after explicit approval.

Article work must preserve existing slugs and URLs unless a change is
explicitly approved.

When the user's goal is to review a new draft in the VPS admin page, include the
VPS update in the approved scope:

1. Create or update the draft under `docs/article-drafts`.
2. Add the local thumbnail asset when needed.
3. Run local article checks.
4. Commit and push the change.
5. Run the VPS `git pull` and public web app rebuild/restart flow.
6. Confirm the VPS web app responds successfully.

This still does not publish the article. It only makes the review-only draft
available in the admin draft review page.

## Article Candidate Flow

When the user wants to select topics before creating drafts, use:

```txt
docs/operations/article-candidate-flow.md
```

The default approach is:

1. Create or request an article candidate list.
2. Save the list under `docs/article-candidates`.
3. User selects which candidates should become drafts.
4. Codex presents a Japanese implementation plan for selected drafts.
5. User approves.
6. Codex creates only the selected drafts and thumbnails.

Candidate generation is not the same as draft generation. The user must approve
which candidates become drafts.

## Smartphone Flow: Candidate Check

Use this flow when choosing article topics from a smartphone.

1. Run `/article-candidates` in Discord.
2. Review the candidate numbers, titles, categories, and priorities.
3. Run `/article-candidates candidate:<number>` when more detail is needed.
4. Decide which candidate should move forward.
5. Run `/article-candidate-select candidate:<number>` to create a GitHub Issue.
6. Ask Codex to read the created Issue and present a Japanese implementation
   plan.

`/article-candidates` is read-only. It does not create Issues, briefs, drafts,
or published articles.

`/article-candidate-select` creates only a GitHub Issue. It does not create
briefs, drafts, thumbnails, or published articles.

## Smartphone Flow: Candidate Issue to Brief

Use this flow after `/article-candidate-select` creates a GitHub Issue.

1. Open the created Issue URL from Discord.
2. Ask Codex to read the Issue number or URL.
3. Codex reads `docs/operations/candidate-issue-to-brief-flow.md`.
4. Codex presents a Japanese implementation plan for creating one article brief.
5. Approve only if the selected candidate, source file, and brief filename are
   correct.
6. Codex creates the brief under `docs/article-briefs`.
7. Draft scaffold creation remains a later step and needs another approval.

## Troubleshooting

If Discord command creation fails:

- Confirm the bot service is active.
- Confirm the slash commands are registered.
- Confirm the GitHub token has Issue write permission.
- Confirm the user and channel are allowed if allowlists are configured.

If `/status` or `/pr` fails:

- Confirm the GitHub token has Issue and Pull Request read permissions.
- Confirm the repository owner and repository name are correct.

If Codex starts acting on the wrong scope:

- Stop and ask Codex to restate the Issue scope.
- Ask for a revised Japanese implementation plan.
- Do not approve until the plan matches the intended task.

If VPS deployment is unclear:

- Ask Codex whether the change affects the live site or running bot.
- Deploy only when runtime behavior must change.
- Documentation-only changes usually do not need VPS deployment.

## Recommended Flow Improvements

The current flow is safe and usable, but it can be improved.

### 1. Add a Pull Request Template

Create `.github/pull_request_template.md` with:

- Linked Issue
- Scope summary
- Verification
- Screenshots when UI changed
- Article review and fact-check status
- VPS deployment needed or not

This will make smartphone PR review easier.

### 2. Improve Discord Issue Labels

Have the bot apply clearer labels such as:

- `codex-task`
- `article-review`
- `article-new`
- `site-improvement`
- `tool-improvement`
- `needs-approval`

This will make `/status` and GitHub mobile views easier to scan.

### 3. Improve Discord Command Guidance

Improve command descriptions and choices so smartphone input is easier:

- Add category choices for `/article-new`.
- Add priority choices.
- Add a field for expected verification.
- Add clearer Japanese examples in `/help`.

### 4. Add a Bot Smoke Test Checklist

Create a short checklist for VPS updates:

- Service is active.
- `/help` replies.
- `/status` replies.
- A test Issue can be created when needed.
- Test Issues are closed after confirmation.

### 5. Add Issue-to-PR Traceability

Require every PR to mention the Issue number. This makes it easier to inspect
from smartphone and later understand why a change was made.

### 6. Keep Automation Boundaries Explicit

Before adding more automation, keep this rule:

Discord may create Issues and show status. It should not directly edit files,
push commits, deploy to VPS, merge PRs, or publish articles.

## Completion Criteria

A smartphone-driven task is complete when:

- The Issue had enough context.
- Codex presented a Japanese implementation plan.
- The user explicitly approved the plan.
- Codex handled only the approved scope.
- Relevant checks passed or skipped checks were explained.
- The PR was reviewed and merged, or the changes were otherwise clearly
  summarized.
- VPS was updated only if runtime behavior needed it.
- Remaining manual checks were recorded.
