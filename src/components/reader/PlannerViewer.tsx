"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/lib/types";
import PdfViewer from "@/components/reader/PdfViewer";

export default function PlannerViewer({ token, product }: { token: string; product: Product }) {
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const lastSavedPage = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reader/${token}/${product.slug}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setInitialPage(data.progress?.plannerPage ?? 1);
      })
      .catch(() => {
        if (!cancelled) setInitialPage(1);
      });
    return () => {
      cancelled = true;
    };
  }, [token, product.slug]);

  function handlePageChange(page: number) {
    if (lastSavedPage.current === page) return;
    lastSavedPage.current = page;
    fetch(`/api/reader/${token}/${product.slug}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "plannerPage", page }),
    }).catch(() => undefined);
  }

  if (initialPage === null) {
    return <p className="section-pad text-center text-sm text-ink-400">Loading your planner…</p>;
  }

  return (
    <div>
      <div className="container-page py-4">
        <Link
          href={`/reader/${token}/${product.slug}`}
          className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} className="shrink-0" /> <span className="truncate">{product.title}</span>
        </Link>
      </div>

      <PdfViewer
        src={`/api/files/${token}/${product.slug}/planner`}
        initialPage={initialPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
