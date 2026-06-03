# Article Briefs

This directory stores article briefs created from approved article candidates.

Article briefs are planning documents for draft creation. They are not article
drafts and should not be published directly.

## Purpose

Use article briefs as a safe intermediate step between candidate selection and
draft writing.

The default operation is:

1. Generate or write article candidates under `docs/article-candidates`.
2. User selects the candidates that should move forward.
3. Create article briefs only for the selected candidates.
4. User reviews the brief or asks Codex to create a Japanese implementation
   plan based on the brief.
5. After explicit approval, Codex may create a draft under `docs/article-drafts`.

## File Naming

Recommended names:

```txt
<slug>.md
issue-<number>-<slug>.md
YYYY-MM-DD-candidate-<number>.md
```

## Brief Format

Each brief should include:

- Source candidate file
- Candidate number
- Title
- Proposed slug
- Pillar
- Category
- Target reader
- Search intent
- Reader problem
- Proposed angle
- Existing overlap
- Difference from existing content
- Internal link candidates
- Thumbnail idea
- Fact check
- Priority
- Draft recommendation
- Draft creation notes
- Required reading before draft creation

## Rules

- Do not create briefs for all candidates automatically.
- Do not publish brief documents.
- Do not use brief documents as public article content.
- Creating a brief does not mean the article draft is approved.
- Draft creation still requires the approval flow in `AGENTS.md`.

## Local Generator

Phase 28 adds a local brief generator:

```bash
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1
```

Common options:

```bash
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1,3
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1 --slug beginner-environment-variables-ai-apps
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1 --out-dir docs/article-briefs
```

Use `--force` only when intentionally overwriting an existing brief.

The generator creates briefs only. It does not create article drafts, generate
thumbnail images, publish articles, or call external AI APIs.

## Creating Draft Scaffolds From Briefs

Phase 29 adds a local draft scaffold generator:

```bash
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/ai-app-development-environment-variables.md
```

The draft scaffold is saved under `docs/article-drafts`.

The scaffold is not a finished article. It is a review-only Markdown draft
structure that still requires article writing, thumbnail creation, internal link
checks, and final review before publication.

The generator refuses to overwrite existing drafts by default and never
overwrites published articles.

Use `--dry-run` when checking the generated Markdown before writing a draft:

```bash
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/ai-app-development-environment-variables.md --dry-run
```

Generated draft scaffolds include review-oriented frontmatter, source Issue
context when available, source brief context, thumbnail TODOs, internal link
TODOs, and fact-check TODOs.

## Creating Briefs From Candidate Selection Issues

Phase 33 defines the standard GitHub Issue based flow:

```txt
Discord /article-candidate-select
  -> GitHub Issue
  -> Codex implementation plan
  -> User approval
  -> article brief under docs/article-briefs
```

When starting from an Issue, follow:

```txt
docs/operations/candidate-issue-to-brief-flow.md
```

The Issue is not permission to create a draft article. It is only a request for
Codex to plan brief creation and wait for user approval.

## Brief to Draft Review Handoff

When a brief already has a corresponding draft, do not create a duplicate
draft. Instead, record the relationship between:

- the GitHub Issue
- the article brief
- the review-only draft

The draft should keep its `review_status`, `review_result`, `review_notes`,
and fact-check fields clear enough for the admin draft review page.

After the handoff is recorded, the next step is human review in the draft
review page. Publication still requires a separate publishing decision.
