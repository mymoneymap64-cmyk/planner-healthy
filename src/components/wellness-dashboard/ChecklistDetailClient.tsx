"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, RotateCcw, Trash2 } from "lucide-react";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import FavoriteButton from "@/components/wellness-dashboard/FavoriteButton";
import ProgressBar from "@/components/reader/ProgressBar";

export default function ChecklistDetailClient({ token, checklistId }: { token: string; checklistId: string }) {
  const { state, loaded, dispatch } = useWellnessDashboard(token);
  const router = useRouter();

  if (!loaded || !state) {
    return <div className="section-pad text-center text-sm text-ink-400">Loading...</div>;
  }

  const checklist = state.checklists.find((c) => c.id === checklistId);
  if (!checklist) {
    return (
      <div className="section-pad text-center">
        <p className="text-sm text-ink-500">This checklist doesn&apos;t exist or was deleted.</p>
        <Link href={`/wellness/${token}/checklists`} className="mt-3 inline-block text-sm font-bold text-brand-700">
          Back to Checklists
        </Link>
      </div>
    );
  }

  const completed = checklist.items.filter((i) => i.done).length;
  const percent = checklist.items.length > 0 ? (completed / checklist.items.length) * 100 : 0;
  const isFavorite = state.favorites.checklists.includes(checklist.id);

  async function handleDelete() {
    if (!window.confirm(`Delete "${checklist!.title}"? This can't be undone.`)) return;
    const result = await dispatch({ type: "deleteChecklist", checklistId });
    if (result.ok) router.push(`/wellness/${token}/checklists`);
  }

  return (
    <div className="section-pad !pt-8">
      <div className="container-page max-w-xl">
        <Link
          href={`/wellness/${token}/checklists`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} /> Checklists
        </Link>

        <div className="card mt-6 p-6">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-2xl font-bold text-ink-900">{checklist.title}</h1>
            <FavoriteButton
              active={isFavorite}
              onToggle={() => dispatch({ type: "toggleFavorite", kind: "checklists", id: checklist!.id })}
            />
          </div>
          <p className="mt-1 text-sm text-ink-500">
            {completed} of {checklist.items.length} completed
          </p>
          <div className="mt-3">
            <ProgressBar value={percent} />
          </div>

          <div className="mt-6 space-y-2">
            {checklist.items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => dispatch({ type: "toggleChecklistItem", checklistId, itemId: item.id })}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                  item.done ? "border-brand-300 bg-brand-50 text-ink-900" : "border-ink-900/10 bg-white text-ink-700"
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                    item.done ? "border-brand-600 bg-brand-600 text-white" : "border-ink-300 text-transparent"
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dispatch({ type: "resetChecklist", checklistId })}
              className="btn-secondary flex-1 justify-center py-2.5 text-sm"
            >
              <RotateCcw size={15} /> Reset Checklist
            </button>
            {checklist.custom && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={15} /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
