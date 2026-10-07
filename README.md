<div align="center">

# 🧠 Obsidian-Jules
**The First Asynchronous, CI/CD-Driven Executive OS for Your Mind**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Obsidian Compatible](https://img.shields.io/badge/Obsidian-Compatible-blueviolet.svg)](https://obsidian.md)
[![Subagents](https://img.shields.io/badge/subagents-13-green.svg)]()
[![Hygiene Hooks](https://img.shields.io/badge/hooks-5-orange.svg)]()
[![PRs](https://img.shields.io/badge/Knowledge_PRs-Enabled-success.svg)]()

*Most AI note-taking tools just "read" your text. **Obsidian-Jules** maintains your system, challenges your assumptions, and manages your career in the background while you sleep.*

[Get Started](#-quick-start) • [How it Works](#-the-asynchronous-paradigm) • [Meet the Agents](#-meet-your-autonomous-team) • [Roadmap](#-future-architecture)

</div>

---

## 🛑 The Problem with "Second Brains"

Building a knowledge base is easy. **Keeping it alive is hard.**

Traditional Personal Knowledge Management (PKM) systems inevitably devolve into graveyards of unlinked notes. General AI wrappers just let you "chat" with your notes, but they don't *maintain* the system. You still have to do the heavy lifting of organization, extracting insights from 1-1s, and writing your own performance reviews.

We need more than a chatbot. We need an **Executive OS**.

---

## ⚡ The Asynchronous Paradigm

**Obsidian-Jules** borrows the best paradigms from modern Software Engineering (like Google's Jules agent) and applies them to your personal knowledge base:

| Traditional PKM | Obsidian-Jules OS |
| :--- | :--- |
| **Manual Data Entry** | **Fire & Forget:** Drop raw meeting transcripts into a folder. Background agents process them, extract action items, and link them to the graph automatically. |
| **Silent AI Corruption** | **Knowledge PRs:** Agents *never* overwrite your core files. They create a `Proposed` state (Knowledge Pull Request). You act as the Tech Lead and merge. |
| **Decaying Links** | **Vault CI/CD:** A note without a link is a bug. Lifecycle hooks (`SessionStart`, `PostToolUse`) act as a CI pipeline. If hygiene drops, agents fix it. |
| **Echo Chamber** | **Adversarial Review:** Subagents are explicitly designed to challenge your `Key Decisions` using Socratic dialogue. |

---

## 🏗️ The 5-Layer Architecture

This isn't just a folder of markdown files. It's a living operating system.

```mermaid
graph TD
    subgraph L5 [L5: Execution Ecosystem]
        B[brag-spotter]
        S[slack-archaeologist]
        V[vault-librarian]
    end

    subgraph L4 [L4: Automations]
        C[Cloud Batch / Cron Jobs]
        C -->|Nightly Refactors| L5
    end

    subgraph L3 [L3: Logic & Rules]
        H[CLAUDE.md + CI Hooks]
        H -->|Validates Writes| L4
    end

    subgraph L2 [L2: Engine]
        Q[QMD Semantic Vector Search]
    end

    subgraph L1 [L1: Storage]
        O[(Obsidian Vault - Local Markdown)]
    end

    L5 --> H
    H --> Q
    Q --> O
```

---

## 🤖 Meet Your Autonomous Team

Your vault comes pre-configured with specialized subagents living in `.claude/agents/`:

- 🏆 **`brag-spotter`**: Scans your git history, 1:1 notes, and incident reports to automatically draft your performance reviews and brag documents.
- 🕵️ **`slack-archaeologist`**: Triggered by PagerDuty alerts. Automatically compiles reconstruction timelines and drafts incident post-mortems in `work/incidents/drafts/`.
- 📚 **`vault-librarian`**: Runs every Sunday at 2 AM. If your vault's hygiene score drops below 80%, it auto-fixes missing tags and creates a PR for broken links.
- 🎯 **`review-prep`**: Wakes up 14 days before the end of the quarter, analyzes your competency tracking, and generates a draft review brief.

---

## 📂 Folder Structure (The Executive Layout)

Optimized for Senior Engineers, PMs, and Managers:

```text
obsidian-jules/
├── .claude/         # 🧠 The Engine: Agents, Hooks, and CI scripts
├── bases/           # 📊 Database views for your Markdown files
├── brain/           # 🌐 Durable, graph-first knowledge & Key Decisions
├── org/             # 👥 Personal CRM: People, teams, and interactions
├── perf/            # 🚀 Career Management: Brag docs & competencies
├── templates/       # 📄 Standardized markdown templates
└── work/            # 💼 Active tracking: 1-1s, incidents, sprints
```

---

## ⚙️ Prerequisites

Before you start, ensure you have:
1. **[Obsidian](https://obsidian.md)** (Free) — The visual UI for your Markdown knowledge graph.
2. **[Node.js 20+](https://nodejs.org)** — Executes the TypeScript lifecycle hooks and automated test suite.
3. **An Agent Runner** — Choose **Option A (Local Co-Pilot)**, **Option B (Cloud Jules Agent)**, or the **Hybrid Setup** below.

---

## 🚀 Quick Start: Choose Your Agent Engine

You can run **Obsidian-Jules** in the mode that fits your workflow:

```
                      ┌───────────────────────────────────────┐
                      │          Obsidian-Jules Vault         │
                      └──────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
       [ Option A: Local Mode ]                       [ Option B: Cloud Mode ]
          Local AI Co-Pilot                             Autonomous Cloud Agent
        (Claude Code / Local CLI)                           (Google Jules)
                 │                                               │
  • Real-time edit validation                     • "Fire and Forget" background tasks
  • Intercepts broken links as you type           • Overnight vault refactoring & audits
  • Instant chat with notes in terminal           • Auto-generates Knowledge PRs on GitHub
```

### 1. Clone the Vault
```bash
git clone https://github.com/sjfakharian/obsidian-jules.git my-second-brain
cd my-second-brain
npm install
```
Open the `my-second-brain` folder as an existing vault in [Obsidian](https://obsidian.md).

---

### 2. Choose Your Execution Path

#### 🟢 Option A: Local Co-Pilot (Claude Code / Local CLI)
*Best for: Interactive note-taking, real-time link validation, and terminal chatting while in Obsidian.*

1. Install [Claude Code](https://claude.ai/code):
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
2. Set your Anthropic API Key:
   ```bash
   export ANTHROPIC_API_KEY="your-api-key"
   ```
3. Start the OS in your vault directory:
   ```bash
   claude
   ```
   *The lifecycle hooks in `.claude/` will automatically run: validating note sizes, checking wikilinks, and guiding note creation.*

---

#### 🔵 Option B: Cloud Autonomous Agent (Google Jules)
*Best for: Asynchronous "fire-and-forget" workflows, background audits, and GitHub Knowledge PRs.*

1. Push your vault to a private (or public) GitHub repository.
2. Install the [Jules CLI](https://jules.google.com):
   ```bash
   # Follow instructions at https://jules.google.com
   export JULES_API_KEY="your-jules-api-key"
   # Or authenticate via:
   jules login
   ```
3. Dispatch background tasks from your terminal:
   ```bash
   # Audit vault hygiene and submit a Knowledge PR:
   jules new "Audit vault hygiene, fix broken wikilinks, and create a Knowledge PR"

   # Extract accomplishments from raw meeting notes:
   jules new "Process work/meetings/ notes from this week and draft updates to perf/brag/"
   ```
4. Review and merge the Knowledge PR in GitHub or pull directly via the Jules CLI:
   ```bash
   jules remote list --session
   jules remote pull --session <SESSION_ID> --apply
   ```

---

#### ⚡ Option C: The Hybrid Setup (Recommended)
Use **Option A (Claude Code)** during the day while you take notes in Obsidian (preventing broken links and enforcing structure), and let **Option B (Google Jules)** run background maintenance, incident post-mortems, and Knowledge PRs while you sleep.

---

## 🔮 Future Architecture

We are constantly pushing the boundaries of what an Asynchronous Agentic Second Brain can do:

- **Event-Driven Triggers:** Moving beyond cron jobs to real-time event grids (e.g., triggering `brag-spotter` immediately when a PR is merged).
- **Cross-Vault Federation (Swarm Intelligence):** Enabling team-wide sharing where your local agent negotiates with coworkers' agents to merge conflicting architectural notes—without exposing private DMs.
- **Continuous Background Synthesis:** Agents actively traverse the graph in the background to find "missing link" insights between siloed projects and present them as morning briefings.
- **Richer Multi-Modal Integration:** Processing calendar events, Zoom transcripts, and Jira webhooks asynchronously.
- **Self-Healing Indexing:** Graph databases (like Neo4j) backing the semantic search to automatically refactor the taxonomy based on usage patterns.

---

<div align="center">
  <b>Built for those who want their tools to work for them, not the other way around.</b><br>
  ⭐️ If you find this project useful, please consider giving it a star!
</div>
