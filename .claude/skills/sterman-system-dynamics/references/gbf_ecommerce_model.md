# Oliva, Sterman & Giese (2003) — "Limits to growth in the new economy"

*System Dynamics Review* 19(2): 83–117. Full text: `60_modeling/system_dynamics/sd-model/raw/sources/oliva_sterman_giese_2003_limits_to_growth_new_economy.pdf`. Vensim model: `..._dot_com_model.vmf` (binary; extracted documentation in `..._dot_com_model_docs.txt`). This page is our own summary, not a substitute for reading the paper.

## Question
Why did so many e-commerce firms that pursued "Get Big Fast" (GBF) — low prices, heavy marketing, rapid capacity build-up, funded by capital markets — fail, even where reinforcing feedbacks really existed? The answer the paper develops: GBF focuses on the positive feedbacks and neglects the **negative feedbacks through service quality and capital**. These grow stronger the faster the firm grows.

## Model
One online product category (calibrated to the US online book market and Amazon.com, 1995–2010), with three competitors: an Amazon-like pure player, a low-price/low-service pure player, and the late-entering online arm of a brick-and-mortar retailer. Eight modules: *Market*, *User Flows*, *Relative Performance*, *Site Operations*, *Human Resources*, *Financial Accounting*, *Fundraising*, *Financial Markets*. The first three plus Financial Markets are shared. The rest are per company, using Vensim subscripts `company` and `department` (engineering and customer support).

### User flows (customer aging chain)
Population → non-shopping internet users → **browsers** (aware of the category online but not yet buying) → buyers. Buyers are split two ways: **loyal vs independent**, and **occasional vs high-volume**. Flows connect them: escalation occasional→high volume, de-escalation, defection loyal→independent, recapture independent→loyal, abandonment of online shopping → "former category shoppers", and re-entry. Word of mouth drives browsers to become buyers.

Key formulations (paraphrased):
- Escalation of loyal occasional to high-volume buyers: `r_oh = ρ_oh · L_o`, with `ρ_oh = ρ*_oh · max(0, (P_h − T_h)/P_h)`. The rate falls as the total number of high-volume shoppers `T_h` approaches its potential `P_h`, a saturation effect.
- Defection of loyal to independent: `ρ_hi = min(ρ_max, ρ*_hi / A_j)`, so it **falls as the firm's attractiveness A_j rises**.
- Recapture of independents: `ρ_ih = ρ* · (A_j / Σ_k A_k)`, the firm's **attractiveness share**.
- **Attractiveness** `A_j` is a multiplicative product of seven nonlinear effects: price, product selection, site content, site performance, fulfillment speed/reliability, customer service quality, brand equity. Each effect is the attribute relative to a reference level, raised to a sensitivity exponent. Perceptions of service, site performance and fulfillment adjust through first-order smoothing ("customer memory").

### Capacity and adequacy
- Required server infrastructure scales with pageviews (power law with a scale-economy exponent). Required customer-support staff scales with transactions × contacts per transaction (also with scale economies).
- **Adequacy** = available / required, for servers, technical staff and support staff. Site performance and service quality are functions of adequacy and the relative workweek.
- Capacity is acquired with delays: server acquisition time, warehouse adjustment time, hiring delay, and rookie→experienced assimilation (about 2 years for engineers, about 6 months for support). Rookies are less productive and absorb experienced staff's time in training and recruiting.
- Work pressure raises the workweek (a nonlinear function of schedule pressure). A sustained long workweek lowers productivity and raises quits (burnout). Quits also respond to the expected value of compensation including stock options, which falls when the stock price drops.

### Money and valuation
- Marketing spending is a fraction of revenue (falling as the market matures) with a minimum floor, cut when liquidity is low. Brand equity accumulates from marketing and decays.
- Market value = max(breakup value, expected present value of profit × pre-IPO discount). During a **honeymoon** period investors value the firm on revenue × an assumed long-run return on sales. The weight on actual net income then rises through a third-order delay. Expected growth uses Sterman's TREND structure. A growth-adjusted discount factor keeps valuation finite when growth exceeds the discount rate.
- Low liquidity cuts investment in servers, marketing, content and staff. This is how capital-market pessimism feeds back into capacity and quality.

## Loops (Fig. 6 of the paper)
- **Reinforcing:** R1 brand investment, R2 server investment, R3 service investment (revenue → cash → investment → attractiveness → loyal buyers → revenue). R4 "stock market booster" (growth → valuation → capital → spending). R5 user-generated content. R6 employee loyalty (stock price → option value → retention → productivity → quality).
- **Balancing (limits to growth):** B1a/B1b **server overload** (more buyers → more pageviews and transactions → lower server adequacy → worse site performance → lower attractiveness). B2 **customers on hold** (more transactions → lower service-infrastructure adequacy → worse service). B3/B4 the delayed adjustments of service and server infrastructure toward required levels.

## Main findings
1. The model replicates Amazon's customer, sales, gross-profit and operating-expense history (1997–2001) **without exogenous drivers**. Valuation was tested separately as a partial model driven by historical data.
2. **Honeymoon length** creates a sharp tipping point in long-run market share (between about 5 and 6 years in their parameterization). Too short and the GBF firm dies in a liquidity spiral before scale economies arrive. Longer helps, but cumulative losses grow.
3. **Entry timing** has three regimes: early entrants can dominate; mid entrants become profitable but never tip the market; late entrants never become profitable. Incumbents that enter early limit the pure player.
4. With **customers more sensitive to service quality**, GBF fails: rapid growth outruns capacity, quality falls, quality-sensitive customers defect to a better-serving entrant, and the reinforcing loops turn into a death spiral.
5. **Policy lesson:** balance investment across the attributes of attractiveness, use price to keep demand growth from outrunning the ability to build capabilities, consider deliberate slack (overstaffing), and plan the transition to profitability before the capital markets force it.

## Transfer to an ads marketplace — use with care
The paper models a **retailer and its shoppers**. An ads marketplace is **two-sided**: advertisers (sellers) buy access to shoppers' attention, and the platform's inventory is shoppers' searches and ad slots. Every mapping below is an **analogy (inferred)** that must be justified with the target system's own structure and data before it enters a model:

| Paper concept | Possible ads-marketplace analogue | Caveat |
|---|---|---|
| Shopper aging chain (browser → occasional → high volume, loyal/independent) | Seller → first-time advertiser → occasional → repeat cash advertiser | Advertiser "loyalty" depends on results (ROAS), not on site experience |
| Multiplicative attractiveness of the firm | Attractiveness of advertising on the platform: results/ROAS, price (CPC), reach, ease of campaign setup, support, trust in reporting | Attributes and sensitivities must be elicited, not copied |
| Server overload (B1) | Inventory congestion: more advertisers on fixed search inventory → lower win rate or higher price → lower result per advertiser | Auction price rises are revenue for the platform, so the sign of the loop differs by actor |
| Customers on hold (B2) | Account management, onboarding and support capacity versus advertiser growth | Needs organizational data that may not be in any table |
| Honeymoon / capital markets (R4) | Subsidies and gift credit that let sellers advertise before facing real cost | Budget is internal, not market-driven |
| Workforce aging chain (HR) | Team capacity to build ad features, tools and measurement | Possibly the hidden bottleneck; usually missing from data |
| Shopper abandonment of online shopping | Shopper experience degraded by ad load → less engagement with search | Long delay, hard to measure, easy to omit |

The paper's most transferable ideas are methodological: **adequacy ratios**, **multiplicative attractiveness with perception delays**, **capacity aging chains**, **partial-model tests**, and **sensitivity sweeps that reveal tipping points**.
