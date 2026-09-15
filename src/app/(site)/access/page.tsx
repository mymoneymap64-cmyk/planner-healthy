import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Find Your Access Link | Natural Wellness Library",
  description: "Find your personal access link to download your Natural Wellness Library purchase.",
  path: "/access",
  noindex: true,
});

export default function AccessPage() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <div className="mx-auto max-w-lg rounded-2xl border border-ink-900/10 bg-cream p-8 text-center">
          <ShieldCheck size={28} className="mx-auto text-brand-700" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink-900">
            Find Your Access Link
          </h1>
          <p className="mt-3 leading-relaxed text-ink-600">
            After checkout, you&apos;re taken straight to your personal
            download page, and the same link is emailed to you as a backup.
            Check your order confirmation email (including spam/promotions)
            for a link that starts with{" "}
            <span className="font-mono text-sm">/access/</span>.
          </p>
          <p className="mt-3 text-sm text-ink-500">
            Can&apos;t find it? Reply to your order confirmation email and
            we&apos;ll help you recover access.
          </p>
        </div>
      </div>
    </div>
  );
}
