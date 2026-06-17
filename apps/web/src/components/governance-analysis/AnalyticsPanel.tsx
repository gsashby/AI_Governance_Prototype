'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import MetricTable from './MetricTable';
import { ChartCard, StatTile } from './primitives';
import { analyticsGroups, adoptionFunnel, reliabilitySnapshot } from '@/lib/governanceAnalysisData';

const tooltipStyle = {
  contentStyle: { backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12 },
  labelStyle: { color: '#111827', fontWeight: 600 },
};

const latencyData = [
  { name: 'P50', seconds: reliabilitySnapshot.latencyP50 },
  { name: 'P95', seconds: reliabilitySnapshot.latencyP95 },
  { name: 'P99', seconds: reliabilitySnapshot.latencyP99 },
];

export default function AnalyticsPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatTile label="Execution success rate" value={`${reliabilitySnapshot.successRate}%`} color="#16A34A" hint={`Failure ${reliabilitySnapshot.failureRate}%`} />
        <StatTile label="Completion rate" value={`${reliabilitySnapshot.completionRate}%`} color="#2563EB" hint="Completed vs. abandoned vs. failed" />
        <StatTile label="Timeout rate" value={`${reliabilitySnapshot.timeoutRate}%`} color="#D97706" hint="Per capability, last 7 days" />
        <StatTile label="Thumbs up rate" value="91.3%" color="#16A34A" hint="Of submitted feedback" />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <ChartCard title="Adoption" subtitle="Activated · weekly active · monthly active users">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={adoptionFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="stage" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [v.toLocaleString(), 'Users']} />
              <Bar dataKey="value" name="Users" radius={[4, 4, 0, 0]} barSize={64}>
                {['#2563EB', '#7C3AED', '#0D9488'].map((c, i) => (
                  <Cell key={i} fill={c} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="End-to-end latency" subtitle="Seconds — P50 / P95 / P99">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} unit="s" />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`${v}s`, 'Latency']} />
              <Bar dataKey="seconds" name="Latency (s)" radius={[4, 4, 0, 0]} barSize={64}>
                {latencyData.map((d) => (
                  <Cell key={d.name} fill={d.seconds <= 2 ? '#16A34A' : d.seconds <= 5 ? '#D97706' : '#DC2626'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <MetricTable groups={analyticsGroups} />
    </div>
  );
}
