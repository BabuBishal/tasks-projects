import {
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { cn } from "@/utils/cn";
import "./loadingdots.css";

export type LoadingDotsContextType = {
  size: "sm" | "md" | "lg";
  color?: string;
  speed: number;
  unstyled: boolean;
};

const LoadingDotsContext = createContext<LoadingDotsContextType | undefined>(
  undefined
);

export type LoadingDotsProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
  color?: string;
  speed?: number;
  unstyled?: boolean;
  children?: ReactNode;
};

export const LoadingDots = ({
  size = "md",
  color,
  speed = 0.6,
  unstyled = false,
  children,
  className,
  ...props
}: LoadingDotsProps) => {
  return (
    <LoadingDotsContext.Provider value={{ size, color, speed, unstyled }}>
      <div className={cn("loading-dots-wrapper", className)} {...props}>
        {children ?? <LoadingDots.Dot />}
      </div>
    </LoadingDotsContext.Provider>
  );
};

// Default Dot component
LoadingDots.Dot = () => {
  const context = useContext(LoadingDotsContext);
  if (!context)
    throw new Error("LoadingDots.Dot must be used inside LoadingDots.");

  const { size, color, speed, unstyled } = context;

  const dotStyle = !unstyled
    ? {
        backgroundColor: color ?? "var(--ui-text-primary)",
        animationDuration: `${speed}s`,
      }
    : {};

  return (
    <>
      <span style={dotStyle} />
      <span style={dotStyle} />
      <span style={dotStyle} />
    </>
  );
};

// Optional Label component
LoadingDots.Label = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(LoadingDotsContext);
  if (!context)
    throw new Error("LoadingDots.Label must be used inside LoadingDots.");

  return (
    <span className={cn("loading-dots-label", className)} {...props}>
      {children}
    </span>
  );
};
