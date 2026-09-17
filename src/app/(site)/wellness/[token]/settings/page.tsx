import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { getProduct } from "@/data/products";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";
import CopyLinkButton from "@/components/wellness-dashboard/CopyLinkButton";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Settings | HealthyGuide Wellness System",
  description: "Manage your access and account details.",
  path: "/wellness",
  noindex: true,
});

export default async function SettingsPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  const isBundle = order.slug === "bundle";
  const product = isBundle ? null : getProduct(order.slug);
  const accessUrl = `${SITE_URL}/access/${token}`;

  return (
    <DashboardShell token={token}>
      <div className="section-pad !pt-8">
        <div className="container-page max-w-xl">
          <span className="eyebrow">Your Account</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Settings</h1>

          <div className="card mt-8 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-ink-400">What You Own</h2>
            <p className="mt-1.5 font-display text-lg font-bold text-ink-900">
              {isBundle ? "The Complete Wellness Library" : product?.title ?? "Your Guide"}
            </p>
            {order.email && <p className="mt-1 text-sm text-ink-500">Order confirmation sent to {order.email}</p>}
          </div>

          <div className="card mt-5 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-ink-400">Access Link</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
              This link is how you return to your Wellness System — bookmark it or save the email it was sent in.
              There&apos;s no password to remember.
            </p>
            <div className="mt-4">
              <CopyLinkButton url={accessUrl} />
            </div>
          </div>

          <div className="card mt-5 p-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-ink-400">Your Data</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
              Your checklists, daily plan, notes, favorites, and progress are saved automatically and tied only to
              this access link — no one else can see them, and they&apos;re never shared with another customer.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
