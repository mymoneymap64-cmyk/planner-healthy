import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { PRODUCTS, BONUS_PRODUCTS, getProduct } from "@/data/products";
import { getOrderByToken } from "@/lib/orders";
import AccessLibrary from "@/components/AccessLibrary";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Your Wellness Library | Natural Wellness Library",
  description: "Access your Natural Wellness Library ebooks, planners, and 30-day systems.",
  path: "/access",
  noindex: true,
});

export default async function AccessTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const order = await getOrderByToken(token);
  if (!order) notFound();

  const isBundle = order.slug === "bundle";
  const product = isBundle ? null : getProduct(order.slug);
  if (!isBundle && !product) notFound();

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
              View or download your files below. Keep your confirmation
              email or bookmark this page — it&apos;s your personal access
              link and works anytime.
            </p>
          </div>

          <AccessLibrary
            mainProducts={isBundle ? PRODUCTS : [product!]}
            bonusProducts={isBundle ? BONUS_PRODUCTS : undefined}
          />
        </div>
      </section>
    </div>
  );
}
