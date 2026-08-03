# Board Report Builder

**Where:** sidebar → *Reports & Queries → Board Report Builder*

A two-step wizard for generating executive-ready AI compliance reports — combining live platform data, an AI-written narrative, and a cryptographic audit certificate. Built for board members, legal, and compliance audiences.

---

## Step 1 — Configure

Fill in:

| Field | Notes |
|---|---|
| Report title | Defaults to "AI Governance Compliance Report" |
| Prepared by | Your name |
| Reporting period | Last 7 / 30 / 90 days, or a custom date range |
| Regulations in scope | Multi-select: EU AI Act, GDPR, TCPA, CCPA |

Click **Generate Report**. The platform pulls current governance metrics, model health, active alerts, all policies, and audit counts for your chosen period, then moves to Step 2.

---

## Step 2 — Preview & Export

The generated report has nine sections:

1. **Executive Summary** — AI-written overview + key KPIs
2. **Compliance Overview** — AI-written narrative + policy enforcement breakdown
3. **Model Performance** — AI-written summary + per-model governance table
4. **Risk Assessment** — AI-written risk characterization + alert severity breakdown
5. **KPI Snapshot** — governance score, decision counts, blocked/flagged/allowed percentages
6. **Model Health** — every active model with its status badge
7. **Policy Status** — every policy, its severity, enabled state, and violation count
8. **Active Alerts** — current alerts with severity
9. **Audit Certificate** — a tamper-evident certificate for this specific report

Sections 1–4 populate automatically with AI-generated prose a moment after the page loads — if that call fails for any reason, the data sections still render; you'll simply be missing the narrative summaries.

### Adding custom content

At the bottom of the preview, there's an input where you can ask for additional report content in plain English, e.g.:

> *"Add a section on how we comply with TCPA call recording requirements"*
> *"Summarize our model bias performance this quarter"*

Requests unrelated to AI governance, compliance, model performance, policy enforcement, or auditing will be politely declined rather than answered — this assistant is scoped to report content only. Accepted additions are appended to the end of the report.

### The audit certificate

Every generated report gets a certificate (format: `AITC-{timestamp}-{hash prefix}`) computed from a SHA-256 hash of the full report payload. Any change to the underlying data after generation would produce a different hash — so the certificate is a way to prove a report hasn't been altered after the fact, not a security credential. It's shown with an expiry one year out from generation.

### Exporting

Click **Print / Save as PDF** — this opens your browser's native print dialog with the report formatted for print (navigation and controls are hidden automatically). Choose "Save as PDF" in the print dialog to get a file.

---

## Tips

- Generate reports **after** reviewing the Governance Dashboard and Audit Log for the same period — the AI narrative is only as good as the underlying data, and you'll catch anything that looks off before it goes into a board-facing document.
- If you need a report scoped to specific regulations, select only those in Step 1 — the regulation selection currently informs the report framing and AI prompts rather than filtering which audit events are included.
- Because the certificate hash covers the exact report payload at generation time, regenerating the same report later (even with identical settings) produces a new certificate ID — treat each generated report as its own point-in-time artifact.
