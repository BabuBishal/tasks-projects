import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";
import { cn } from "../../utils/cn";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, styles[variant], styles[size])}
      {...props}
    >
      {children}
    </button>
  );
};
