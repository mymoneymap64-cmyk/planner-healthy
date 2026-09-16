import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

export default function DayCard({
  token,
  slug,
  day,
  title,
  completed,
}: {
  token: string;
  slug: string;
  day: number;
  title?: string;
  completed: boolean;
}) {
  return (
    <Link
      href={`/reader/${token}/${slug}/system/day/${day}`}
      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
        completed ? "border-brand-300 bg-brand-50" : "border-ink-900/10 bg-white hover:border-brand-300"
      }`}
    >
      {completed ? (
        <CheckCircle2 size={18} className="text-brand-600" />
      ) : (
        <Circle size={18} className="text-ink-300" />
      )}
      <span className="text-xs font-bold text-ink-900">Day {day}</span>
      {title && <span className="line-clamp-1 text-[10px] text-ink-500">{title}</span>}
    </Link>
  );
}
