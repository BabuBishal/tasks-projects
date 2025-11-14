import { useEffect, useRef } from "react";
export function useTimeout(callback, delay) {
    var savedCallback = useRef(callback);
    // Keep latest callback in ref so the timeout always calls the newest one
    useEffect(function () {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the timeout.
    useEffect(function () {
        if (!delay && delay !== 0) {
            return;
        }
        var id = setTimeout(function () {
            savedCallback.current();
        }, delay);
        return function () {
            clearTimeout(id);
        };
    }, [delay]);
}
