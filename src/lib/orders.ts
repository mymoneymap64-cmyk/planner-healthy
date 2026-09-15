import { randomUUID } from "crypto";
import { capturePaypalOrder } from "@/lib/paypal";
import { getKv } from "@/lib/kv";

export type Order = {
  token: string;
  paypalOrderId: string;
  /** "bundle" or a single product slug from PRODUCTS. */
  slug: string;
  email: string | null;
  createdAt: string;
};

/**
 * Captures a PayPal order and turns it into a durable order record,
 * returning the access token for it. Idempotent by PayPal order id — safe
 * to call from both the webhook and the return-page redirect, whichever
 * fires first, without capturing twice or creating two tokens for one
 * purchase.
 */
export async function fulfillPaypalOrder(paypalOrderId: string): Promise<string> {
  const kv = getKv();

  const existingToken = await kv.get<string>(`order:paypal:${paypalOrderId}`);
  if (existingToken) return existingToken;

  const captured = await capturePaypalOrder(paypalOrderId);
  if (captured.status !== "COMPLETED") {
    throw new Error(`PayPal order ${paypalOrderId} is not completed (status: ${captured.status}).`);
  }

  const slug = captured.slug;
  if (!slug) {
    throw new Error(`PayPal order ${paypalOrderId} is missing product metadata.`);
  }

  const token = randomUUID();
  const order: Order = {
    token,
    paypalOrderId,
    slug,
    email: captured.payerEmail,
    createdAt: new Date().toISOString(),
  };

  await kv.set(`order:token:${token}`, order);
  await kv.set(`order:paypal:${paypalOrderId}`, token);

  return token;
}

export async function getOrderByToken(token: string): Promise<Order | null> {
  const order = await getKv().get<Order>(`order:token:${token}`);
  return order ?? null;
}
