import { type FC } from "react";
import type { BadgeProps } from "./Badges.types";
import styles from "./Badges.module.css";
import { cn } from "@/lib/utils";

const Badge: FC<BadgeProps> = ({ children, variant, size, className }) => {
  return (
    <span
      className={cn(
        styles.badge,
        variant && styles[variant],
        size && styles[size],
        className && className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
