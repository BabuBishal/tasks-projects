import { forwardRef, useId } from "react";
import type { SelectProps } from "../Form.types";
import styles from "./Select.module.css";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      optionList,
      className,
      id,
      helperText,
      error,
      unstyled = false,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const selectId = String(id ?? label ?? `select-${reactId}`);
    const helpId = `${selectId}-help`;

    const describedBy = error ? helpId : helperText ? helpId : undefined;

    const selectClasses = unstyled
      ? className ?? undefined
      : error
      ? `${styles.input} ${styles.inputError} ${className ?? ""}`.trim()
      : `${styles.input} ${className ?? ""}`.trim();

    return (
      <div className={unstyled ? undefined : styles.inputContainer}>
        {label && (
          <label
            className={unstyled ? undefined : styles.label}
            htmlFor={selectId}
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={selectClasses}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          {...rest}
        >
          <option value="" disabled>
            Select an option
          </option>
          {optionList?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";

export default Select;
