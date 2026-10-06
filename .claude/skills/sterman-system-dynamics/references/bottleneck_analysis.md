# Locating the binding bottleneck with System Dynamics

"Where is the bottleneck?" in SD terms means: **which balancing loop currently limits the growth of the outcome we care about, and what limiting condition does that loop act through?** Since loop dominance shifts, the answer depends on the time horizon and changes once a constraint is relaxed.

This file combines Sterman's method with standard SD loop-dominance tools. Tools that are not Sterman's own are attributed to their authors.

## Step 0 — Fix the outcome and the horizon
- One primary outcome (for example, cash revenue) and at most one or two secondary outcomes or guardrails.
- One horizon or a small set (3, 6, 12 months). A constraint that binds over 3 months (budget pacing) differs from one that binds over 12 (advertiser acquisition capacity).

## Step 1 — Identity tree (accounting, not causality)
Decompose the outcome into an exact product or sum of measurable terms, for example: revenue = demand events × eligible opportunities × fill × response rate × price. An identity cannot tell you *why* a term moves, but it shows which terms moved, and it gives every candidate bottleneck a measurable home. Each term then needs its own causal explanation inside the model.

## Step 2 — Adequacy ratios for every resource
For each resource the outcome depends on, define **adequacy = available / required**. Oliva, Sterman & Giese use exactly this for server infrastructure, technical staff and customer-support staff.
- Adequacy far below 1 means the resource is binding now.
- Adequacy rising toward 1 means it will bind soon if growth continues.
- Adequacy far above 1 means slack. Pushing more of that resource will not help.
- "Required" must be computed from the model's own demand, not from a target someone wrote down.

## Step 3 — Weakest link in the attractiveness product
When a population (customers, advertisers) responds to multiplicative attractiveness `A = Π effect_i(x_i/x_i*)`, the bottleneck attribute is the one with:
1. the lowest effect value, and
2. the steepest local slope (sensitivity) at the current operating point.

Report both. An attribute at 0.5 with a flat slope matters less than one at 0.8 on a steep part of its curve.

## Step 4 — Shadow prices by simulation
For each candidate constraint `c`, run the calibrated model with `c` relaxed by a small, realistic amount (for example +10% capacity, −10% delay) and record the change in the outcome at each horizon.
- The ranking of Δoutcome/Δc across constraints is the empirical bottleneck ranking.
- Normalize by the cost or feasibility of relaxing each constraint before calling it a priority.
- Repeat under parameter uncertainty (Monte Carlo). A bottleneck that tops the ranking only under one parameter set is a hypothesis, not a finding.

## Step 5 — Loop dominance over time
Find which loops drive behavior in each phase:
- **Behavioral / loop-knockout method** (Ford, *SDR* 1999): deactivate a loop and watch the behavior change. Simple and transparent.
- **Eigenvalue elasticity analysis** (N. Forrester 1982; Kampmann & Oliva 2006): how sensitive the system's behavior modes are to each loop's gain. Rigorous, mostly for linearized models.
- **Pathway participation** (Mojtahedzadeh, Andersen & Richardson 2004) and **Loops that Matter** (Schoenberg, Davidsen & Eberlein 2020): attribute the change in a variable to the loops and pathways driving it at each moment.
- At minimum, use the knockout method and report it in plain language: "From month X the advertiser-saturation loop B2 dominates; R1 still operates but cannot overcome it."

## Step 6 — Shifting bottlenecks
After relaxing the top constraint in the model, rerun Steps 2–5. In a feedback system the next constraint becomes binding, sometimes quickly. Present the **sequence** (bottleneck 1 → 2 → 3), not a single answer, and say which relaxations are self-limiting because they feed a balancing loop elsewhere.

## Step 7 — Policy resistance check
For each proposed relaxation, ask what balancing loop will push back, and with what delay. Examples: more advertisers → more competition → higher price and lower result per advertiser → churn; more ad slots → worse shopper experience → less demand. A bottleneck policy that triggers stronger resistance than it relieves is not a lever.

## Common mistakes
- Calling the variable with the biggest recent change "the bottleneck". That describes a symptom, not the constraint.
- Using cross-sectional regression elasticities as if they were the causal gain of a loop.
- Ranking bottlenecks on one horizon only.
- Ignoring capacities that are organizational (team attention, onboarding throughput, tooling) because they lack a database table.
- Treating the bottleneck as fixed. The model's value is in showing where it moves next.
