# Natural Language Query

**Where:** embedded at the top of the Governance Dashboard (there's no separate page for it)

Ask questions about your governance data in plain English instead of building filters by hand.

---

## Asking a question

Type into the search box and press **Query**, or click one of the **Suggested Queries** chips to run a canned example instantly:

- Show me all blocked events
- Show flagged policy violations this week
- Show all inference events
- Show bias scan events last 30 days
- Show allowed events today

Results appear directly below as a sortable table. Click the "Query Results" header at any time to collapse or re-expand the table without losing your results; submitting a new query always re-expands it.

Click any row to open the full event detail drawer — same as the Audit Log Explorer, including session timeline and **Explain with AI**.

---

## How your question gets interpreted

Above the results table you'll see one or more blue "interpreted as" tags (e.g. `outcome: blocked`, `period: last 7 days`) — this is exactly how your question was translated into filters. Always glance at these before trusting the results; if the tags don't match what you meant, try rephrasing.

Most common questions are understood instantly using simple keyword matching — no AI call, no delay. If your question doesn't match any recognized pattern, it's automatically sent to Claude to interpret. When that happens, you'll see a small **✨ AI** badge next to "Query Results."

**Some examples of the difference:**

| You ask | Fast keyword match gets | AI interpretation gets |
|---|---|---|
| "blocked inference events yesterday" | Just the "blocked" part | Outcome, event type, *and* the date, all together |
| "risky events this week" | Nothing recognizable — falls back to a raw text search | Correctly maps "risky" → blocked, plus the time window |

If you're not getting the results you expect from a short query, try being more explicit (mention outcome, event type, and time period directly) — this both improves the fast path's accuracy and gives the AI fallback clearer signal.

---

## Tips

- **Be specific about outcome, type, and time** — "show blocked inference events from the last 7 days" will consistently outperform a vaguer phrasing.
- If a query returns nothing, check the interpreted tags first — you may have gotten a narrower filter than intended (e.g. only the first keyword in a multi-part question was picked up).
- Use **Clear** to reset the input and remove the results table entirely.
- For anything beyond ad-hoc lookups — saved filters, exports, SIEM pushes — switch to the [Audit Log Explorer](05-Audit-Log-Explorer.md), which NLQ results are built on top of.
