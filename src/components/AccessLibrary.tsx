import { Download, Eye } from "lucide-react";
import { Product } from "@/lib/types";
import ProductCover from "@/components/ProductCover";

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
    <div className="flex items-center justify-between gap-3 rounded-lg border border-ink-900/8 bg-cream px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-ink-950">{label}</p>
        <p className="text-xs text-ink-500">{pages ? `${pages} pages` : "Not available yet"}</p>
      </div>
      {href ? (
        <div className="flex items-center gap-1.5">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
          >
            <Eye size={15} />
          </a>
          <a
            href={`${href}?download=1`}
            download
            aria-label={`Download ${label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-400 text-ink-950 hover:bg-gold-300"
          >
            <Download size={15} />
          </a>
        </div>
      ) : (
        <span className="rounded-md bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-500">
          Not yet available
        </span>
      )}
    </div>
  );
}

/** Builds a protected streaming URL — never the raw public asset path. */
function fileUrl(token: string, slug: string, asset: "ebook" | "planner" | "system"): string {
  return `/api/files/${token}/${slug}/${asset}`;
}

function ProductFiles({ token, product }: { token: string; product: Product }) {
  // A single-file product (a free bonus, or a standalone product like the
  // cookbook, which has no planner/system) gets one simple row instead of
  // the Ebook/Planner/System layout built for the wellness core guides.
  const hasPlannerOrSystem =
    Boolean(product.plannerPdf) || Boolean(product.systemPdf) || Boolean(product.plannerAndSystemIncludedInEbook);
  const singleFileLabel = product.category === "baking" ? "Cookbook" : "Guide";

  return (
    <div className="overflow-hidden rounded-xl border border-ink-900/10 bg-white p-4 shadow-soft">
      <ProductCover product={product} className="aspect-[3/4] w-full" />
      <div className="pt-4">
        <h2 className="font-display text-base font-bold text-ink-950">{product.title}</h2>
        <div className="mt-3 space-y-2">
          {!hasPlannerOrSystem ? (
            <FileRow
              label={singleFileLabel}
              href={product.ebookPdf ? fileUrl(token, product.slug, "ebook") : null}
              pages={product.pageCount}
            />
          ) : (
            <>
              <FileRow
                label="Ebook"
                href={product.ebookPdf ? fileUrl(token, product.slug, "ebook") : null}
                pages={product.pageCount}
              />
              {product.plannerAndSystemIncludedInEbook ? (
                <p className="rounded-lg border border-dashed border-ink-900/15 px-4 py-3 text-xs text-ink-500">
                  Planner and 30-day system are included inside this ebook.
                </p>
              ) : (
                <>
                  <FileRow
                    label="Planner"
                    href={product.plannerPdf ? fileUrl(token, product.slug, "planner") : null}
                    pages={product.plannerPageCount}
                  />
                  <FileRow
                    label="30-Day System"
                    href={product.systemPdf ? fileUrl(token, product.slug, "system") : null}
                    pages={product.systemPageCount}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders only the products a given order actually paid for — used on the
 * token-gated /access/[token] page. `bonusProducts` is only passed for the
 * bundle purchase; single-product orders never include the free bonuses.
 */
export default function AccessLibrary({
  token,
  mainProducts,
  bonusProducts,
}: {
  token: string;
  mainProducts: Product[];
  bonusProducts?: Product[];
}) {
  return (
    <>
      <p className="mx-auto mt-14 max-w-6xl text-xs font-bold uppercase tracking-wide text-gold-700">
        {mainProducts.length > 1 ? "Main Ebooks" : "Your Guide"}
      </p>
      <div className="mx-auto mt-4 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mainProducts.map((p) => (
          <ProductFiles key={p.slug} token={token} product={p} />
        ))}
      </div>

      {bonusProducts && bonusProducts.length > 0 && (
        <>
          <p className="mx-auto mt-14 max-w-6xl text-xs font-bold uppercase tracking-wide text-gold-700">
            Free Bonuses
          </p>
          <div className="mx-auto mt-4 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bonusProducts.map((b) => (
              <ProductFiles key={b.slug} token={token} product={b} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
