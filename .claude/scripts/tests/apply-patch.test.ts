import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	readdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { join, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const SCRIPT = resolve(
	dirname(fileURLToPath(import.meta.url)),
	"../apply-patch.ts",
);

describe("apply-patch CLI tests", () => {
	let tmpVault: string;

	before(() => {
		tmpVault = mkdtempSync(join(tmpdir(), "apply-patch-test-"));
	});

	after(() => {
		if (existsSync(tmpVault)) {
			rmSync(tmpVault, { recursive: true, force: true });
		}
	});

	function run(args: string[]) {
		const res = spawnSync(
			process.execPath,
			["--disable-warning=ExperimentalWarning", "--experimental-strip-types", SCRIPT, ...args],
			{
				encoding: "utf-8",
				cwd: tmpVault,
				env: {
					...process.env,
					CLAUDE_PROJECT_DIR: tmpVault,
				},
			},
		);
		return {
			stdout: res.stdout ?? "",
			stderr: res.stderr ?? "",
			code: res.status ?? -1,
		};
	}

	test("fails when required arguments are missing", () => {
		const res = run(["--file", "test.md"]);
		assert.notEqual(res.code, 0, "Should exit with non-zero code on missing args");
		assert.match(res.stderr + res.stdout, /Usage:/, "Should display usage message");
	});

	test("fails safely when target file does not exist", () => {
		const nonExistent = join(tmpVault, "missing.md");
		const res = run(["--file", nonExistent, "--search", "old", "--replace", "new"]);
		assert.notEqual(res.code, 0, "Should fail when file is missing");
		assert.match(res.stderr + res.stdout, /File not found/, "Should report missing file error");
	});

	test("fails safely when search string has 0 matches (drift protection)", () => {
		const targetFile = join(tmpVault, "drift.md");
		const original = "# Some Title\nThis text does not have the target.";
		writeFileSync(targetFile, original, "utf-8");

		const res = run(["--file", targetFile, "--search", "missing target", "--replace", "replacement"]);
		assert.notEqual(res.code, 0, "Should fail when search target is missing");
		assert.match(res.stderr + res.stdout, /Search string not found in file/, "Should indicate drift");

		// Ensure file was not modified
		assert.equal(readFileSync(targetFile, "utf-8"), original, "File must not be modified");
	});

	test("fails safely when search string has >1 matches (ambiguity protection)", () => {
		const targetFile = join(tmpVault, "ambiguous.md");
		const original = "repeated phrase and another repeated phrase in the same document.";
		writeFileSync(targetFile, original, "utf-8");

		const res = run(["--file", targetFile, "--search", "repeated phrase", "--replace", "single phrase"]);
		assert.notEqual(res.code, 0, "Should fail when search target is ambiguous");
		assert.match(res.stderr + res.stdout, /Ambiguous replacement/, "Should indicate ambiguous matches");

		// Ensure file was not modified
		assert.equal(readFileSync(targetFile, "utf-8"), original, "File must not be modified");
	});

	test("succeeds when search string matches exactly once and creates backup", () => {
		const targetFile = join(tmpVault, "valid.md");
		const original = "Line 1\nDeploy requires one approval before merge.\nLine 3";
		writeFileSync(targetFile, original, "utf-8");

		const res = run([
			"--file",
			targetFile,
			"--search",
			"one approval",
			"--replace",
			"two approvals",
		]);

		assert.equal(res.code, 0, `Command should succeed: ${res.stderr}`);
		assert.match(res.stdout, /\[SUCCESS\] Patch applied/, "Should report success");

		// Check updated content
		const updated = readFileSync(targetFile, "utf-8");
		assert.equal(
			updated,
			"Line 1\nDeploy requires two approvals before merge.\nLine 3",
			"Target string should be replaced accurately",
		);

		// Check backup creation
		const backupDir = join(tmpVault, ".claude", "backups");
		assert.ok(existsSync(backupDir), "Backup directory must be created");
		const backups = readdirSync(backupDir).filter((f) => f.startsWith("valid.md"));
		assert.equal(backups.length, 1, "Exactly one backup file should be generated");

		const backupContent = readFileSync(join(backupDir, backups[0]), "utf-8");
		assert.equal(backupContent, original, "Backup content must match original text");
	});
});
