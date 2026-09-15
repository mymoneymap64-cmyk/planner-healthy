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
