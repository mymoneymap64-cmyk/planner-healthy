import CheckoutClient from "./CheckoutClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout | Natural Wellness Library",
  description:
    "Get instant digital access to the complete Natural Wellness Library — 7 wellness ebooks with matching planners and 30-day systems, plus 2 free bonus guides.",
  path: "/checkout",
  noindex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
