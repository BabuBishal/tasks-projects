import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import { cn } from "@/utils/cn";
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
}: {
  children: ReactNode;
  className?: string;
}) {
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.Trigger must be used inside <Modal>");

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
  const modal = useContext(ModalContext);
  if (!modal) throw new Error("Modal.Content must be inside <Modal>");

  const { isOpen, close } = modal;

  // Prevent rendering if closed
  if (!isOpen) return null;

  // Create portal container
  const el = document.getElementById("modal-root");
  if (!el) {
    console.error("You need a <div id='modal-root'></div> in your HTML.");
    return null;
  }

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

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

export default Modal;
