import { redirect } from "next/navigation";
import { fulfillPaypalOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function PaypalReturnPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  // PayPal appends its own order id as `token` on the return URL — distinct
  // from our internal access token, which is only minted after capture.
  const { token: paypalOrderId } = await searchParams;
  if (!paypalOrderId) redirect("/access");

  let accessToken: string;
  try {
    accessToken = await fulfillPaypalOrder(paypalOrderId);
  } catch (error) {
    console.error("PayPal fulfillment failed for order", paypalOrderId, error);
    redirect("/access");
  }

  redirect(`/access/${accessToken}`);
}
