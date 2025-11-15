import { HTMLAttributes, ReactNode } from "react";

export type Variant = "primary" | "success" | "danger" | "warning";

export type ToggleRootProps = {
  children: ReactNode;

  // Controlled (preferred)
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  // Uncontrolled
  defaultChecked?: boolean;

  disabled?: boolean;
  variant?: Variant;
} & HTMLAttributes<HTMLDivElement>;

export type ToggleContextType = {
  checked: boolean;
  toggle: () => void;
  disabled?: boolean;
};
