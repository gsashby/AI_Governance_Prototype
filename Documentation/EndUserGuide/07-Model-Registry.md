# Model Registry

**Where:** sidebar → *Models & Incidents → Model Registry*

The Model Registry is your catalogue of every AI model being monitored by the Trust Center — governance score, bias score, confidence average, and inference volume, all in one searchable table.

---

## Summary KPIs

Five headline numbers across the full model fleet: **Registered Models**, **Active** count, **Avg. Governance Score**, **Critical** count (models scoring below 70%), and total **Inferences (7d)**.

---

## The model table

| Column | Notes |
|---|---|
| Name | Click to open the detail drawer |
| Type | LLM / Classifier / RAG / Regression, color-coded |
| Version | |
| Status | Active or Inactive |
| Gov. Score | Progress bar, green ≥85% / amber ≥70% / red below |
| Avg. Conf. | |
| Inferences | Total volume |
| Violations | Healthy/Watch/Critical badge |

Search by name or version; sort by clicking any column header.

---

## Model detail drawer

Click any model to see its full record — all table fields plus bias score and created/updated timestamps. Click **View Audit Events** to jump into the Audit Log Explorer pre-filtered to just this model's history.

---

## Registering a new model

Click **+ Register Model** to open the inline form:

| Field | Required |
|---|---|
| Model name | Yes |
| Type (LLM / Classifier / RAG / Regression) | Yes |
| Version | Yes |
| Status (Active / Inactive) | Yes |

> **Known limitation — registration doesn't currently save.** In this build, submitting the Register Model form does not persist the new model to the platform: the backend endpoint it depends on isn't live yet, so the form will appear to hang or fail rather than adding your model to the list. Until this is fixed, treat new-model registration as a **manual, backend/platform-team process** rather than a self-service one — reach out to your platform team to have a new model added rather than relying on this form. This guide will be updated once registration is fully wired up end-to-end.

Existing models in the registry (added via the platform's setup/seed process) are unaffected by this — browsing, searching, sorting, and drilling into any already-registered model works normally.

---

## Tips

- Use the **Critical** KPI as a quick daily check — anything above zero means at least one model has dropped below the 85%/70% governance thresholds and is worth investigating.
- The fastest path from "this model looks unhealthy" to "here's why" is: open its detail drawer → **View Audit Events** → sort by Confidence or filter by outcome in the Audit Log Explorer.
