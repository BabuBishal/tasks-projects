"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  default as React,
} from "react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import "./modal.css";
import { type ModalContextType } from "./modal.types";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const Modal = ({
  defaultOpen = false,
  children,
  className,
}: {
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      <div className={cn("modal-wrapper", className)}>{children}</div>
    </ModalContext.Provider>
  );
};

// ─────────────────────────────
// Trigger
// ─────────────────────────────
Modal.Trigger = function ModalTrigger({
  children,
  className,
  asChild,
}: {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.Trigger must be used inside <Modal>");

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
      className?: string;
    }>;

    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        // Call original onClick if it exists
        child.props.onClick?.(e);
        modal.open();
      },
      className: cn(child.props.className, className),
    });
  }

  return (
    <button onClick={modal.open} className={cn("modal-trigger", className)}>
      {children}
    </button>
  );
};

// ─────────────────────────────
// Content (Portal)
// ─────────────────────────────
Modal.Content = function ModalContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.Content must be inside <Modal>");

  const { isOpen, close } = modal;
  useEffect(() => setMounted(true), []);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // Prevent rendering if closed
  if (!isOpen) return null;

  if (!mounted) return null;
  // Create portal container
  const el = document.getElementById("modal-root");
  if (!el) {
    console.error("You need a <div id='modal-root'></div> in your HTML.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={close}>
      <div
        className={cn("modal-content", className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    el
  );
};

// ─────────────────────────────
// Header
// ─────────────────────────────
Modal.Header = function ModalHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("modal-header", className)}>{children}</div>;
};

// ─────────────────────────────
// Body
// ─────────────────────────────
Modal.Body = function ModalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("modal-body", className)}>{children}</div>;
};

// ─────────────────────────────
// Footer
// ─────────────────────────────
Modal.Footer = function ModalFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("modal-footer", className)}>{children}</div>;
};

// ─────────────────────────────
// Close Button
// ─────────────────────────────
Modal.Close = function ModalClose({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.Close must be inside <Modal>");

  return (
    <button onClick={modal.close} className={cn("modal-close", className)}>
      {children ?? "Close"}
    </button>
  );
};

// ─────────────────────────────
// Close Icon (X button in corner)
// ─────────────────────────────
Modal.CloseIcon = function ModalCloseIcon({
  className,
}: {
  className?: string;
}) {
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.CloseIcon must be inside <Modal>");

  return (
    <button
      onClick={modal.close}
      className={cn("modal-close-icon", className)}
      aria-label="Close modal"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};
