import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import {
	stripCodeRegions,
	extractWikilinkTargets,
	extractAliases,
} from "../lib/wikilinks.ts";

describe("Wikilinks Property-Based Tests", () => {
	describe("extractWikilinkTargets", () => {
		test("never throws on any string input", () => {
			fc.assert(
				fc.property(fc.string(), (text) => {
					extractWikilinkTargets(text); // Should not throw
				})
			);
		});

		test("extracted targets do not contain [[ or ]]", () => {
			fc.assert(
				fc.property(fc.string(), (text) => {
					const targets = extractWikilinkTargets(text);
					for (const t of targets) {
						assert.ok(!t.includes("[[") && !t.includes("]]"));
					}
				})
			);
		});

		test("fenced code blocks completely hide wikilinks", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					fc.string(),
					(before, inside, after) => {
						// Filter to ensure fence doesn't accidentally close early
						const safeInside = inside.replace(/```/g, "");
						const md = `${before}\n\`\`\`\n[[ShouldBeHidden]]\n${safeInside}\n\`\`\`\n${after}`;
						const targets = extractWikilinkTargets(md);
						assert.ok(!targets.includes("ShouldBeHidden"));
					}
				)
			);
		});
	});

	describe("extractAliases", () => {
		test("never throws on any string input", () => {
			fc.assert(
				fc.property(fc.string(), (text) => {
					extractAliases(text); // Should not throw
				})
			);
		});

		test("always returns an array", () => {
			fc.assert(
				fc.property(fc.string(), (text) => {
					const aliases = extractAliases(text);
					assert.ok(Array.isArray(aliases));
				})
			);
		});

		test("can successfully extract block-list aliases from valid generated frontmatter", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.string({ minLength: 1 }).filter((s) => {
							// Filter out complex edge cases like newlines, colons, or quotes for this basic test
							return !s.includes("\n") && !s.includes("\r") && !s.includes(":") && !s.includes("'") && !s.includes('"') && !s.includes("[") && !s.includes("]") && s.trim().length > 0 && !s.includes("#");
						}),
						{ minLength: 1, maxLength: 10 }
					),
					(aliases) => {
						const yamlList = aliases.map(a => `  - ${a}`).join("\n");
						const md = `---\naliases:\n${yamlList}\n---\nbody text`;

						const extracted = extractAliases(md);

						// Ensure we extracted the exact aliases we put in
						assert.deepEqual(extracted, aliases.map(a => a.trim()));
					}
				)
			);
		});

		test("can successfully extract inline array aliases from valid generated frontmatter", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.string({ minLength: 1 }).filter((s) => {
							// Filter out characters that might break simple inline yaml serialization
							return !s.includes("\n") && !s.includes("\r") && !s.includes(",") && !s.includes("'") && !s.includes('"') && !s.includes("[") && !s.includes("]") && s.trim().length > 0 && !s.includes("#");
						}),
						{ minLength: 1, maxLength: 10 }
					),
					(aliases) => {
						const yamlList = aliases.join(", ");
						const md = `---\naliases: [${yamlList}]\n---\nbody text`;

						const extracted = extractAliases(md);

						// Ensure we extracted the exact aliases we put in
						assert.deepEqual(extracted, aliases.map(a => a.trim()));
					}
				)
			);
		});
	});
});
