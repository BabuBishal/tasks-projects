import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const keyRef = useRef<string>(key);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // When `key` changes, read the new key from localStorage and update state.
  useEffect(() => {
    if (key === keyRef.current) return;
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        const value = item ? (JSON.parse(item) as T) : initialValue;
        // update the tracked key first
        keyRef.current = key;
        setStoredValue(value);
      } else {
        keyRef.current = key;
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      keyRef.current = key;
      setStoredValue(initialValue);
    }
    // depend on key and initialValue
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) =>
      typeof value === "function" ? (value as (p: T) => T)(prev) : value
    );
  }, []);

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(keyRef.current);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage key:", keyRef.current, error);
    }
  }, [initialValue]);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          keyRef.current,
          JSON.stringify(storedValue) 
        );
      }
    } catch (error) {
      console.error(
        "Error writing to localStorage key:",
        keyRef.current,
        error
      );
    }
  }, [storedValue]);

  return [storedValue, setValue, remove] as const;
}
