"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ClipboardList } from "lucide-react";
import { Product } from "@/lib/types";
import { WellnessToolConfig } from "@/data/wellnessTools";
import ProductCover from "@/components/ProductCover";
import ChecklistTool from "@/components/wellness/ChecklistTool";
import NotesEditor from "@/components/wellness/NotesEditor";
import ProgressOverview from "@/components/wellness/ProgressOverview";

type Tab = "overview" | "checklist" | "notes";

export default function ProductWorkspace({
  token,
  product,
  tools,
}: {
  token: string;
  product: Product;
  tools: WellnessToolConfig;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const checklistTotal = tools.checklist?.items.length ?? 0;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    ...(tools.checklist ? [{ key: "checklist" as Tab, label: "Checklist" }] : []),
    ...(tools.notes ? [{ key: "notes" as Tab, label: "Notes" }] : []),
  ];

  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="w-28 shrink-0 sm:w-32">
            <ProductCover product={product} className="aspect-[3/4] w-full" />
          </div>
          <div>
            <span className="eyebrow">{product.categoryLabel}</span>
            <h1 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">{product.title}</h1>
            <p className="mt-1.5 max-w-lg text-sm text-ink-600">{product.subtitle}</p>
          </div>
        </div>

        <p className="mt-8 text-xs font-bold uppercase tracking-wide text-ink-400">Read &amp; Plan</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {product.ebookPdf && (
            <Link
              href={`/reader/${token}/${product.slug}/ebook`}
              className="card card-hover flex items-center gap-3 p-4"
            >
              <BookOpen size={18} className="shrink-0 text-brand-700" />
              <span className="text-sm font-bold text-ink-900">Read Ebook</span>
            </Link>
          )}
          {product.plannerPdf && (
            <Link
              href={`/reader/${token}/${product.slug}/planner`}
              className="card card-hover flex items-center gap-3 p-4"
            >
              <ClipboardList size={18} className="shrink-0 text-brand-700" />
              <span className="text-sm font-bold text-ink-900">Open Planner</span>
            </Link>
          )}
          {!product.isBonus && (
            <Link
              href={`/reader/${token}/${product.slug}/system`}
              className="card card-hover flex items-center gap-3 p-4"
            >
              <Calendar size={18} className="shrink-0 text-brand-700" />
              <span className="text-sm font-bold text-ink-900">30-Day Tracker</span>
            </Link>
          )}
        </div>

        <div className="mt-10 flex gap-1 border-b border-ink-900/10">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                tab === t.key
                  ? "border-b-2 border-brand-700 text-brand-700"
                  : "border-b-2 border-transparent text-ink-500 hover:text-ink-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 max-w-2xl">
          {tab === "overview" && (
            <ProgressOverview token={token} product={product} checklistTotal={checklistTotal} />
          )}
          {tab === "checklist" && tools.checklist && (
            <ChecklistTool
              token={token}
              slug={product.slug}
              title={tools.checklist.title}
              items={tools.checklist.items}
            />
          )}
          {tab === "notes" && tools.notes && (
            <NotesEditor
              token={token}
              slug={product.slug}
              title={tools.notes.title}
              placeholder={tools.notes.placeholder}
            />
          )}
        </div>
      </div>
    </div>
  );
}
