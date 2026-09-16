"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import ProgressBar from "@/components/reader/ProgressBar";

type Summary = {
  ebookPercent: number | null;
  plannerPage: number | null;
  systemDaysCompleted: number | null;
  checklistCompleted: number;
  notesCount: number;
};

export default function ProgressOverview({
  token,
  product,
  checklistTotal,
}: {
  token: string;
  product: Product;
  checklistTotal: number;
}) {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [readerRes, wellnessRes] = await Promise.all([
        fetch(`/api/reader/${token}/${product.slug}/progress`).then((r) => r.json()),
        fetch(`/api/wellness/${token}/${product.slug}`).then((r) => r.json()),
      ]);

      if (cancelled) return;

      const progress = readerRes.progress;
      const checklist = wellnessRes.checklist ?? {};
      const notes = wellnessRes.notes ?? [];

      setSummary({
        ebookPercent:
          product.ebookPdf && product.pageCount
            ? Math.min(100, ((progress?.ebookPage ?? 1) / product.pageCount) * 100)
            : null,
        plannerPage: product.plannerPdf ? (progress?.plannerPage ?? 1) : null,
        systemDaysCompleted: product.isBonus ? null : (progress?.completedDays?.length ?? 0),
        checklistCompleted: Object.values(checklist).filter(Boolean).length,
        notesCount: notes.length,
      });
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [token, product]);

  if (!summary) {
    return <p className="text-sm text-ink-400">Loading your progress…</p>;
  }

  const checklistPercent = checklistTotal > 0 ? (summary.checklistCompleted / checklistTotal) * 100 : 0;

  return (
    <div className="card space-y-5 p-5 sm:p-6">
      <h2 className="font-display text-lg font-bold text-ink-900">Progress Overview</h2>

      {summary.ebookPercent !== null && (
        <div>
          <ProgressBar value={summary.ebookPercent} label="Ebook" />
        </div>
      )}

      {checklistTotal > 0 && (
        <div>
          <ProgressBar
            value={checklistPercent}
            label={`Checklist (${summary.checklistCompleted}/${checklistTotal})`}
          />
        </div>
      )}

      {summary.systemDaysCompleted !== null && (
        <div>
          <ProgressBar value={(summary.systemDaysCompleted / 30) * 100} label={`30-Day Tracker (${summary.systemDaysCompleted}/30)`} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 border-t border-ink-900/[0.07] pt-4 text-sm">
        {summary.plannerPage !== null && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Planner</p>
            <p className="mt-0.5 font-semibold text-ink-800">Page {summary.plannerPage}</p>
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Notes Saved</p>
          <p className="mt-0.5 font-semibold text-ink-800">{summary.notesCount}</p>
        </div>
      </div>
    </div>
  );
}
