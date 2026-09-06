import { notFound } from "next/navigation";
import IndividualCheckoutClient from "./IndividualCheckoutClient";
import JsonLd from "@/components/JsonLd";
import { PRODUCTS, getProduct } from "@/data/products";
import { buildMetadata, productDetailJsonLd, SITE_URL } from "@/lib/seo";

// Only the 7 paid ebooks get an individual checkout — the 2 free bonuses
// aren't sold separately, they come with the complete library bundle.
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isBonus) {
    return buildMetadata({ title: "Not Found", description: "", path: "/checkout", noindex: true });
  }

  return buildMetadata({
    title: `Checkout — ${product.title} | Natural Wellness Library`,
    description: `Get instant digital access to ${product.title} only.`,
    path: `/checkout/${product.slug}`,
    noindex: true,
  });
}

export default async function IndividualCheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.isBonus) notFound();

  return (
    <>
      <JsonLd
        data={productDetailJsonLd({
          title: product.title,
          description: product.description,
          path: `/checkout/${product.slug}`,
          imageUrl: product.coverImage ? `${SITE_URL}${product.coverImage}` : undefined,
          price: product.price,
        })}
      />
      <IndividualCheckoutClient product={product} />
    </>
  );
}
