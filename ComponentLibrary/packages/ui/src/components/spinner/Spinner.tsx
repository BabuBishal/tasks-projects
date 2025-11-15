import { type ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./spinner.css";

export type SpinnerProps = {
  size?: number | string; // size in px or any valid CSS unit
  color?: string; // CSS color
  speed?: number; // rotation speed in seconds
  className?: string;
  children?: ReactNode;
};

export const Spinner = ({ size = 40, color = "var(--ui-accent)", speed = 1, className, children }: SpinnerProps) => {
  return (
    <div className={cn("spinner-wrapper", className)}>
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
          animationDuration: `${speed}s`,
        }}
      />
      {children && <span className="spinner-label">{children}</span>}
    </div>
  );
};
