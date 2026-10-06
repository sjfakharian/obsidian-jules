<div align="center">

# Obsidian-Jules: The Asynchronous Agentic Second Brain

Most AI note-taking tools just read your text. This system thinks with you, challenges your assumptions, and manages your career in the background. Inspired by Google's asynchronous Jules agent, this is a **CI/CD-driven Executive OS** built on Obsidian and Claude/Gemini.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Hooks](https://img.shields.io/badge/hooks-5-orange.svg)]()
[![Subagents](https://img.shields.io/badge/subagents-13-green.svg)]()

</div>

---

## The Problem with "Second Brains"

Building a knowledge base is easy. Keeping it alive is hard.
Traditional Personal Knowledge Management (PKM) systems become graveyards of unlinked notes. General AI wrappers for Obsidian just let you "chat" with your notes, but they don't *maintain* the system. You still have to do the heavy lifting of organization, extracting insights from 1-1s, and writing performance reviews.

## What makes this different?

We brought software engineering paradigms to personal knowledge:

1. **Asynchronous Execution (Fire and Forget):** Drop a raw meeting transcript into `work/meetings/`. While you sleep, background subagents wake up, read it, extract action items, log achievements to your performance folder, and update the knowledge graph.
2. **Knowledge Pull Requests (Knowledge PRs):** Don't let AI silently corrupt your notes. When our agents want to refactor your vault (e.g., splitting a 25KB note or merging concepts), they create a `Proposed` state. You act as the tech lead and merge or reject the changes.
3. **Vault CI/CD (Hygiene Hooks):** A note without a link is a bug. The system uses lifecycle hooks (`SessionStart`, `PostToolUse`). If you write a note that violates architectural rules, the CI fails, and the `vault-librarian` agent is dispatched to fix the broken links.
4. **Adversarial Review:** Subagents designed not to agree with you, but to challenge your `Key Decisions` using Socratic dialogue.

## The 5-Layer Architecture

This isn't just a folder of notes. It's an operating system:

| Layer | Component | Description |
|---|---|---|
| **L5: Execution** | **Subagents Ecosystem** | `brag-spotter`, `slack-archaeologist`, `review-prep` doing deep work. |
| **L4: Automations** | **Cloud Batch / Cron** | Nightly `/om-tidy` and `/om-wrap-up` to clean the vault. |
| **L3: Logic & Rules** | **CLAUDE.md + Hooks** | The 5-stage lifecycle hooks (validation, memory injection). |
| **L2: Engine** | **QMD Semantic Search** | Local vector search embedded via MCP for instant retrieval. |
| **L1: Storage** | **Obsidian Vault** | Local, private Markdown files. You own your data. |

## Folder Structure (Executive OS)

Built for Senior Engineers, PMs, and Managers:
- `perf/` - Brag docs, review briefs, and competency tracking.
- `org/` - Personal CRM mapping people and team interactions.
- `work/` - PARA-style tracking (Active projects, 1-1s, incidents).
- `brain/` - Durable, graph-first knowledge and key decisions.

## Quick Start

1. Clone this repository as your Obsidian vault.
2. (Setup instructions to be added).


## Future Architecture: Extending the Asynchronous PKM

We are constantly pushing the boundaries of what an Asynchronous Agentic Second Brain can do. Here are ideas for extending the architecture:

- **Event-Driven Subagent Triggers:** Moving beyond cron jobs to real-time event grids (e.g., triggering `slack-archaeologist` the moment a PagerDuty alert drops, or running `brag-spotter` immediately when a PR is merged).
- **Cross-Vault Federation (Swarm Intelligence):** Enabling team-wide sharing where your local agent negotiates with your coworkers' agents to merge conflicting architectural notes, acting as a decentralized knowledge mesh without exposing private DMs.
- **Continuous Background Synthesis:** Agents that don't just wait for queries, but actively traverse the graph in the background to find "missing link" insights between siloed projects and present them as morning briefings.
- **Richer Multi-Modal Integration:** Processing calendar events, Zoom transcripts, and JIRA webhooks asynchronously to synthesize daily context without manual markdown input.
- **Self-Healing Indexing:** Graph databases (like Neo4j) backing the semantic search to automatically refactor the knowledge graph's taxonomy based on usage patterns.
