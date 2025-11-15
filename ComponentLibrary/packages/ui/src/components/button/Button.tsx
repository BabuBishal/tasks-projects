import { cn } from "../../utils/cn";
import "./button.css";
import { ButtonProps } from "./button.types";

export const Button = ({
  className,
  unstyled,
  variant,
  size,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        !unstyled && "b3-button",
        !unstyled && variant && `b3-button-${variant}`,
        !unstyled && size && `b3-button-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
