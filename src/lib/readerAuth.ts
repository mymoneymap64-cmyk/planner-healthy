import { Order, getOrderByToken } from "@/lib/orders";
import { ALL_PRODUCTS, PRODUCTS, BONUS_PRODUCTS, getProduct } from "@/data/products";
import { Product } from "@/lib/types";

/**
 * The single entitlement rule for everything under /reader and /api/files:
 * a "bundle" order owns every product + bonus; a single-product order owns
 * only that one slug. Nothing else is ever entitled.
 */
export function getEntitledProducts(order: Order): Product[] {
  if (order.slug === "bundle") {
    return [...PRODUCTS, ...BONUS_PRODUCTS];
  }
  const product = ALL_PRODUCTS.find((p) => p.slug === order.slug);
  return product ? [product] : [];
}

export function isEntitled(order: Order, slug: string): boolean {
  return getEntitledProducts(order).some((p) => p.slug === slug);
}

/**
 * Server-side gate for every /reader page and API route: resolves the
 * token to a real order, confirms the requested product is actually part
 * of that order, and returns both — or null if either check fails. Callers
 * should render `notFound()` on null, never a distinct "not entitled"
 * message that would confirm a product/order exists.
 */
export async function requireEntitledProduct(
  token: string,
  slug: string
): Promise<{ order: Order; product: Product } | null> {
  const order = await getOrderByToken(token).catch(() => null);
  if (!order || !isEntitled(order, slug)) return null;

  const product = getProduct(slug);
  if (!product) return null;

  return { order, product };
}

export async function requireOrder(token: string): Promise<Order | null> {
  return getOrderByToken(token).catch(() => null);
}
