"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/lib/types";
import PdfViewer from "@/components/reader/PdfViewer";

export default function EbookReader({ token, product }: { token: string; product: Product }) {
  const [initialPage, setInitialPage] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const lastSavedPage = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reader/${token}/${product.slug}/progress`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setInitialPage(data.progress?.ebookPage ?? 1);
        setBookmarks(data.progress?.ebookBookmarks ?? []);
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
      body: JSON.stringify({ type: "ebookPage", page }),
    }).catch(() => undefined);
  }

  function handleToggleBookmark(page: number) {
    setBookmarks((current) =>
      current.includes(page) ? current.filter((p) => p !== page) : [...current, page].sort((a, b) => a - b)
    );
    fetch(`/api/reader/${token}/${product.slug}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "bookmark", page }),
    }).catch(() => undefined);
  }

  if (initialPage === null) {
    return <p className="section-pad text-center text-sm text-ink-400">Loading your ebook…</p>;
  }

  return (
    <div>
      <div className="container-page flex flex-wrap items-center justify-between gap-2 py-4">
        <Link
          href={`/reader/${token}/${product.slug}`}
          className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft size={15} className="shrink-0" /> <span className="truncate">{product.title}</span>
        </Link>
        {bookmarks.length > 0 && (
          <span className="shrink-0 text-xs font-medium text-ink-500">
            {bookmarks.length} bookmark{bookmarks.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <PdfViewer
        src={`/api/files/${token}/${product.slug}/ebook`}
        initialPage={initialPage}
        onPageChange={handlePageChange}
        bookmarkedPages={bookmarks}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
