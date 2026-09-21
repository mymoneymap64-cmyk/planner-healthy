/**
 * The "Launch Price / Guide Value" pricing box — shared by ProductCard and
 * IndividualCheckoutClient, which previously duplicated this exact markup.
 * Only renders for a real, positive price; callers handle the
 * null/free-price cases themselves (those differ per context).
 */
export default function PriceBadge({
  price,
  compareAtPrice,
  showOfferHeader = true,
}: {
  price: number;
  compareAtPrice?: number | null;
  showOfferHeader?: boolean;
}) {
  const hasCompareAt = compareAtPrice != null;
  const savePercent =
    hasCompareAt && compareAtPrice! > price ? Math.round(100 - (price / compareAtPrice!) * 100) : null;

  return (
    <div className="rounded-lg border border-gold-400/25 bg-gold-50/60 px-3 py-2.5">
      {showOfferHeader && (
        <div className="flex items-center justify-between">
          <p className="text-[9px] font-bold uppercase tracking-wide text-gold-700">Launch Offer</p>
          {savePercent !== null && (
            <span className="rounded-full bg-ink-950 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-gold-300">
              Save {savePercent}%
            </span>
          )}
        </div>
      )}
      <div className={`flex items-end justify-between gap-3 ${showOfferHeader ? "mt-1.5" : ""}`}>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-wide text-ink-500">Launch Price</p>
          <span className="font-display text-2xl font-black leading-none text-ink-950">${price}</span>
        </div>
        {hasCompareAt && (
          <div className="pb-0.5 text-right">
            <p className="text-[9px] font-bold uppercase tracking-wide text-ink-400">Guide Value</p>
            <span
              className={
                showOfferHeader
                  ? "text-sm font-semibold text-ink-400 line-through decoration-ink-300"
                  : "text-sm font-semibold text-ink-500"
              }
            >
              ${compareAtPrice}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
