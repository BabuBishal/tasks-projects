import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";
import { cn } from "../../utils/cn";

export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, variant && styles[variant])}
      {...props}
    >
      {children}
    </button>
  );
};
