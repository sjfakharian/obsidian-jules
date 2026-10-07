# Contributing to Obsidian-Jules

Thanks for your interest in contributing.

Obsidian-Jules is an early-stage project exploring reviewable, agentic workflows for long-lived Obsidian knowledge bases. Contributions that improve safety, reliability, reproducibility, and clarity are especially welcome.

## Good contribution areas

- Claude Code agents and lifecycle hooks
- safe-write and Knowledge PR workflows
- broken-link and metadata validation
- deterministic tests and fixtures
- vault hygiene and graph maintenance
- documentation and onboarding
- compatibility across macOS, Linux, and Windows
- privacy-preserving integrations

## Before opening a pull request

1. Keep changes focused and easy to review.
2. Do not include private vault data, credentials, tokens, or personal transcripts.
3. Add or update tests when behavior changes.
4. Preserve the review-first principle: agents should propose durable knowledge changes rather than silently rewriting trusted notes.
5. Document any external service, API, or credential requirement.

## Pull requests

In the PR description, please include:

- what problem the change solves;
- what behavior changed;
- how it was tested;
- any privacy or safety implications;
- screenshots or examples when they materially help review.

Small PRs are preferred.

## Issues

Bug reports should include reproduction steps, expected behavior, actual behavior, and the relevant execution mode (Claude Code, Google Jules, or hybrid).

Feature requests are most useful when they describe the workflow problem first, before proposing an implementation.

## Security and private data

Never attach real secrets or sensitive vault contents to a public issue.

If you discover a security problem that should not be disclosed publicly, contact the maintainer privately rather than opening a public issue.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
