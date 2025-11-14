import { useCallback } from "react";
import { useSyncExternalStore } from "react";

// Read raw snapshot string for a key
const readRaw = (key: string) => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
};

const subscribeToKey = (key: string) => (callback: () => void) => {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    if ((e as StorageEvent).key !== undefined) {
      const se = e as StorageEvent;
      if (se.key === key) callback();
    } else if ((e as CustomEvent).detail !== undefined) {
      const ce = e as CustomEvent;
      if (ce.detail && ce.detail.key === key) callback();
    }
  };

  window.addEventListener("storage", handler as EventListener);
  window.addEventListener("local-storage", handler as EventListener);

  return () => {
    window.removeEventListener("storage", handler as EventListener);
    window.removeEventListener("local-storage", handler as EventListener);
  };
};

export function useLocalStorageSyncExternal<T>(key: string, initialValue: T) {
  const raw = useSyncExternalStore(subscribeToKey(key), () => readRaw(key));

  // Parse the raw value into T or fall back to initialValue
  let parsed: T;
  try {
    parsed = raw !== null ? (JSON.parse(raw) as T) : initialValue;
  } catch (err) {
    // if parsing fails, fall back to initialValue
    console.error("Failed to parse localStorage value for key", key, err);
    parsed = raw as unknown as T;
  }

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      try {
        const next = newValue instanceof Function ? newValue(parsed) : newValue;
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(next));
          // notify same-tab subscribers with a CustomEvent containing the key
          window.dispatchEvent(
            new CustomEvent("local-storage", { detail: { key } })
          );
        }
      } catch (error) {
        console.error("Failed to write localStorage key", key, error);
      }
    },
    [key, parsed]
  );

  return [parsed, setStoredValue] as const;
}
