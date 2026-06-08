# Codex Article Instructions

## Purpose

This document defines how Codex should create, edit, or expand articles for AI Product Build Lab.

Codex should support editorial work, not automatically publish generated content.

## Approval Flow

Before creating or editing article files, Codex must follow the approval flow in `AGENTS.md`.

Codex must present an implementation plan in Japanese and wait for explicit approval before:

- creating article files
- editing article files
- generating draft articles
- moving drafts into published content

## Article Creation Rules

Codex must:

- Check existing articles first.
- Check existing drafts first.
- Avoid duplicate topics.
- Use the existing Markdown frontmatter format.
- Use one primary category.
- Use 3 to 5 tags when possible.
- Add practical explanations.
- Add internal links when possible.
- Add a thumbnail image by default.
- Treat AI-generated articles as drafts.
- Keep draft management notes out of the article body.
- Avoid low-quality filler content.

## Standard Draft Creation Workflow

Codex should use the following workflow as the standard article creation process:

1. Read the relevant project and editorial documents.
2. Check existing published articles under `apps/web/src/content/articles`.
3. Check existing drafts under `docs/article-drafts`.
4. Select or confirm a topic that does not substantially duplicate existing content.
5. Create the Markdown draft under `docs/article-drafts`.
6. Add valid frontmatter, one primary category, 3 to 5 tags, practical sections, and internal links when possible.
7. Create or add a local thumbnail image when possible.
8. Add tables, diagrams, checklists, or command examples when they improve reader understanding.
9. Confirm that the draft remains review-only.
10. Summarize changed files and verification results.

The standard workflow is not to generate the article through manual copy and paste into ChatGPT Plus.

The `workers/article-worker` AI API mode may exist for future use, but it should only be used when explicitly requested and when API billing is available.

Codex must not publish the draft automatically. Moving a draft into `apps/web/src/content/articles` requires human approval after review.

## Draft Management Notes

Do not add management-only sections such as `## このdraftの状態`, source Issue
notes, source brief notes, review instructions, or publication reminders to the
article body.

Keep review metadata in frontmatter fields such as `review_notes`, and keep
planning context in `docs/article-briefs`. The Markdown body should be safe to
move into published articles after review without exposing internal workflow
notes to readers.

## Thumbnail Handling

Codex should add a thumbnail image to new article drafts by default.

Use this standard handling:

1. Save the image under `apps/web/public/images/drafts`.
2. Use a stable, article-specific file name such as `ai-development-terms-thumbnail.png`.
3. Add the image path to frontmatter:

```yaml
thumbnail: "/images/drafts/example-thumbnail.png"
```

4. Insert the image near the beginning of the draft body:

```md
![Short useful alt text for the article thumbnail](/images/drafts/example-thumbnail.png)
```

5. Keep images local to the repository. Do not use external image URLs.
6. Keep in-image text minimal. Use alt text and article body text for detailed explanation.
7. Prefer bright, clean, practical visuals that match the site's AI development media direction.

If a thumbnail is skipped, explain the reason in the final summary or PR body.

## Required Article Format

Use this format when appropriate:

- 結論
- 対象読者
- 前提
- 基本構成
- 実装手順 or 運用の考え方
- よくある失敗
- 改善ポイント
- 関連記事
- まとめ

Beginner terminology articles should also include:

- Plain definition
- Why the term matters
- Where it appears in development
- Similar terms and differences
- Diagram, table, or Mermaid diagram when useful

Error-resolution articles should also include:

- Problem summary
- Likely causes
- Investigation steps
- Log or output examples when useful
- Command examples when appropriate
- Solution steps
- How to confirm resolution
- Prevention measures

## Writing Style

Writing should be:

- Japanese
- Clear
- Practical
- Developer-friendly
- Beginner-accessible
- Not exaggerated
- Not overly promotional

## Things to Avoid

Avoid:

- Publishing generated drafts without review
- Creating duplicate articles
- Creating thin AI-generated content
- Writing abstract content with no practical value
- Assuming SaaS, login, payment, dashboard, or account features
- Making time-sensitive claims without fact-checking
- Summarizing official documentation without practical explanation

## Preferred Article Topics

Preferred topics include:

- AI development beginner guides
- AI development tools
- AI terminology explanations
- System development terminology explanations
- Generative AI application development
- Next.js AI development
- OpenAI API
- AI agent development
- Error resolution
- AI application operation
- AI news commentary
- AI development trends

## Internal Link Rules

Codex should follow:

```txt
docs/editorial/internal-link-policy.md
```

Add related articles when possible.

Link to the AI API Cost Estimator when relevant:

```txt
/tools/ai-api-cost-estimator
```

## Verification Rules

Before finishing article work, Codex should confirm:

- Files changed
- Whether a new draft was created
- Whether existing articles were preserved
- Whether frontmatter is valid
- Whether the draft has a thumbnail or a clear reason for skipping it
- Whether internal links were added
- Whether build was run, if publishing into the web app
