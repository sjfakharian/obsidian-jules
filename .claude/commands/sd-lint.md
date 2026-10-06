# SD Lint

Run the three-persona review pass over the current state of the ad-revenue System Dynamics wiki (Karpathy's "Lint" operation, formalized). Health-checks the model for contradictions, staleness, and structural gaps, the same way `/om-vault-audit` health-checks the PKM vault.

**When to use**: After a `KnowledgeBase.md`, `simulation.py`/`simulation_hourly.py`, or `feed/` update, or periodically to catch drift.

## Usage

```
/sd-lint
```

## Subagents

Launch these in parallel — they review different, non-overlapping dimensions:

- **`sterman-reviewer`** — causal structure: feedback loops, delays, stock/flow consistency, policy resistance.
- **`platform-sd-reviewer`** — simulation code: integration method, numerical stability, delay formulations.
- **`platform-sql-reviewer`** — data pipeline: query correctness, contamination, aggregation bias, whether a claimed number actually has a `raw/queries/` artifact behind it.

## Workflow

1. Read `60_modeling/system_dynamics/sd-model/log.md`'s most recent entries and `60_modeling/system_dynamics/sd-model/feed/` for anything not yet reviewed.
2. Launch the three subagents in parallel, each scoped to what changed since the last lint pass (check `60_modeling/system_dynamics/sd-model/log.md` for the last `/sd-lint` entry, or review everything on a first run).
3. Collect each subagent's summary. If `sterman-reviewer` and a `platform-*-reviewer` disagree, resolve per the precedent in `reviews/Sterman/sterman_response_to_amazon.md`: Sterman arbitrates causal/structural questions, the platform reviewers arbitrate numerical/implementation/data questions.
4. For every open critique (not yet resolved), append it as a row or bullet to `60_modeling/system_dynamics/sd-model/log.md` under a new dated entry, and update the relevant `60_modeling/system_dynamics/sd-model/scorecards/*.md`'s "Sterman's structural critiques — status" table.
5. If a critique implies a number's confidence should change, update `60_modeling/system_dynamics/sd-model/Confidence Ledger.md`.
6. Announce to the user: what's newly resolved, what's newly open, and whether any open critique blocks `/sd-calibrate` work that's already queued.

## Important

- Reviewers write their own dated files under `60_modeling/system_dynamics/sd-model/reviews/` — never edit a past review's content (Write-Correctness Law 5). A correction gets a new dated file or a note appended to the *next* review, not a silent edit of the old one.
- Don't invent new headline numbers during a lint pass — that's `/sd-calibrate`'s job. Lint critiques structure and flags what needs (re-)calibration.
