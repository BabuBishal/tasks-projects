import type { TextAreaProps } from "./Form.types";
import styles from "./Form.module.css";

const Textarea = ({
  rows = 4,
  label,
  placeholder = "Placeholder",
}: TextAreaProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <div className={styles.inputField}>
        <textarea
          id={label}
          className={styles.input}
          placeholder={`${placeholder}`}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default Textarea;
