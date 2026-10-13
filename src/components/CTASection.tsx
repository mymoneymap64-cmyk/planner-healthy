import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-900/10 bg-gradient-to-b from-brand-50 to-cream px-6 py-14 text-center sm:px-14 sm:py-16">
          <span className="eyebrow">The Complete Library</span>
          <h2 className="mt-5 font-display text-3xl font-bold text-balance text-ink-950 sm:text-4xl lg:text-5xl">
            Everything You Need to Get Started, In One Collection
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-600 sm:text-lg">
            7 practical wellness guides — each with a matching planner and
            30-day system — plus 2 free bonus guides, all in one digital
            library.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/checkout" className="btn-gold w-full sm:w-auto">
              Get the Complete Library
              <ArrowRight size={16} />
            </Link>
            <Link href="/library" className="btn-secondary w-full sm:w-auto">
              Browse the Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
