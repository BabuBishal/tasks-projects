import { useCallback, useEffect, useRef, useState } from "react";
export function useIntersectionObserverSingle(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.root, root = _c === void 0 ? null : _c, _d = _b.rootMargin, rootMargin = _d === void 0 ? "0px" : _d, _e = _b.threshold, threshold = _e === void 0 ? 0.1 : _e, _f = _b.triggerOnce, triggerOnce = _f === void 0 ? false : _f;
    var _g = useState(false), isVisible = _g[0], setIsVisible = _g[1];
    var targetElementRef = useRef(null);
    // Use a stable ref for the Intersection Observer instance itself.
    var observerInstanceRef = useRef(null);
    var ref = useCallback(function (element) {
        if (targetElementRef.current && observerInstanceRef.current) {
            observerInstanceRef.current.unobserve(targetElementRef.current);
        }
        targetElementRef.current = element;
        if (element && observerInstanceRef.current) {
            observerInstanceRef.current.observe(element);
        }
    }, []);
    // Observer Initialization
    useEffect(function () {
        var observer = new IntersectionObserver(function (_a) {
            var entry = _a[0];
            setIsVisible(entry.isIntersecting);
            if (triggerOnce && entry.isIntersecting) {
                observer.disconnect();
                observerInstanceRef.current = null;
            }
        }, { root: root, rootMargin: rootMargin, threshold: threshold });
        // Store the observer instance
        observerInstanceRef.current = observer;
        // IMPORTANT: If the target element was already set via the `ref` callback
        // before the useEffect ran, start observing it now.
        if (targetElementRef.current) {
            observer.observe(targetElementRef.current);
        }
        return function () {
            observer.disconnect();
            observerInstanceRef.current = null;
        };
    }, [root, rootMargin, threshold, triggerOnce]);
    return [isVisible, ref];
}
