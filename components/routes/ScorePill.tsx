export function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink/80">
      {label}
      <span className="text-petrol">{value}/100</span>
    </span>
  );
}
