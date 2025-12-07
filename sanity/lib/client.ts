import { createClient, type QueryParams } from 'next-sanity'

// Sanity Configuration
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6qskaa98'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const isProduction = process.env.NODE_ENV === 'production'

// Singleton client instance
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isProduction,
  perspective: 'published',
  stega: { enabled: false },
})

// Authenticated client for mutations (server-side only)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Simple in-memory cache for SSR (cleared on each request in production)
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = isProduction ? 60 * 1000 : 5 * 1000 // 60s in prod, 5s in dev

/**
 * Cached fetch wrapper for Sanity queries
 * Uses in-memory cache to reduce API calls during static generation
 */
export async function cachedFetch<T>(
  query: string,
  params: QueryParams = {},
  ttl: number = CACHE_TTL
): Promise<T> {
  const cacheKey = JSON.stringify({ query, params })
  const now = Date.now()
  const cached = cache.get(cacheKey)

  if (cached && now - cached.timestamp < ttl) {
    return cached.data as T
  }

  const data = await client.fetch<T>(query, params)
  cache.set(cacheKey, { data, timestamp: now })

  // Cleanup old entries periodically (max 100 entries)
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }

  return data
}

// Clear cache utility (useful for revalidation)
export function clearCache(): void {
  cache.clear()
}
