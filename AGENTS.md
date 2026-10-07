# Obsidian-Jules repository instructions

## Scope

These instructions apply to this public source repository. Read `CLAUDE.md` for the adapted vault manual and `docs/PROJECT_STATUS.md` for the verified implementation boundary.

This repository is not a user's private portfolio or production vault. Deployment-specific directories, databases, credential stores, people, and automation mentioned in inherited manuals must not be assumed to exist or to be authorized here. Do not search a user's home directory or another repository for missing private configuration.

## Evidence and changes

- Inspect the relevant source before changing it. Treat agent prompts, schedules in Markdown, and roadmap ideas as instructions or designs, not evidence of a deployed feature.
- Preserve upstream attribution, component licenses, and existing user content.
- Keep public examples synthetic. Do not import private notes, messages, work data, credentials, or transcripts to make a demonstration look complete.
- Do not install schedulers, enable paid API calls, connect third-party accounts, or create automatic commits without explicit user authorization.
- Propose durable knowledge edits in a reviewable form. Never promise that these instructions alone constitute a filesystem sandbox or universal write blocker.
- Do not modify `.obsidian/` settings, remove notes, rewrite Git history, or retag releases as part of routine documentation work.

## Development layout

The hook package is `.claude/scripts/package.json`; there is no root npm application. Its existing commands can be invoked from the root with `npm --prefix .claude/scripts test` and `npm --prefix .claude/scripts run typecheck` after installing the required development tools. See `docs/QUICKSTART.md`.

Record which checks actually ran, their environment, and failures. Do not call a source inspection a runtime test, or claim CI passed when no run exists. Network/credential limitations must be reported as not tested, not silently treated as a pass.

## Documentation

Keep README links working and describe the current public checkout, not a private deployment. Link to the implementation status instead of duplicating volatile counts. Preserve the distinction between local storage, local hooks, and external model inference.

## Delivery

Prefer focused branches and reviewable pull requests. Before merging authorized changes, inspect the exact diff, current base/head, review state, and applicable checks. Do not bypass branch protection or tool safety restrictions. Leave unrelated work untouched.
