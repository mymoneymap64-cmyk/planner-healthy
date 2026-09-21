"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Product } from "@/lib/types";
import { THIRTY_DAY_SYSTEMS } from "@/data/readerContent";

export default function DayDetail({ token, product, day }: { token: string; product: Product; day: number }) {
  const structuredDay = THIRTY_DAY_SYSTEMS[product.slug]?.days.find((d) => d.day === day);
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reader/${token}/${product.slug}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setCompleted((data.progress?.completedDays ?? []).includes(day));
        setNote(data.progress?.dayNotes?.[day] ?? "");
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token, product.slug, day]);

  function toggleComplete() {
    setCompleted((c) => !c);
    fetch(`/api/reader/${token}/${product.slug}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "completeDay", day }),
    }).catch(() => undefined);
  }

  function saveNote(value: string) {
    setNote(value);
    setSaving(true);
    fetch(`/api/reader/${token}/${product.slug}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "dayNote", day, note: value }),
    })
      .catch(() => undefined)
      .finally(() => setSaving(false));
  }

  return (
    <div className="section-pad">
      <div className="container-page max-w-2xl">
        <Link
          href={`/reader/${token}/${product.slug}/system`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} /> 30-Day System
        </Link>

        <div className="card mt-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Day {day} of 30</span>
            {!structuredDay && (
              <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Tracker Only
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            {structuredDay?.title ?? `Day ${day}`}
          </h1>

          {structuredDay ? (
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-700">
              <p>
                <span className="font-bold text-ink-900">Objective: </span>
                {structuredDay.objective}
              </p>
              <p>{structuredDay.instructions}</p>
              {structuredDay.checklist.length > 0 && (
                <ul className="space-y-1.5">
                  {structuredDay.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Circle size={6} className="mt-2 shrink-0 fill-ink-400 text-ink-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="mt-5 rounded-lg border border-dashed border-ink-900/15 bg-cream px-4 py-3 text-sm text-ink-600">
              Interactive day-by-day content isn&apos;t available yet for this guide — this page is a
              personal tracker only. For the real 30-day system, follow along in your{" "}
              {product.plannerAndSystemIncludedInEbook ? (
                <Link
                  href={`/reader/${token}/${product.slug}/ebook`}
                  className="font-semibold text-brand-700 underline"
                >
                  ebook
                </Link>
              ) : (
                <Link
                  href={`/api/files/${token}/${product.slug}/system?download=1`}
                  target="_blank"
                  className="font-semibold text-brand-700 underline"
                >
                  System PDF
                </Link>
              )}
              . Use the checklist and notes below to track your own progress — interactive
              day-by-day content will be added here once it&apos;s written.
            </p>
          )}

          <label htmlFor="day-note" className="mt-6 block text-xs font-bold uppercase tracking-wide text-ink-500">
            Your notes
          </label>
          <textarea
            id="day-note"
            value={note}
            onChange={(e) => saveNote(e.target.value)}
            rows={4}
            placeholder="Anything you want to remember about today..."
            className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white p-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
          />
          {saving && <p className="mt-1 text-xs text-ink-400">Saving…</p>}

          <button
            onClick={toggleComplete}
            disabled={!loaded}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-colors disabled:opacity-50 ${
              completed ? "bg-brand-600 text-white" : "bg-ink-950 text-white hover:bg-brand-800"
            }`}
          >
            <CheckCircle2 size={16} />
            {completed ? "Day Complete" : "Mark Day Complete"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-medium">
          {day > 1 ? (
            <Link
              href={`/reader/${token}/${product.slug}/system/day/${day - 1}`}
              className="inline-flex items-center gap-1 text-brand-700 hover:underline"
            >
              <ArrowLeft size={14} /> Day {day - 1}
            </Link>
          ) : (
            <span />
          )}
          {day < 30 ? (
            <Link
              href={`/reader/${token}/${product.slug}/system/day/${day + 1}`}
              className="inline-flex items-center gap-1 text-brand-700 hover:underline"
            >
              Day {day + 1} <ArrowRight size={14} />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
