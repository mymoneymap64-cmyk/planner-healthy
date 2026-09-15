import { NextRequest, NextResponse } from "next/server";
import { createPaypalOrder } from "@/lib/paypal";
import { PRODUCTS, BUNDLE_PRICE } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const slug = body.slug;
  let name: string;
  let price: number;

  if (slug === "bundle") {
    name = "The Complete Wellness Library";
    price = BUNDLE_PRICE;
  } else {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product || product.price === null || product.price <= 0) {
      return NextResponse.json({ error: "Unknown or unpurchasable product." }, { status: 400 });
    }
    name = product.title;
    price = product.price;
  }

  try {
    const order = await createPaypalOrder({
      slug: slug ?? "",
      name,
      price,
      returnUrl: `${SITE_URL}/checkout/paypal/return`,
      cancelUrl: slug === "bundle" ? `${SITE_URL}/checkout` : `${SITE_URL}/checkout/${slug}`,
    });

    return NextResponse.json({ url: order.approveUrl });
  } catch (error) {
    console.error("Failed to create PayPal order:", error);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
