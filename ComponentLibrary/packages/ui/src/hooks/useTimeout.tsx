import { useEffect, useRef } from "react";

export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Keep latest callback in ref so the timeout always calls the newest one
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay]);
}
