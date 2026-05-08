/**
 * reconnect.ts — Retry utilities for IC canister calls over HTTP2
 * Wraps backend actor calls with exponential backoff retry logic.
 */

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000,
): Promise<T> {
  let lastError: Error = new Error("Unknown error");
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const isNetworkError =
        error instanceof Error &&
        (error.message.includes("fetch") ||
          error.message.includes("network") ||
          error.message.includes("HTTP2") ||
          error.message.includes("connection"));
      if (!isNetworkError || attempt === maxRetries - 1) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, delayMs * 2 ** attempt),
      );
    }
  }
  throw lastError;
}

/**
 * React Query queryFn wrapper with built-in retry for network errors.
 * Usage: queryFn: () => useReconnectingQuery(() => actor.someMethod())
 */
export function wrapWithRetry<T>(
  fn: () => Promise<T>,
  options?: { maxRetries?: number; delayMs?: number },
): () => Promise<T> {
  return () =>
    withRetry(fn, options?.maxRetries ?? 3, options?.delayMs ?? 1000);
}
