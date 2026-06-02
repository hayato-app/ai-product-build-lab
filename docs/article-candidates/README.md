# Article Candidates

This directory stores article candidate lists.

Candidate lists are planning documents. They are not article drafts and should
not be published directly.

## Purpose

Use this directory to collect and review possible article ideas before creating
drafts.

The default operation is:

1. Generate or write candidate ideas.
2. Check overlap with existing articles and drafts.
3. Save a candidate list in this directory.
4. User selects which candidates should become drafts.
5. Codex creates only the approved drafts under `docs/article-drafts`.

## File Naming

Recommended names:

```txt
YYYY-MM-DD.md
weekly-YYYY-MM-DD.md
issue-<number>-candidates.md
```

Examples:

```txt
2026-06-02.md
weekly-2026-06-02.md
issue-15-candidates.md
```

## Candidate Format

Use this format for each candidate:

```md
## Candidate 1

- Title:
- Pillar:
- Category:
- Target reader:
- Search intent:
- Reader problem:
- Proposed angle:
- Existing overlap:
- Difference from existing content:
- Internal link candidates:
- Thumbnail idea:
- Fact check:
- Priority:
- Draft recommendation:
```

## Field Guidance

- `Title`: Draft title candidate. It can change during article creation.
- `Pillar`: One of the three content pillars.
- `Category`: Primary category from `docs/editorial/category-policy.md`.
- `Target reader`: Who the article is for.
- `Search intent`: What the reader is trying to understand or solve.
- `Reader problem`: The practical pain point.
- `Proposed angle`: How this article should approach the topic.
- `Existing overlap`: Related published articles or drafts.
- `Difference from existing content`: Why this is not a duplicate.
- `Internal link candidates`: Useful related article or tool links.
- `Thumbnail idea`: Visual concept for the default draft thumbnail.
- `Fact check`: `required`, `not_required`, or `codex_decides`.
- `Priority`: `high`, `normal`, or `low`.
- `Draft recommendation`: Whether Codex recommends creating this draft now.

## Rules

- Do not create drafts for every candidate automatically.
- Do not publish candidate documents.
- Do not use candidate documents as public article content.
- Prefer fewer strong candidates over many vague candidates.
- Include enough context so the user can approve or reject candidates from a
  smartphone.

## Approval

The user must explicitly select candidates before Codex creates article drafts.

Good approval examples:

- `Candidate 1 only`
- `Create Candidate 1 and 3`
- `Use Candidate 2, but make it beginner-focused`

After selection, Codex should present a Japanese implementation plan before
creating draft files.

## Local Generator

Phase 27 adds a local rule-based generator:

```bash
node scripts/generate-article-candidates.mjs
```

Common options:

```bash
node scripts/generate-article-candidates.mjs --count 5
node scripts/generate-article-candidates.mjs --pillar beginner
node scripts/generate-article-candidates.mjs --out docs/article-candidates/2026-06-02.md
```

The generator creates candidate lists only. It does not create article drafts,
generate thumbnails, publish articles, or call external AI APIs.

## Creating Briefs From Selected Candidates

Phase 28 adds a local brief generator for candidates the user has selected:

```bash
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1
```

The brief is saved under `docs/article-briefs`.

The brief generator does not create article drafts. It creates an intermediate
planning document that can be used after Codex presents a Japanese
implementation plan and the user approves draft creation.
