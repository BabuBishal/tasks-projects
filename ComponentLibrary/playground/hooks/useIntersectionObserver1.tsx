import { useEffect, useState, useRef, useCallback } from "react";

type IntersectionObserverArgs = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  call?: (entries: IntersectionObserverEntry[]) => void;
};

type IntersectionObserverReturn = [
  IntersectionObserverEntry[],
  (element: Element | null) => void
];

export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
  call,
}: IntersectionObserverArgs = {}): IntersectionObserverReturn {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const callRef = useRef(call);
  const observedElementsRef = useRef(new Set<Element>());

  // Sync latest onChange function
  useEffect(() => {
    callRef.current = call;
  }, [call]);

  const observerCallback = useCallback(
    (observedEntries: IntersectionObserverEntry[]) => {
      // Update state
      setEntries((prev) => {
        const updated = prev.filter((e) =>
          observedElementsRef.current.has(e.target)
        );

        observedEntries.forEach((entry) => {
          const index = updated.findIndex((e) => e.target === entry.target);
          if (index > -1) updated[index] = entry;
          else updated.push(entry);
        });
        return updated;
      });

      // Call external handler
      if (callRef.current) {
        callRef.current(observedEntries);
      }

      // Handle triggerOnce
      if (triggerOnce) {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting && observerRef.current) {
            observerRef.current.unobserve(entry.target);
            observedElementsRef.current.delete(entry.target);
          }
        });
      }
    },
    [triggerOnce]
  );

  // Observer initialization and cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root,
      rootMargin,
      threshold,
    });

    observerRef.current = observer;

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      observedElementsRef.current.clear();
    };
  }, [root, rootMargin, threshold, observerCallback]);

  // The ref callback function returned to the consuming component
  const ref = useCallback((element: Element | null) => {
    const observer = observerRef.current;
    if (!observer) return;

    if (element) {
      // Element mounts: start observing and track it
      observer.observe(element);
      observedElementsRef.current.add(element);
    } else {
    }
  }, []);

  return [entries, ref];
}
