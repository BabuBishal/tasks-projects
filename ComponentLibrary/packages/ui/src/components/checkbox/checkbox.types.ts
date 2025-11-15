import { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  unstyled?: boolean;
  label?: ReactNode;
}
