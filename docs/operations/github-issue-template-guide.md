# GitHub Issue Template Guide

Use this guide when choosing a GitHub Issue template for Codex work.

Issues are work requests. They do not automatically authorize implementation.
Codex must still follow `AGENTS.md` and present a Japanese implementation plan
before creating files, editing files, or implementing code.

## Template List

### Codex Task

Use for general work that does not fit another template.

Examples:

- Operations documentation
- Small repository maintenance tasks
- General Codex workflow adjustments

Template:

```txt
.github/ISSUE_TEMPLATE/codex-task.yml
```

### Article Review / Improvement

Use for improving an existing published article or draft.

Examples:

- Expand a thin draft.
- Add tables, diagrams, or practical examples.
- Improve internal links.
- Add fact-check notes.

Template:

```txt
.github/ISSUE_TEMPLATE/article-review.yml
```

### New Draft Article

Use for requesting a new unpublished article draft.

Examples:

- New beginner terminology article.
- New troubleshooting article.
- New AI news commentary draft.

Template:

```txt
.github/ISSUE_TEMPLATE/article-new.yml
```

### Site Improvement

Use for public site, navigation, layout, readability, discovery, or admin UI
improvements.

Examples:

- Improve the homepage article discovery section.
- Improve category navigation.
- Improve the draft review UI wording.
- Fix mobile layout readability.

Template:

```txt
.github/ISSUE_TEMPLATE/site-improvement.yml
```

### Tool Improvement

Use for free tool pages or tool logic improvements.

Examples:

- Improve AI API Cost Estimator inputs.
- Add clearer output explanations.
- Improve validation or error messages.
- Improve tool page links to related articles.

Template:

```txt
.github/ISSUE_TEMPLATE/tool-improvement.yml
```

### Bug Report

Use when something appears broken.

Examples:

- A page returns an error.
- A button does not work.
- Draft review state does not save.
- A route redirects unexpectedly.

Template:

```txt
.github/ISSUE_TEMPLATE/bug-report.yml
```

## Smartphone Writing Tips

When creating an Issue from a smartphone:

- Keep the summary short.
- Include the target URL, slug, file, or tool name when known.
- Write what may be changed.
- Write what must not be changed.
- Add screenshots for visual issues.
- State whether VPS deployment is likely needed.

## Safety Notes

- Do not include secrets, tokens, private IPs, or connection information in
  Issue bodies.
- Do not ask Discord bot commands to run VPS commands directly.
- Do not request automatic publication of AI-generated article drafts.
- Use pull requests for reviewable changes.
