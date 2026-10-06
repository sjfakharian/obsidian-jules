---
name: portfolio-organize
description: Organize, rename, move, archive or add projects and files in Jules OS according to the v3 standard (numbered domain folders, project contract, hub notes, naming rules, protected paths), with reference-safe moves and validation. Use for any cleanup, restructure, new project, new output, or "tidy this folder" request.
---

# Portfolio organize (Jules OS standard v3)

Canonical rules: `99_system/PROJECT_STANDARD.md`. Read it in full first. This skill is the **procedure**, not a second copy of the rules.

## 0. Preconditions
- Complete the AGENTS.md startup protocol, then read `99_system/PROJECT_STANDARD.md` and the target hub note `<project>/<project>.md`.
- Make sure no pipeline is running: no `*.lock` in the project, and query_keyword not inside its 01:00–09:00 window. Also check `launchctl list | grep -E 'sajad|zerospend|acmecorp'`.
- Never touch the protected paths in standard §4. Their internals are off-limits; moving the whole folder needs a full reference rewrite.

## 1. Decide the destination
| Item | Goes to |
|---|---|
| New project | `NN_<domain>/<project>/` + hub note from `templates/Project Hub.md` + `README.md`, `CHANGELOG.md`, `VERSION` |
| Loose doc / framework / prompt | `docs/`; prompts for LLMs go in `docs/prompts/` |
| Script | `scripts/` (package code: `src/`) |
| Query | `sql/` |
| Deliverable (list, workbook, report) | `outputs/YYYY-MM-DD_<topic>/`; the newest published result also goes in `outputs/latest/` |
| Log / stdout capture | `logs/` |
| Superseded version, `_vN`, `final`, `backup`, `copy`, `" (1)"` | `archive/` (keep the original name) |
| Input copied from elsewhere | `data/raw/` (immutable) |

Names: lowercase snake_case, ASCII, no spaces, ISO date prefix for point-in-time items, no status or version words in active names (standard §3).

## 1b. Saving a refreshed segment or report
Every refresh is a new dated version. Never overwrite the previous one.
```bash
RUN=$(/usr/bin/python3 "<YOUR_VAULT_PATH>/99_system/tools/dk_outputs.py" new "<project dir>" <topic> [--date YYYY-MM-DD] [--pii])
# write the files into "$RUN" (snake_case names, no final/v2/copy)
/usr/bin/python3 "<YOUR_VAULT_PATH>/99_system/tools/dk_outputs.py" finish "$RUN" [--pii] --source <script or 'chat'>
```
In Python, use `dk_outputs.new_run(__file__, "<topic>", day=…, pii=…)`, then `run.path()`, then `run.finish()`.
- Old versions are managed by `99_system/tools/retention.py` according to `99_system/retention_policy.yaml`. Don't delete them by hand.
- If a new recurring topic needs a different class, add a rule to the policy, with the reason.
- Put a `.keep` file in a version (containing the reason) to pin it.

## 2. Reference-safe move (every item)
1. Search the **whole vault** for references. Use ripgrep, which sees gitignored files too; never the `grep` shell function, which skips them:
   ```bash
   rg -n --no-ignore --hidden -g '!.git/' -g '!node_modules/' -F '<basename or relative path>' "<YOUR_VAULT_PATH>"
   ```
2. Decide by who references the item:
   - Only docs, logs or manifests → move it, then rewrite those references.
   - Code by **absolute** path → move it and rewrite the path string.
   - Code by **relative** path or bare filename → either skip it, or move it and edit the exact code line. Read the line first.
3. Move with `mv`. Inside a git repo use `git mv`. Never delete; archive instead.
4. Append each move to `99_system/history/<UTC-timestamp>_reorganization_manifest.tsv` as `old_path<TAB>new_path<TAB>kind`.
5. Before a bulk rewrite, back up every text file it will change into `90_archive/reorg_backups/<UTC>_*.tar.gz`. **Never rewrite `99_system/history/` or `90_archive/`.** They are the record: rewriting them once destroyed a move manifest's old-path column, and it had to be restored from backup. In `CHANGELOG.md` files and incident records, update only path strings so links keep resolving; never reword the entries.
6. Quote paths in shell. `Jules OS` contains a space. In zsh, use arrays (`"${list[@]}"`), not unquoted string variables.
7. A moved `.venv` keeps working: its `bin/` shebangs contain the old path, so rewrite them too, or rebuild with `99_system/laptop_migration/scripts/04_setup_projects.sh --only <section>`.

## 3. Update the metadata in the same task
- Hub note frontmatter: `status`, `version`, `updated`, `entrypoints`, `tables`. Keep the body's `Outputs` section current.
- Update `VERSION` and `CHANGELOG.md` (the project's own, plus `99_system/CHANGELOG.md` for portfolio-level changes).
- For a new or renamed project, also update:
  - `99_system/PROJECT_INDEX.md`
  - `99_system/PORTFOLIO.yaml`
  - the domain hub `<domain>.md` list
  - `AGENTS.md` §3 portfolio map
- If a note name changes, update its wikilinks. Note basenames must stay unique vault-wide.

## 4. Validate (always)
```bash
/usr/bin/python3 "<YOUR_VAULT_PATH>/99_system/tools/check_structure.py"
```
- **FAIL:** fix it before reporting done.
- **WARN:** report the remaining items to the user with the reason. Code-generated names and immutable runs are the usual cases.
- If code moved, run the project's offline checks. Examples: `40_sellers/weekend_activity` pytest; `10_search_ads/query_keyword/scoring` unittest; `99_system/laptop_migration/scripts/06_verify_new_mac.sh --tests`.
- Record any broken path, unsafe condition or reusable lesson under `70_platform/data_catalog/agent_knowledge/` and update its `INDEX.md`.

## 5. Report
Tell the user:
- what moved (count, and where the manifest is);
- what was skipped and why;
- the rewrites made;
- the validator summary line.
