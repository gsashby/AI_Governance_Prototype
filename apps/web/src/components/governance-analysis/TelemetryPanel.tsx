'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import MetricTable from './MetricTable';
import { ChartCard, StatTile } from './primitives';
import { telemetryGroups, traceabilityIds, eventVolume } from '@/lib/governanceAnalysisData';

const tooltipStyle = {
  contentStyle: { backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12 },
  labelStyle: { color: '#111827', fontWeight: 600 },
};

const barColors = ['#2563EB', '#7C3AED', '#0D9488', '#D97706', '#DB2777', '#DC2626'];

export default function TelemetryPanel() {
  const totalEvents = eventVolume.reduce((s, e) => s + e.count, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatTile label="Raw events (7d)" value={totalEvents.toLocaleString()} hint="Across all event types" />
        <StatTile label="Event types instrumented" value="13" color="#2563EB" hint="Runtime + conversational UI" />
        <StatTile label="Required trace IDs" value={String(traceabilityIds.length)} color="#7C3AED" hint="On every emitted event" />
        <StatTile label="Step-level capture" value="Configurable" color="#0D9488" hint="Input/output off by default" />
      </div>

      <ChartCard title="Raw-event volume by type" subtitle="Emitted from the agent hosting service — last 7 days">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={eventVolume}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="type" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
            <YAxis stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip {...tooltipStyle} formatter={(v: number) => [v.toLocaleString(), 'Events']} />
            <Bar dataKey="count" name="Events" radius={[4, 4, 0, 0]} barSize={52}>
              {eventVolume.map((e, i) => (
                <Cell key={e.type} fill={barColors[i % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Traceability — required IDs on every event" subtitle="Every raw event carries the full correlation key set for end-to-end tracing">
        <div className="flex flex-wrap gap-2">
          {traceabilityIds.map((id) => (
            <code
              key={id}
              className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2.5 py-1 text-[12px] font-semibold text-[#4338CA]"
            >
              {id}
            </code>
          ))}
        </div>
      </ChartCard>

      <MetricTable groups={telemetryGroups} />
    </div>
  );
}
