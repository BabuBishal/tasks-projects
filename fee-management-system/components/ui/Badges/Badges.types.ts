import { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  variant?: "success" | "danger" | "info" | "warning" | "";
  size?: "small" | "medium" | "large";
  className?: string;
};
