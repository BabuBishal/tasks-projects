import { type FC } from "react";
import type { BadgeProps } from "./Badges.types";
import { cn } from "../../../../utils/cn";
import styles from "./Badges.module.css";

const Badge: FC<BadgeProps> = ({
  text,
  variant,
  size,
  className,
  unstyled,
}) => {
  return (
    <span
      className={cn(
        !unstyled && styles.badge,
        !unstyled && variant && styles[variant],
        !unstyled && size && styles[size],
        className && className
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
