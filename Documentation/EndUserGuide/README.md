# AI Trust Center — End User Guide

This guide is for the people who **use** the AI Trust Center — compliance officers, platform administrators, auditors, and team leads overseeing AI governance across the enterprise AI platform. It explains what each page does, how to configure the platform, and what to know before you rely on it day to day.

If you're looking for engineering/API documentation instead, see the rest of `Documentation/` at the repo root (architecture, data model, API references, etc.) — this folder is written for product usage, not implementation.

---

## Start here

| If you want to... | Read |
|---|---|
| Understand what the product does and its core concepts | [01-Overview-and-Concepts.md](01-Overview-and-Concepts.md) |
| Understand how agents (Autopilot, Copilot, Agent Workflows) show up in the platform | [02-Connecting-and-Monitoring-Agents.md](02-Connecting-and-Monitoring-Agents.md) |
| Get a live snapshot of governance health | [03-Governance-Dashboard.md](03-Governance-Dashboard.md) |
| Reference the platform metrics catalog (metering, telemetry, analytics, GA gaps) | [04-Governance-Analysis-Dashboard.md](04-Governance-Analysis-Dashboard.md) |
| Search, filter, export, or push audit events to a SIEM | [05-Audit-Log-Explorer.md](05-Audit-Log-Explorer.md) |
| **Configure governance rules (policies)** | [06-Policy-Engine-Configuration.md](06-Policy-Engine-Configuration.md) |
| Browse or check the health of registered AI models | [07-Model-Registry.md](07-Model-Registry.md) |
| Generate an executive compliance report | [08-Board-Report-Builder.md](08-Board-Report-Builder.md) |
| Review recent blocked/flagged incidents | [09-Incident-Timeline.md](09-Incident-Timeline.md) |
| See how a request flows through the governance pipeline | [10-Data-Flow-Visualizer.md](10-Data-Flow-Visualizer.md) |
| Ask plain-English questions about your audit data | [11-Natural-Language-Query.md](11-Natural-Language-Query.md) |
| Troubleshoot something that looks broken, or check what's not wired up yet | [12-FAQ-and-Troubleshooting.md](12-FAQ-and-Troubleshooting.md) |

---

## The two things worth knowing before anything else

1. **Agents connect themselves.** There's no setup wizard, API key, or manual registration step for Autopilot, Copilot, or Agent Workflows modules — the moment one acts, it's visible in the platform. See [02-Connecting-and-Monitoring-Agents.md](02-Connecting-and-Monitoring-Agents.md).
2. **This build has no login or role-based access yet.** Everyone who opens the app sees and can change the same data. Plan your team's usage accordingly, and check [12-FAQ-and-Troubleshooting.md](12-FAQ-and-Troubleshooting.md) for the full list of what's fully working versus still in progress.

---

## Feedback

This guide reflects the platform as currently built. If a page's behavior changes or a listed limitation gets fixed, update the corresponding file (and the status table in [12-FAQ-and-Troubleshooting.md](12-FAQ-and-Troubleshooting.md)) rather than letting the guide drift out of sync.
