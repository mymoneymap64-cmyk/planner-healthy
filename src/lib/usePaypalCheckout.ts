import { useState } from "react";

/**
 * Starts a PayPal order for the given product/bundle slug and redirects to
 * PayPal to complete payment. Shared by the bundle and individual checkout
 * pages, which previously duplicated this exact flow.
 */
export function usePaypalCheckout(slug: string) {
  const [loading, setLoading] = useState(false);

  async function handlePurchaseClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed to start.");
      }
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong starting checkout. Please try again.");
    }
  }

  return { loading, handlePurchaseClick };
}
