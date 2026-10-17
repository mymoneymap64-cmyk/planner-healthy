import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BotanicalAccent from "./BotanicalAccent";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-brand-900/10 bg-gradient-to-br from-brand-50 via-cream to-gold-50/50 py-16 sm:py-20">
      <BotanicalAccent className="pointer-events-none absolute -right-6 -top-6 -z-0 h-44 w-44 rotate-[135deg] text-brand-700/[0.08] sm:h-64 sm:w-64" />
      <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
        <div>
          <span className="eyebrow">The Complete Library</span>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl lg:text-5xl">
            Everything You Need to Get Started, In One Collection
          </h2>
          <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-ink-600 sm:text-lg">
            7 practical wellness guides — each with a matching planner and
            30-day system — plus 2 free bonus guides, all in one digital
            library.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link href="/checkout" className="btn-gold w-full justify-center lg:w-auto">
            Get the Complete Library
            <ArrowRight size={16} />
          </Link>
          <Link href="/library" className="btn-secondary w-full justify-center lg:w-auto">
            Browse the Library
          </Link>
        </div>
      </div>
    </section>
  );
}
