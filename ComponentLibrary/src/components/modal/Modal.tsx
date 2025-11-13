import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import type { ModalProps } from "./Modal.types";
import { Button } from "../button/Button";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""} ${
        overlayClassName || ""
      }`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isOpen ? styles.modalOpen : ""} ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className={styles.closeButton} onClick={onClose}>
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
