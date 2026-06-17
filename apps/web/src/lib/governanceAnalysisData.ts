// Metrics catalog for the AI Governance Analysis Dashboard.
// Sourced from the "AI Platform GA Metrics" specification: Metering, Telemetry
// (raw events), Product Analytics, and the GA-blocking recommended additions.

export type Audience = 'internal' | 'customer' | 'both';

export type MetricRow = {
  metric: string;
  definition?: string;
  notes?: string;
  audience?: Audience;
  gaBlocking?: boolean;
};

export type MetricGroup = {
  title: string;
  rows: MetricRow[];
};

// ── METERING ────────────────────────────────────────────────────────────────
export const meteringGroups: MetricGroup[] = [
  {
    title: 'Token limits & enforcement',
    rows: [
      {
        metric: 'Monthly token limit per tenant',
        definition: 'Configurable per tenant; default applies unless overridden',
        notes: 'Platform team configures',
      },
      {
        metric: 'Per-user limit within tenant',
        definition: 'Secondary cap for fair use within a tenant',
        notes: 'Future / Post-GA — configurable by admins',
      },
      {
        metric: 'Requests per minute cap per tenant',
        definition: 'Catches runaway callers independent of token consumption',
      },
      {
        metric: 'Manual tenant pause',
        definition: "Platform team can set a tenant's limit to zero via config without a code deploy",
        notes: 'Emergency use',
      },
      {
        metric: 'Throttle event log',
        definition: 'Every throttle event logged: tenant / agent / limit type / timestamp',
        notes: 'Not GA-blocking',
      },
    ],
  },
  {
    title: 'Internal visibility',
    rows: [
      {
        metric: 'Token consumption by tenant',
        definition: 'Total tokens per tenant per period — queryable by product, platform, finance',
        notes: 'Internal only',
        audience: 'internal',
      },
      {
        metric: 'Token consumption by feature',
        definition: 'Broken down by product AI use cases (AI Reporting, AI Insights, etc.)',
        notes: 'Internal only',
        audience: 'internal',
      },
      {
        metric: 'Token consumption by time period',
        definition: 'Filterable: last 7 / 30 / 90 days, custom range',
        notes: 'Internal only',
        audience: 'internal',
      },
      {
        metric: 'Estimated cost (USD) per tenant',
        definition: 'Calculated from rate table maintained by platform team',
        notes: 'Internal only — never surfaced to customers',
        audience: 'internal',
      },
      {
        metric: 'Token limit utilization %',
        definition: 'Current consumption as % of configured limit per tenant',
        notes: 'Internal alert at 80%',
        audience: 'internal',
      },
      {
        metric: 'Overage report',
        definition: 'Which tenants exceeded fair usage, by how much, in which period',
        notes: 'Commercial team action',
        audience: 'internal',
      },
    ],
  },
  {
    title: 'Customer-facing visibility (read-only, own tenant)',
    rows: [
      {
        metric: 'Current month token usage',
        definition: 'Overall token count (future — Ivanti AI credits)',
        notes: 'Customer-facing',
        audience: 'customer',
      },
      {
        metric: 'Usage by user within tenant',
        definition: 'Breakdown of consumption per user / group',
        notes: 'Customer-facing',
        audience: 'customer',
      },
      {
        metric: 'Usage by feature',
        definition: 'Breakdown by feature — AI Reporting, AI Insights, etc.',
        notes: 'Customer-facing',
        audience: 'customer',
      },
      {
        metric: '90-day consumption trend',
        definition: 'Rolling time-series view',
        notes: 'No cost figures visible to customers',
        audience: 'customer',
      },
    ],
  },
];

