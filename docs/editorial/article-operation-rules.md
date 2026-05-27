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
