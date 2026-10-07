# Quick start: inspect first, then use a disposable vault

Obsidian-Jules is an experimental scaffold. This guide identifies the actual package location and safe starting point; it is not a claim of completed end-to-end acceptance on every platform.

## 1. Requirements

Use Git and Obsidian, plus Node.js with TypeScript type-stripping support for the bundled `.ts` hooks. Node.js 22.18+ is a conservative starting point. The older Node 20+ README requirement did not match the `--experimental-strip-types` command used by this checkout. See the [Node TypeScript documentation](https://nodejs.org/download/release/v22.21.0/docs/api/typescript.html).

Install Claude Code using its [current official setup](https://code.claude.com/docs/en/overview). Sign in through the supported subscription or API flow. Do not add a real API key to the public repository or assume a paid API key is required when you have an eligible subscription.

## 2. Clone without private content

```sh
git clone https://github.com/sjfakharian/obsidian-jules.git obsidian-jules-sandbox
cd obsidian-jules-sandbox
node --version
```

Review [AGENTS.md](../AGENTS.md), [CLAUDE.md](../CLAUDE.md), [settings.json](../.claude/settings.json), and [implementation status](PROJECT_STATUS.md). Open this folder as an existing vault in Obsidian. Use only synthetic notes until you understand which paths the agents and hooks can read or write.

The repository has templates and views, not every personal note/index referenced by the adapted manual. Missing deployment-specific content is a setup gap, not permission to copy a private portfolio or search for its credentials.

## 3. Hook development dependencies and tests

There is no root `package.json`. The existing package is [`.claude/scripts/package.json`](../.claude/scripts/package.json).

From the repository root:

```sh
npm --prefix .claude/scripts install
npm --prefix .claude/scripts test
```

The package's typecheck script runs `tsc`, but the current devDependency list does not include TypeScript and Node type declarations. For a temporary developer setup:

```sh
npm --prefix .claude/scripts install --no-save typescript @types/node
npm --prefix .claude/scripts run typecheck
```

These commands may expose real compatibility or setup failures. Record them rather than suppressing checks. The temporary `--no-save` installation is not a substitute for a future locked, reproducible development environment.

## 4. First local agent session

After reviewing the hook scripts and trusting only this disposable copy:

```sh
claude
```

A suitable first request is:

> Inspect this public scaffold and list missing local setup without editing files or contacting external services. Then propose a vault-audit plan using only synthetic notes.

Review the proposed changes and tool permissions before authorizing writes. The included hooks respond to Claude Code lifecycle events, not arbitrary keystrokes inside Obsidian. Learn the difference between [pre-tool and post-tool hooks](https://code.claude.com/docs/en/hooks).

Do not run bulk maintenance or migration agents on an irreplaceable vault without an independent backup and a reviewed plan.

## 5. Optional Jules or QMD paths

For Google Jules, follow the [official CLI reference](https://jules.google/docs/cli/reference/) and connect only a repository whose contents you are allowed to send to that service. Start with a manually requested task on a disposable/private copy. This repository does not install a scheduler or establish account access for you.

For QMD, inspect the [adapter](../.claude/scripts/qmd-mcp.mjs) and the manifest's index configuration. Installing instructions for a skill does not install or authenticate its external tools. Missing QMD or MCP setup must be reported rather than presented as working semantic search.

## 6. Keep your working vault separate

Use a separate private repository for real notes. Do not send private workplace or personal material to a cloud service unless authorized. Ignore rules do not erase already tracked files; review `git status`, staged diffs, and generated transcripts before every public push.
