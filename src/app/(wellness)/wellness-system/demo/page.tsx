import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DemoWellnessApp from "@/components/wellness-demo/DemoWellnessApp";
import ResponsiveImage from "@/components/ResponsiveImage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Try the Wellness System Demo | Natural Wellness Library",
  description:
    "Explore a live, interactive preview of the HealthyGuide Wellness System — dashboard, checklists, notes, and the Interactive Meal Planner — no account needed.",
  path: "/wellness-system/demo",
});

/**
 * Public, no-auth demo of the Wellness System. There is no [token] segment
 * in this route and this page never calls requireOrder/getOrderByToken or
 * any /api/* route — see DemoWellnessApp for the full safety guarantee.
 */
export default function WellnessSystemDemoPage() {
  return (
    <div>
      <section className="bg-cream py-10 sm:py-12">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
          <div>
            <span className="eyebrow">Live Preview</span>
            <h1 className="mt-4 font-display text-2xl font-bold text-balance text-ink-950 sm:text-3xl">
              See the Wellness System Before You Buy
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
              This is a real, interactive preview — seeded with sample data, no account or
              purchase required. Explore the dashboard, checklists, notes, favorites, and the
              Interactive Meal Planner exactly as they work inside a real Wellness System.
            </p>
            <Link href="/checkout" className="btn-gold mt-6 w-fit">
              Get the Complete Library <ArrowRight size={16} />
            </Link>
          </div>
          <ResponsiveImage
            imageKey="habitTrackerNotebook"
            className="hidden h-[160px] w-full sm:block lg:h-[180px]"
            sizes="(min-width: 1024px) 35vw, 100vw"
            rounded="rounded-2xl"
          />
        </div>
      </section>
      <DemoWellnessApp />
    </div>
  );
}
