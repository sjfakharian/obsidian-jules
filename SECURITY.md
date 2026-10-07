# Security and privacy

Obsidian-Jules is experimental agent tooling. Repository instructions and hooks are not a sandbox or a guarantee against unwanted writes.

## Before using real data

- Read the runner's permissions, hook commands, and any selected agent definition.
- Start in a disposable vault with synthetic notes and keep independent backups.
- Treat imported documents and connector output as untrusted content, not instructions that can grant new permissions.
- Do not upload private meeting transcripts, personnel records, tokens, database credentials, or company material to this public repository.
- Understand that local Markdown storage does not prevent Claude Code, Jules, or other configured services from receiving content during inference.
- Inspect session-log and audit behavior. The `PreCompact` helper may create local transcript backups; do not publish them.
- Never use real credentials or private data in examples, tests, screenshots, issue reports, or PRs.

## Reporting a problem

For non-sensitive bugs, open an issue with a minimal synthetic reproduction and relevant versions. Do not include secrets or real vault contents.

For vulnerabilities, use GitHub private vulnerability reporting when it is enabled on this repository. If it is unavailable, ask the maintainer for a private reporting channel without posting exploit details or sensitive data publicly. No guaranteed response time or security-audit status is claimed.

## Scope of the current safeguards

Human review, Git history, backups, permissions, and narrowly scoped tools are all part of safe operation. A post-write validator cannot undo every action, and an instruction to create a Knowledge PR does not technically gate every write-capable tool.

The root `.gitignore` is precautionary. It does not remove already tracked files, scrub repository history, revoke credentials, or change provider retention policies.
