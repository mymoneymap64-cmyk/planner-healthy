import { useCallback, useEffect, useState } from "react";
import { DigitalDetoxState, DigitalDetoxStats } from "@/lib/digitalDetox";

type ActionPayload = Record<string, unknown> & { type: string };

export function useDigitalDetox(token: string) {
  const [state, setState] = useState<DigitalDetoxState | null>(null);
  const [stats, setStats] = useState<DigitalDetoxStats | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    return fetch(`/api/wellness-digital-detox/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setState(data.state ?? null);
        setStats(data.stats ?? null);
      })
      .finally(() => setLoaded(true));
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const dispatch = useCallback(
    async (action: ActionPayload): Promise<{ ok: boolean; error?: string }> => {
      try {
        const res = await fetch(`/api/wellness-digital-detox/${token}`, {
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

  return { state, stats, loaded, dispatch, refresh };
}
