import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";
import { cn } from "@/lib/utils";

export const Button = ({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        variant && styles[variant],
        size && styles[size],
        className && className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
