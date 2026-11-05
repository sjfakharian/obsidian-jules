## 2025-02-14 - Fix command injection in qmd fallback wrappers
**Vulnerability:** Found a command injection vulnerability where dynamic arguments were being unsafely concatenated into a shell command (`join(" ")` with `shell: true`) inside `buildQmdCommand` and `buildLaunchCommand`.
**Learning:** This existed because the fallback path for non-npm installations uses `shell: true` as a last-resort to run `qmd` directly, but the arguments weren't escaped before interpolation. Even though most usages in this codebase use static constants, the API allowed unsafe user input to be passed.
**Prevention:** Always escape dynamic arguments based on the platform (POSIX or Windows) before interpolating them into a shell command string that will be executed with `shell: true`. A utility function like `quoteForShell` can enforce this safely.

## 2025-02-14 - Fix Information Disclosure in resources/read
**Vulnerability:** Found an information disclosure vulnerability where `readFileSync` was called without a `try/catch` block in the `resources/read` endpoint of the MCP server. If an error occurred (e.g., file not found or inaccessible), Node.js would throw an error containing the absolute server path, which would be caught by a generic handler and leaked to the client.
**Learning:** This existed because file reads were assumed to succeed if the path resolution (`resolveResourceUri`) passed, but race conditions or permission issues could still cause unhandled exceptions that propagate to the protocol layer.
**Prevention:** Always wrap filesystem operations in MCP server handlers with a `try/catch` block and return generic error messages to the client that do not leak internal system structures.
