import type { SelectProps } from "../Form.types";
import styles from "./Select.module.css";

const Select = ({ label, optionList }: SelectProps) => {
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
      )}
      <select id={label} className={styles.input}>
        <option value="" disabled defaultValue={"Select an option"}>
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
