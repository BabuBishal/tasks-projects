"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import "./toggle.css";
import { ToggleContextType, ToggleRootProps, Variant } from "./toggle.types";

const variantColors: Record<Variant, string> = {
  primary: "#3b82f6",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#f59e0b",
};

const ToggleContext = createContext<ToggleContextType | null>(null);

export const useToggle = () => {
  const ctx = useContext(ToggleContext);
  if (!ctx)
    throw new Error(
      "Toggle compound components must be used inside <Toggle.Root>"
    );
  return ctx;
};

const ToggleRoot = ({
  children,
  checked,
  onChange,
  defaultChecked = false,
  disabled = false,
  variant = "primary",
  style,
  ...props
}: ToggleRootProps) => {
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const currentChecked = isControlled ? checked! : internalChecked;

  const toggle = () => {
    if (disabled) return;

    if (isControlled && onChange) {
      onChange(!checked);
    } else {
      setInternalChecked((prev) => !prev);
      onChange?.(!internalChecked);
    }
  };

  const themeStyles = {
    "--toggle-bg-on": variantColors[variant],
    ...style,
  } as React.CSSProperties;

  return (
    <ToggleContext.Provider
      value={{ checked: currentChecked, toggle, disabled }}
    >
      <div
        {...props}
        style={themeStyles}
        className={`toggle-container ${disabled ? "disabled" : ""}`}
      >
        {children}
      </div>
    </ToggleContext.Provider>
  );
};

const ToggleButton = () => {
  const { checked, toggle, disabled } = useToggle();

  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={toggle}
      className={`toggle-button ${checked ? "toggle-on" : ""}`}
    >
      <div className="toggle-thumb" />
    </div>
  );
};

const ToggleLabel = ({ children }: { children?: ReactNode }) => {
  const { checked } = useToggle();
  return <span>{children ?? (checked ? "On" : "Off")}</span>;
};

export const Toggle = {
  Root: ToggleRoot,
  Button: ToggleButton,
  Label: ToggleLabel,
};
