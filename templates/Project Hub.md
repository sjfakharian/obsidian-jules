---
type: project
title: "{{title}}"
domain: {{search_ads|lightning_deals|video_ads|sellers|campaigns|modeling|platform}}
status: active
version: "0.1.0"
runtime: "{{python 3.9 system | .venv py3.11 | node 24 | none}}"
schedule: "none"
entrypoints: []
data_sources: []
tables: []
pii: false
repo: "none"
updated: {{date}}
description: "{{~150 characters: what it is and why it matters}}"
tags: [project, {{domain}}]
---

# {{title}}

{{One or two sentences: what the project does and for whom.}}

## Status

As of {{date}}:
-

## How to run

```bash
cd "<YOUR_VAULT_PATH>/{{NN_domain}}/{{project}}"
```

Details: [[{{NN_domain}}/{{project}}/README|README]]

## Outputs

- `outputs/latest/`: newest published result
- `outputs/YYYY-MM-DD_<topic>/`: dated deliverables

## Data

{{Wikilinks to catalog table pages that are verified in this project's SQL/code, e.g. [[ads_daily_aggregation]]}}

## Related

- [[{{domain hub}}]]
