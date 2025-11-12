import { forwardRef, useId } from "react";
import type { InputProps } from "../Form.types";
import styles from "./Input.module.css";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
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
    const inputId = String(id ?? label ?? `input-${reactId}`);
    const helpId = `${inputId}-help`;

    const describedBy = error ? helpId : helperText ? helpId : undefined;

    // when  users want full control of styles by passing unstyled prop, don't apply module classes
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
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <div className={unstyled ? undefined : fieldClass}>
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            type={type}
            placeholder={placeholder}
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

Input.displayName = "Input";

export default Input;
