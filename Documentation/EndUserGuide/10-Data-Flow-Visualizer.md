# Data Flow Visualizer

**Where:** sidebar → *Administration → Data Flow Visualizer*

An interactive diagram of how an AI request actually moves through the governance pipeline — useful for onboarding new team members, explaining the architecture to auditors, or just building a mental model of what "governance" means concretely in this platform.

---

## Reading the diagram

Nodes are arranged in two rows:

**Request pipeline (top):** AI Agent → Policy Engine → AI Model → Response Filter → Client Output
**Governance layer (bottom):** Audit Logger → PostgreSQL → Alert System → Governance

Animated, color-coded lines show how data moves between them — for example, every request is checked by the Policy Engine before it ever reaches a model, and every step along the way is logged to the Audit Logger regardless of outcome.

Click any node to select it and see a plain-English explanation of its role in the right-hand panel. Click it again to deselect and return to the numbered pipeline-steps overview.

Use **Pause / Resume flow** in the header to freeze or restart the animation — handy when you're using this diagram in a live walkthrough and don't want a moving target.

---

## Right-hand panel

Alongside the node detail, you'll always see:

- **Pipeline Health KPIs** — live governance score, active policy count, 24h violation count, and models monitored, pulled from the same data as the Governance Dashboard
- **Recent Events** — the last several audit events, so you can see the diagram's abstract steps next to concrete, real examples

---

## AI Usage Policy link

The **AI Usage Policy** button in the header opens the organization's published AI Services Policy in a new tab — useful to have on hand during a compliance walkthrough or when a stakeholder asks "what governs this at a policy level, not just a technical one."

---

## When to use this page

This page doesn't surface anything you can't already see elsewhere — its value is entirely in the **explanation**, not new data. Reach for it when you need to:
- Explain the governance pipeline to someone new to the platform
- Answer "does every request actually get checked before reaching the model?" (yes — the diagram shows this is enforced at the Policy Engine node, before the AI Model node)
- Show an auditor exactly where audit logging happens in the flow (the Audit Logger node captures every event, not just blocked/flagged ones)
