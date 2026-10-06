# Feedback structures, archetypes and canonical growth models

## Basic behavior modes and the structure behind them
| Mode | Generating structure |
|---|---|
| Exponential growth | A dominant reinforcing loop |
| Goal seeking | A dominant balancing loop |
| Oscillation | A balancing loop with significant delay (often with supply-line neglect) |
| S-shaped growth | Reinforcing growth that shifts to dominance of a balancing loop as a carrying capacity is approached, with no significant delay in that limit |
| S-shaped growth with overshoot | As above, with a delay in the balancing loop |
| Overshoot and collapse | Growth against a carrying capacity that is itself eroded by the overshoot |

**Shifting loop dominance** is the key idea. The same structure produces different behavior over time as different loops become dominant. A bottleneck is the visible symptom of a balancing loop gaining dominance.

## Diffusion and path dependence
- **Bass / logistic diffusion:** adoption from external influence (advertising) plus word of mouth (contacts between adopters and potential adopters × adoption fraction). Saturation comes from depletion of the potential-adopter pool.
- **Path dependence** (*Business Dynamics* ch. 10): reinforcing loops such as network effects, scale economies, learning curves, complementary assets and standards amplify small early differences into dominance ("success to the successful"). Strong positive feedback creates tipping points and winner-take-all outcomes, and the same loops can turn into vicious cycles.

## System archetypes (Senge, *The Fifth Discipline*; widely used in SD practice)
- **Limits to growth:** a reinforcing growth engine meets a balancing loop around a limiting condition. Pushing harder on the engine is futile. The leverage is in the limiting condition.
- **Growth and underinvestment:** growth erodes performance (for example, service quality), and investment in capacity is judged against a standard that itself erodes. Capacity is never built in time and growth stalls. *This is the archetype most associated with capacity bottlenecks.*
- **Shifting the burden:** a symptomatic fix (subsidy, discount) relieves the problem while the fundamental solution atrophies, sometimes with an addiction side effect.
- **Fixes that fail:** a quick fix has a delayed side effect that recreates the problem.
- **Eroding goals:** a gap is closed by lowering the goal instead of improving performance.
- **Success to the successful:** two activities compete for a shared resource, and the initial winner gets more resource.
- **Tragedy of the commons:** individually rational use of a shared resource depletes it for everyone.
- **Escalation:** two parties react to each other's relative position, as in a bid war.

## Canonical models of growth limited by capacity

### Forrester's Market Growth model (1968)
A firm sells into an effectively unlimited market:
- A salesforce generates orders, and revenue funds the hiring of more salespeople (reinforcing loop).
- Orders fill a backlog served by production capacity. When capacity lags, **delivery delay** rises and depresses the order rate (balancing loop).
- Capacity expansion responds to *perceived* delivery delay compared with a delivery-delay *goal*, but with long acquisition and perception delays. Where the goal drifts toward recent performance, it erodes.
- Result: the firm limits its own growth, and can stagnate or decline, despite unlimited demand. The constraint is internal: the capacity-acquisition policy. Lesson: **look for the limit inside the firm's own policies before blaming the market.**

### People Express (Sterman's management flight simulator, 1988)
An airline grows faster than it can hire and train staff. Service quality erodes, customers defect to competitors, and the growth engine reverses. It is a service-industry version of growth and underinvestment.

### Quality erosion in services (Oliva & Sterman, *Management Science*, 2001, "Cutting corners and working overtime")
- High work pressure from service capacity below demand leads workers to first work overtime, then cut the time spent per customer.
- Productivity appears to rise, so management reads it as efficiency and **lowers its capacity targets** (eroding goals). Overtime causes fatigue and turnover, which reduce capacity further.
- Quality falls slowly and invisibly, because it is hard to measure. Customers defect with a delay.
- Lesson: when the quality signal is weak and the throughput signal is strong, organizations under-invest in capacity and quality erodes. Deliberate slack, even overstaffing, can be the high-leverage policy.

### Capability trap (Repenning & Sterman, *California Management Review*, 2001, "Nobody ever gets credit for fixing problems that never happened")
- Faced with a performance gap, managers can push people to **work harder** (immediate effect) or invest in **working smarter** (process improvement, with a delayed effect and a temporary drop in output: "worse before better").
- Pressure biases them toward working harder, and capability erodes. The resulting performance gap increases pressure: a reinforcing trap.
- Attribution errors (blaming people rather than the system) lock the trap in.

### Get Big Fast in e-commerce (Oliva, Sterman & Giese, 2003)
See `gbf_ecommerce_model.md`.

## Misperceptions of feedback (Sterman 1989 and the Beer Game)
Decision makers systematically ignore the supply line (orders placed but not yet received), underestimate delays, think in open loops ("event → reaction"), and attribute dynamics to external events or other people. Models should represent these biases where the actors in the system have them, not assume optimal behavior.
