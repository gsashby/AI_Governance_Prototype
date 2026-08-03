# Overview & Core Concepts

Welcome to the **AI Trust Center** — the governance and auditability layer for AI systems running inside the enterprise AI platform. This guide is written for the people who use the product day to day: compliance officers, platform administrators, auditors, and team leads who need to understand, control, and report on what the platform's AI is doing.

If you're looking for developer/API documentation instead, see the other files in `Documentation/` (they describe the codebase, not the product experience).

---

## What the Trust Center does

Every time an AI module inside the platform — Autopilot, Copilot, or Agent Workflows — makes a decision, that decision is recorded as an **audit event**. The Trust Center reads those events in real time and turns them into:

- A live governance score and KPI view (**Governance Dashboard**)
- A searchable, exportable history of every decision (**Audit Log Explorer**)
- Configurable rules that block or flag risky behavior (**Policy Engine**)
- Per-agent trust scoring (**Agent Trust Panel**)
- Executive-ready compliance reports (**Board Report Builder**)
- A visual map of how a request flows through the governance pipeline (**Data Flow Visualizer**)
- Plain-English search over all of the above (**Natural Language Query**)

You don't send data *into* the Trust Center yourself — it's a read layer over decisions the platform's AI modules are already making. See [02-Connecting-and-Monitoring-Agents.md](02-Connecting-and-Monitoring-Agents.md) for what that means in practice.

---

## Core concepts

| Term | Meaning |
|---|---|
| **Audit event** | One recorded AI decision — an inference, a policy check, a bias scan, a session starting/ending, or a model loading. Every event carries an outcome, a confidence score, the agent and session it belongs to, and any policy violations it triggered. |
| **Agent** | The AI worker that took the action — an Autopilot flow, a Copilot instance, or an Agent Workflows module. Identified by an Agent ID (e.g. `agent-007`). |
| **Session** | A group of related events (e.g. one customer conversation). Used to reconstruct "what led to this decision." |
| **Model** | The underlying AI model powering an agent (e.g. an LLM, a classifier, a RAG pipeline). Tracked in the **Model Registry** with its own governance score. |
| **Outcome** | What happened to the request: **Allowed** (passed all checks), **Flagged** (allowed, but marked for review), or **Blocked** (stopped by a policy). |
| **Policy** | A governance rule you configure — e.g. "block any response with confidence below 70%." Policies have a severity (Critical/High/Medium/Low) and an action (block/flag/allow-with-logging). |
| **Governance score** | A rolled-up health measure (0–100%) combining confidence and violation rates, shown at the model, module, and fleet level. |
| **Trust score** | The per-agent equivalent of governance score — see [02-Connecting-and-Monitoring-Agents.md](02-Connecting-and-Monitoring-Agents.md). |
| **Alert** | Surfaced automatically when recent events are blocked or carry policy violations — no separate configuration needed. |

---

## Finding your way around

The left-hand sidebar is grouped by task:

| Section | Pages |
|---|---|
| **AI Governance** | Governance Dashboard, Governance Analysis, Audit Log Explorer, Policy Engine |
| **Reports & Queries** | Board Report Builder |
| **Agent Tools** | Agent Trust Panel |
| **Administration** | Data Flow Visualizer |
| **Models & Incidents** | Model Registry, Incident Timeline, Access Controls |

The sidebar can be collapsed to icon-only view with the arrow at the bottom, and shows a live **Audit Coverage** indicator and the current platform version in the footer.

**Access Controls** is visible but greyed out — role-based permissions are on the roadmap and not available yet (see the FAQ).

---

## Who can see what, today

The Trust Center is currently a **single-tenant, single-view experience**: there is no login screen, and every visitor sees the same data with the same permissions. There's no concept yet of a "Viewer" vs. "Policy Admin" role — anyone with a link to the app can view dashboards, read audit events, and create or delete policies.

**What this means for you in practice:**
- Don't rely on the app itself to restrict who can change policies or export data — control access at the network/link level until role-based access ships.
- Treat every change (a new policy, a deleted policy, a toggled rule) as visible and actionable by anyone else using the app.

This is called out because it's the single biggest difference from a typical enterprise SaaS tool, and it shapes how you should roll this out to your team in the meantime.

---

## Where to go next

- New to the product? Start with [02-Connecting-and-Monitoring-Agents.md](02-Connecting-and-Monitoring-Agents.md), then [03-Governance-Dashboard.md](03-Governance-Dashboard.md).
- Want to set up governance rules? Go straight to [06-Policy-Engine-Configuration.md](06-Policy-Engine-Configuration.md).
- Something looks broken or empty? Check [12-FAQ-and-Troubleshooting.md](12-FAQ-and-Troubleshooting.md) first.
