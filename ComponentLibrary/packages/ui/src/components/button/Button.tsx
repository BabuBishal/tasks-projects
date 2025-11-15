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
        !unstyled && "ui-button",
        !unstyled && variant && `ui-button-${variant}`,
        !unstyled && size && `ui-button-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
