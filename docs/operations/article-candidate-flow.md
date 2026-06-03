# Article Candidate Flow

This document defines the standard flow for selecting article candidates and
turning selected candidates into reviewed draft articles.

The current approved approach is the combined A+B model:

- A: manual approval based semi-automation
- B: GitHub Issue driven operation

This keeps article expansion efficient while preserving human editorial
control.

## Purpose

AI Product Build Lab should expand articles consistently without creating thin,
duplicated, or automatically published content.

The candidate flow separates:

1. Candidate discovery
2. Candidate evaluation
3. Human selection
4. Draft creation
5. Thumbnail creation
6. Draft review
7. Publication decision

Only selected candidates become drafts.

## Safety Boundary

This flow does not allow:

- Automatic publication.
- Automatic movement from `docs/article-drafts` to `apps/web/src/content/articles`.
- Discord direct file edits.
- Discord direct push.
- Discord direct VPS commands.
- Automatic merge.
- Draft generation without human approval.

Article candidates are planning material. They are not publishable articles.

## Standard Flow

Use this as the default article expansion sequence:

1. User requests article candidates from Codex or a GitHub Issue.
2. Codex reads:
   - `AGENTS.md`
   - `docs/project-brief.md`
   - `docs/editorial`
   - `docs/seo/content-clusters.md` when relevant
   - Existing published articles
   - Existing article drafts
3. Codex creates a candidate list under `docs/article-candidates`.
4. User reviews the candidate list.
5. User explicitly selects candidates to draft.
6. If the candidate was selected through Discord, the bot creates a GitHub Issue
   with `/article-candidate-select`.
7. Codex may create article briefs under `docs/article-briefs` for the selected
   candidates.
8. Codex presents a Japanese implementation plan for the selected draft work.
9. User approves the plan.
10. Codex may create a draft scaffold from the approved brief.
11. Codex creates only the approved draft articles under `docs/article-drafts`.
12. Codex expands the scaffold into a useful article body.
13. Codex creates thumbnail images by default.
14. Drafts are reviewed in the draft review page.
15. Approved drafts may later be published through the publishing flow.

When the user wants to review the draft on the VPS admin page immediately,
include deployment-to-review in the approved work:

1. Commit and push the draft and thumbnail.
2. Run `git pull` on the VPS.
3. Rebuild/restart the public web app with Docker Compose.
4. Confirm the web app responds.
5. Ask the user to review the draft in the admin draft review page.

This deployment-to-review step does not publish the article. The draft remains
under `docs/article-drafts` and still requires human review before publication.

After Phase 36, the brief-to-draft scaffold step should use:

```bash
node scripts/create-draft-from-brief.mjs --brief docs/article-briefs/<slug>.md
```

Use `--dry-run` first when confirming the generated Markdown from a smartphone
or Issue-driven task. The generated scaffold should remain unpublished and
review-only until the draft is expanded and reviewed.

## Candidate Discovery Sources

Candidate ideas may come from:

- Three content pillars.
- Existing article gaps.
- Existing draft gaps.
- Search intent brainstorming.
- Internal link opportunities.
- Tool page support needs.
- Troubleshooting patterns.
- Reader questions.
- GitHub Issues created from Discord.
- Future Search Console or Analytics data.

Do not rely only on generic AI topic lists. Every candidate should explain why
it is useful for this site.

## Candidate Evaluation Rules

Before recommending a candidate, check:

- Does it fit one of the three content pillars?
- Does it have a clear reader problem?
- Does it overlap with an existing article or draft?
- If it overlaps, what is the distinct angle?
- Does it have useful internal link targets?
- Is fact-checking required?
- Can it benefit from a thumbnail, table, diagram, or checklist?
- Is the category consistent with `docs/editorial/category-policy.md`?
- Is it practical for AI application or AI product development readers?

Candidates that are too vague should be rewritten before being recommended.

## Candidate List Storage

