# SD Calibrate

Resolve one open question from `60_modeling/system_dynamics/sd-model/Database Investigation Queue.md` with a real, indexed database query, and update the wiki with the real number (whatever it turns out to be — never assume it matches a prior guess).

**When to use**: To upgrade a number in `60_modeling/system_dynamics/sd-model/Confidence Ledger.md` from `(unverified-inference)` to `(data-derived)`, or to answer a specific `/sd-lint` critique that a claimed finding lacks a real query behind it.

## Usage

```
/sd-calibrate <question from the Database Investigation Queue, or a description of what to calibrate>
```

## Workflow

1. Find the relevant question in `60_modeling/system_dynamics/sd-model/Database Investigation Queue.md`. If none matches, check `60_modeling/system_dynamics/sd-model/Confidence Ledger.md` for the highest-priority `(unverified-inference)` row instead.
2. Check `60_modeling/system_dynamics/sd-model/raw/queries/` for an existing artifact — don't re-run a query that's already there and current.
3. Identify the real database and table(s) needed. Prefer `clickhouse_adservice` over MySQL for any aggregation spanning more than a few days or scanning a large table — MySQL has confirmed timeout behavior on `seller_wallet_transactions` for unindexed multi-week aggregations (see `60_modeling/system_dynamics/sd-model/Confidence Ledger.md`).
4. Write the query. Apply the lessons already on record: exclude `gift_card_id IS NOT NULL` when isolating "pure cash" spend; check whether daily aggregation would hide an intra-day pattern before choosing a time grain (see `reviews/Platform Reviewer/amazon_sql_expert_review.md` and `60_modeling/system_dynamics/sd-model/concepts/Auction Competition and CPC.md`).
5. Run it for real against the live database. Do not mock, simulate, or estimate the result — if the query can't be run (permissions, timeout, missing table), say so explicitly rather than substituting a plausible-looking number.
6. Save the exact query text and exact result, with the run date, to `60_modeling/system_dynamics/sd-model/raw/queries/<descriptive-name>.md` (or `.sql` + a short result note).
7. Update:
   - `60_modeling/system_dynamics/sd-model/Confidence Ledger.md` — new row or updated tag, `(data-derived)`, linking to the `raw/queries/` artifact.
   - The relevant `60_modeling/system_dynamics/sd-model/feed/` entry, `60_modeling/system_dynamics/sd-model/concepts/` page, and `60_modeling/system_dynamics/sd-model/scorecards/*.md` if the new number differs materially from what was previously assumed — don't silently leave a stale `(unverified-inference)` number standing next to a new `(data-derived)` one for the same claim.
   - `60_modeling/system_dynamics/sd-model/log.md` with a dated entry: what was calibrated, the old (unverified) value, the new (data-derived) value, and whether it changes any recommendation.
8. If the new number materially changes a structural conclusion (not just a magnitude), trigger `/sd-lint` so `sterman-reviewer` can re-assess.

## Important

- A cohort/temporal query against `seller_wallet_transactions` or similar high-volume tables should be scoped (date range, seller-id sample, or pre-aggregated) before running at full scale — confirm it will complete before letting it run unbounded.
- If the real number contradicts a policy recommendation already made (e.g. Sterman's guardrail recommendation, sized off the 64%/89% figures), report that prominently — a corrected number that changes a business recommendation is the entire point of this command, not an inconvenience to smooth over.
