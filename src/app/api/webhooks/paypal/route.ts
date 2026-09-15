import { NextRequest, NextResponse } from "next/server";
import { verifyPaypalWebhookSignature } from "@/lib/paypal";
import { fulfillPaypalOrder, getOrderByToken } from "@/lib/orders";
import { sendAccessEmail } from "@/lib/email";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();

  let verified: boolean;
  try {
    verified = await verifyPaypalWebhookSignature(request.headers, body);
  } catch (error) {
    console.error("PayPal webhook verification error:", error);
    return NextResponse.json({ error: "Verification failed." }, { status: 400 });
  }

  if (!verified) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const orderId = event.resource?.supplementary_data?.related_ids?.order_id;
    if (!orderId) {
      console.error("PayPal webhook missing order id:", event.id);
      return NextResponse.json({ received: true });
    }

    try {
      const token = await fulfillPaypalOrder(orderId);
      const order = await getOrderByToken(token);
      if (order?.email) {
        await sendAccessEmail(order.email, `${SITE_URL}/access/${token}`);
      }
    } catch (error) {
      console.error("Failed to fulfill PayPal order from webhook:", orderId, error);
      return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