// ── TELEMETRY — RAW EVENTS ────────────────────────────────────────────────────
export const telemetryGroups: MetricGroup[] = [
  {
    title: 'Agent hosting service (runtime)',
    rows: [
      { metric: 'Session started / ended / timed out' },
      { metric: 'Agent execution started / completed / failed' },
      { metric: 'Agent handoff started / completed / failed' },
      { metric: 'LLM model call started / completed / failed' },
      { metric: 'MCP / tool call started / completed / failed' },
      {
        metric: 'Agent execution retried',
        definition: 'Distinguishes a retry from a new execution — needed for 429 / failover visibility',
      },
      { metric: 'Router / master agent invoked' },
      { metric: 'Sub-agent selected' },
    ],
  },
  {
    title: 'Conversational UI widget',
    rows: [
      { metric: 'User turn submitted' },
      { metric: 'User clarification requested', notes: 'Conversational UI only' },
      { metric: 'User correction received', notes: 'Conversational UI only' },
      { metric: 'Thumbs up / thumbs down' },
      { metric: 'Open text feedback', notes: 'Post-MVP' },
    ],
  },
  {
    title: 'Debugging & conversation history instrumentation',
    rows: [
      {
        metric: 'Timestamp at each step',
        definition: 'Session start, agent invoked, LLM call, tool call, response returned',
      },
      {
        metric: 'Input / output capture per step',
        definition: 'Configurable (not on by default)',
      },
      {
        metric: 'Error type, error message, which step failed',
        definition: 'Captured on every failed step for root-cause analysis',
      },
    ],
  },
];

// Traceability IDs required on every event.
export const traceabilityIds: string[] = [
  'tenant_id',
  'user_id',
  'session_id',
  'turn_id',
  'trace_id',
  'agent_execution_id',
  'tool_call_id',
];

// ── PRODUCT ANALYTICS ─────────────────────────────────────────────────────────
export const analyticsGroups: MetricGroup[] = [
  {
    title: 'Adoption',
    rows: [
      {
        metric: 'Activated users',
        definition: '% of users who completed first successful agent execution',
        audience: 'both',
      },
      {
        metric: 'Weekly active users',
        definition: 'Users with 2+ successful executions in 7 days',
        audience: 'both',
      },
      {
        metric: 'Monthly active users',
        definition: 'Users with 5+ successful executions in 30 days',
        audience: 'both',
      },
      {
        metric: 'Agent executions per user, per tenant',
        definition: 'Agent (by use case, not sub-agents) is triggered',
        audience: 'both',
      },
      {
        metric: 'Agent execution volume trend',
        definition: 'Daily / weekly / monthly per capability, per tenant',
        audience: 'both',
      },
      {
        metric: 'Returning user rate',
        definition: '% of active users who also had executions in the prior period',
        audience: 'internal',
      },
      {
        metric: 'Tenant activation rate',
        definition: '% of tenants that enabled a capability and used it at least once. Enabled-but-never-used tracked separately.',
        audience: 'internal',
      },
      {
        metric: 'Capability enablement status',
        definition: 'Count of capabilities enabled vs. available per tenant',
        audience: 'both',
      },
    ],
  },
  {
    title: 'Reliability',
    rows: [
      { metric: 'Execution success rate', audience: 'internal' },
      { metric: 'Execution failure rate', audience: 'internal' },
      {
        metric: 'Completion rate',
        definition: 'Completed vs. abandoned vs. failed per capability',
        audience: 'internal',
      },
      { metric: 'End-to-end latency P50, P95', audience: 'internal' },
      { metric: 'Timeout rate', audience: 'internal' },
      { metric: 'MCP / tool call failure rate', audience: 'internal' },
      { metric: 'Agent handoff failure rate', audience: 'internal' },
      {
        metric: 'Top error types per capability',
        definition: 'Ranked error categories per capability per period',
        audience: 'internal',
      },
    ],
  },
  {
    title: 'User feedback',
    rows: [
      {
        metric: 'Feedback submission rate',
        definition: '% of executions where user submitted thumbs up or down',
        audience: 'internal',
      },
      {
        metric: 'Thumbs up rate',
        definition: '% of submitted feedback that was positive',
        audience: 'both',
      },
      {
        metric: 'Average feedback score per capability',
        definition: 'Rolling average thumbs up rate per capability over selected period',
        audience: 'both',
      },
      {
        metric: 'Feedback volume per capability',
        definition: 'Total feedback responses — low volume makes score less reliable',
        audience: 'internal',
      },
    ],
  },
  {
    title: 'Quality proxies',
    rows: [
      {
        metric: 'Clarification rate',
        definition: '% of turns where agent asked a clarifying question instead of acting',
        notes: 'Post-GA',
      },
      {
        metric: 'Correction rate',
        definition: '% of turns where user corrected the agent',
        notes: 'Post-GA',
      },
    ],
  },
];

