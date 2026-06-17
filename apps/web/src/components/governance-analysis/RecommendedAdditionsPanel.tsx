'use client';
import { ShieldAlert } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import MetricTable from './MetricTable';
import { ChartCard, StatTile } from './primitives';
import StatusBadge from '@/components/shared/StatusBadge';
import {
  recommendedGroups, guardrailEvents, sloTargets, tokenSplit,
} from '@/lib/governanceAnalysisData';

const tooltipStyle = {
  contentStyle: { backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12 },
  labelStyle: { color: '#111827', fontWeight: 600 },
};

const guardrailColors = ['#DC2626', '#D97706', '#7C3AED', '#DB2777'];

export default function RecommendedAdditionsPanel() {
  return (
    <div className="space-y-5">
      {/* GA-blocking banner */}
      <div className="flex items-start gap-3 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3">
        <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#DC2626]" />
        <div className="text-[12.5px] leading-relaxed text-[#991B1B]">
          <strong className="font-bold">GA-blocking gaps.</strong> The metrics below are recommended additions
          not yet in the baseline spec — safety &amp; guardrails, finer-grained latency, cost-grained token
          telemetry, additional traceability IDs, and SLOs / alerting. They are required before General Availability.
        </div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatTile label="Guardrail block rate" value="2.1%" color="#16A34A" hint="Target ≤ 3.0%" />
        <StatTile label="Refusal rate" value="0.6%" color="#16A34A" hint="Turns model declined" />
        <StatTile label="Cache hit rate" value={`${tokenSplit.cacheHitRate}%`} color="#0D9488" hint={`${tokenSplit.cachedTokens}M cached tokens`} />
        <StatTile label="TTFT P95" value="1.1s" color="#D97706" hint="Streaming responsiveness" />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ChartCard title="Safety & guardrail events" subtitle="Raw guardrail events — last 7 days (currently absent from spec)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={guardrailEvents} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis type="category" dataKey="type" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} width={120} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [v.toLocaleString(), 'Events']} />
              <Bar dataKey="count" name="Events" radius={[0, 4, 4, 0]} barSize={22}>
                {guardrailEvents.map((e, i) => (
                  <Cell key={e.type} fill={guardrailColors[i % guardrailColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost-grained token telemetry" subtitle="Input / output split + caching — refines metering for accurate cost">
          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Input tokens" value={`${tokenSplit.inputTokens}M`} color="#2563EB" />
            <StatTile label="Output tokens" value={`${tokenSplit.outputTokens}M`} color="#0D9488" />
            <StatTile label="Cached tokens" value={`${tokenSplit.cachedTokens}M`} color="#7C3AED" />
            <StatTile label="Est. cost (30d)" value={`$${tokenSplit.estCostUsd.toLocaleString()}`} color="#D97706" />
          </div>
        </ChartCard>
      </div>

      <ChartCard title="SLO targets & alerting" subtitle="Defined target + error budget per reliability metric">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#F3F4F6] text-[10.5px] font-bold uppercase tracking-[.05em] text-[#9CA3AF]">
              <th className="px-2 py-2">Metric</th>
              <th className="px-2 py-2">Target</th>
              <th className="px-2 py-2">Current</th>
              <th className="px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sloTargets.map((s) => (
              <tr key={s.metric} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#F9FAFB]">
                <td className="px-2 py-2.5 text-[12.5px] font-semibold text-[#1F2937]">{s.metric}</td>
                <td className="px-2 py-2.5 text-[12px] tabular-nums text-[#6B7280]">{s.target}</td>
                <td className="px-2 py-2.5 text-[12px] tabular-nums font-semibold text-[#111827]">{s.current}</td>
                <td className="px-2 py-2.5"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>

      <MetricTable groups={recommendedGroups} />
    </div>
  );
}
