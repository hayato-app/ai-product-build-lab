# Article Worker

Article Worker prepares Markdown article drafts for AI Product Build Lab.

Generated articles are drafts. They must be reviewed by a human before being moved into published content.

## Output

The default draft output directory is:

```txt
../../docs/article-drafts
```

You can override it when needed:

```bash
ARTICLE_DRAFT_OUTPUT_DIR=/opt/ai-business/apps/ai-product-build-lab/docs/article-drafts npm run generate
```

## Environment

Copy `.env.example` if you want to keep local notes, but do not commit `.env`.

```env
OPENAI_API_KEY=
ARTICLE_WORKER_MODEL=
```

`OPENAI_API_KEY` is required only for AI generation.

`ARTICLE_WORKER_MODEL` is optional. If omitted, the worker uses its built-in default model.

## Commands

Install dependencies:

```bash
npm install
```

Preview the selected topic without API calls or file writes:

```bash
npm run dry-run
```

Generate deterministic template drafts without API calls:

```bash
npm run generate
npm run generate -- --count 3
```

Generate one AI-assisted draft:

```bash
OPENAI_API_KEY=... npm run generate:ai
```

AI generation calls the OpenAI API, validates the Markdown draft, and writes only if validation passes.

## Safety

- Existing published articles are never deleted, overwritten, or renamed.
- Existing drafts are never overwritten.
- Slug conflicts are resolved with suffixes such as `-2` and `-3`.
- AI generation defaults to one article and caps `--count` at 3.
- Generated articles include `status: "draft"` and `review_status: "needs_review"`.
- Published content under `apps/web/src/content/articles` is updated only after human review.
