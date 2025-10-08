import styles from "./Toggle.module.css";
import { cn } from "../../utils/cn";
import { useState } from "react";
import type { ToggleProps } from "./Toggle.types";

const Toggle = ({
  checkedText,
  uncheckedText,
  checked: checkedProp,
  onChange,
}: ToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = checkedProp !== undefined;
  const checked = isControlled ? checkedProp : internalChecked;

  const handleToggle = () => {
    const newToggleState = !checked;
    if (!isControlled) setInternalChecked(newToggleState);
    onChange?.(newToggleState);
  };
  return (
    <div
      className={cn(styles.toggle, checked && styles.toggleChecked)}
      onClick={handleToggle}
    >
      {checkedText && <span>{checkedText}</span>}
      {uncheckedText && <span>{uncheckedText}</span>}
      <div className={cn(styles.knob, checked && styles.knobChecked)} />
    </div>
  );
};

export default Toggle;
