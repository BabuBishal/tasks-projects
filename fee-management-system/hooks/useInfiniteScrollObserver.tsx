import { useCallback, useRef } from "react";

type InfiniteScrollObserverOptions = {
  enabled?: boolean;
  rootMargin?: string;
  onIntersect: () => void; // callback when the last element appears
};

export function useInfiniteScrollObserver({
  enabled = true,
  rootMargin = "200px",
  onIntersect,
}: InfiniteScrollObserverOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (!enabled) return;

      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && enabled) {
            onIntersect();
          }
        },
        { rootMargin }
      );

      // Observe the new last node
      if (node) observerRef.current.observe(node);
    },
    [enabled, rootMargin, onIntersect]
  );

  return lastElementRef;
}
