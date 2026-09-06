import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ | Natural Wellness Library",
  description:
    "Answers to common questions about the Natural Wellness Library — what's included, how access works, and what to expect.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div>
      <JsonLd data={faqJsonLd(FAQS)} />
      <section className="bg-gradient-to-b from-brand-50 to-cream section-pad !pb-12">
        <div className="container-page">
          <SectionHeading eyebrow="Support" title="Frequently Asked Questions" />
        </div>
      </section>

      <section className="section-pad !pt-12">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={FAQS} />
          </div>

          <div className="mx-auto mt-14 max-w-2xl text-center">
            <h3 className="font-display text-xl font-bold text-ink-900">
              Still have a question?
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Browse the library to see exactly what&apos;s included before you get started.
            </p>
            <Link href="/checkout" className="btn-primary mt-6">
              Get the Complete Library <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
