import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { TOOLS } from "../lib/mcp-tools.ts";

describe("mcp-tools", () => {
	test("TOOLS should be an array", () => {
		assert.ok(Array.isArray(TOOLS));
		assert.ok(TOOLS.length > 0);
	});

	test("each tool should match the ToolDef interface", () => {
		for (const tool of TOOLS) {
			assert.ok(typeof tool.name === "string" && tool.name.length > 0, `Tool missing name: ${JSON.stringify(tool)}`);
			assert.ok(typeof tool.description === "string" && tool.description.length > 0, `Tool ${tool.name} missing description`);
			assert.ok(typeof tool.inputSchema === "object" && tool.inputSchema !== null, `Tool ${tool.name} missing inputSchema`);

			assert.ok(typeof tool.annotations === "object" && tool.annotations !== null, `Tool ${tool.name} missing annotations`);
			assert.ok(typeof tool.annotations.title === "string" && tool.annotations.title.length > 0, `Tool ${tool.name} missing annotation title`);

			assert.strictEqual(typeof tool.annotations.readOnlyHint, "boolean", `Tool ${tool.name} missing readOnlyHint boolean`);
			assert.strictEqual(typeof tool.annotations.destructiveHint, "boolean", `Tool ${tool.name} missing destructiveHint boolean`);
			assert.strictEqual(typeof tool.annotations.idempotentHint, "boolean", `Tool ${tool.name} missing idempotentHint boolean`);
			assert.strictEqual(typeof tool.annotations.openWorldHint, "boolean", `Tool ${tool.name} missing openWorldHint boolean`);
		}
	});

	test("all tools should have unique names", () => {
		const names = TOOLS.map((t) => t.name);
		const uniqueNames = new Set(names);
		assert.strictEqual(names.length, uniqueNames.size, "Tool names must be unique");
	});
});
