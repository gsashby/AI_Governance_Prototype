# Policy Engine — Configuration Guide

**Where:** sidebar → *AI Governance → Policy Engine*

The Policy Engine is where you configure the governance rules that every AI request is checked against — this is the main place in the Trust Center where you actively *configure* platform behavior, rather than just observe it.

Every AI request flowing through Autopilot, Copilot, or Agent Workflows is evaluated against all **active** policies before a response is returned:

- **Critical** and **High** severity violations **block** the request outright.
- **Medium** and **Low** severity violations **flag** it for review but let it through.

---

## Viewing existing policies

The policy list shows, per policy: name, description (plus a readable summary of its rule, if structured), severity badge, enabled/disabled status, and a rolling 7-day violation count. Click any column header to sort.

The **Violations (7d)** column is your quickest signal for which rules are actually firing — a policy with a high violation count either reflects a real, frequent problem, or may be tuned too aggressively.

---

## Creating a policy

1. Click **+ New Policy** in the page header.
2. Fill in:
   - **Name** — required, e.g. *"Block PII in responses"*
   - **Description** — optional, but recommended so the rest of your team understands intent
   - **Severity** — Critical, High, Medium, or Low (defaults to Medium)
3. Build one or more **trigger conditions** (see below).
4. Choose the **action** to take when the rule fires.
5. Click **Create Policy**.

New policies are **enabled** by default.

### Trigger conditions

Each condition is a `Field → Operator → Value` statement:

| Field | Available operators | Value type |
|---|---|---|
| Confidence Score | falls below / rises above | Number, 0–1 |
| Event Type | is / is not | One of: inference, policy_check, bias_scan, session_start, model_load |
| Outcome | is / is not | One of: allowed, blocked, flagged |
| Model Name | equals / is not / contains | Free text |

**Adding more than one condition:** click **+ Add condition**. Once you have two or more, an **AND / OR** toggle appears:

- **AND** — every condition must be true at once for the rule to fire
- **OR** — any single condition being true is enough

This logic setting applies to the whole rule (you can't currently mix AND and OR within one policy). Remove a condition with its **×** button — at least one condition must always remain.

As you build the rule, a live preview shows exactly what you've configured, e.g.:

```
IF (conf. score < 0.70) AND (event type = inference) → BLOCK
```

Use this preview to sanity-check your logic before saving — it's the same plain-English summary that will later appear in the policy list.

### Choosing an action

| Action | Effect |
|---|---|
| **⊘ Block request** | The request is rejected before reaching the model; logged as `blocked` |
| **⚑ Flag for review** | The request proceeds but is marked `flagged` and surfaces in the Alerts feed |
| **✓ Allow with logging** | The request proceeds normally; logged as `allowed` with a note in the audit trail |

Pick **Block** for hard compliance requirements (PII, safety, hard confidence floors). Use **Flag** when you want visibility without disrupting the user experience — flagged events are the easiest way to build a review queue without blocking anything.

---

## Editing a policy

Click the pencil icon on any row. The form pre-fills with the policy's current name, description, severity, and full rule condition set — edit anything and click **Save Changes**.

---

## Enabling / disabling a policy

Click the status pill in the policy list to toggle it — **Enabled** (green) ↔ **Disabled** (grey). This is the fastest way to turn a rule off temporarily (e.g. during a known noisy period, or while testing) without losing its configuration. Disabled policies stop affecting new requests immediately but keep their history and configuration intact.

---

## Deleting a policy

Click the trash icon, then confirm with **Yes** in the inline prompt (or **Cancel** to back out). **Deletion is permanent** — there's no undo and no archive. If you might want the rule back later, disable it instead of deleting it.

---

## Practical guidance

- **Start with Flag, graduate to Block.** When introducing a new policy, consider setting its action to Flag first so you can see how often it would fire in practice before committing to blocking traffic.
- **Watch the 7-day violation count after any change.** A rule that never fires might be too narrow; a rule generating hundreds of violations a day is either catching something important or needs tuning.
- **Anyone can change policies right now.** Because there's no role-based access control yet (see [01-Overview-and-Concepts.md](01-Overview-and-Concepts.md)), coordinate policy changes with your team out-of-band — the app itself won't stop a colleague from editing or deleting a rule you're relying on.
- **Seed/demo policies use a legacy format in some environments.** If you see a policy whose row shows only a description with no inline condition summary, its rule was defined before the structured condition editor existed. Editing and re-saving it will upgrade it to the current format automatically.
