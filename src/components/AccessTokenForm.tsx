"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Accepts either a bare access token or the full link a customer's
 * confirmation email contains (e.g. ".../access/<token>") and navigates to
 * the real token-gated page — which does all the actual validation. This
 * form never checks or exposes anything itself; it's just a convenience
 * for typing/pasting instead of hunting through email.
 */
function extractToken(input: string): string {
  const trimmed = input.trim();
  const marker = "/access/";
  const idx = trimmed.lastIndexOf(marker);
  const raw = idx >= 0 ? trimmed.slice(idx + marker.length) : trimmed;
  return raw.split(/[?#]/)[0].replace(/\/+$/, "");
}

export default function AccessTokenForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = extractToken(value);
    if (!token) {
      setError("Paste your access token or link to continue.");
      return;
    }
    setError(null);
    router.push(`/access/${encodeURIComponent(token)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 text-left">
      <label htmlFor="access-token" className="block text-xs font-bold uppercase tracking-wide text-ink-500">
        Enter your access token or link
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="access-token"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. your emailed link, or just the code after /access/"
          className="flex-1 rounded-lg border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-800 focus:border-brand-500 focus:outline-none"
        />
        <button type="submit" className="btn-gold justify-center whitespace-nowrap">
          Access My Library
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
