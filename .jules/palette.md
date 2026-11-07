## 2024-10-17 - CLI output readability as UX
**Learning:** In a CLI-only environment like Jules-OS, Developer Experience (DX) essentially acts as the user experience (UX). Plain text outputs from scripts are hard to scan and can lead to important information (like rollbacks or errors) being missed.
**Action:** Always prefer native ANSI escape codes (e.g., \x1b[36m, \x1b[0m) combined with clear emojis to improve scannability of terminal outputs. This enhances the interface without introducing external dependencies like chalk.

## 2024-10-18 - Native ANSI Escape Codes for CLI UX
**Learning:** For a minimal-dependency Node.js environment like `.claude/scripts/`, using third-party libraries like `chalk` for terminal output styling is unnecessary and adds overhead. Native ANSI escape codes (e.g., `\x1b[36m` for cyan, `\x1b[0m` for reset) work perfectly well for coloring CLI output.
**Action:** Always prefer native ANSI escape codes when adding colors and styling to terminal outputs in this project's CLI scripts to maintain the zero-dependency runtime while improving the Developer Experience (DX).

## 2024-11-01 - Conditional ANSI Colors
**Learning:** While native ANSI escape codes are great for CLI output readability, they can pollute the output in non-TTY environments (like logs or when consumed by AI tools/scripts) if applied unconditionally.
**Action:** When adding ANSI colors to terminal outputs, always conditionally apply them by checking `process.stdout.isTTY` or `process.stderr.isTTY`. Use a simple helper function or parameter to return empty strings when not in a TTY environment.

## 2024-11-02 - Markdown and Emojis for System Messages
**Learning:** System messages sent to the user interface (like Jules-OS agent UI) often lack visual structure when they are plain text. Since these messages are rendered as markdown, using markdown elements (headers, bold text, lists) and emojis provides a much better and scannable visual output than plain text.
**Action:** When formatting string outputs that will be sent as a `systemMessage` to the agent UI, use markdown formatting and emojis instead of just plain text to enhance the user experience.
