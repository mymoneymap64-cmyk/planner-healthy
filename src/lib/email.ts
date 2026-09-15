import { Resend } from "resend";
import { SITE_NAME } from "@/lib/seo";

/**
 * Sends the "here's your access link" confirmation email. Logs and no-ops
 * instead of throwing when Resend isn't configured yet, so checkout keeps
 * working (the buyer still lands on /access/[token] directly) even before
 * email delivery is set up.
 */
export async function sendAccessEmail(to: string, accessUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("RESEND_API_KEY or RESEND_FROM_EMAIL not set — skipped access email to", to);
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: `Your ${SITE_NAME} access link`,
    html: `
      <p>Thanks for your purchase! You can view or download your files anytime here:</p>
      <p><a href="${accessUrl}">${accessUrl}</a></p>
      <p>Keep this email — this link is how you'll come back to your files later.</p>
    `,
  });
}
