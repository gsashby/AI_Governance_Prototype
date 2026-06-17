'use client';
import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import MeteringPanel from '@/components/governance-analysis/MeteringPanel';
import TelemetryPanel from '@/components/governance-analysis/TelemetryPanel';
import AnalyticsPanel from '@/components/governance-analysis/AnalyticsPanel';
import RecommendedAdditionsPanel from '@/components/governance-analysis/RecommendedAdditionsPanel';
import {
  meteringGroups, telemetryGroups, analyticsGroups, recommendedGroups,
  type MetricGroup,
} from '@/lib/governanceAnalysisData';

type TabKey = 'metering' | 'telemetry' | 'analytics' | 'recommended';

const TABS: { key: TabKey; label: string; groups: MetricGroup[] }[] = [
  { key: 'metering', label: 'Metering', groups: meteringGroups },
  { key: 'telemetry', label: 'Telemetry — Raw Events', groups: telemetryGroups },
  { key: 'analytics', label: 'Product Analytics', groups: analyticsGroups },
  { key: 'recommended', label: 'Recommended Additions (GA-Blocking)', groups: recommendedGroups },
];

export default function GovernanceAnalysisDashboard() {
  const [tab, setTab] = useState<TabKey>('metering');

  function handleExport() {
    const esc = (v: string | number) => {
      const s = String(v ?? '');
      return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const row = (...cols: (string | number)[]) => cols.map(esc).join(',');
    const today = new Date().toISOString().slice(0, 10);

    const sections: { title: string; groups: MetricGroup[] }[] = [
      { title: 'METERING', groups: meteringGroups },
      { title: 'TELEMETRY — RAW EVENTS', groups: telemetryGroups },
      { title: 'PRODUCT ANALYTICS', groups: analyticsGroups },
      { title: 'RECOMMENDED ADDITIONS (GA-BLOCKING)', groups: recommendedGroups },
    ];

    const lines: string[] = [row('Category', 'Group', 'Metric', 'Definition', 'Notes', 'Audience', 'GA-blocking')];
    for (const section of sections) {
      for (const group of section.groups) {
        for (const r of group.rows) {
          lines.push(row(
            section.title, group.title, r.metric, r.definition ?? '', r.notes ?? '',
            r.audience ?? '', r.gaBlocking ? 'yes' : '',
          ));
        }
      }
    }

    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-governance-analysis-${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Governance Analysis Dashboard"
        description="Metering · Telemetry · Product Analytics · GA-blocking additions"
        actions={
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-[6px] rounded-[5px] border border-[#D1D5DB] bg-white font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-all whitespace-nowrap"
            style={{ padding: '4px 10px', fontSize: 12 }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export Catalog
          </button>
        }
      />

      {/* Tab nav */}
      <div className="flex flex-wrap gap-1 border-b border-[#E5E7EB]">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="relative whitespace-nowrap font-semibold transition-colors"
              style={{
                padding: '8px 14px',
                fontSize: 12.5,
                color: active ? '#1D4ED8' : '#6B7280',
                borderBottom: `2px solid ${active ? '#2563EB' : 'transparent'}`,
                marginBottom: -1,
              }}
            >
              {t.label}
              {t.key === 'recommended' && (
                <span className="ml-1.5 inline-flex items-center rounded-full bg-[#FEE2E2] px-1.5 py-0.5 text-[10px] font-bold text-[#DC2626]">
                  GA
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === 'metering' && <MeteringPanel />}
      {tab === 'telemetry' && <TelemetryPanel />}
      {tab === 'analytics' && <AnalyticsPanel />}
      {tab === 'recommended' && <RecommendedAdditionsPanel />}
    </div>
  );
}
