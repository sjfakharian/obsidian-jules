# Formulation rules

Working rules paraphrased from *Business Dynamics* (chs. 5–8, 11–14, 16) and standard SD practice.

## Causal loop diagrams
- A link A→B is **+** if, all else equal, an increase in A makes B higher than it would otherwise have been; **−** if lower. For a flow into a stock, "+" means A adds to the stock.
- Loop polarity: **reinforcing (R)** if the number of negative links is even, **balancing (B)** if odd. Check by tracing a change around the loop.
- Name every important loop with a short memorable label and its polarity.
- Variable names are nouns or noun phrases with a clear sense of direction ("customer churn", not "churning"); avoid "change in X" (that is a flow).
- Make the **goals** of balancing loops explicit.
- Separate **actual** from **perceived** conditions; the difference is where delays and bias live.
- Mark **delays** on links (‖). Mark which side of a link is a stock when it matters.
- A CLD cannot show accumulation. Any argument that depends on accumulation must move to a stock-flow map.

## Stocks and flows
- **Stocks** are accumulations: they characterize the state of the system, give it inertia and memory, create delays, and decouple inflow from outflow so disequilibrium can persist.
- **Snapshot test:** if time froze, could you count or measure it? Then it is a stock. Rates exist only over an interval.
- Units: flow units = stock units / time. Check every equation for dimensional consistency, with no hidden "fudge" constants that only exist to fix units.
- Conservation: material moves between stocks along explicit flows. Information can be copied; material cannot.
- A stock changes only through its flows. A variable that changes "instantly" in response to a change elsewhere is an auxiliary, and claiming it is a stock is a structural error (and vice versa).
- Physical stocks must not go negative. Outflows from a stock are first-order controlled: `outflow = MIN(desired outflow, stock / minimum time to drain)`.
- **Aging chains / coflows:** split a stock by experience, tenure, vintage or cohort when the attribute changes behavior (e.g. new vs experienced employees, trial vs repeat buyers). A coflow tracks an attribute (cost basis, average quality) carried by the units of a main stock.

## Delays
- **Material delays** conserve what flows through them (orders in transit, sellers in onboarding). **Information delays** adjust a perception or expectation (perceived quality, expected growth).
- Characterize a delay by its **average length** and its **distribution** (order). First-order: an exponential response, immediate partial reaction. Third-order: an S-shaped response, little reaction at first. Pipeline: a fixed lag.
- Information delays: `perceived = SMOOTH(actual, time to perceive)` (first-order adaptive expectations); `SMOOTH3` for a third-order delay.
- **Trend expectations:** forecasted growth from the fractional difference between a recent and a historic average (Sterman's TREND structure, ch. 16). This is how actors in the model "extrapolate".
- Choose the integration step (DT) at no more than ¼ to 1/10 of the shortest time constant, then test that halving DT changes nothing material.

## Nonlinear relationships and multiplicative effects
- Write a behavioral relationship as `actual = normal value × effect1(x1/x1*) × effect2(x2/x2*) …`. Each effect is a function of an input **normalized by its reference value**, passes through (1, 1), and is bounded at extremes.
- Table (lookup) functions are fine; define their shape from reasoning about extreme values first, then data.
- The **multiplicative** form means any single effect near zero drags the whole product down. That is often realistic (no customers if service is dreadful, whatever the price) and it is the formal basis of "weakest link" bottlenecks.
- Avoid `IF THEN ELSE` discontinuities and hard thresholds for aggregate behavior. Real aggregate responses are smooth because individuals differ.
- Fractional-rate formulations (`outflow = stock × fractional rate`) are the default for flows proportional to the stock.

## Decision rules
- **Baker criterion:** a decision rule may use only information actually available to the decision maker at the time of the decision. No perfect foresight, no information that requires the model's equations to compute.
- **Bounded rationality:** people use heuristics, rules of thumb, anchoring and adjustment, and they systematically ignore supply lines and delays (Sterman's experimental work on misperceptions of feedback).
- Typical stock-management rule: `order = expected loss + (desired stock − stock)/adjustment time + (desired supply line − supply line)/supply-line adjustment time`. Underweighting the supply-line term creates overshoot and oscillation.
- Goals can **erode**: a performance standard that adjusts toward actual performance turns a balancing improvement loop into a slow decline.
- Model what people **do**, not what they say they do or what is optimal.

## Robustness
- Every formulation must make sense for **extreme** inputs (zero, very large). If a variable could go to zero, check every division.
- Initial conditions should be computed from the equilibrium of the model where possible.
- Hard-coded time series or "switches" that drive behavior from outside are a warning sign that structure is missing.
