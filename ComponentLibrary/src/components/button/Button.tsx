import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";
import { cn } from "../../utils/cn";

export const Button = ({
  className,
  variant,
  size,
  children,
  unstyled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        // include module styles unless consumer requests unstyled
        !unstyled && styles.button,
        !unstyled && variant && styles[variant],
        !unstyled && size && styles[size],
        className && className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
