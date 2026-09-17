"use client";

import { useWellnessDashboard } from "@/components/wellness-dashboard/useWellnessDashboard";
import WellnessLibrary from "@/components/wellness/WellnessLibrary";
import { WellnessLibraryEntry } from "@/components/wellness/WellnessProductCard";

export default function LibraryPageClient({ token, entries }: { token: string; entries: WellnessLibraryEntry[] }) {
  const { state, dispatch } = useWellnessDashboard(token);

  return (
    <WellnessLibrary
      token={token}
      entries={entries}
      favorites={state?.favorites.guides}
      onToggleFavorite={(slug) => dispatch({ type: "toggleFavorite", kind: "guides", id: slug })}
    />
  );
}
