import { useEffect, useState, useRef } from "react";

type IntersectionObserverArgs = {
  selector?: string; // which elements to observe
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  onIntersection?: (entries: IntersectionObserverEntry[]) => void;
};

export function useIntersectionObserverNoRef({
  selector = "",
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
  onIntersection,
}: IntersectionObserverArgs = {}) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  // Ref to hold the latest onIntersection function, preventing the main effect from re-running
  const onIntersectionRef = useRef(onIntersection);

  // Keep the onIntersectionRef current with the latest function passed from the parent
  useEffect(() => {
    onIntersectionRef.current = onIntersection;
  }, [onIntersection]); // This effect runs only when the onIntersection function changes

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        // Update the component state
        setEntries((prev) => {
          const updated = [...prev];
          observedEntries.forEach((entry) => {
            const index = updated.findIndex((e) => e.target === entry.target);
            if (index > -1) updated[index] = entry;
            else updated.push(entry);
          });
          return updated;
        });

        // Use the ref to access the latest function
        if (onIntersectionRef.current) {
          onIntersectionRef.current(observedEntries);
        }

        // Handle triggerOnce logic
        if (triggerOnce) {
          observedEntries.forEach((entry) => {
            if (entry.isIntersecting) observer.unobserve(entry.target);
          });
        }
      },
      { root, rootMargin, threshold }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector, root, rootMargin, threshold, triggerOnce]);

  return entries;
}
