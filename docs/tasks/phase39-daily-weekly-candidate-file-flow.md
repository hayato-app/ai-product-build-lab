# Phase 39: Daily and Weekly Candidate File Flow

## Purpose

Align article candidate file creation with Discord candidate review commands.

The Discord bot can now read:

- Daily candidates with `/article-candidates type:daily`
- Weekly candidates with `/article-candidates type:weekly`

This phase defines how those files should be created and updates the local
candidate generator to support the same naming convention.

## File Naming Rules

Use:

```txt
docs/article-candidates/YYYY-MM-DD.md
```

for daily AI news candidates.

Use:

```txt
docs/article-candidates/weekly-YYYY-MM-DD.md
```

for weekly non-news or evergreen article candidates.

Do not mix daily news candidates and weekly evergreen candidates in the same
file.

## Daily News Candidate Flow

Daily AI news collection should create a candidate file directly under:

```txt
docs/article-candidates/YYYY-MM-DD.md
```

Daily candidates should:

- Focus on AI news commentary.
- Include source links.
- Use `Fact check: required` by default.
- Explain the practical builder implication.
- Stay as planning material only.

Review from Discord with:

```txt
/article-candidates type:daily
/article-candidate-select type:daily candidate:<number>
```

## Weekly Evergreen Candidate Flow

Weekly article candidate refresh should create a candidate file under:

```txt
docs/article-candidates/weekly-YYYY-MM-DD.md
```

Weekly candidates should prioritize:

- Beginner tool introductions.
- Terminology explanations.
- AI app development methods.
- Error cases and solution guides.
- Evergreen operational topics.

Review from Discord with:

```txt
/article-candidates type:weekly
/article-candidate-select type:weekly candidate:<number>
```

## Script Support

The local generator supports:

```bash
node scripts/generate-article-candidates.mjs --type weekly
node scripts/generate-article-candidates.mjs --type daily
```

`--type weekly` defaults to:

```txt
docs/article-candidates/weekly-YYYY-MM-DD.md
```

`--type daily` defaults to:

```txt
docs/article-candidates/YYYY-MM-DD.md
```

When `--out` is provided, the explicit output path takes precedence.

## Safety Boundary

Candidate files are planning material only.

This phase does not allow:

- Automatic draft creation.
- Automatic publication.
- Discord direct file edits.
- Discord direct push.
- Direct VPS deployment.
- Automatic merge.
