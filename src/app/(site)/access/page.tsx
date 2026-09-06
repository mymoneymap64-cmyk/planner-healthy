import { Download, Eye, ShieldAlert } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS, BONUS_PRODUCTS } from "@/data/products";
import ProductCover from "@/components/ProductCover";

export const metadata = buildMetadata({
  title: "Your Wellness Library | Natural Wellness Library",
  description: "Access your Natural Wellness Library ebooks, planners, and 30-day systems.",
  path: "/access",
  noindex: true,
});

function FileRow({
  label,
  href,
  pages,
}: {
  label: string;
  href: string | null;
  pages: number | null;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-ink-400">{pages ? `${pages} pages` : "Not available yet"}</p>
      </div>
      {href ? (
        <div className="flex items-center gap-1.5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"
          >
            <Eye size={15} />
          </a>
          <a
            href={href}
            download
            aria-label={`Download ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-400 text-ink-950 hover:bg-gold-300"
          >
            <Download size={15} />
          </a>
        </div>
      ) : (
        <span className="rounded-md bg-white/5 px-3 py-1.5 text-xs font-semibold text-ink-500">
          Not yet available
        </span>
      )}
    </div>
  );
}

export default function AccessPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950 section-pad !pb-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow bg-white/10 text-gold-300">Order Confirmed</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
              Your Wellness Library
            </h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-ink-300">
              View or download each ebook, planner, and 30-day system below.
            </p>
          </div>

          <p className="mx-auto mt-14 max-w-6xl text-xs font-bold uppercase tracking-wide text-gold-300">
            Main Ebooks
          </p>
          <div className="mx-auto mt-4 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <div key={p.slug} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <ProductCover product={p} className="aspect-[3/4] w-full" />
                <div className="pt-4">
                  <h2 className="font-display text-base font-bold text-white">{p.title}</h2>
                  <div className="mt-3 space-y-2">
                    <FileRow label="Ebook" href={p.ebookPdf} pages={p.pageCount} />
                    {p.plannerAndSystemIncludedInEbook ? (
                      <p className="rounded-lg border border-dashed border-white/10 px-4 py-3 text-xs text-ink-400">
                        Planner and 30-day system are included inside this ebook.
                      </p>
                    ) : (
                      <>
                        <FileRow label="Planner" href={p.plannerPdf} pages={p.plannerPageCount} />
                        <FileRow label="30-Day System" href={p.systemPdf} pages={p.systemPageCount} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-6xl text-xs font-bold uppercase tracking-wide text-gold-300">
            Free Bonuses
          </p>
          <div className="mx-auto mt-4 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BONUS_PRODUCTS.map((b) => (
              <div key={b.slug} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <ProductCover product={b} className="aspect-[3/4] w-full" />
                <div className="pt-4">
                  <h2 className="font-display text-base font-bold text-white">{b.title}</h2>
                  <div className="mt-3 space-y-2">
                    <FileRow label="Guide" href={b.ebookPdf} pages={b.pageCount} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-xl border border-dashed border-gold-400 bg-gold-50 p-5">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-700">
              <ShieldAlert size={14} className="text-gold-600" /> Developer note — not yet gated
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-600">
              This page is not currently protected behind a real purchase —
              anyone with the link can reach it, the same way the Checkout page
              doesn&apos;t yet process real payments. Before selling, connect a
              real payment processor (e.g. Shopify) so it redirects to this
              page only after a confirmed order. See the Checkout page for the
              corresponding payment note.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
