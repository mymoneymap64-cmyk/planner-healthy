import { SITE_NAME } from "@/lib/seo";

const PAYPAL_ENV = process.env.PAYPAL_ENV === "live" ? "live" : "sandbox";
const PAYPAL_API_BASE =
  PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

let cachedToken: { value: string; expiresAt: number } | null = null;

/**
 * Server-to-server OAuth2 token (client-credentials grant), cached in
 * memory between requests — PayPal tokens last ~9 hours, no need to fetch
 * a fresh one per request.
 */
async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET environment variable.");
  }

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`Failed to get PayPal access token: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

export type CreatePaypalOrderInput = {
  /** "bundle" or a single product slug — stored as custom_id, read back after capture. */
  slug: string;
  name: string;
  price: number;
  returnUrl: string;
  cancelUrl: string;
};

/**
 * Creates a PayPal order (Orders v2) and returns its "approve" link — the
 * PayPal-hosted checkout page the browser should be redirected to.
 */
export async function createPaypalOrder(
  input: CreatePaypalOrderInput
): Promise<{ id: string; approveUrl: string }> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: input.slug,
          description: input.name,
          amount: {
            currency_code: "USD",
            value: input.price.toFixed(2),
          },
        },
      ],
      application_context: {
        brand_name: SITE_NAME,
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to create PayPal order: ${res.status} ${JSON.stringify(data)}`);
  }

  const approveUrl = (data.links as { rel: string; href: string }[] | undefined)?.find(
    (l) => l.rel === "approve"
  )?.href;
  if (!approveUrl) {
    throw new Error("PayPal did not return an approve link.");
  }

  return { id: data.id, approveUrl };
}

export type CapturedPaypalOrder = {
  id: string;
  status: string;
  slug: string | null;
  payerEmail: string | null;
};

/**
 * Captures payment for an approved PayPal order — the actual server-side
 * proof of payment (`status: "COMPLETED"`), read directly from PayPal's
 * response rather than trusted from the redirect. Sends a stable
 * PayPal-Request-Id (the order id itself) so a duplicate capture call for
 * the same order returns the original result instead of erroring.
 */
export async function capturePaypalOrder(orderId: string): Promise<CapturedPaypalOrder> {
  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "PayPal-Request-Id": orderId,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to capture PayPal order ${orderId}: ${res.status} ${JSON.stringify(data)}`);
  }

  const purchaseUnit = data.purchase_units?.[0];
  const capture = purchaseUnit?.payments?.captures?.[0];

  return {
    id: data.id,
    status: data.status,
    slug: purchaseUnit?.custom_id ?? capture?.custom_id ?? null,
    payerEmail: data.payer?.email_address ?? null,
  };
}

/**
 * Verifies an inbound webhook actually came from PayPal, via PayPal's own
 * verify-webhook-signature endpoint (rather than a local HMAC check).
 */
export async function verifyPaypalWebhookSignature(headers: Headers, rawBody: string): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return false;

  const token = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: headers.get("paypal-auth-algo"),
      cert_url: headers.get("paypal-cert-url"),
      transmission_id: headers.get("paypal-transmission-id"),
      transmission_sig: headers.get("paypal-transmission-sig"),
      transmission_time: headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.verification_status === "SUCCESS";
}
