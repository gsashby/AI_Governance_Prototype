'use client';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell, ReferenceLine,
} from 'recharts';
import MetricTable from './MetricTable';
import { ChartCard, StatTile } from './primitives';
import {
  meteringGroups, tokenConsumptionTrend, tokensByFeature, tenantUtilization,
} from '@/lib/governanceAnalysisData';

const tooltipStyle = {
  contentStyle: { backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, fontSize: 12 },
  labelStyle: { color: '#111827', fontWeight: 600 },
};

export default function MeteringPanel() {
  return (
    <div className="space-y-5">
      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatTile label="Tokens (30d)" value="196.6M" hint="Input + output across all tenants" />
        <StatTile label="Est. cost (30d)" value="$4,820" color="#0D9488" hint="Internal only — rate table" />
        <StatTile label="Tenants over 80%" value="2" color="#D97706" hint="Utilization alert threshold" />
        <StatTile label="Throttle events (7d)" value="38" color="#DC2626" hint="RPM + token cap enforcement" />
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <ChartCard title="Token consumption trend" subtitle="Input vs. output tokens (millions) — last 6 weeks">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={tokenConsumptionTrend}>
              <defs>
                <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="period" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} unit="M" />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="input" name="Input tokens" stroke="#2563EB" strokeWidth={2} fill="url(#gIn)" />
              <Area type="monotone" dataKey="output" name="Output tokens" stroke="#0D9488" strokeWidth={2} fill="url(#gOut)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumption by feature" subtitle="Tokens (M) — last 30 days">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tokensByFeature} layout="vertical" margin={{ left: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis type="category" dataKey="feature" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} width={90} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="tokens" name="Tokens (M)" fill="#7C3AED" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Token limit utilization by tenant" subtitle="Current consumption as % of configured limit — internal alert fires at 80%">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={tenantUtilization}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="tenant" stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} />
            <YAxis domain={[0, 100]} stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#6B7280' }} unit="%" />
            <Tooltip {...tooltipStyle} />
            <ReferenceLine y={80} stroke="#DC2626" strokeDasharray="4 4" label={{ value: '80% alert', fontSize: 10, fill: '#DC2626', position: 'right' }} />
            <Bar dataKey="utilization" name="Utilization %" radius={[4, 4, 0, 0]} barSize={48}>
              {tenantUtilization.map((t) => (
                <Cell key={t.tenant} fill={t.utilization >= 80 ? '#DC2626' : t.utilization >= 60 ? '#D97706' : '#16A34A'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <MetricTable groups={meteringGroups} />
    </div>
  );
}
