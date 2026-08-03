# FAQ & Troubleshooting

Answers to the questions end users hit most often, plus a straight list of what isn't wired up yet so you don't spend time debugging something that's a known gap.

---

## "The dashboard is empty / shows zero for everything"

This almost always means the environment you're looking at hasn't had historical data loaded yet — the Governance Score Chart will show a placeholder message ("No trend data yet") instead of a chart in this state. This is an environment/data condition, not something wrong with your account or permissions. Ask your platform team to confirm historical data has been loaded for this environment.

## "Why can I see and change everything, including things other people set up?"

There's no login and no role-based access control in the current build — every visitor shares the same view with the same permissions (see [01-Overview-and-Concepts.md](01-Overview-and-Concepts.md)). This is expected for now, not a misconfiguration on your end. Coordinate policy and configuration changes with your team directly until roles ship.

## "Access Controls is greyed out in the sidebar — is that broken?"

No — it's intentionally disabled. Role-based access management is planned but not yet available.

## "I submitted the Register Model form in the Model Registry and nothing happened"

This is a known gap — see [07-Model-Registry.md](07-Model-Registry.md). New-model registration through the form doesn't currently persist. Existing models in the registry work normally; contact your platform team to add a new one in the meantime.

## "I configured a SIEM integration, but it's gone after I refreshed the page"

Expected — the SIEM configuration in the Audit Log Explorer's SIEM Push modal is held in your browser session only and isn't saved server-side (see [05-Audit-Log-Explorer.md](05-Audit-Log-Explorer.md)). Treat it as a preview of the payload/workflow, not a persistent integration.

## "The time period dropdown / Export button on the Governance Dashboard doesn't seem to do anything"

Correct — those two header controls on the Governance Dashboard are present but not yet functional. Use the Audit Log Explorer's own filters and export buttons instead, which do work and respect the filters you set.

## "The Regulations filter on the Audit Log doesn't change my results"

Same category of gap — it's visible in the filter bar but not yet wired to actually filter events. Use Search, Module, and Action filters, which are fully functional.

## "An AI feature (Summarize, Explain, NLQ fallback, Board Report narrative) failed or returned an error"

These features call out to Claude and depend on an AI key being configured for the environment. If that key is missing, invalid, or the request times out, you'll see an inline error rather than a generated summary — and in most cases (like NLQ) the feature quietly falls back to a non-AI result instead of breaking entirely. If this happens consistently, it's worth flagging to your platform team rather than retrying repeatedly.

## "My export only has 5,000 rows but I have more events than that"

Exports (CSV, JSON, SIEM push) are capped at 5,000 events per request, always respecting whatever filters are currently applied. Narrow your date range or filters and export in batches if you need more than that.

## "Are Trust Scores / governance scores permanent grades?"

No — they're computed from recent activity (the Agent Trust Panel samples up to the most recent 200 events per agent for the selected period). Treat them as "how is this doing right now," and expect them to shift as new activity comes in.

---

## Quick reference — what's fully working vs. not yet wired up

| Feature | Status |
|---|---|
| Governance Dashboard KPIs, chart, alerts, module health | ✅ Fully working |
| Audit Log Explorer — filtering, sorting, drill-down, exports, SIEM preview | ✅ Fully working (SIEM config is session-only, see above) |
| Policy Engine — create/edit/delete/toggle policies | ✅ Fully working |
| Agent Trust Panel | ✅ Fully working |
| Board Report Builder | ✅ Fully working |
| Incident Timeline | ✅ Fully working |
| Data Flow Visualizer | ✅ Fully working |
| Natural Language Query | ✅ Fully working |
| Governance Analysis Dashboard | ✅ Fully working (reference catalog, not live tenant data — see [04](04-Governance-Analysis-Dashboard.md)) |
| Model Registry — browsing, search, detail view | ✅ Fully working |
| Model Registry — registering a new model | ⚠️ UI present, doesn't persist yet |
| Governance Dashboard — time period dropdown, Export button | ⚠️ UI present, not functional |
| Audit Log — Regulations filter | ⚠️ UI present, not functional |
| SIEM configuration | ⚠️ Works, but session-only (not persisted) |
| Login / authentication | ⚠️ Not implemented — single shared view |
| Role-based access control | ⚠️ Not implemented — "Access Controls" nav item is a placeholder |

If you hit something not covered here, check with your platform team before assuming it's a bug — this list will be kept current as gaps close.
