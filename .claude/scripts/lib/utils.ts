/**
 * Split a YAML inline list on its SEPARATORS.
 *
 * A blind `split(",")` cannot be used here, because a comma inside a quoted
 * scalar is content: `["Smith, John", Nickname]` is two aliases, and splitting
 * it blindly yields three fragments, each carrying a stray quote character.
 *
 * Tracking quote state is sufficient here. A backslash escape is consumed whole
 * inside a double-quoted scalar, and the `''` of a single-quoted scalar is
 * stepped over rather than read as a close, so neither hides a separator or
 * invents one.
 */
export function splitInlineList(inner: string): string[] {
	const out: string[] = [];
	let cur = "";
	let quote: '"' | "'" | null = null;
	for (let i = 0; i < inner.length; i++) {
		const ch = inner[i]!;
		if (quote === null) {
			if (ch === '"' || ch === "'") quote = ch;
			else if (ch === ",") {
				out.push(cur);
				cur = "";
				continue;
			}
		} else if (ch === "\\" && quote === '"' && i + 1 < inner.length) {
			cur += ch + inner[++i]!;
			continue;
		} else if (ch === quote) {
			if (quote === "'" && inner[i + 1] === "'") {
				cur += "''";
				i++;
				continue;
			}
			quote = null;
		}
		cur += ch;
	}
	out.push(cur);
	return out;
}
