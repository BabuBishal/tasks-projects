import { useEffect, useRef, useState } from "react";

type WindowSize<T extends number | undefined = number | undefined> = {
  width: T;
  height: T;
};

/**
 * useWindowSize
 * - returns the current window width/height
 * - uses requestAnimationFrame to throttle updates during resize
 * - works with orientationchange
 * - safe for SSR (returns undefined until mounted)
 *
 * @param opts.useRaf - whether to throttle using requestAnimationFrame (default: true)
 */
export default function useWindowSize(opts?: { useRaf?: boolean }) {
  const { useRaf = true } = opts ?? {};

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : undefined,
    height: typeof window !== "undefined" ? window.innerHeight : undefined,
  });

  const rafRef = useRef<number | null>(null);

  const update = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const onResize = () => {
    if (!useRaf) {
      update();
      return;
    }

    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    update();

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  
  }, []);

  return windowSize;
}
