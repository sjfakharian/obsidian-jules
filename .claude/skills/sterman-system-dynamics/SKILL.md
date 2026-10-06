---
name: sterman-system-dynamics
description: John Sterman's System Dynamics method as a working knowledge pack — modeling process, stock-flow and decision-rule formulation, model testing, canonical growth/capacity structures (Market Growth, quality erosion, capability trap, Get Big Fast), and how to locate a system's binding bottleneck. Use when building, testing or critiquing a System Dynamics model, a causal loop diagram, or a "where is our bottleneck" question; read by the john-sterman agent.
---

# Sterman System Dynamics method

A paraphrased working summary of the method John D. Sterman (MIT Sloan, System Dynamics Group) teaches in *Business Dynamics: Systems Thinking and Modeling for a Complex World* (2000) and applies in his papers. It is written in our own words for practical use. It is not a copy of the book, and anything attributed to him should be checked against the source before it is quoted.

## When to use
- Building a System Dynamics (SD) model from a business problem.
- Reviewing a causal loop diagram (CLD), stock-flow map or simulation for structural errors.
- Answering "what is limiting our growth / where is the bottleneck" with feedback structure rather than with a single regression.

## Read in this order
| File | Covers |
|---|---|
| `references/modeling_process.md` | The five-step iterative process, problem articulation, reference modes, boundary charts, dynamic hypotheses |
| `references/formulation_rules.md` | CLD rules, stocks and flows, units, delays, nonlinear effects, decision rules (Baker criterion, bounded rationality), robust equations |
| `references/model_testing.md` | The model-testing battery (boundary, structure, dimensions, parameters, extreme conditions, integration error, behavior reproduction with Theil statistics, sensitivity, policy tests) |
| `references/feedback_structures.md` | Basic behavior modes, archetypes, and canonical models of growth limited by capacity: Market Growth, People Express, quality erosion, capability trap, diffusion |
| `references/bottleneck_analysis.md` | How to locate the binding constraint: adequacy ratios, weakest-link attractiveness, shadow prices by simulation, loop dominance, shifting bottlenecks |
| `references/gbf_ecommerce_model.md` | Oliva, Sterman & Giese (2003) "Limits to growth in the new economy": structure, equations, loops, findings, and how (not) to transfer it to an ads marketplace |
| `references/thinking_style.md` | How Sterman questions a model and a team; his recurring critiques; tone |

## Primary sources in this vault
- `60_modeling/system_dynamics/sd-model/raw/sources/oliva_sterman_giese_2003_limits_to_growth_new_economy.pdf` — the full paper.
- `60_modeling/system_dynamics/sd-model/raw/sources/oliva_sterman_giese_2003_dot_com_model.vmf` — its Vensim model (binary; variable documentation extracted to `..._dot_com_model_docs.txt`).

## Non-negotiables (summary)
1. Start from a **problem shown as behavior over time**, never from a model of "the whole system".
2. Explain the behavior **endogenously**: loops first, exogenous drivers last.
3. Every equation is **dimensionally consistent**, every stock has explicit in/outflows, and no stock can go negative unless it physically can.
4. Decision rules use **only information the decision maker actually has**, with realistic perception delays.
5. A model is judged by **fitness for its purpose**, through many tests, never by a single fit statistic. All models are wrong.
6. A "bottleneck" is a **binding constraint inside a feedback structure**. Relaxing it moves the binding point elsewhere, so analysis must be repeated after each relaxation.
