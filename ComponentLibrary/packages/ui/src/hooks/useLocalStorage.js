import { useState, useEffect, useCallback, useRef } from "react";
export function useLocalStorage(key, initialValue) {
    var keyRef = useRef(key);
    var _a = useState(function () {
        if (typeof window === "undefined")
            return initialValue;
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return initialValue;
        }
    }), storedValue = _a[0], setStoredValue = _a[1];
    // When `key` changes, read the new key from localStorage and update state.
    useEffect(function () {
        if (key === keyRef.current)
            return;
        try {
            if (typeof window !== "undefined") {
                var item = window.localStorage.getItem(key);
                var value = item ? JSON.parse(item) : initialValue;
                // update the tracked key first
                keyRef.current = key;
                setStoredValue(value);
            }
            else {
                keyRef.current = key;
                setStoredValue(initialValue);
            }
        }
        catch (error) {
            console.error("Error reading localStorage key:", key, error);
            keyRef.current = key;
            setStoredValue(initialValue);
        }
        // depend on key and initialValue
    }, [key, initialValue]);
    var setValue = useCallback(function (value) {
        setStoredValue(function (prev) {
            return typeof value === "function" ? value(prev) : value;
        });
    }, []);
    var remove = useCallback(function () {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(keyRef.current);
            }
            setStoredValue(initialValue);
        }
        catch (error) {
            console.error("Error removing localStorage key:", keyRef.current, error);
        }
    }, [initialValue]);
    useEffect(function () {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.setItem(keyRef.current, JSON.stringify(storedValue));
            }
        }
        catch (error) {
            console.error("Error writing to localStorage key:", keyRef.current, error);
        }
    }, [storedValue]);
    return [storedValue, setValue, remove];
}
