import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Toast.module.css";
import type { ToastContextValue, ToastItem, ToastOptions } from "./Toast.types";

const ToastContext = createContext<ToastContextValue | null>(null);

function makeId(prefix = "toast") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
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
      window.clearTimeout(t);
      delete timers.current[id];
    }
  }, []);

  // clear timers when unmounting provider
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => t && window.clearTimeout(t));
      timers.current = {};
    };
  }, []);

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.container} aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <ToastView key={t.id} toast={t} onClose={() => dismiss(t.id)} />
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
    // animate width from 100% to 0 using CSS transform over duration
    const el = progressRef.current;
    // ensure the element starts at scaleX(1)
    el.style.transform = "scaleX(1)";
    // force layout so the browser registers the initial transform
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetWidth;
    el.style.transition = `transform ${duration}ms linear`;
    requestAnimationFrame(() => {
      el.style.transform = "scaleX(0)";
    });
  }, [duration]);

  const variantClass = (() => {
    switch (type) {
      case "success":
        return styles["variant-success"];
      case "info":
        return styles["variant-info"];
      case "warning":
        return styles["variant-warning"];
      case "destructive":
        return styles["variant-destructive"];
      default:
        return styles["variant-default"];
    }
  })();

  return (
    <div
      className={`${styles.toast} ${variantClass}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
        {duration > 0 && (
          <div className={styles.progress} aria-hidden>
            <div ref={progressRef} className={styles.progressBar} />
          </div>
        )}
      </div>
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastProvider;
