"use client";

import { useState } from "react";
import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import WellnessLibrary from "@/components/wellness/WellnessLibrary";
import { WellnessLibraryEntry } from "@/components/wellness/WellnessProductCard";

export default function LibraryPageClient({ token, entries }: { token: string; entries: WellnessLibraryEntry[] }) {
  const { state, dispatch } = useWellnessDashboard(token);
  const [error, setError] = useState<string | null>(null);

  async function handleToggleFavorite(slug: string) {
    const result = await dispatch({ type: "toggleFavorite", kind: "guides", id: slug });
    if (!result.ok) setError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div>
      {error && (
        <div className="container-page !pb-0 pt-6">
          <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">{error}</p>
        </div>
      )}
      <WellnessLibrary
        token={token}
        entries={entries}
        favorites={state?.favorites.guides}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
