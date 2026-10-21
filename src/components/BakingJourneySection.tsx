import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import ProductCover from "@/components/ProductCover";
import { STANDALONE_PRODUCTS } from "@/data/products";
import { ImageKey } from "@/lib/types";

// The recipe-to-shared-moment journey: each photo is paired with one real,
// existing product it genuinely relates to in tone or occasion — never a
// random pairing. Captions describe the moment shown, not a claim about who
// bought what; the "illustrative photography" note below the grid makes
// that distinction explicit to visitors. Shared between the homepage and
// /cake-baking-collection so the concept and its captions stay identical
// everywhere it appears, rather than maintained twice.
const JOURNEY_MOMENTS: { imageKey: ImageKey; slug: string; caption: string }[] = [
  {
    imageKey: "followingARecipe",
    slug: "cake-baking-for-beginners",
    caption: "Start with a clear recipe and real ingredients — no guesswork, just a plan you can follow.",
  },
  {
    imageKey: "familyBakingCakeTogether",
    slug: "cheesecake-cupcake-mini-cake-cookbook",
    caption: "Mixing the batter together turns a recipe into a shared activity, cookie cutters and all.",
  },
  {
    imageKey: "presentingBirthdayCake",
    slug: "celebration-cakes-for-every-occasion",
    caption: "A finished cake is something to bring to the table and show off, candles and all.",
  },
  {
    imageKey: "familyEnjoyingCake",
    slug: "ultimate-cake-recipe-collection",
    caption: "And then comes the best part — sharing it with the people you made it for.",
  },
];

function getProduct(slug: string) {
  return STANDALONE_PRODUCTS.find((p) => p.slug === slug)!;
}

export default function BakingJourneySection({
  ctaHref,
  ctaLabel,
}: {
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">From Recipe to Shared Moment</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
          More Than Recipes — Moments Worth Sharing
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-600">
          Discover new baking ideas, build confidence in the kitchen, and
          create cakes and desserts to share with the people you love.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {JOURNEY_MOMENTS.map((moment) => {
          const product = getProduct(moment.slug);
          return (
            <div
              key={moment.imageKey}
              className="overflow-hidden rounded-[1.4rem] border border-ink-900/10 bg-white shadow-soft"
            >
              <ResponsiveImage
                imageKey={moment.imageKey}
                className="aspect-[4/3] w-full"
                sizes="(min-width: 1024px) 40vw, 90vw"
                rounded="rounded-none"
                priority={moment.slug === JOURNEY_MOMENTS[0].slug}
              />
              <div className="p-5">
                <p className="text-sm leading-relaxed text-ink-600">{moment.caption}</p>
                <Link
                  href={`/library/${product.slug}`}
                  className="mt-4 flex items-center gap-3 rounded-xl border border-ink-900/10 bg-cream p-3 transition-colors hover:border-brand-200"
                >
                  <ProductCover product={product} className="aspect-[2/3] w-12 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-ink-950">{product.title}</span>
                    <span className="text-xs font-semibold text-brand-700">${product.price!.toFixed(2)} — View Ebook</span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-ink-400" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        {ctaHref.startsWith("#") ? (
          <a href={ctaHref} className="btn-gold">
            {ctaLabel} <ArrowRight size={16} />
          </a>
        ) : (
          <Link href={ctaHref} className="btn-gold">
            {ctaLabel} <ArrowRight size={16} />
          </Link>
        )}
        <p className="mx-auto mt-5 max-w-xl text-xs text-ink-400">
          Photos are illustrative lifestyle photography licensed for this
          page. They are not photos of verified customers and don&rsquo;t
          depict specific results from these ebooks.
        </p>
      </div>
    </div>
  );
}
