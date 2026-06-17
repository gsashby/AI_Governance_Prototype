import { cn } from '@/lib/utils';

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.06)]', className)}>
      <div style={{ marginBottom: 12 }}>
        <div className="text-[13.5px] font-bold text-[#111827]">{title}</div>
        {subtitle && <div className="text-[11.5px] text-[#9CA3AF]">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  color = '#111827',
  hint,
}: {
  label: string;
  value: string;
  color?: string;
  hint?: string;
}) {
  return (
    <div
      className="rounded-lg border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,.06)]"
      style={{ padding: '12px 16px' }}
    >
      <div className="text-[10.5px] font-semibold uppercase tracking-[.05em] text-[#9CA3AF] mb-1">{label}</div>
      <div className="text-[22px] font-bold tabular-nums leading-none" style={{ color }}>{value}</div>
      {hint && <div className="mt-1 text-[11px] text-[#9CA3AF]">{hint}</div>}
    </div>
  );
}
