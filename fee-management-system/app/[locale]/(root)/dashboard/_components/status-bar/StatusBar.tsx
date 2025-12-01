import ProgressBar from "@/shared/ui/progress-bar/ProgressBar";

export function StatusBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="w-full flex justify-between mb-1">
        <span className="text-sm font-medium text-secondary">{label}</span>
        <span className="text-sm text-secondary">
          {count} ({percentage}%)
        </span>
      </div>
      <ProgressBar progress={percentage} color={color} />
    </div>
  );
}
