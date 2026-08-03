# Incident Timeline

**Where:** sidebar → *Models & Incidents → Incident Timeline*

Where the Audit Log Explorer shows *every* event in a table, the Incident Timeline shows only the events that matter for incident review — blocked and flagged decisions — laid out chronologically so you can scan for patterns quickly.

---

## Summary cards

| Card | Meaning |
|---|---|
| Total Incidents | Blocked + Flagged combined |
| Blocked (Critical/High) | Count of blocked events |
| Flagged (Medium/Low) | Count of flagged events |
| Audit Period | Currently always "All time" |

---

## Switching between Blocked and Flagged

Use the tab switcher to move between the two views — they're separate queries, so switching tabs triggers a fresh fetch rather than filtering client-side.

**Severity is derived automatically** from outcome and whether policy violations are present:

| Outcome | Has violations? | Severity |
|---|---|---|
| Blocked | Yes | Critical |
| Blocked | No | High |
| Flagged | Yes | Medium |
| Flagged | No | Low |

---

## Reading the timeline

Events are grouped by day (**Today**, **Yesterday**, then calendar dates), each with a colored dot on the rail matching its severity. Each card shows the severity badge, title, event type, timestamp (absolute and relative), model, confidence, action, any policy violations, and the session/agent ID. Click anywhere on a card to open the full **Audit Log Drawer** — the same detail view used throughout the platform, including session timeline and Explain with AI.

Click **Load More** at the bottom to pull in the next batch of incidents (25 at a time) when more exist than are currently shown.

---

## When to use this vs. the Audit Log Explorer

| Use the Incident Timeline when... | Use the Audit Log Explorer when... |
|---|---|
| You want a quick visual scan of what went wrong recently | You need to filter by specific model, module, or search term |
| You're doing an incident review or daily triage | You're exporting data or pushing to a SIEM |
| You only care about blocked/flagged activity | You need to see allowed events too |

---

## Current limitation

There's no combined Blocked + Flagged view yet — you switch between the two tabs rather than seeing everything on one timeline. If you need both together, use the Audit Log Explorer with no outcome filter instead, and sort by the Action column.
