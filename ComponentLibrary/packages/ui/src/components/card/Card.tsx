import { cn } from "../../utils/cn";
import type { CardProps } from "./card.types";
import "./card.css";

export const Card = ({
  children,
  className,
  variant,
  size,
  unstyled,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        !unstyled && "ui-card",
        !unstyled && variant && `ui-card--${variant}`,
        !unstyled && size && `ui-card--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
