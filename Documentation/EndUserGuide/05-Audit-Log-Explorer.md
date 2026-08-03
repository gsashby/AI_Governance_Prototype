# Audit Log Explorer

**Where:** sidebar → *AI Governance → Audit Log Explorer*

The Audit Log Explorer is your investigative tool — every AI decision recorded by the platform, filterable, sortable, exportable, and drillable down to the individual event.

---

## Filtering

The filter bar at the top gives you:

| Filter | What it does |
|---|---|
| **Search** | Free-text match against the action, agent ID, and session ID |
| **Module** | Filter by outcome — labelled by module name (Autopilot / Copilot / Agent Workflows) in the demo data |
| **Action** | Filter by event type (inference, policy check, bias scan, session start, model load) |
| **Regulations** | Present in the UI; not yet wired to filter results |
| **Clear** | Resets every filter and returns to page 1 |

Changing any filter resets you to page 1 of the results. The result count ("Showing N of X events") always reflects your current filters, not the whole table.

You can also arrive here pre-filtered — clicking a session in the Agent Trust Panel, or "View Audit Events" in the Model Registry, deep-links straight into the filtered log.

---

## The event table

Every column is sortable by clicking its header:

| Column | Notes |
|---|---|
| Event ID | Shortened, monospace |
| Timestamp | Exact date/time |
| Module | Event type |
| Model Version | The model that produced the decision |
| Session / Agent | Which conversation and which agent |
| Confidence | Color-coded — green ≥85%, amber ≥70%, red below |
| Action | Outcome badge — allowed / flagged / blocked |
| Regulations | Any policy violations tied to this event |

Click **Show Details** on any row to open the full event drawer.

---

## Event detail drawer

Opening an event gives you:

- **Outcome banner** — the headline result, color-coded
- **Full detail** — event ID, timestamp, module, model version, session ID, agent ID, confidence, action
- **Policy violations** — every rule this event triggered
- **Session timeline** — up to 20 other events from the same session, so you can see what led up to (or followed) this decision, with the current event highlighted
- **Explain with AI** — click to have Claude generate a plain-English causal explanation of why this event happened, using the event and its full session timeline as context
- **Metadata** — any additional structured data attached to the event (latency, token count, region, channel, etc.)

Use **Export Event** at the bottom to download a one-row CSV of just this event.

---

## Exporting the log

Three buttons in the page header, each respecting your current filters and pulling up to **5,000 events** in one request:

| Button | Output |
|---|---|
| **Export CSV** | RFC-4180 escaped CSV, downloads immediately |
| **Export JSON** | Events array plus export metadata (timestamp, filters applied, total count) |
| **SIEM Push** | Opens a CEF (Common Event Format) preview and push workflow — see below |

---

## Pushing to a SIEM

Clicking **SIEM Push** opens a preview modal showing the first 5 events formatted as CEF (or JSON), along with the currently configured destination.

### Configuring the integration

Click the gear icon (or **Configure →**) to open the SIEM configuration modal. It comes pre-filled with a demo Splunk HTTP Event Collector (HEC) setup — every field is editable:

| Field | Purpose |
|---|---|
| Integration Status | Enable/disable the integration |
| Integration Name | A label for this destination |
| HEC Endpoint URL | Where events are sent |
| HEC Token | Auth token (hidden by default; click to reveal) |
| Verify SSL Certificate | Toggle certificate verification |
| Index / Source / Sourcetype | Splunk indexing metadata |
| Event Format | CEF or JSON |
| Batch Size | Events per push (1–5,000) |

Click **Save Configuration** to apply your changes — you'll see a confirmation, and the SIEM Push modal reflects your new settings immediately.

> **Important:** this configuration is held in your browser session only — it is **not saved to a server**, is not shared with other users, and resets if you reload the page. Treat SIEM Push as a preview/demo of the export payload and workflow rather than a persistent, production integration. If you need an always-on SIEM feed, coordinate with your platform team on a server-side pipeline rather than relying on this modal's settings surviving a refresh.

If the integration is toggled off, **Push N Events** is disabled until you re-enable it.

---

## Tips

- The **Search** field is your fastest way to reconstruct a specific conversation: search a session ID and every event in that session appears (this is the same mechanism the session timeline in the event drawer uses).
- Exports always reflect what's currently filtered — clear filters first if you want the full log.
- If you landed here from another page with a filter already applied (e.g. from Model Registry or the Agent Trust Panel), the **Clear** button removes it.
