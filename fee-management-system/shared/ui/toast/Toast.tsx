"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ToastContextValue, ToastItem, ToastOptions } from "./Toast.types";
import "./toast.css";

const ToastContext = createContext<ToastContextValue | null>(null);

function makeId(prefix = "toast") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, number | undefined>>({});

  const notify = useCallback((opts: ToastOptions) => {
    const id = opts.id ?? makeId();
    const toast: ToastItem = {
      id,
      title: opts.title ?? "",
      description: opts.description ?? "",
      type: opts.type ?? "default",
      duration: typeof opts.duration === "number" ? opts.duration : 4000,
    };

    setToasts((s) => [toast, ...s]);

    if (toast.duration > 0) {
      const t = window.setTimeout(() => {
        setToasts((s) => s.filter((x) => x.id !== id));
        delete timers.current[id];
      }, toast.duration);
      timers.current[id] = t;
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
    const t = timers.current[id];
    if (t) {
      clearTimeout(t);
      delete timers.current[id];
    }
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => t && clearTimeout(t));
    };
  }, []);

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Container */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <ToastView
            key={toast.id}
            toast={toast}
            onClose={() => dismiss(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

function ToastView({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const { title, description, type, duration } = toast;

  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!progressRef.current || duration <= 0) return;
    const el = progressRef.current;

    el.style.transform = "scaleX(1)";
    el.offsetHeight; // force layout
    el.style.transition = `transform ${duration}ms linear`;

    requestAnimationFrame(() => {
      el.style.transform = "scaleX(0)";
    });
  }, [duration]);

  return (
    <div
      className={`toast-root toast-variant-${type}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        {description && <div className="toast-description">{description}</div>}

        {duration > 0 && (
          <div className="toast-progress">
            <div ref={progressRef} className="toast-progress-bar" />
          </div>
        )}
      </div>

      <button className="toast-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}
