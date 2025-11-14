import { useCallback } from "react";
import { useSyncExternalStore } from "react";
// Read raw snapshot string for a key
var readRaw = function (key) {
    if (typeof window === "undefined")
        return null;
    return window.localStorage.getItem(key);
};
var subscribeToKey = function (key) { return function (callback) {
    if (typeof window === "undefined")
        return function () { };
    var handler = function (e) {
        if (e.key !== undefined) {
            var se = e;
            if (se.key === key)
                callback();
        }
        else if (e.detail !== undefined) {
            var ce = e;
            if (ce.detail && ce.detail.key === key)
                callback();
        }
    };
    window.addEventListener("storage", handler);
    window.addEventListener("local-storage", handler);
    return function () {
        window.removeEventListener("storage", handler);
        window.removeEventListener("local-storage", handler);
    };
}; };
export function useLocalStorageSyncExternal(key, initialValue) {
    var raw = useSyncExternalStore(subscribeToKey(key), function () { return readRaw(key); });
    // Parse the raw value into T or fall back to initialValue
    var parsed;
    try {
        parsed = raw !== null ? JSON.parse(raw) : initialValue;
    }
    catch (err) {
        // if parsing fails, fall back to initialValue
        console.error("Failed to parse localStorage value for key", key, err);
        parsed = raw;
    }
    var setStoredValue = useCallback(function (newValue) {
        try {
            var next = newValue instanceof Function ? newValue(parsed) : newValue;
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(next));
                // notify same-tab subscribers with a CustomEvent containing the key
                window.dispatchEvent(new CustomEvent("local-storage", { detail: { key: key } }));
            }
        }
        catch (error) {
            console.error("Failed to write localStorage key", key, error);
        }
    }, [key, parsed]);
    return [parsed, setStoredValue];
}
