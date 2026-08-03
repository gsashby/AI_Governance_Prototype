# Governance Dashboard

**Where:** sidebar → *AI Governance → Governance Dashboard* (also the page you land on first)

The Governance Dashboard is your at-a-glance view of AI governance health across every module. It refreshes automatically — most panels re-check the API every 30 seconds — so it's meant to be kept open, not just visited once.

---

## Ask a question first

At the very top of the page is the **Query Explorer** search box. Before digging through charts, you can just ask in plain English:

> "Show me all blocked events"
> "Show flagged policy violations this week"

Click one of the **Suggested Queries** chips to try it instantly, or type your own and press **Query**. Results appear as a sortable, drillable table right below the search box. See [11-Natural-Language-Query.md](11-Natural-Language-Query.md) for the full guide, including how to read the "interpreted as" tags and the ✨ AI badge.

---

## The four KPI cards

| Card | What it shows |
|---|---|
| **AI Decisions** | Decision volume for the selected period |
| **Avg Confidence Score** | The governance/confidence score across all modules |
| **Policy Violations (7d)** | How many violations have fired in the trailing week |
| **Compliance Coverage** | What share of AI activity is covered by active auditing |

Use these as your first check each time you open the dashboard — a red or amber card is your cue to look at the Alerts feed or the Audit Log next.

> **Note:** the time-period dropdown and "Export" button in the page header are present in the UI but not yet wired to change the data shown — use the Audit Log Explorer's own filters and export buttons for period-specific exports (see [05-Audit-Log-Explorer.md](05-Audit-Log-Explorer.md)).

---

## Governance Score Chart

A 6-week rolling trend line of the governance/confidence score. If you've just stood up a fresh environment and haven't loaded historical data yet, this panel will show a placeholder message instead of a chart — that's expected, not a bug (see the FAQ).

---

## Active Alerts

The right-hand feed lists current governance alerts, most severe first, with a red badge showing how many are critical. Alerts are generated automatically from recent blocked/flagged activity — there's nothing to configure here.

Click **Investigate** on any alert to open its detail panel:
- Full description and severity
- The specific audit events that triggered it
- Three actions: **Acknowledge** (dismiss it), **Escalate**, or **Dismiss**

Acknowledging or dismissing an alert only affects your current browser session — it isn't a permanent, shared "resolved" state yet.

---

## Module Health Table

One row per AI module/model, showing model version, average confidence, governance score, and a Healthy/Watch/Critical status:

| Status | Governance score |
|---|---|
| Healthy | ≥ 85% |
| Watch | 70–84% |
| Critical | < 70% |

Sort by clicking any column header. If a module is sitting in **Critical**, that's your signal to check the [Model Registry](07-Model-Registry.md) and [Audit Log Explorer](05-Audit-Log-Explorer.md) for that model's recent violations.

---

## Recommended Actions

A curated list of governance recommendations grouped into four categories — Policy & Compliance, Model Performance, Security & Access, and Operational — each with a priority (critical/high/medium/low).

Click any recommendation to open its detail drawer:
- A plain-English explanation of the issue and why it matters
- A checklist of concrete next steps you can tick off as you work through them (this checklist resets if you close the drawer — it's a working list, not a permanent record)
- An **AI Analysis** button that asks Claude to write a narrative assessment based on your current governance score, violation count, and alert volume

---

## Summarize with AI

The purple **Summarize with AI** button (top right) generates a 3–4 sentence executive summary of current state, plus "Key Risks" and "Recommended Actions" sections — grounded in the live KPI, alert, and module-health data on screen. Useful for a quick standup update or as a starting point for a board report (see [08-Board-Report-Builder.md](08-Board-Report-Builder.md) for the full report-generation workflow).

This feature calls out to Claude and requires the platform to have an AI key configured server-side — if it fails, you'll see an inline error rather than a summary.