Store candidate lists under:

```txt
docs/article-candidates
```

Recommended file names:

```txt
YYYY-MM-DD.md
weekly-YYYY-MM-DD.md
issue-<number>-candidates.md
```

Candidate lists are not article drafts. They should not appear in the public
site.

## Article Brief Storage

When a selected candidate needs more structure before draft creation, store an
article brief under:

```txt
docs/article-briefs
```

Article briefs are also planning documents. They preserve the selected
candidate's reader, search intent, overlap, internal link, thumbnail, and
fact-check context.

Creating a brief does not approve draft creation. Codex must still follow the
approval flow in `AGENTS.md` before creating or editing files under
`docs/article-drafts`.

When a candidate is selected through a GitHub Issue created by
`/article-candidate-select`, follow:

```txt
docs/operations/candidate-issue-to-brief-flow.md
```

## Draft Scaffold Creation

When the user approves draft preparation from a brief, Codex may create a draft
scaffold under:

```txt
docs/article-drafts
```

The scaffold should preserve the brief context and include review-oriented
frontmatter, heading ideas, internal link candidates, thumbnail TODOs, and
fact-check TODOs.

The scaffold generator should also preserve source Issue context when the brief
was created from `/article-candidate-select`.

A scaffold is not a finished article. It must be expanded, reviewed, and
approved before publication.

## Candidate Selection

The user should select candidates explicitly.

Good examples:

- `Candidate 1 and 3 only`
- `Create drafts for beginner terms and API cost troubleshooting`
- `Use Candidate 2, but make it beginner-focused`

Codex must not turn all candidates into drafts unless the user explicitly
approves all of them.

## Draft Creation Rules

After candidate selection and approval, Codex should:

- Create drafts only under `docs/article-drafts`.
- Preserve existing published articles.
- Preserve existing slugs and URLs.
- Avoid duplicate slugs.
- Add valid frontmatter.
- Add `thumbnail` frontmatter by default.
- Add a local thumbnail image under `apps/web/public/images/drafts`.
- Insert the thumbnail near the beginning of the draft body.
- Add practical examples, tables, diagrams, or checklists when useful.
- Add related internal links.
- Set review metadata for the draft review page.
- Keep the draft unpublished.

## Review Flow

Drafts created from selected candidates should be reviewed through the draft
review page.

The reviewer should check:

- Content quality.
- Search intent.
- Category and tags.
- Internal links.
- Thumbnail usefulness.
- Fact-check status.
- Whether the article duplicates existing content.
- Whether the article is publish-ready.

Publishing requires a separate human decision.

## GitHub Issue Driven Flow

The GitHub Issue driven version of this flow is:

1. User creates an Issue from Discord or GitHub mobile.
2. Issue requests article candidate generation.
3. Codex reads the Issue and project rules.
4. Codex presents a Japanese implementation plan.
5. User approves candidate list creation.
6. Codex creates a candidate list under `docs/article-candidates`.
7. User selects candidates in chat or Issue comment.
8. Codex presents a second implementation plan for draft creation.
9. User approves.
10. Codex creates selected drafts and thumbnails.

This two-step approval prevents accidental bulk draft generation.

## Future Automation Boundaries

The following may be automated later:

- Candidate list generation.
- Existing article overlap scoring.
- Internal link suggestions.
- Category suggestions.
- Thumbnail idea suggestions.
- GitHub Issue creation from Discord.

The following should remain human-approved:

- Which candidates become drafts.
- Whether a draft is publish-ready.
- Whether to publish an article.
- Whether to deploy to VPS.

## Relationship to Later Phases

Recommended next phases:

- Phase 27: candidate list generation script.
- Phase 28: candidate-to-draft Codex workflow.
- Phase 29: Discord `/article-candidates` command.
- Phase 30: Analytics and Search Console assisted candidate selection.

Each phase should still follow the approval flow in `AGENTS.md`.
