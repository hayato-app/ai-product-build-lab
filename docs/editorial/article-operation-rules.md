# Article Operation Rules

## Purpose

AI Product Build Lab is a Japanese media site for AI application development and AI product development.

The article operation should help readers understand, build, troubleshoot, and improve AI applications and AI products.

The site is a content media site, not a SaaS sales site.

## Current Priority

The current editorial priority is:

1. Improve site quality.
2. Expand useful articles.
3. Keep article quality consistent.
4. Avoid duplicate or thin AI-generated content.
5. Prepare a safe workflow for Codex and article-worker generated drafts.

## Content Pillars

The site mainly covers three content pillars:

1. Tool introductions and terminology explanations for development beginners.
2. AI application development methods, error cases, and solution guides.
3. AI-related news commentary.

## Article Goals

Each article should provide practical value for readers who want to build or operate AI applications.

Good articles should:

- Answer a clear reader question.
- Explain terms and concepts in plain language.
- Include practical steps, examples, commands, or decision criteria.
- Use tables, diagrams, or checklists when they improve understanding.
- Help readers take the next useful action.

## Preferred Article Types

Preferred article types include:

- Implementation guide
- Concept explanation
- Error / troubleshooting article
- Tool usage article
- Cost / operation article
- Comparison article
- Roadmap / learning path article
- Checklist article
- Terminology explanation article

## Preferred Topics

Preferred topics include:

- AI product development
- Generative AI application development
- OpenAI API
- RAG
- AI agents
- Next.js AI development
- AI API cost and operational control
- AI product operation and improvement
- AI development tools
- AI application publishing and improvement
- System development terminology for beginners

## Topics to Avoid

Avoid these topics for now:

- Medical, legal, or financial advice
- Political topics
- Highly speculative AI news
- Thin AI tool listicles with no original explanation
- SaaS payment, dashboard, login, or account implementation unless explicitly requested
- Articles that only summarize official documentation without practical value
- Articles that substantially duplicate existing articles

## Draft Handling Rule

AI-generated articles are drafts.

Generated drafts must be reviewed before publishing. Do not automatically publish generated articles.

Drafts should be stored under:

```txt
docs/article-drafts
```

Reviewed and approved articles may be moved to:

```txt
apps/web/src/content/articles
```

## Draft Thumbnail Rule

New article drafts should include a thumbnail image by default.

The thumbnail helps reviewers scan the draft list and helps readers understand the article topic visually.

Default thumbnail handling:

- Store thumbnail assets under `apps/web/public/images/drafts`.
- Add `thumbnail: "/images/drafts/<file-name>.png"` to the draft frontmatter.
- Insert the same image near the beginning of the draft body with useful alt text.
- Keep images local to the repository. Do not rely on external image URLs.
- Prefer bright, clean, beginner-friendly visuals that match the AI development media design direction.
- Keep in-image text minimal and use the article body or alt text for detailed explanation.

If a draft is created without a thumbnail, explain why in the final summary or PR body.

## Standard Codex Draft Workflow

The standard article creation workflow is Codex-assisted draft creation inside this repository.

When starting from article candidate selection, follow:

```txt
docs/operations/article-candidate-flow.md
```

Codex should create article drafts directly under `docs/article-drafts` after checking:

- Existing published articles.
- Existing draft articles.
- Category policy.
- Internal link policy.
- Article quality checklist.

The standard workflow should not depend on pasting prompts into ChatGPT Plus manually.

`npm run generate:ai` in `workers/article-worker` is optional and reserved for future or explicitly approved API-based operation. It is not required for the normal editorial workflow.

Codex-created drafts must remain drafts until a human reviews them in the draft review page and approves publication.

Do not move a draft into `apps/web/src/content/articles` until human review is complete.

## Publishing Frequency

Prefer quality over volume.

It is better to publish fewer strong articles than many thin articles. Article generation should support editorial work, not replace review.

## Minimum Article Requirements

An article should include:

- Clear search intent
- Target reader
- Early conclusion
- Practical explanation
- Category and tags
- Related internal links when possible
- Valid Markdown frontmatter
- Thumbnail image when possible
- Tables, diagrams, or checklists when useful

## Definition of Publish-Ready

An article is publish-ready only when:

- It fits one of the content pillars.
- It provides practical value.
- It does not substantially duplicate existing content.
- Frontmatter is valid.
- Internal links are useful and natural.
- Time-sensitive claims are fact-checked.
- Markdown syntax is valid.
- The article has been reviewed by a human.
