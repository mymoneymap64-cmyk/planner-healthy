import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
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

  // The Wellness System dashboard and the "Your Wellness Library" framing
  // only make sense for the wellness collection (the bundle, or a single
  // wellness core guide) — a standalone purchase like the cookbook gets its
  // own title/description and no Wellness System entry point.
  const isWellnessOrder = isBundle || (product ? PRODUCTS.some((p) => p.slug === product.slug) : false);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-cream section-pad !pb-16">
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Order Confirmed</span>
            <h1 className="mt-5 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl">
              {isWellnessOrder ? "Your Wellness Library" : product!.title}
            </h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-ink-600">
              {isWellnessOrder
                ? "View or download your files below. Keep your confirmation email or bookmark this page — it's your personal access link and works anytime."
                : `${product!.subtitle} View or download it below. Keep your confirmation email or bookmark this page — it's your personal access link and works anytime.`}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href={`/reader/${token}`} className="btn-gold inline-flex">
                <BookOpen size={16} /> {isWellnessOrder ? "Open in HealthyGuide Reader" : "Read or Download Your Cookbook"}
              </Link>
              {isWellnessOrder && (
                <Link href={`/wellness/${token}`} className="btn-secondary inline-flex">
                  <Sparkles size={16} /> Open Wellness System
                </Link>
              )}
            </div>
          </div>

          <AccessLibrary
            token={token}
            mainProducts={isBundle ? PRODUCTS : [product!]}
            bonusProducts={isBundle ? BONUS_PRODUCTS : undefined}
          />
        </div>
      </section>
    </div>
  );
}
