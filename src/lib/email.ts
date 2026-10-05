import { Resend } from "resend";
import { SITE_NAME } from "@/lib/seo";
import { getProduct } from "@/data/products";

/**
 * Sends the "here's your access link" confirmation email. Logs and no-ops
 * instead of throwing when Resend isn't configured yet, so checkout keeps
 * working (the buyer still lands on /access/[token] directly) even before
 * email delivery is set up.
 */
export async function sendAccessEmail(to: string, accessUrl: string, slug?: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("RESEND_API_KEY or RESEND_FROM_EMAIL not set — skipped access email to", to);
    return;
  }

  const bundleOrHealthyEating = slug === "bundle" || slug === "healthy-eating-guide";
  const productName = slug === "bundle"
    ? "The Complete Wellness Library"
    : slug
      ? getProduct(slug)?.title ?? "your purchase"
      : "your purchase";

  const plannerText = bundleOrHealthyEating
    ? " Your order includes the Interactive Meal Planner in the HealthyGuide Wellness System."
    : "";

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: "Your HealthyGuide Access Link",
    html: `
      <p>Thanks for your purchase of <strong>${productName}</strong>.</p>
      <p>Your personal access link is below. Use it to open your HealthyGuide Wellness System and access your purchased content anytime.</p>
      <p><a href="${accessUrl}">${accessUrl}</a></p>
      <p>Keep this email — this is the link you can use to return to your files and resources later.${plannerText}</p>
    `,
  });
}
