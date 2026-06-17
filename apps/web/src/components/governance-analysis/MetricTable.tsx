import type { Audience, MetricGroup } from '@/lib/governanceAnalysisData';

const audienceStyles: Record<Audience, { label: string; className: string }> = {
  internal: { label: 'Internal', className: 'bg-[#EEF2FF] text-[#4338CA]' },
  customer: { label: 'Customer-facing', className: 'bg-[#ECFEFF] text-[#0E7490]' },
  both: { label: 'Internal + Customer', className: 'bg-[#F0FDF4] text-[#15803D]' },
};

function AudienceBadge({ audience }: { audience: Audience }) {
  const s = audienceStyles[audience];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold whitespace-nowrap ${s.className}`}>
      {s.label}
    </span>
  );
}

function GaBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-[#FEE2E2] px-2 py-0.5 text-[10.5px] font-semibold text-[#DC2626] whitespace-nowrap">
      GA-blocking
    </span>
  );
}

export default function MetricTable({ groups }: { groups: MetricGroup[] }) {
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.title} className="rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.06)] overflow-hidden">
          <div className="border-b border-[#F3F4F6] bg-[#F9FAFB] px-4 py-2.5">
            <h3 className="text-[13px] font-bold text-[#111827]">{group.title}</h3>
          </div>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F3F4F6] text-[10.5px] font-bold uppercase tracking-[.05em] text-[#9CA3AF]">
                <th className="px-4 py-2 w-[30%]">Metric</th>
                <th className="px-4 py-2">Definition</th>
                <th className="px-4 py-2 w-[180px]">Tags</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.metric} className="border-b border-[#F3F4F6] last:border-0 align-top hover:bg-[#F9FAFB]">
                  <td className="px-4 py-2.5 text-[12.5px] font-semibold text-[#1F2937]">{row.metric}</td>
                  <td className="px-4 py-2.5 text-[12px] leading-relaxed text-[#6B7280]">
                    {row.definition ?? <span className="text-[#D1D5DB]">—</span>}
                    {row.notes && (
                      <div className="mt-1 text-[11px] italic text-[#9CA3AF]">{row.notes}</div>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {row.audience && <AudienceBadge audience={row.audience} />}
                      {row.gaBlocking && <GaBadge />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
