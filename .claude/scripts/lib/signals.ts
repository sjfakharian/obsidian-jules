/**
 * Signal definitions for the classify-message hook.
 *
 * Architecture: data-driven signal matching. Each signal has a list of trigger
 * patterns checked via regex with Latin-letter lookarounds (not \b). Words can
 * appear in multiple signals (explicit overlaps) because the cost of a false
 * positive hint is ~0 (the agent ignores irrelevant hints) while a false
 * negative means missed routing.
 *
 * Patterns include English, Japanese, Korean, and Simplified Chinese to support
 * multilingual users. The Latin-letter lookaround approach allows mixed
 * Latin/CJK text without relying on word-boundary behavior that treats CJK
 * characters as word characters.
 */

/**
 * Secondary discriminator on a signal (#111): evaluated only when the
 * parent signal matches, refining the routing hint within one class. The
 * sub-hint message is emitted IN ADDITION to the parent's; once-per-session
 * dedupe treats it as its own hint, so parent and sub fire independently.
 */
export type SubHint = {
	readonly patterns: readonly string[];
	readonly message: string;
};

export type Signal = {
	readonly name: string;
	readonly message: string;
	readonly patterns: readonly string[];
	readonly subHint?: SubHint;
};

export const SIGNALS: readonly Signal[] = [
	{
		name: "DECISION",
		message:
			"DECISION detected — consider creating a Decision Record in work/active/ and logging in work/Index.md Decisions Log",
		subHint: {
			message:
				"Looks like a decision REVERSAL — update the ORIGINAL Decision Record (status: superseded, link the new one) instead of only adding a second record; run `/om-correct \"<the corrected fact>\"` to sweep every note restating the old decision.",
			patterns: [
				"reversed",
				"superseded",
				"changed our mind",
				"rolled back the decision",
				"overturned",
				"un-decided",
			],
		},
		patterns: [
			// English
			"decided",
			"deciding",
			"decision",
			"we chose",
			"agreed to",
			"let's go with",
			"the call is",
			"we're going with",
			// Japanese
			"決定した",
			"決めた",
			"合意した",
			// Korean
			"결정했어",
			"결정했습니다",
			"합의했어",
			// Chinese
			"决定了",
			"我们决定",
			"确定了",
			"同意",
		],
	},
	{
		name: "INCIDENT",
		message:
			"INCIDENT detected — consider using /om-incident-capture or creating an incident note in work/incidents/",
		patterns: [
			// English
			"incident",
			"outage",
			"pagerduty",
			"severity",
			"p0",
			"p1",
			"p2",
			"sev1",
			"sev2",
			"postmortem",
			"rca",
			// Japanese
			"インシデント",
			"障害",
			// Korean
			"인시던트",
			"장애",
			// Chinese
			"事件",
			"故障",
			"事后分析",
		],
	},
	{
		name: "1:1 CONTENT",
		message:
			"1:1 CONTENT detected — consider creating a 1-on-1 note in work/1-1/ and updating the person note in org/people/",
		patterns: [
			// English
			"1:1",
			"1-1",
			"1-on-1",
			"one on one",
			"1on1",
			"catch up with",
			"sync with",
			// Japanese
			"ワンオンワン",
			// Korean
			"원온원",
			// Chinese
			"一对一",
			"单独面谈",
		],
	},
	{
		name: "WIN",
		message:
			"WIN detected — consider adding to perf/Brag Doc.md with a link to the evidence note",
		patterns: [
			// Delivery — English (shared with PROJECT UPDATE)
			"shipped",
			"shipping",
			"ships",
			"launched",
			"launching",
			"launches",
			"completed",
			"completing",
			"completes",
			"released",
			"releasing",
			"releases",
			"deployed",
			"deploying",
			"deploys",
			// Achievement — English
			"achieved",
			"achieving",
			"won",
			"promoted",
			"praised",
			"win",
			"kudos",
			"shoutout",
			"great feedback",
			"recognized",
			// Japanese
			"出荷した",
			"リリースした",
			"達成した",
			"褒められた",
			// Korean
			"배포했어",
			"출시했어",
			"달성했어",
			"칭찬받았어",
			// Chinese
			"发布了",
			"上线了",
			"完成了",
			"表扬",
			"认可",
		],
	},
	{
		name: "ARCHITECTURE",
		message:
			"ARCHITECTURE discussion — consider creating a reference note in reference/ or a decision record",
		patterns: [
			// English
			"architecture",
			"system design",
			"rfc",
			"tech spec",
			"trade-off",
			"design doc",
			"adr",
			// Japanese
			"アーキテクチャ",
			"システム設計",
			// Korean
			"아키텍처",
			"시스템 설계",
			// Chinese
			"架构",
			"系统设计",
			"技术规范",
		],
	},
	{
		name: "PERSON CONTEXT",
		message:
			"PERSON CONTEXT detected — consider updating the relevant person note in org/people/ and linking from the conversation note",
		patterns: [
			// English
			"told me",
			"said that",
			"feedback from",
			"met with",
			"talked to",
			"spoke with",
			"mentioned that",
			"mentioned the",
			"mentioned a",
			// Japanese
			"言ってた",
			"フィードバック",
			"話した",
			// Korean
			"말했어",
			"피드백",
			"얘기했어",
			"언급했어",
			// Chinese
			"说了",
			"提到",
			"反馈",
			"提及",
		],
	},
	{
		name: "PROJECT UPDATE",
		message:
			"PROJECT UPDATE detected — consider updating the active work note in work/active/ and checking if wins should go to brag doc",
		patterns: [
			// English
			"project update",
			"sprint",
			"milestone",
			// Delivery — English (shared with WIN)
			"shipped",
			"shipping",
			"ships",
			"shipped feature",
			"launched",
			"launching",
			"launches",
			"completed",
			"completing",
			"completes",
			"released",
			"releasing",
			"releases",
			"deployed",
			"deploying",
			"deploys",
			// Delivery-only — English (not wins on their own)
			"went live",
			"rolled out",
			"rolling out",
			"merged",
			"merging",
			"merges",
			"cut the release",
			"release cut",
			// Japanese
			"スプリント",
			"マイルストーン",
			"マージした",
			"リリースしました",
			// Korean
			"스프린트",
			"마일스톤",
			"배포",
			"릴리스",
			"병합",
			// Chinese (发布了, 上线 shared with WIN)
			"迭代",
			"里程碑",
			"发布了",
			"上线",
			"合并了",
		],
	},
	{
		// Jules OS addition (2026-09-24, INC-20260924T114518Z): route data questions to the
		// governed catalog BEFORE an agent proposes a database query. Local non-markdown
		// assets (dim_category.csv) are only discoverable through the catalog routers.
		// Keep this block when upgrading obsidian-mind.
		name: "DATA CATALOG",
		message:
			"DATA CATALOG question — before proposing any DB query, check 70_platform/data_catalog/catalog/01_catalog_index.md (incl. its \"Local reference data\" section: categories / category hierarchy / leafcat / دسته‌بندی → the local file 70_platform/data_catalog/dim_category.csv, page catalog/references/dim_category.md, no query or approval needed) and 06_table_alias_router.md, then follow the AGENTS.md §5 database gate",
		patterns: [
			// English
			"category",
			"categories",
			"category hierarchy",
			"leaf category",
			"leafcat",
			"data catalog",
			"table",
			"tables",
			"schema",
			"sql",
			"mysql",
			"clickhouse",
			"database",
			// Persian (no Latin boundary applies; "دسته" also covers دسته‌بندی / دسته بندی / دسته‌ها)
			"دسته",
			"کتگوری",
			"جدول",
			"دیتابیس",
			"پایگاه داده",
			"کوئری",
			"اسکیما",
		],
	},
];
