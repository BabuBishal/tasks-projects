import { HTMLAttributes, ReactNode } from "react";

export type LoadingDotsContextType = {
  size: "sm" | "md" | "lg";
  color?: string;
  speed: number;
  unstyled: boolean;
};

export type LoadingDotsProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  color?: string;
  speed?: number;
  unstyled?: boolean;
  children?: ReactNode;
};
