"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { ChecklistItemConfig } from "@/data/wellnessTools";

export default function ChecklistTool({
  token,
  slug,
  title,
  items,
}: {
  token: string;
  slug: string;
  title: string;
  items: ChecklistItemConfig[];
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/wellness/${token}/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setChecked(data.checklist ?? {});
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token, slug]);

  function toggle(itemId: string) {
    setChecked((current) => ({ ...current, [itemId]: !current[itemId] }));
    fetch(`/api/wellness/${token}/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "toggleChecklistItem", itemId }),
    }).catch(() => undefined);
  }

  const completed = items.filter((i) => checked[i.id]).length;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink-900">{title}</h2>
        <span className="text-xs font-semibold text-ink-500">
          {completed} / {items.length}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const isChecked = Boolean(checked[item.id]);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              disabled={!loaded}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:opacity-60 ${
                isChecked
                  ? "border-brand-300 bg-brand-50 text-ink-900"
                  : "border-ink-900/10 bg-white text-ink-700 hover:border-brand-300"
              }`}
            >
              {isChecked ? (
                <CheckSquare size={18} className="shrink-0 text-brand-600" />
              ) : (
                <Square size={18} className="shrink-0 text-ink-300" />
              )}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
