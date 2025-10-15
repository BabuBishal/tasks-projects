import type { SelectProps } from "./Form.types";
import styles from "./Form.module.css";

const Select = ({ label, optionList }: SelectProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <select id={label} className={styles.input}>
        <option value="" disabled selected>
          Select an option
        </option>
        {optionList?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
