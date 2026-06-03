# Candidate Issue to Brief Flow

This document defines how Codex should turn a GitHub Issue created by
`/article-candidate-select` into an article brief.

The purpose is to keep smartphone candidate selection useful without allowing
Discord or Codex to skip the approval flow.

## Scope

This flow applies when a GitHub Issue contains an article candidate selected
from `docs/article-candidates`.

The Issue is a request to prepare an article brief. It is not approval to create
a draft article, generate a thumbnail, publish an article, or deploy changes.

## Standard Flow

1. User checks candidates in Discord with `/article-candidates`.
2. User creates an Issue with `/article-candidate-select`.
3. User asks Codex to read the Issue.
4. Codex reads:
   - the GitHub Issue title and body
   - `AGENTS.md`
   - `docs/project-brief.md`
   - all documents under `docs/editorial`
   - `docs/operations/article-candidate-flow.md`
   - `docs/operations/codex-issue-workflow.md`
   - this document
5. Codex confirms the selected candidate number and source candidate file.
6. Codex checks existing published articles and existing drafts for duplication.
7. Codex presents a Japanese implementation plan for creating an article brief.
8. User explicitly approves the plan.
9. Codex creates one brief under `docs/article-briefs`.
10. Codex summarizes the created brief path and verification.

## Required Issue Fields

The Issue should include:

- Source candidate file
- Candidate number
- Title
- Pillar
- Category
- Target reader
- Search intent
- Reader problem
- Proposed angle
- Existing overlap
- Internal link candidates
- Thumbnail idea
- Fact check
- Candidate priority
- User note when provided

If the Issue is missing critical candidate context, Codex should ask the user to
confirm the missing information before creating a brief.

## Brief Creation Rules

When creating a brief from a candidate Issue, Codex should:

- Create only one brief unless the Issue clearly selects multiple candidates.
- Store the brief under `docs/article-briefs`.
- Use a stable slug-like filename.
- Preserve the candidate context from the Issue.
- Add draft creation notes.
- Add required reading references.
- Mention that draft creation still requires user approval.

Codex may use:

```bash
node scripts/create-article-brief-from-candidate.mjs --source docs/article-candidates/2026-06-02.md --candidate 1
```

If the Issue contains enough candidate details but the source candidate file is
not available, Codex may create the brief manually from the Issue body after
explaining that in the implementation plan.

## Safety Boundary

This flow does not allow:

- Automatic draft creation.
- Thumbnail generation.
- Article publication.
- Moving files into `apps/web/src/content/articles`.
- Changing existing slugs or URLs.
- Running VPS commands from Discord.
- Treating Issue creation as implementation approval.

After the brief is created, draft scaffold creation and article writing should
follow separate approval steps.

## Completion Criteria

The candidate Issue to brief step is complete when:

- A brief exists under `docs/article-briefs`.
- The brief preserves the selected candidate context.
- The brief clearly says it is not a draft or public article.
- The final summary states that no draft, thumbnail, or published article was
  created.
