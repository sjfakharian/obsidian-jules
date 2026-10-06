# The modeling process

Paraphrased from the process Sterman describes in *Business Dynamics* (2000), ch. 3, with practical notes. The steps are **iterative**: testing sends you back to problem definition as often as forward to policy.

## 1. Problem articulation (boundary selection)

The most important step. A model is built to solve a problem, not to mirror a system.

- **Theme:** what is the problem, and why is it a problem now? Who is the client and what decision will the model inform?
- **Key variables:** the handful of variables whose behavior defines the problem (for a bottleneck study: the output that fails to grow, plus the candidate limiting resources).
- **Time horizon:** far enough back to see how the problem emerged, far enough forward to capture delayed and indirect effects of policies. Rule of thumb: several times the longest important delay.
- **Reference modes:** graphs over time of the key variables — historical data where it exists, plus explicitly labeled hypothetical "feared" and "hoped-for" futures. A reference mode is a *pattern* (growth, decline, oscillation, S-curve, overshoot-collapse), not a point forecast.
- **Problem definition:** a dynamic statement, e.g. "advertiser count grew ~X%/quarter while revenue per advertiser fell; why, and what keeps total revenue from compounding?"

Outputs: a one-page problem statement and the reference-mode charts. Without them, model review has nothing to test against.

## 2. Formulating a dynamic hypothesis

A dynamic hypothesis is a working theory of how the feedback structure **endogenously** generates the reference modes.

- **Endogenous focus.** Look for the explanation in the interaction of decision rules and physical structure inside the boundary. Exogenous shocks are allowed but must not carry the explanation.
- **Generate rival hypotheses.** Write down more than one structure that could produce the reference mode, and plan the tests that discriminate between them.
- **Mapping tools:**
  - *Model boundary chart:* three lists — endogenous, exogenous, excluded. Excluded items are a deliberate, defensible choice, and the list is revisited after testing.
  - *Subsystem diagram:* the main sectors (actors, resources, markets) and the material, money and information flows between them. Good for showing who decides what.
  - *Causal loop diagrams:* polarity-labeled links, named loops, delays marked. For communication and hypothesis generation, not for simulation.
  - *Stock and flow maps:* the accumulations and the rates that change them. This is the step from story to model.
  - *Policy structure diagrams:* the inputs to each decision rule.

## 3. Formulating the simulation model

- Specify structure and decision rules (see `formulation_rules.md`).
- Estimate parameters from multiple sources: numerical data, but also interviews, observation, documents, analogous systems and judgment. Absence of numerical data is not a reason to omit a structure believed to matter; omitting it is itself a parameter value of zero.
- Set initial conditions, ideally in equilibrium, so behavior comes from the structure and not from an arbitrary start-up transient.
- Test as you build: every new sector gets partial-model tests before it is connected.

## 4. Testing

See `model_testing.md`. Testing starts at the first equation, not at the end.

## 5. Policy design and evaluation

- **Scenario specification:** what environments must a policy be robust to?
- **Policy design:** new decision rules, new information feedbacks, new structure — not just parameter changes. The highest-leverage policies often change which information reaches which decision.
- **What-if and sensitivity analysis** on policies, with the uncertain parameters swept jointly.
- **Interactions:** policies are tested in combination; a policy that works alone may fail or create a new bottleneck with others.
- **Implementation:** who must change their mental models for the policy to be adopted? Modeling is in service of learning, not prediction.

## Practical notes for a data-rich business setting

- Data shape the reference modes and the parameters; they do not define the structure. A correlation is never a causal link until a mechanism and a decision maker are identified.
- Keep the model small enough to understand. Disaggregate only where the problem requires it.
- Write the purpose at the top of the model and test every proposed addition against it.
