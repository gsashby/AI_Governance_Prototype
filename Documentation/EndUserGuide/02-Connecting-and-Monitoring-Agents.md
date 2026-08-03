# Connecting & Monitoring Agents

## There is no manual "connect" step

If you're used to third-party monitoring tools, you might expect to generate an API key, install an SDK, or run a setup wizard to start tracking an agent. **The Trust Center doesn't work that way.** Autopilot, Copilot, and Agent Workflows modules are already part of the platform — the moment one of them makes a decision, it writes an audit event, and that event is all the Trust Center needs.

In other words: **an agent "connects" itself the first time it acts.** There's nothing for you to configure, register, or authorize before an agent shows up.

This is deliberate — it means:
- No integration lag between an agent going live and it appearing in governance views.
- No API keys or credentials for individual agents to manage or rotate.
- No risk of an agent's activity going unaudited because someone forgot a setup step.

---

## How an agent becomes visible

Every audit event carries an **Agent ID** (e.g. `agent-007`) alongside the session it belongs to, the model it used, its outcome, and its confidence score. The **Agent Trust Panel** (sidebar: *Agent Tools → Agent Trust Panel*) continuously groups recent events by Agent ID — so as soon as an agent has generated even one event, it appears as a row in the panel.

There's no separate "agent directory" to maintain. If an agent stops appearing, it simply means it hasn't generated any events in the selected time period — not that it was "disconnected."

---

## Using the Agent Trust Panel

Open **Agent Tools → Agent Trust Panel** in the sidebar.

### Fleet summary

At the top, four chips summarize the whole agent fleet for the selected period:

| Chip | What it tells you |
|---|---|
| **Active Agents** | How many distinct agents produced events in this period |
| **Fleet Block Rate** | What share of all requests, across every agent, were blocked |
| **Fleet Avg Confidence** | The average self-reported confidence across all agent activity |
| **High-Risk Agents** | How many agents currently have a Trust Score below 70% |

### The agent table

Below the summary, every active agent is listed with:

- **Trust Score** — a single 0–100% health number (see formula below), shown as a progress bar with a Healthy / Watch / Critical badge
- **Events** and **Sessions** — total volume and distinct conversations
- **Block Rate** and **Avg. Confidence**
- **Violations** — count of policy violations tied to that agent
- **Last Seen** — how long ago the agent last produced an event

Use the search box to find an agent by ID, and click any column header to sort. Click a row to open the full detail view.

### Understanding Trust Score

Trust Score is a weighted blend of three signals from an agent's recent activity:

```
Trust Score = (Allow Rate × 50%) + (Avg. Confidence × 35%) + (Violation-Free Rate × 15%)
```

| Band | Meaning |
|---|---|
| **≥ 85% — Healthy** | Agent is performing within expected governance bounds |
| **70–84% — Watch** | Worth keeping an eye on; not yet a compliance concern |
| **< 70% — Critical** | Flagged as high-risk; investigate promptly |

### Agent detail view

Clicking an agent opens a full breakdown:

1. **Trust Score gauge** — the score, its band, and a reminder of the formula weights
2. **Outcome breakdown** — how many of the agent's events were allowed, flagged, or blocked
3. **Key metrics** — block rate, average confidence, total violations, session count
4. **Top policy violations** — the specific rules this agent triggers most often
5. **Recent sessions** — the agent's last 8 sessions; click one to jump straight into the Audit Log Explorer, pre-filtered to that conversation

From here, use **View All Events** to see this agent's complete history in the Audit Log Explorer, or click any session to inspect that conversation specifically.

---

## A note on time ranges

The Trust Score and fleet chips are computed from a sample of the most recent activity (up to 200 events) for the selected period. For very high-volume agents, this means the numbers reflect recent behavior rather than an agent's entire lifetime history — treat Trust Score as "how is this agent doing right now," not a permanent grade.

---

## What to do if an agent looks wrong

- **An agent you expect to see is missing** — it hasn't generated any events in the selected period yet, or your seed/demo data doesn't include it. See [12-FAQ-and-Troubleshooting.md](12-FAQ-and-Troubleshooting.md).
- **An agent's Trust Score suddenly drops** — open its detail view and check **Top Policy Violations** first; it will usually point at a specific rule (e.g. Confidence Floor or Bias Threshold) worth investigating in the [Policy Engine](06-Policy-Engine-Configuration.md).
- **You want to stop an agent from taking a specific kind of action** — that isn't done from the Agent Trust Panel. Create or adjust a policy instead; see [06-Policy-Engine-Configuration.md](06-Policy-Engine-Configuration.md).
