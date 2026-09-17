import { useCallback, useEffect, useState } from "react";
import { WellnessDashboardState, DashboardStats } from "@/lib/wellnessDashboard";

type ActionPayload = Record<string, unknown> & { type: string };

export function useWellnessDashboard(token: string) {
  const [state, setState] = useState<WellnessDashboardState | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [prompts, setPrompts] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    return fetch(`/api/wellness-dashboard/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setState(data.state ?? null);
        setStats(data.stats ?? null);
        setPrompts(data.prompts ?? []);
      })
      .finally(() => setLoaded(true));
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dispatch = useCallback(
    async (action: ActionPayload): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch(`/api/wellness-dashboard/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action),
        });
        const data = await res.json();
        if (res.ok) {
          setState(data.state ?? null);
          setStats(data.stats ?? null);
          return { ok: true };
        }
        return { ok: false, error: data.error };
      } catch {
        return { ok: false, error: "Network error." };
      }
    },
    [token]
  );

  return { state, stats, prompts, loaded, dispatch, refresh };
}
