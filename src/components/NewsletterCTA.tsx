"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // NOTE: placeholder — connect to your email service provider (e.g.
    // Mailchimp, Klaviyo, ConvertKit) to actually collect subscribers.
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl bg-ink-950 p-8 text-center text-white sm:p-12">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
        <Mail size={22} />
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold">
        Get new wellness guides and articles in your inbox
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-brand-100">
        Practical, no-fluff wellness writing — natural health, mindset, and
        everyday habits — no spam, unsubscribe anytime.
      </p>

      {submitted ? (
        <p className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold">
          <CheckCircle2 size={18} className="text-gold-300" /> Thanks — you&apos;re on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-ink-400 outline-none focus:border-white/50"
          />
          <button type="submit" className="btn-gold shrink-0 !py-3">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
