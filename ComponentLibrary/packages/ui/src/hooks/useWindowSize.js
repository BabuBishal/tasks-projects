import { useEffect, useRef, useState } from "react";
/**
 * useWindowSize
 * - returns the current window width/height
 * - uses requestAnimationFrame to throttle updates during resize
 * - works with orientationchange
 * - safe for SSR (returns undefined until mounted)
 *
 * @param opts.useRaf - whether to throttle using requestAnimationFrame (default: true)
 */
export default function useWindowSize(opts) {
    var _a = (opts !== null && opts !== void 0 ? opts : {}).useRaf, useRaf = _a === void 0 ? true : _a;
    var _b = useState({
        width: typeof window !== "undefined" ? window.innerWidth : undefined,
        height: typeof window !== "undefined" ? window.innerHeight : undefined,
    }), windowSize = _b[0], setWindowSize = _b[1];
    var rafRef = useRef(null);
    var update = function () {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    var onResize = function () {
        if (!useRaf) {
            update();
            return;
        }
        if (rafRef.current != null)
            return;
        rafRef.current = window.requestAnimationFrame(function () {
            rafRef.current = null;
            update();
        });
    };
    useEffect(function () {
        if (typeof window === "undefined")
            return;
        update();
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);
        return function () {
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
