import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-pad bg-brand-900">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-2xl bg-brand-800 px-6 py-14 text-center sm:px-14 sm:py-16">
          <span className="eyebrow bg-white/10 text-gold-300">
            The Complete Library
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-balance text-white sm:text-4xl lg:text-5xl">
            Everything You Need to Get Started, In One Collection
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-brand-100 sm:text-lg">
            7 practical wellness guides — each with a matching planner and
            30-day system — plus 2 free bonus guides, all in one digital
            library.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/checkout" className="btn-gold w-full sm:w-auto">
              Get the Complete Library
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/library"
              className="btn w-full border-2 border-white/20 text-white hover:bg-white/10 sm:w-auto"
            >
              Browse the Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
