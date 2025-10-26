import type { InputProps } from "../Form.types";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label }: Omit<InputProps, "type">) => {
  return (
    <div className={styles.checkboxContainer}>
      {" "}
      <input id={label} className={""} type="checkbox" />
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
