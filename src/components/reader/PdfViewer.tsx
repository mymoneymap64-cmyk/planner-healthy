"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Moon, Star, Sun, ZoomIn, ZoomOut } from "lucide-react";

const iconBtn =
  "flex h-8 w-8 items-center justify-center rounded-md text-ink-600 hover:bg-ink-900/5 disabled:opacity-30 disabled:cursor-not-allowed";

type PdfViewerProps = {
  /** URL of the protected file route — never a raw public asset path. */
  src: string;
  initialPage?: number;
  onPageChange?: (page: number, numPages: number) => void;
  bookmarkedPages?: number[];
  onToggleBookmark?: (page: number) => void;
};

/**
 * Renders a real PDF page-by-page (no chapter metadata exists for these
 * files, so navigation and progress are always expressed as real page
 * numbers — "Page X of Y" — never as invented "chapters"). Dark mode here
 * inverts the rendered canvas for reading comfort; it does not reflow the
 * PDF's fixed text, since these files have no separate text content to
 * re-layout.
 */
export default function PdfViewer({
  src,
  initialPage = 1,
  onPageChange,
  bookmarkedPages,
  onToggleBookmark,
}: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // pdf.js types are only available once the module is loaded client-side.
  const pdfDocRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<{ cancel: () => void; promise: Promise<void> } | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [scale, setScale] = useState(1.15);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const pdfjsLib = await import("pdfjs-dist");
        // Served as a plain static file (see scripts/copy-pdf-worker.mjs) so
        // Next's build never runs Terser over the worker's own ESM syntax.
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const doc = await pdfjsLib.getDocument(src).promise;
        if (cancelled) return;
        pdfDocRef.current = doc;
        setNumPages(doc.numPages);
        setPage((p) => Math.min(Math.max(p, 1), doc.numPages));
      } catch (err) {
        console.error("Failed to load PDF:", err);
        if (!cancelled) setError("This file couldn't be loaded. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      pdfDocRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const renderPage = useCallback(
    async (pageNumber: number) => {
      const doc = pdfDocRef.current;
      const canvas = canvasRef.current;
      if (!doc || !canvas) return;

      renderTaskRef.current?.cancel();

      const pdfPage = await doc.getPage(pageNumber);
      const viewport = pdfPage.getViewport({ scale });
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const task = pdfPage.render({ canvasContext: context, viewport });
      renderTaskRef.current = task;
      try {
        await task.promise;
      } catch (err) {
        if ((err as { name?: string })?.name !== "RenderingCancelledException") {
          console.error("Failed to render PDF page:", err);
        }
      }
    },
    [scale]
  );

  useEffect(() => {
    if (!loading && numPages > 0) {
      renderPage(page);
      onPageChange?.(page, numPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, scale, loading, numPages]);

  function goTo(target: number) {
    setPage((current) => {
      const next = Math.min(Math.max(target, 1), numPages || current);
      return next;
    });
  }

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }

  const isBookmarked = bookmarkedPages?.includes(page) ?? false;

  return (
    <div ref={containerRef} className={dark ? "bg-ink-950" : "bg-ink-100"}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-900/10 bg-white px-3 py-2">
        <div className="flex items-center gap-1">
          <button onClick={() => goTo(page - 1)} disabled={page <= 1} className={iconBtn} aria-label="Previous page">
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-[92px] text-center text-xs font-semibold text-ink-600">
            Page {page} of {numPages || "…"}
          </span>
          <button
            onClick={() => goTo(page + 1)}
            disabled={numPages === 0 || page >= numPages}
            className={iconBtn}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(page)}
              className={iconBtn}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
            >
              <Star size={16} className={isBookmarked ? "fill-gold-400 text-gold-500" : ""} />
            </button>
          )}
          <button onClick={() => setScale((s) => Math.max(0.5, s - 0.15))} className={iconBtn} aria-label="Zoom out">
            <ZoomOut size={16} />
          </button>
          <button onClick={() => setScale((s) => Math.min(2.5, s + 0.15))} className={iconBtn} aria-label="Zoom in">
            <ZoomIn size={16} />
          </button>
          <button onClick={() => setDark((d) => !d)} className={iconBtn} aria-label="Toggle reading mode">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={toggleFullscreen} className={iconBtn} aria-label="Toggle fullscreen">
            {typeof document !== "undefined" && document.fullscreenElement ? (
              <Minimize2 size={16} />
            ) : (
              <Maximize2 size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="flex min-h-[60vh] items-start justify-center overflow-auto p-4 sm:p-8">
        {error && <p className="mt-10 text-center text-sm text-red-600">{error}</p>}
        {loading && !error && <p className="mt-10 text-center text-sm text-ink-400">Loading…</p>}
        <canvas
          ref={canvasRef}
          className={`max-w-full rounded-lg shadow-lift ${dark ? "invert hue-rotate-180" : ""} ${
            loading || error ? "hidden" : ""
          }`}
        />
      </div>
    </div>
  );
}
