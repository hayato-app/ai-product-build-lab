# AI Article PR Workflow

This document defines how AI-generated article drafts should be reviewed,
prepared, and published through pull requests.

AI-generated content is useful as editorial material, but it is not publishable
until it passes human review and the article quality checklist.

## Core Principles

- AI-generated articles are drafts by default.
- Do not publish AI-generated drafts automatically.
- Keep generated drafts under `docs/article-drafts`.
- Move content into `apps/web/src/content/articles` only after review approval.
- Use pull requests for publication changes.
- Do not delete existing articles.
- Do not change existing slugs or URLs unless explicitly approved.
- Follow all documents under `docs/editorial`.
- Follow `AGENTS.md` before creating or editing files.

## Standard Workflow

1. Create or update an AI-generated draft under `docs/article-drafts`.
2. Review the draft in the admin draft review UI or directly in Markdown.
3. Mark the review result as one of:
   - needs review
   - changes requested
   - rejected
   - OK
4. Resolve fact-check requirements.
5. Confirm the article quality checklist.
6. Prepare a pull request that publishes or updates the article.
7. Run build checks when the public web app is affected.
8. Merge only after the PR review requirements are satisfied.
9. Deploy to VPS only when the live site needs the change.
10. Confirm the published article on the site.

## Review States

### Needs Review

The draft has not been reviewed enough to publish.

Do not create a publication PR unless the PR is explicitly for editorial review
only and does not move the article into public content.

### Changes Requested

The draft needs revision.

Codex may revise the draft after the user approves an implementation plan.
The draft must return to review after revision.

### Rejected

The draft should not be published in its current direction.

Do not move the draft into public content. Do not delete the draft unless the
user explicitly requests cleanup.

### OK

The draft is editorially approved.

Publication may be prepared when:

- Fact check is not required, or fact check is completed.
- Required frontmatter is present.
- The article quality checklist is satisfied.
- The target slug and URL are confirmed.

## Fact-Check Rules

Set or keep a fact-check requirement when an article includes:

- Time-sensitive claims
- Product prices or plans
- API model availability
- Legal, financial, medical, or security-sensitive claims
- News commentary
- External service behavior that may change

Publication is blocked when fact check is required but incomplete.

Fact check should confirm:

- Dates are specific and accurate.
- Product names and feature names are current.
- Claims are not overstated.
- Links and references are still valid when used.
- The article clearly distinguishes fact, recommendation, and opinion.

## Publication PR Requirements

When preparing a PR that publishes an article, include:

- Source draft path, such as `docs/article-drafts/example.md`.
- Target public article path, such as
  `apps/web/src/content/articles/example.md`.
- Review result.
- Fact-check status.
- Summary of content changes.
- Category and tag confirmation.
- Internal links added or reviewed.
- Article quality checklist summary.
- Build result.
- Remaining manual review points.
- VPS deployment requirement.

## Merge OK Conditions

Merge is allowed only when:

- The draft review result is OK.
- Fact check is not required or is completed.
- `title`, `description`, `publishedAt`, `updatedAt`, `category`, and `tags`
  are present.
- The category follows `docs/editorial/category-policy.md`.
- Internal links follow `docs/editorial/internal-link-policy.md`.
- The article has practical value for AI application or product development.
- Beginner articles explain terms clearly.
- Troubleshooting articles include usable investigation and solution steps.
- News commentary has enough context and date clarity.
- `npm run build` passes when publishing into the web app.
- The PR changed only the expected files.

## Merge Blockers

Do not merge when:

- The article is still thin or generic.
- The article duplicates an existing published article without a distinct angle.
- Fact check is required but incomplete.
- Required frontmatter is missing.
- The PR changes slugs, URLs, or Markdown structure unexpectedly.
- The PR includes unrelated UI, tool, SaaS, login, payment, or dashboard work.
- The PR includes secrets, `.env`, private connection information, or local-only
  files.
- Build checks fail without an approved exception.

## Codex Responsibilities

When Codex handles AI article publication work, it must:

- Read `AGENTS.md` before planning.
- Read `docs/project-brief.md`.
- Read all documents under `docs/editorial`.
- Read this workflow.
- Present a Japanese implementation plan before editing.
- Wait for explicit approval.
- Preserve existing articles.
- Preserve existing slugs and URLs unless explicitly approved.
- Keep generated content in draft until review approval.
- Report verification results clearly.

## Smartphone Review Notes

When reviewing from a smartphone:

- Check changed files first.
- Confirm the article is moving from the expected draft path.
- Confirm no unrelated files changed.
- Confirm the PR summary lists review result and fact-check status.
- Confirm build status or Codex verification notes.
- Defer merge to PC review if the article contains many time-sensitive claims,
  complex technical claims, or broad file changes.

## VPS Deployment

VPS deployment is needed after merge when:

- A new public article is added.
- A public article is updated.
- Article rendering behavior changes.
- Draft review UI behavior changes.

VPS deployment is usually not needed when:

- Only draft Markdown changes.
- Only operations documents change.
- Only editorial planning documents change.

Do not trigger VPS commands from Discord.

## Completion Criteria

An AI-generated article is safely published when:

- It started as a draft.
- It passed review.
- Fact check is resolved.
- The quality checklist is satisfied.
- A PR clearly documented the publication.
- Required build checks passed.
- The PR was merged by the user.
- The live site was updated when needed.
