import { Loader2 } from "lucide-react";

export default function DashboardLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="section-pad flex flex-col items-center justify-center gap-3 text-center text-sm text-ink-400">
      <Loader2 size={20} className="animate-spin text-brand-500" />
      {label}
    </div>
  );
}
