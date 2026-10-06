# Model testing

Paraphrased from *Business Dynamics* ch. 21 ("Truth and beauty: validation and model testing") and Sterman's other writing on model evaluation. Core stance: **no model is valid in the sense of being true**. All models are wrong because they are simplifications. The question is whether a model is useful for its stated purpose, and testing is how you find out where it is not. Tests are run throughout the project, and their results are reported openly, failures included.

## The test battery

| Test | Question | How |
|---|---|---|
| **Boundary adequacy** | Are the important concepts for the purpose endogenous? Does behavior or policy advice change if the boundary is extended? | Boundary chart; add a candidate structure and check whether conclusions change |
| **Structure assessment** | Does the structure match the real system's physical and decision-making structure? Are conservation laws respected? | Walk through each equation with people who run the system; partial-model tests of decision rules |
| **Dimensional consistency** | Does every equation balance in units without fudge factors? | Unit check of every equation, by tool and by hand |
| **Parameter assessment** | Does each parameter have a real-world counterpart, and is its value consistent with all available knowledge (numerical and descriptive)? | Statistical estimation where possible; judgmental estimates labeled as such; partial-model calibration |
| **Extreme conditions** | Does the model behave plausibly when inputs take extreme values (zero customers, infinite price, no budget)? | Direct inspection of each equation, plus extreme-input simulations |
| **Integration error** | Are results sensitive to time step or integration method? | Halve DT; switch Euler ↔ RK4 |
| **Behavior reproduction** | Does the model reproduce the reference modes — pattern, phase, amplitude, turning points? | Fit statistics and visual comparison (below) |
| **Behavior anomaly** | Do anomalous behaviors appear when an assumption is changed or a loop removed? | "Loop knockout" experiments explain why the structure is needed |
| **Family member** | Can the model reproduce the behavior of other instances of the same system (another category, another market)? | Re-parameterize for a sibling case |
| **Surprise behavior** | Does the model produce behavior nobody expected, and is it then found in reality? | Treat surprises as hypotheses to check in data |
| **Sensitivity analysis** | Do conclusions change under plausible parameter ranges? | Numerical, behavior-mode and policy sensitivity; Monte Carlo over joint uncertainty |
| **System improvement** | Did the modeling process actually improve decisions? | The ultimate test; rarely measured |

**Three kinds of sensitivity.** *Numerical*: the numbers change. *Behavior mode*: the pattern changes, e.g. growth becomes overshoot. *Policy*: the recommended policy changes. Only the last two threaten conclusions, so effort goes there.

## Behavior reproduction statistics
- Report several statistics together, not just R²: **MAPE** or mean absolute error, R², and the **Theil inequality decomposition** of mean squared error:
  - **U^M (bias):** the share of error from the difference in means. Points to a systematic error, usually in a parameter or the initial condition.
  - **U^S (unequal variation):** the share from the difference in variances. The model is too smooth or too volatile.
  - **U^C (unequal covariation):** the share from imperfect point-by-point correlation. Usually acceptable when it comes from noise or from cycles the model does not try to match.
  - A good fit concentrates error in U^C. A large U^M or U^S signals a structural or parameter problem worth chasing.
- **Partial-model tests:** drive a sub-model with historical data for its inputs and compare its outputs, as Oliva, Sterman & Giese do for their valuation sector. This isolates errors before the full model is closed.
- Fitting history is **necessary but weak** evidence. A model can fit through compensating errors, and many structures can fit the same data. Reproduction must come from structure, not from exogenous time series driving the output.

## Red flags a reviewer should raise
- Exogenous time series that carry the behavior to be explained.
- Parameters tuned only to fit, with no real-world interpretation.
- Discontinuities and switches standing in for decision rules.
- Stocks that can go negative; flows with the wrong units.
- An "equilibrium" that exists only because every loop has been cut.
- A conclusion that rests on one parameter nobody has measured, with no sensitivity analysis.
- Fit statistics reported without saying what the model was fitted to and what was held out.
