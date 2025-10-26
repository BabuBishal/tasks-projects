import { type FC } from "react";
import type { BadgeProps } from "./Badges.types";
import { cn } from "../../utils/cn";
import styles from "./Badges.module.css";

const Badge: FC<BadgeProps> = ({ text, variant, size, className }) => {
  return (
    <span
      className={cn(
        styles.badge,
        variant && styles[variant],
        size && styles[size],
        className && className
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
