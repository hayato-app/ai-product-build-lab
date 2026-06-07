# Article Candidate Refresh Flow

This document defines the weekly article candidate refresh operation for AI
Product Build Lab.

The purpose is to keep evergreen article topic stock healthy without allowing
automated draft creation or automated publishing.

## Operating Model

Use an independent Codex automation as the weekly trigger.

The automation should run separately from ordinary chat threads. It may prepare
a weekly candidate Markdown file after user approval. It must not create article
drafts, publish articles, merge changes, or run VPS commands.

Recommended schedule:

```txt
Every Monday at 08:00 JST
```

## Weekly Goal

Each weekly refresh should prepare enough candidate ideas to keep the editorial
queue healthy.

Recommended target:

- 10 to 20 candidate ideas when the stock is low.
- 5 to 10 candidate ideas when enough unused candidates already exist.
- Prioritize practical beginner, troubleshooting, tool introduction,
  terminology explanation, and builder-facing evergreen topics.
- Exclude daily AI news candidates. Time-sensitive news belongs in
  `docs/operations/ai-news-collection-flow.md`.

## Required Inputs

Before proposing new candidates, check:

- `AGENTS.md`
- `docs/project-brief.md`
- `docs/editorial`
- `docs/operations/article-candidate-flow.md`
- Existing published articles under `apps/web/src/content/articles`
- Existing drafts under `docs/article-drafts`
- Existing briefs under `docs/article-briefs`
- Existing candidates under `docs/article-candidates`

## Candidate Status

Use a status field for candidate lifecycle tracking.

Recommended status values:

- `available`: Candidate can be selected.
- `selected`: User selected the candidate for planning.
- `briefed`: A brief exists.
- `drafted`: A draft exists.
- `published`: The article was published.
- `rejected`: Candidate should not be used.
- `watch`: Keep as a future idea, but do not draft yet.

Do not delete old candidates only because they were used. Preserving them keeps
the editorial trail understandable.

## Candidate File Naming

Store weekly candidate files under:

```txt
docs/article-candidates
```

Recommended file name:

```txt
weekly-YYYY-MM-DD.md
```

Use the `weekly-` prefix for non-news or evergreen candidate pools. This allows
Discord users to review weekly candidates separately from daily AI news
candidates:

```txt
/article-candidates type:weekly
/article-candidate-select type:weekly candidate:<number>
```

Do not name weekly evergreen candidate files as `YYYY-MM-DD.md`; that file name
is reserved for daily AI news candidates.

## Candidate Format

Use this structure for each candidate:

```md
## Candidate 1

- Status: available
- Title: ...
- Pillar: ...
- Category: ...
- Target reader: ...
- Search intent: ...
- Reader problem: ...
- Proposed angle: ...
- Existing overlap: ...
- Difference from existing content: ...
- Internal link candidates: ...
- Thumbnail idea: ...
- Fact check: not_required
- Priority: high
- Draft recommendation: ...
```

## Weekly Review Output

The automation should produce:

- Current candidate stock summary.
- Topics that appear overrepresented.
- Topics that appear underrepresented.
- Recommended candidate themes to add.
- A weekly candidate file under `docs/article-candidates/weekly-YYYY-MM-DD.md`
  after user approval.
- A Japanese implementation plan if repository changes are needed.

## Safety Boundary

The weekly refresh does not allow:

- Automatic candidate file creation without user approval.
- Automatic draft creation.
- Automatic thumbnail generation.
- Automatic publication.
- Direct VPS deployment.
- Discord direct repository edits.

Candidates are planning material only.

## Completion Criteria

A weekly refresh is complete when:

- The current stock has been reviewed.
- Candidate gaps are summarized.
- Proposed new candidates are clear and non-duplicative.
- A weekly candidate file is created only after explicit user approval.
