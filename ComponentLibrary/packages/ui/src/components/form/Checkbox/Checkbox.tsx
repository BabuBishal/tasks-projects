import { forwardRef, useId } from "react";
import type { CheckboxProps } from "../Form.types";
import styles from "./Checkbox.module.css";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, className, id, helperText, error, unstyled = false, ...rest },
    ref
  ) => {
    const reactId = useId();
    const checkboxId = String(id ?? label ?? `checkbox-${reactId}`);
    const helpId = `${checkboxId}-help`;

    const describedBy = error ? helpId : helperText ? helpId : undefined;

    const checkboxClasses = unstyled
      ? className ?? undefined
      : `${styles.input} ${className ?? ""}`.trim();

    return (
      <div className={unstyled ? undefined : styles.checkboxContainer}>
        <input
          id={checkboxId}
          ref={ref}
          className={checkboxClasses}
          type="checkbox"
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          {...rest}
        />
        {label && (
          <label
            className={unstyled ? undefined : styles.label}
            htmlFor={checkboxId}
          >
            {label}
          </label>
        )}
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
