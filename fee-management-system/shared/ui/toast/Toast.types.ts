export type ToastType = "default" | "success" | "info" | "warning" | "error";

export type ToastOptions = {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  id?: string;
};

export type ToastItem = Required<ToastOptions> & {
  id: string;
};

export type ToastContextValue = {
  notify: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
};
