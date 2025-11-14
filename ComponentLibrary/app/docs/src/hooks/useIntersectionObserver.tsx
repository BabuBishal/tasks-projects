import { useCallback, useEffect, useRef, useState } from "react";

type SingleElementObserverReturn = [
  boolean,
  (element: Element | null) => void // ref
];

type IntersectionObserverArgs = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  call?: (entries: IntersectionObserverEntry[]) => void;
};

export function useIntersectionObserverSingle({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
}: Omit<IntersectionObserverArgs, "call"> = {}): SingleElementObserverReturn {
  const [isVisible, setIsVisible] = useState(false);

  const targetElementRef = useRef<Element | null>(null);

  // Use a stable ref for the Intersection Observer instance itself.
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback((element: Element | null) => {
    if (targetElementRef.current && observerInstanceRef.current) {
      observerInstanceRef.current.unobserve(targetElementRef.current);
    }

    targetElementRef.current = element;

    if (element && observerInstanceRef.current) {
      observerInstanceRef.current.observe(element);
    }
  }, []);

  // Observer Initialization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (triggerOnce && entry.isIntersecting) {
          observer.disconnect();
          observerInstanceRef.current = null;
        }
      },
      { root, rootMargin, threshold }
    );

    // Store the observer instance
    observerInstanceRef.current = observer;

    // IMPORTANT: If the target element was already set via the `ref` callback
    // before the useEffect ran, start observing it now.
    if (targetElementRef.current) {
      observer.observe(targetElementRef.current);
    }

    return () => {
      observer.disconnect();
      observerInstanceRef.current = null;
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [isVisible, ref];
}
