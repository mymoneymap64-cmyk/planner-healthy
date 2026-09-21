import { Redis } from "@upstash/redis";

let client: Redis | null = null;

/**
 * Lazily-created Redis client for order storage. Accepts either the
 * `KV_REST_API_*` names (Vercel's storage integrations) or the plain
 * `UPSTASH_REDIS_REST_*` names, whichever the provisioned store sets.
 */
export function getKv(): Redis {
  if (client) return client;

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing Redis credentials — set KV_REST_API_URL/KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL/TOKEN) in your environment."
    );
  }

  client = new Redis({ url, token });
  return client;
}

const LOCK_TTL_MS = 5000;
const LOCK_RETRY_DELAY_MS = 75;
const LOCK_MAX_ATTEMPTS = 40; // ~3s worst case

/**
 * Serializes read-modify-write sequences against the same Redis key across
 * concurrent requests (and across serverless instances, since the lock
 * itself lives in Redis). Every per-token mutation in wellnessDashboardStore,
 * wellness, and readerProgress does `get -> mutate in JS -> set`; without
 * this, two concurrent requests for the same token could race and silently
 * drop one update.
 */
export async function withLock<T>(lockKey: string, fn: () => Promise<T>): Promise<T> {
  const kv = getKv();
  const token = `${Date.now()}-${Math.random()}`;

  let acquired = false;
  for (let attempt = 0; attempt < LOCK_MAX_ATTEMPTS; attempt++) {
    const result = await kv.set(lockKey, token, { nx: true, px: LOCK_TTL_MS });
    if (result === "OK") {
      acquired = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, LOCK_RETRY_DELAY_MS + Math.random() * 40));
  }

  if (!acquired) {
    throw new Error("This item is being updated elsewhere — please try again.");
  }

  try {
    return await fn();
  } finally {
    // Only clear the lock if we still own it (it may have already expired
    // and been re-acquired by someone else under heavy contention).
    const owner = await kv.get<string>(lockKey);
    if (owner === token) {
      await kv.del(lockKey);
    }
  }
}
