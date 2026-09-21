import Link from "next/link";

/**
 * Branded 404 for the /wellness/[token] dashboard — shown when a token is
 * invalid or unrecognized. Deliberately does not render DashboardShell
 * (which would imply a valid, authenticated session).
 */
export default function WellnessNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-ink-950 font-display text-lg font-black text-white">
        N
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
        We couldn&apos;t find that Wellness System
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
        This access link may be incorrect or no longer valid. Check the link in your order confirmation email, or
        return to the library.
      </p>
      <Link href="/access" className="btn-primary mt-7">
        Find My Access Link
      </Link>
    </div>
  );
}
