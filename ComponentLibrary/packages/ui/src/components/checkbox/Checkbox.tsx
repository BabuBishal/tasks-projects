import { cn } from "@/utils/cn";
import type { CheckboxProps } from "./checkbox.types";
import "./checkbox.css";

export const Checkbox = ({
  className,
  checked,
  onChange,
  label,
  disabled,
  unstyled,
  ...props
}: CheckboxProps) => {
  return (
    <label className={cn(!unstyled && "ui-checkbox-wrapper", className)}>
      <input
        type="checkbox"
        className={cn(!unstyled && "ui-checkbox")}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {label && <span className={cn(!unstyled && "ui-checkbox-label")}>{label}</span>}
    </label>
  );
};
