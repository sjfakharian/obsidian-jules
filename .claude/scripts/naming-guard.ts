/**
 * naming-guard.ts — enforce 99_system/PROJECT_STANDARD.md v3 (§1–§3) when an agent CREATES a file.
 *
 * Claude Code wiring: PreToolUse on Write (see .claude/settings.json). A violation returns
 * permissionDecision "deny" with the exact fix, so the agent re-issues the write at the right path.
 * With `--post` (Codex PostToolUse, Gemini AfterTool) the same findings come back as feedback
 * instead of a block.
 *
 * Scope: only NEW files under the numbered domain folders, 99_system and the vault root. Existing
 * files, the obsidian-mind layer (brain/ work/ …, Title Case by design), protected repos and catalogs,
 * and every path listed in 99_system/tools/naming_exceptions.txt are left alone.
 * The Python twin for scripts is 99_system/tools/dk_outputs.py (check_name / new_run).
 */
import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { readStdinJson, writeHookOutput, writeSilentHookOutput } from "./lib/hook-io.ts";

const ROOT = resolve(process.env.CLAUDE_PROJECT_DIR ?? process.env.CODEX_PROJECT_DIR ?? process.env.GEMINI_PROJECT_DIR ?? ".");
const POST = process.argv.includes("--post");

const ROOT_FILES = new Set(["AGENTS.md", "CLAUDE.md", "GEMINI.md", "Home.md", "vault-manifest.json", ".mcp.json"]);
const TOP_DIRS = /^(\d\d_[a-z_]+|99_system)$/;
const SKIP_PREFIXES = [
	".claude/", ".codex/", ".gemini/", ".agents/", ".obsidian/", ".scripts/",
	"brain/", "work/", "org/", "perf/", "thinking/", "reference/", "templates/", "bases/", "memories/", "inbox/",
	"90_archive/", "99_system/history/", "99_system/logs/",
	"60_modeling/system_dynamics/", "70_platform/llm_routing/zerospend/",
	"70_platform/data_catalog/github_skills", "70_platform/data_catalog/book_skills/",
	"70_platform/data_catalog/catalog/", "70_platform/data_catalog/agent_knowledge/",
];
const SKIP_SEGMENTS = new Set([".git", "node_modules", ".venv", "venv", "__pycache__", ".pytest_cache"]);
const CONVENTIONAL = new Set([
	"README.md", "CHANGELOG.md", "VERSION", "CLAUDE.md", "SKILL.md", "LICENSE", "Makefile", ".gitignore", ".keep",
	"package.json", "package-lock.json", "requirements.txt", "pyproject.toml", "pytest.ini", "_manifest.json", "tsconfig.json",
]);
const BANNED = /(^|_)(final|copy|backup|bak|old|new|fixed|corrected|tmp|temp|draft)(_|$)|(^|_)v\d+(_|$)/i;

function exceptions(): string[] {
	try {
		return readFileSync(resolve(ROOT, "99_system/tools/naming_exceptions.txt"), "utf-8")
			.split("\n").map((l) => l.split("#")[0].trim()).filter(Boolean);
	} catch {
		return [];
	}
}

function nameProblem(name: string): string | null {
	if (CONVENTIONAL.has(name) || name.startsWith(".env") || name.endsWith("_agent_protocol.md")) return null;
	const dot = name.lastIndexOf(".");
	const stem = dot > 0 ? name.slice(0, dot) : name;
	if (/\s/.test(name) || /\(\d+\)/.test(name)) return "no spaces and no ' (N)' duplicates";
	if (!/^[a-z0-9_.\-]+$/.test(name)) return "lowercase ASCII snake_case only (a-z, 0-9, _ . -)";
	if (BANNED.test(stem)) return "no status/version words (final, copy, backup, old, new, tmp, draft, v2 …). The newest version keeps the clean name; older versions go to archive/";
	return null;
}

function problems(rel: string): string[] {
	const out: string[] = [];
	const parts = rel.split("/");
	if (parts.length === 1) {
		if (!ROOT_FILES.has(rel)) out.push(`the vault root holds only entry points (${[...ROOT_FILES].join(", ")}). Put this file inside a project: <NN_domain>/<project>/{docs,scripts,sql,outputs,…}`);
		return out;
	}
	if (!TOP_DIRS.test(parts[0])) out.push(`'${parts[0]}/' is not a domain folder. Use 10_search_ads … 70_platform (or 99_system for portfolio tooling)`);
	// every path segment that does not exist yet must follow the naming rules
	let acc = ROOT;
	for (const seg of parts) {
		acc = resolve(acc, seg);
		if (existsSync(acc)) continue;
		const why = nameProblem(seg);
		if (why) out.push(`'${seg}': ${why}`);
	}
	const i = parts.lastIndexOf("outputs");
	if (i !== -1) {
		const below = parts.slice(i + 1);
		if (below.length === 1) out.push("don't write files directly into outputs/. Use a dated run folder outputs/YYYY-MM-DD_<topic>/ (`/usr/bin/python3 99_system/tools/dk_outputs.py new <project> <topic>`), published to outputs/latest/<topic>");
		const first = below[0] ?? "";
		const dated = /^\d{4}-\d\d-\d\d(_to_\d{4}-\d\d-\d\d)?_[a-z0-9_]+$/.test(first) || /^\d{4}-\d\d-\d\dT\d{6}Z$/.test(first);
		const known = ["latest", "runs", "releases", "final", "raw", "qc", "reports", "workbooks", "excel_workbooks", "models", "dashboards"].includes(first);
		if (below.length > 1 && !dated && !known && !existsSync(resolve(ROOT, parts.slice(0, i + 2).join("/")))) {
			const m = first.match(/(\d{4}-?\d\d-?\d\d)/);
			out.push(m
				? `the date goes FIRST in ISO form: outputs/${m[1].replace(/^(\d{4})-?(\d\d)-?(\d\d)$/, "$1-$2-$3")}_${first.replace(m[0], "").replace(/^_+|_+$/g, "").replace(/__+/g, "_")}/`
				: `new output folders are dated: outputs/YYYY-MM-DD_${first}/ (use dk_outputs.py new)`);
		}
	}
	return out;
}

async function main(): Promise<void> {
	const input = await readStdinJson<{ tool_name?: string; tool_input?: { file_path?: string } }>();
	const fp = input?.tool_input?.file_path;
	if (!fp) return writeSilentHookOutput();
	const abs = resolve(fp);
	const rel = relative(ROOT, abs);
	if (rel.startsWith("..") || existsSync(abs)) return writeSilentHookOutput(); // outside the vault, or editing an existing file
	if (SKIP_PREFIXES.some((p) => rel.startsWith(p)) || rel.split("/").some((s) => SKIP_SEGMENTS.has(s))) return writeSilentHookOutput();
	if (exceptions().some((p) => rel.startsWith(p))) return writeSilentHookOutput();
	const found = problems(rel);
	if (found.length === 0) return writeSilentHookOutput();
	const msg = `DK naming standard (99_system/PROJECT_STANDARD.md §1–§3) — '${rel}':\n- ${found.join("\n- ")}\nFix the path and write again. If this is a genuine exception, add it with a reason to 99_system/tools/naming_exceptions.txt.`;
	if (POST) {
		writeHookOutput("PostToolUse", `${msg}\n(The file was already written: rename it now.)`);
		return;
	}
	process.stdout.write(JSON.stringify({
		hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: msg },
	}));
}

main().catch(() => writeSilentHookOutput());

