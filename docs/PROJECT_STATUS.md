# Implementation status

Assessment date: 2026-10-07. Source baseline: `d9d147f9bb0fdc8e1d69a8d1490abeb3770cb4bb`.

This status separates source inspection from runtime verification. It is not a production-readiness certificate.

## Present in the public repository

- Agent definitions in [`.claude/agents/`](../.claude/agents), command definitions in [`.claude/commands/`](../.claude/commands), and note templates in [`templates/`](../templates).
- Hook configuration in [`.claude/settings.json`](../.claude/settings.json) for `SessionStart`, `UserPromptSubmit`, `PostToolUse`, `PreCompact`, `Stop`, and `PreToolUse`.
- TypeScript implementations and test sources in [`.claude/scripts/`](../.claude/scripts).
- Obsidian Base definitions in [`bases/`](../bases).
- QMD and MCP-related helper source. External search/index setup is still required for those paths.

Presence does not establish that every command works on a clean machine. This documentation pass did not execute Claude Code, Jules, external connectors, or the complete TypeScript test suite.

## Design intent versus enforcement

| Claim | What the source supports | What must not be claimed |
| --- | --- | --- |
| Knowledge PRs | Instructions for proposals, review, and selected safe-write helpers | Every filesystem edit is mechanically gated by a GitHub PR |
| Vault hygiene | Hook scripts and audit workflows | Every edit made in Obsidian is intercepted |
| Sunday maintenance | A proposed trigger in `vault-librarian.md` | Cloning automatically installs a working cron job |
| Incident reconstruction | Agent instructions and command definitions | A live PagerDuty or Slack integration is preconfigured |
| Quarter-end preparation | Review workflow instructions | A background scheduler is already running |
| Google Jules | An optional external execution path | Turnkey unattended orchestration shipped by this repository |
| Local vault | Markdown on local disk | No content can leave the computer when a cloud runner is used |

`PostToolUse` runs after the matching Claude tool action. It should not be advertised as a universal pre-write safeguard. Some agents explicitly allow non-destructive auto-fixes; review permissions and backups remain necessary.

## Public-export gaps to resolve

1. The adapted `CLAUDE.md` and `vault-manifest.json` refer to deployment-specific paths and additional vault content. The public checkout does not contain all of that material. Do not look in another private repository to fill the gaps automatically.
2. The runtime package is nested under `.claude/scripts`. Root-level `npm install` in the former README was not the correct package installation step; the quick start now uses the nested package.
3. The package exposes a typecheck command but does not declare all of its typecheck tooling in devDependencies. Use the explicit development setup in the quick start; reproducible pinned tooling and a lockfile need a separate engineering change.
4. Some generated state and a `node_modules` tree were already tracked at the baseline. The new root ignore rules prevent future accidental additions where applicable, but do not untrack or erase existing files. Review these in a dedicated cleanup before relying on the export for sensitive use.
5. Confirmed upstream sources are credited in `THIRD_PARTY_NOTICES.md`. This is not yet a complete source-by-source provenance inventory of every bundled skill and dependency.

## Validation scope

The documentation review checked the live repository tree, README claims, hook registrations, nested package scripts, selected agent implementations, and confirmed upstream license texts. The execution environment could not resolve GitHub for a fresh source checkout, so no fresh complete runtime/test execution is claimed.

A future clean-machine acceptance report should identify the exact commit, Node and runner versions, commands executed, test results, and any external services involved.

## Near-term priorities

- A portable public vault bootstrap with synthetic starter notes and no dependency on a private portfolio.
- Repeatable test/typecheck installation, a lockfile, and an automated verification workflow.
- Explicit proposal/accept semantics with tests for paths that can write directly.
- A tested optional background-job adapter with credentials, scheduling, and cost boundaries documented.
- Full vendored-source attribution and removal of tracked generated state through a reviewed cleanup.

## Applying to an open-source support program

Describe the project as an early-stage adaptation and integration effort. Distinguish reused upstream components, project-specific changes, and planned automation. Do not claim ecosystem adoption, external-contributor counts, dependency reach, or production deployment without evidence. Claude Code relevance is useful context, not a substitute for a program's impact criteria.
