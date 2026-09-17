import { notFound } from "next/navigation";
import { requireOrder } from "@/lib/readerAuth";
import { buildMetadata } from "@/lib/seo";
import DashboardShell from "@/components/wellness-dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Help | HealthyGuide Wellness System",
  description: "Answers to common questions about using your Wellness System.",
  path: "/wellness",
  noindex: true,
});

const FAQS = [
  {
    q: "Do I need an account or password?",
    a: "No. Your personal access link is your account — the one you were emailed after purchase, or the one you access from the /access page. There's nothing to sign up for.",
  },
  {
    q: "Will my progress be saved if I close the tab?",
    a: "Yes. Every checklist, note, task, and favorite is saved automatically as you go — you don't need to press a separate \"save\" button anywhere except when writing a new note.",
  },
  {
    q: "Does Today's Focus or my Daily Plan reset each day?",
    a: "Yes. Your task and checklist definitions stay the same, but whether they're checked off resets at the start of each new day — that's what your streak and daily/weekly progress are based on.",
  },
  {
    q: "Do checklists reset automatically too?",
    a: "No — checklists (like Morning Routine or Sleep Routine) stay checked until you tap \"Reset Checklist\" yourself, since you might want to check them off over more than one day.",
  },
  {
    q: "Can anyone else see my notes or progress?",
    a: "No. Everything here is tied only to your personal access link and is never shown to another customer.",
  },
  {
    q: "I bought a single guide — why can't I see the others?",
    a: "Your Wellness System only ever shows what you actually purchased. If you'd like the rest, you can upgrade from the Library or Checkout page at any time.",
  },
];

export default async function HelpPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await requireOrder(token);
  if (!order) notFound();

  return (
    <DashboardShell token={token}>
      <div className="section-pad !pt-8">
        <div className="container-page max-w-2xl">
          <span className="eyebrow">Help</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">Frequently Asked Questions</h1>

          <div className="mt-8 space-y-4">
            {FAQS.map((item) => (
              <div key={item.q} className="card p-5">
                <h2 className="font-display text-base font-bold text-ink-900">{item.q}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
