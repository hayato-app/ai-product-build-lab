# Phase 37: Candidate Refresh and AI News Collection

## Purpose

Phase 37 sets up safe recurring operations for:

- Weekly article candidate refresh.
- Daily AI news collection.

These operations should run as independent Codex automations, separate from the
current chat thread.

## Scope

Phase 37 covers:

- Documenting the weekly article candidate refresh flow.
- Documenting the daily AI news collection flow.
- Updating existing smartphone and candidate operation documents.
- Creating independent Codex automations for both operations.

Phase 37 does not cover:

- VPS cron.
- Discord Bot direct execution.
- Automatic candidate file creation.
- Automatic draft creation.
- Automatic publication.
- Automatic commits, pushes, or deployments.

## Automation Plan

Create two independent automations:

1. Weekly article candidate refresh
   - Schedule: every Monday at 08:00 JST.
   - Purpose: review candidate stock and propose replenishment.
   - Output: Japanese summary and next action proposal.

2. Daily AI news collection
   - Schedule: every day at 08:00 JST.
   - Purpose: collect AI news relevant to builders.
   - Output: Japanese news summary, classifications, and candidate ideas.

## Safety Boundary

Both automations must treat their output as planning material.

They must not:

- Create or edit repository files without explicit user approval.
- Create drafts.
- Publish articles.
- Deploy to VPS.
- Modify Discord Bot behavior.

## Completion Criteria

Phase 37 is complete when:

- Operation documents exist.
- Existing workflow documents reference the new flows.
- Two independent automations are created.
- The final summary states the schedules and safety boundaries.
