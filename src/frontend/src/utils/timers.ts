/**
 * timers.ts — Cleanup-safe timeout and interval hooks.
 * Prevents memory leaks and stale-closure bugs from raw setTimeout/setInterval.
 */
import { useEffect, useRef } from "react";

/**
 * Sets a timeout that is automatically cleared on unmount or dependency change.
 */
export function useCleanupTimeout(
  callback: () => void,
  delay: number,
  deps: unknown[] = [],
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional deps forwarding
  useEffect(() => {
    timeoutRef.current = setTimeout(callback, delay);
    return () => {
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
}

/**
 * Sets an interval that is automatically cleared on unmount.
 * The callback is always fresh — stored in a ref so stale closures are avoided.
 */
export function useCleanupInterval(callback: () => void, delay: number) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    intervalRef.current = setInterval(() => callbackRef.current(), delay);
    return () => {
      if (intervalRef.current !== undefined) clearInterval(intervalRef.current);
    };
  }, [delay]);
}
