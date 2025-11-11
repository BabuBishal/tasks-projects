import { useEffect, useState } from "react";

type IntersectionObserverArgs = {
  selector?: string; // which elements to observe
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
};

export function useIntersectionObserver({
  selector = "",
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
}: IntersectionObserverArgs = {}) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        setEntries((prev) => {
          const updated = [...prev];
          observedEntries.forEach((entry) => {
            const index = updated.findIndex((e) => e.target === entry.target);
            if (index > -1) updated[index] = entry;
            else updated.push(entry);
          });
          return updated;
        });

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
