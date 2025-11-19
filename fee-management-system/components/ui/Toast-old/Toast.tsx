"use client";
import { useEffect, useState } from "react";

export type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // in milliseconds
  onClose?: () => void;
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const borderColor =
    type === "success"
      ? "border-green-500 text-green-500"
      : type === "error"
      ? "border-red-500 text-red-500"
      : "border-blue-500 text-blue-500";

  return (
    <div
      className={`fixed bottom-10 border right-10 z-50 px-4 py-2 rounded shadow ${borderColor} animate-fade-in-out`}
    >
      {message}
    </div>
  );
}
