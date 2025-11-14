var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useEffect, useState, useRef } from "react";
export function useIntersectionObserverNoRef(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.selector, selector = _c === void 0 ? "" : _c, _d = _b.root, root = _d === void 0 ? null : _d, _e = _b.rootMargin, rootMargin = _e === void 0 ? "0px" : _e, _f = _b.threshold, threshold = _f === void 0 ? 0.1 : _f, _g = _b.triggerOnce, triggerOnce = _g === void 0 ? false : _g, onIntersection = _b.onIntersection;
    var _h = useState([]), entries = _h[0], setEntries = _h[1];
    // Ref to hold the latest onIntersection function, preventing the main effect from re-running
    var onIntersectionRef = useRef(onIntersection);
    // Keep the onIntersectionRef current with the latest function passed from the parent
    useEffect(function () {
        onIntersectionRef.current = onIntersection;
    }, [onIntersection]); // This effect runs only when the onIntersection function changes
    useEffect(function () {
        var observer = new IntersectionObserver(function (observedEntries) {
            // Update the component state
            setEntries(function (prev) {
                var updated = __spreadArray([], prev, true);
                observedEntries.forEach(function (entry) {
                    var index = updated.findIndex(function (e) { return e.target === entry.target; });
                    if (index > -1)
                        updated[index] = entry;
                    else
                        updated.push(entry);
                });
                return updated;
            });
            // Use the ref to access the latest function
            if (onIntersectionRef.current) {
                onIntersectionRef.current(observedEntries);
            }
            // Handle triggerOnce logic
            if (triggerOnce) {
                observedEntries.forEach(function (entry) {
                    if (entry.isIntersecting)
                        observer.unobserve(entry.target);
                });
            }
        }, { root: root, rootMargin: rootMargin, threshold: threshold });
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (el) { return observer.observe(el); });
        return function () {
            elements.forEach(function (el) { return observer.unobserve(el); });
            observer.disconnect();
        };
    }, [selector, root, rootMargin, threshold, triggerOnce]);
    return entries;
}
