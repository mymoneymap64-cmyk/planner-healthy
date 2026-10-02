import DemoWellnessApp from "@/components/wellness-demo/DemoWellnessApp";
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
  return <DemoWellnessApp />;
}
