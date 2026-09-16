"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Product } from "@/lib/types";
import { getReaderCapabilities, THIRTY_DAY_SYSTEMS } from "@/data/readerContent";
import DayCard from "@/components/reader/DayCard";
import ProgressBar from "@/components/reader/ProgressBar";

export default function ThirtyDaySystem({ token, product }: { token: string; product: Product }) {
  const capabilities = getReaderCapabilities(product);
  const structured = THIRTY_DAY_SYSTEMS[product.slug];
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reader/${token}/${product.slug}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setCompletedDays(data.progress?.completedDays ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token, product.slug]);

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const percent = loaded ? (completedDays.length / 30) * 100 : 0;

  return (
    <div className="section-pad">
      <div className="container-page">
        <Link
          href={`/reader/${token}/${product.slug}`}
          className="inline-flex max-w-full items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} className="shrink-0" /> <span className="truncate">{product.title}</span>
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">30-Day System</h1>
          <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            30-Day Tracker
          </span>
        </div>
        <p className="mt-2 max-w-xl text-sm text-ink-500">
          This is a personal progress tracker — it does not contain day-by-day educational content
          unless stated below.
        </p>

        {capabilities.systemIncludedInEbook && (
          <p className="mt-3 max-w-xl rounded-lg border border-dashed border-ink-900/15 bg-cream px-4 py-3 text-sm text-ink-600">
            Interactive day-by-day content isn&apos;t available yet for this guide. The real 30-day
            system is included inside your{" "}
            <Link href={`/reader/${token}/${product.slug}/ebook`} className="font-semibold text-brand-700 underline">
              ebook
            </Link>{" "}
            — you can still track your own daily progress below, and interactive day-by-day content
            will be added here once it&apos;s written.
          </p>
        )}

        {!capabilities.systemIncludedInEbook &&
          capabilities.systemPdfAvailable &&
          !capabilities.structuredSystemAvailable && (
            <p className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-ink-900/15 bg-cream px-4 py-3 text-sm text-ink-600">
              <FileText size={16} className="shrink-0 text-brand-700" />
              <span>
                Interactive day-by-day content isn&apos;t available yet — the real 30-day system is{" "}
                <Link
                  href={`/api/files/${token}/${product.slug}/system?download=1`}
                  target="_blank"
                  className="font-semibold text-brand-700 underline"
                >
                  available in PDF
                </Link>
                . You can still track your own daily progress below, and interactive day-by-day
                content will be added here once it&apos;s written.
              </span>
            </p>
          )}

        <div className="mt-6 max-w-md">
          <ProgressBar value={percent} label={`Day ${completedDays.length} of 30 completed`} />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-6">
          {days.map((day) => (
            <DayCard
              key={day}
              token={token}
              slug={product.slug}
              day={day}
              title={structured?.days.find((d) => d.day === day)?.title}
              completed={completedDays.includes(day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
