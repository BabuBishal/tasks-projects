import { forwardRef, useId } from "react";
import type { TextAreaProps } from "../Form.types";
import styles from "./Textarea.module.css";

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      rows = 4,
      label,
      className,
      placeholder = "",
      id,
      helperText,
      error,
      unstyled = false,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const textareaId = String(id ?? label ?? `textarea-${reactId}`);
    const helpId = `${textareaId}-help`;

    const describedBy = error ? helpId : helperText ? helpId : undefined;

    const inputClasses = unstyled
      ? className ?? undefined
      : `${styles.input} ${className ?? ""}`.trim();

    const fieldClass = unstyled
      ? undefined
      : error
      ? `${styles.inputField} ${styles.inputFieldError}`.trim()
      : styles.inputField;

    return (
      <div className={unstyled ? undefined : styles.inputContainer}>
        {label && (
          <label
            className={unstyled ? undefined : styles.label}
            htmlFor={textareaId}
          >
            {label}
          </label>
        )}
        <div className={unstyled ? undefined : fieldClass}>
          <textarea
            id={textareaId}
            ref={ref}
            className={inputClasses}
            placeholder={placeholder}
            rows={rows}
            aria-describedby={describedBy}
            aria-invalid={error ? "true" : undefined}
            {...rest}
          />
        </div>
        {helperText && !error && (
          <div id={helpId} className={unstyled ? undefined : styles.helperText}>
            {helperText}
          </div>
        )}
        {error && (
          <div id={helpId} className={unstyled ? undefined : styles.errorText}>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
