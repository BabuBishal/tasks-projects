import type { InputProps } from "./Form.types";
import styles from "./Form.module.css";

const Input = ({ type, label, placeholder = "Placeholder" }: InputProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <div className={styles.inputField}>
        {" "}
        <input
          id={label}
          className={styles.input}
          type={type || "text"}
          placeholder={`${placeholder}`}
        />
      </div>
    </div>
  );
};

export default Input;
