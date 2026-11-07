## 2025-02-14 - Fix command injection in qmd fallback wrappers
**Vulnerability:** Found a command injection vulnerability where dynamic arguments were being unsafely concatenated into a shell command (`join(" ")` with `shell: true`) inside `buildQmdCommand` and `buildLaunchCommand`.
**Learning:** This existed because the fallback path for non-npm installations uses `shell: true` as a last-resort to run `qmd` directly, but the arguments weren't escaped before interpolation. Even though most usages in this codebase use static constants, the API allowed unsafe user input to be passed.
**Prevention:** Always escape dynamic arguments based on the platform (POSIX or Windows) before interpolating them into a shell command string that will be executed with `shell: true`. A utility function like `quoteForShell` can enforce this safely.

## 2026-11-07 - Fix Information Disclosure in MCP server resources/read
**Vulnerability:** Information Disclosure vulnerability in `.claude/scripts/lib/mcp-server.ts` where the `resources/read` MCP handler was not catching exceptions from `readFileSync`.
**Learning:** If a file was deleted after the path was resolved or if permission was denied, `readFileSync` would throw an error. The generic RPC error handler would catch it and send `e.message` to the client, exposing the absolute internal path of the server.
**Prevention:** Wrap file system operations like `readFileSync` in MCP server handlers in `try/catch` blocks. Ensure that error messages returned to the client are generic and do not leak absolute internal server paths to avoid Information Disclosure vulnerabilities.
