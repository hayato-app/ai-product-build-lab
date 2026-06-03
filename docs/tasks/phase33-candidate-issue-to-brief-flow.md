# Phase 33: Candidate Issue to Brief Flow

## Purpose

Document the standard flow for turning a Discord-created article candidate
selection Issue into an article brief.

This phase connects Phase 32's `/article-candidate-select` command to the
existing article brief workflow without creating article drafts automatically.

## Scope

This phase creates:

- `docs/operations/candidate-issue-to-brief-flow.md`

It may update:

- `docs/article-briefs/README.md`
- `docs/operations/article-candidate-flow.md`
- `docs/operations/smartphone-codex-operation.md`
- `docs/operations/codex-issue-workflow.md`

## In Scope

- Define how Codex should read a candidate selection Issue.
- Define the approval point before brief creation.
- Define required Issue fields.
- Define brief creation rules.
- Connect the flow to `docs/article-briefs`.

## Out of Scope

This phase does not:

- Create article briefs from a real Issue.
- Create article drafts.
- Generate thumbnails.
- Publish articles.
- Add Discord commands.
- Run VPS deployment automation.

## Completion Criteria

- Candidate selection Issues have a documented path to article briefs.
- The user approval point before brief creation is explicit.
- Draft creation remains a separate approved step.
- Discord remains limited to Issue creation and read-only candidate checks.