// ── KEY GAPS — RECOMMENDED ADDITIONS (GA-BLOCKING) ────────────────────────────
export const recommendedGroups: MetricGroup[] = [
  {
    title: 'Safety & guardrails (currently absent)',
    rows: [
      {
        metric: 'Content moderation triggered (raw event)',
        definition: 'Policy filter fires on a prompt or model output',
        notes: 'GA-blocking; raw event',
        gaBlocking: true,
      },
      {
        metric: 'PII detected / redacted (raw event)',
        definition: 'Sensitive data identified and masked before storage or response',
        notes: 'GA-blocking; raw event',
        gaBlocking: true,
      },
      {
        metric: 'Prompt injection / jailbreak attempt detected (raw event)',
        definition: 'Adversarial input flagged by a guardrail',
        notes: 'GA-blocking; raw event',
        gaBlocking: true,
      },
      {
        metric: 'Response blocked / refused (raw event)',
        definition: 'Model output withheld or safe-completed due to policy',
        notes: 'GA-blocking; raw event',
        gaBlocking: true,
      },
      {
        metric: 'Guardrail block rate',
        definition: '% of executions with at least one guardrail block',
        notes: 'GA-blocking; reliability metric',
        gaBlocking: true,
      },
      {
        metric: 'Refusal rate',
        definition: '% of turns where the model declined to answer',
        notes: 'GA-blocking; reliability metric',
        gaBlocking: true,
      },
    ],
  },
  {
    title: 'Traceability — additional required IDs',
    rows: [
      {
        metric: 'model_id / model_version / prompt_version',
        definition: 'Added to every event so quality regressions can be tied to a model or prompt change',
        notes: 'GA-blocking; extends the base ID set',
        gaBlocking: true,
      },
    ],
  },
  {
    title: 'Latency — finer granularity',
    rows: [
      {
        metric: 'Time-to-first-token (TTFT) P50, P95',
        definition: 'Streaming responsiveness as perceived by the user',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
      {
        metric: 'Per-component latency — LLM call, tool call, router',
        definition: 'Isolates where end-to-end time is spent',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
      {
        metric: 'End-to-end latency P99',
        definition: 'Tail latency beyond P95',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
    ],
  },
  {
    title: 'Cost-grained token telemetry',
    rows: [
      {
        metric: 'Input vs output tokens (split)',
        definition: 'Tracked separately — input and output have different unit costs',
        notes: 'GA-blocking; refines token consumption',
        gaBlocking: true,
      },
      {
        metric: 'Token consumption by model',
        definition: 'Per-model attribution for accurate cost calculation',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
      {
        metric: 'Cache hit rate / cached tokens',
        definition: 'Cached vs. fresh tokens — reduces both cost and latency',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
    ],
  },
  {
    title: 'SLOs & alerting',
    rows: [
      {
        metric: 'SLO targets per reliability metric',
        definition: 'Defined target + error budget for success rate, latency, and timeout rate',
        notes: 'GA-blocking; attaches to reliability metrics',
        gaBlocking: true,
      },
      {
        metric: 'Alert on failure-rate spike',
        definition: 'Trigger when execution failure rate exceeds threshold',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
      {
        metric: 'Alert on latency SLO breach',
        definition: 'Trigger when P95 / P99 exceeds target',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
      {
        metric: 'Alert on timeout surge',
        definition: 'Trigger on abnormal increase in timeout rate',
        notes: 'GA-blocking',
        gaBlocking: true,
      },
    ],
  },
];

// ── Representative chart / KPI data (prototype values) ────────────────────────

// Token consumption trend (millions of tokens) over the last periods.
export const tokenConsumptionTrend = [
  { period: 'Wk 1', input: 18.2, output: 6.1 },
  { period: 'Wk 2', input: 21.7, output: 7.4 },
  { period: 'Wk 3', input: 24.9, output: 8.2 },
  { period: 'Wk 4', input: 23.1, output: 7.9 },
  { period: 'Wk 5', input: 27.6, output: 9.3 },
  { period: 'Wk 6', input: 31.4, output: 10.8 },
];

// Token consumption by feature.
export const tokensByFeature = [
  { feature: 'AI Reporting', tokens: 14.8 },
  { feature: 'AI Insights', tokens: 11.2 },
  { feature: 'Autopilot', tokens: 9.6 },
  { feature: 'Copilot', tokens: 7.1 },
  { feature: 'Mpower Agent', tokens: 4.3 },
];

// Per-tenant utilization vs configured limit (%).
export const tenantUtilization = [
  { tenant: 'Northwind', utilization: 62 },
  { tenant: 'Acme Corp', utilization: 74 },
  { tenant: 'Globex', utilization: 88 },
  { tenant: 'Initech', utilization: 41 },
  { tenant: 'Umbrella', utilization: 95 },
];

// Raw-event volume by type (last 7 days).
export const eventVolume = [
  { type: 'Session', count: 48210 },
  { type: 'Agent exec', count: 132540 },
  { type: 'LLM call', count: 318900 },
  { type: 'Tool call', count: 96400 },
  { type: 'Handoff', count: 21870 },
  { type: 'Retry', count: 4120 },
];

// Adoption funnel.
export const adoptionFunnel = [
  { stage: 'Activated', value: 8420 },
  { stage: 'WAU', value: 5130 },
  { stage: 'MAU', value: 6890 },
];

// Reliability snapshot (%).
export const reliabilitySnapshot = {
  successRate: 97.4,
  failureRate: 2.6,
  timeoutRate: 0.8,
  toolFailureRate: 1.9,
  handoffFailureRate: 1.1,
  completionRate: 94.2,
  latencyP50: 1.9,
  latencyP95: 4.7,
  latencyP99: 8.3,
  ttftP50: 0.42,
  ttftP95: 1.1,
};

// Guardrail events (last 7 days) — GA-blocking additions.
export const guardrailEvents = [
  { type: 'Content moderation', count: 312 },
  { type: 'PII redacted', count: 1487 },
  { type: 'Prompt injection', count: 94 },
  { type: 'Response blocked', count: 156 },
];

// SLO targets.
export type SloTarget = {
  metric: string;
  target: string;
  current: string;
  status: 'healthy' | 'warning' | 'critical';
};

export const sloTargets: SloTarget[] = [
  { metric: 'Execution success rate', target: '≥ 97.0%', current: '97.4%', status: 'healthy' },
  { metric: 'End-to-end latency P95', target: '≤ 5.0s', current: '4.7s', status: 'healthy' },
  { metric: 'End-to-end latency P99', target: '≤ 8.0s', current: '8.3s', status: 'warning' },
  { metric: 'Timeout rate', target: '≤ 1.0%', current: '0.8%', status: 'healthy' },
  { metric: 'Guardrail block rate', target: '≤ 3.0%', current: '2.1%', status: 'healthy' },
];

// Cost-grained token split.
export const tokenSplit = {
  inputTokens: 146.9, // millions
  outputTokens: 49.7,
  cachedTokens: 38.4,
  cacheHitRate: 26.1, // %
  estCostUsd: 4820,
};
