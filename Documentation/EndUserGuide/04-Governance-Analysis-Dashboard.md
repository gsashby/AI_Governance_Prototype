# Governance Analysis Dashboard

**Where:** sidebar → *AI Governance → Governance Analysis*

This dashboard is different from the others in this guide: it's a **metrics catalog and reference**, not a live operational view of your own tenant's traffic. Its job is to answer *"what governance metrics exist (or should exist) for the AI platform, and who is each one for?"* — useful when you're scoping what to instrument, what to report externally, and what gaps still need to be closed before General Availability.

> **Who this is really for:** most of the content here is tagged **Internal** — meaning it's intended for the platform/product team, not for customer-facing reporting. Look at the **Tags** column on every metric before assuming it's something you can share externally; only rows tagged **Customer-facing** or **Internal + Customer** are meant to go in front of end customers.

---

## The four tabs

| Tab | What it covers |
|---|---|
| **Metering** | Token consumption, cost, per-tenant limits, and throttling — how usage is capped and billed |
| **Telemetry — Raw Events** | The raw event types and correlation/trace IDs emitted by the agent hosting service |
| **Product Analytics** | Adoption (activation, weekly/monthly active users), reliability (success/completion/timeout rates), and latency |
| **Recommended Additions (GA-Blocking)** | Metrics identified as *missing* from the current spec — flagged with a red **GA** badge because they're required before General Availability |

Each tab combines a few summary numbers and charts with a detailed metric table underneath.

### Metering

Shows token consumption trends (input vs. output), which product features are consuming the most tokens, and per-tenant utilization against configured limits — with an 80% utilization line marking where the internal alert threshold sits. The metric table below documents exactly how token limits, per-user caps, and throttle logging are meant to work.

### Telemetry — Raw Events

Shows the volume of each raw event type over the last 7 days and lists the trace/correlation IDs that are required on every event for end-to-end tracing. Use this tab when you need to know *what* is being instrumented at the event level, separate from the governance-level `audit_events` you see in the Audit Log Explorer.

### Product Analytics

Covers adoption funnel (activated → weekly active → monthly active), execution success/completion/timeout rates, and end-to-end latency at P50/P95/P99. This is the closest tab to a traditional product-health dashboard.

### Recommended Additions (GA-Blocking)

Flagged with a red **GA** pill in the tab bar. This tab documents gaps in the current metrics spec — safety and guardrail events, cost-grained token telemetry, additional traceability IDs, and SLO targets/alerting — that are called out as required before the platform can go GA. Treat this tab as a punch list, not as data that already exists in production today.

---

## Reading a metric row

Every row in every tab's tables follows the same shape:

| Column | Meaning |
|---|---|
| **Metric** | The name of the measurement |
| **Definition** | What it means and how it's calculated |
| **Tags** | One or two badges: an audience tag (**Internal**, **Customer-facing**, or **Internal + Customer**) and, where relevant, a red **GA-blocking** badge |

Italicized text under a definition is a note — usually clarifying who configures it or when it applies (e.g. "Future / Post-GA — configurable by admins").

---

## Exporting the catalog

The **Export Catalog** button in the page header downloads a single CSV containing every metric across all four tabs — including its category, group, definition, notes, audience, and GA-blocking flag. Use this when you need to hand the full catalog to another team (e.g. for a metrics-spec review) rather than screenshotting each tab.

---

## How this differs from the rest of the Trust Center

Every other page in this guide reflects **your live tenant's actual audit data**. The Governance Analysis Dashboard reflects a **fixed reference specification** — it doesn't change based on your own traffic, and the charts on it are illustrative rather than pulled from your `audit_events`. If you're looking for your own real-time governance numbers, go back to the [Governance Dashboard](03-Governance-Dashboard.md) instead.
