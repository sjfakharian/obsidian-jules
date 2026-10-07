# Maintainer checklist

## Public project presentation

- Keep README claims aligned with `PROJECT_STATUS.md` and actual source.
- Preserve MIT and confirmed upstream notices; complete the remaining component provenance audit.
- Use synthetic examples, and do not publish private deployment files to fill template gaps.
- Keep the quick start aligned with the nested hook package.
- Never substitute an agent prompt for an implemented scheduler or a passing integration test.

## Repository About fields

Suggested description:

> Experimental Obsidian knowledge-work scaffold with Claude Code agents, lifecycle hooks, and reviewable change workflows.

Suggested topics:

`obsidian`, `claude-code`, `knowledge-management`, `pkm`, `ai-agents`, `agentic-workflows`, `typescript`, `automation`, `second-brain`

These are recommended metadata, not evidence that GitHub's About fields have been updated. An authenticated maintainer with repository administration access can set them through the About editor or GitHub CLI:

```sh
gh repo edit sjfakharian/obsidian-jules --description "Experimental Obsidian knowledge-work scaffold with Claude Code agents, lifecycle hooks, and reviewable change workflows."
gh repo edit sjfakharian/obsidian-jules --add-topic obsidian,claude-code,knowledge-management,pkm,ai-agents,agentic-workflows,typescript,automation,second-brain
```

## Acceptance work still needed

Run a clean-machine setup and the nested test/typecheck commands. Record the exact commit and tool versions. Resolve tracked generated files and undeclared tooling in separate reviewed changes. Exercise a synthetic note workflow before using private content or enabling background runners.

## Open-source support applications

Be explicit about the project's early stage and upstream foundations. Describe existing code separately from future orchestration. Report only verified reach and external contribution metrics. Do not claim that another ecosystem already depends on the project without evidence.

A Claude subscription would be used for maintaining and evaluating agent definitions, hook safety, proposal review, tests, documentation, and portability. It should not be presented as proof of existing user adoption or as a way to bypass another provider's limits.
