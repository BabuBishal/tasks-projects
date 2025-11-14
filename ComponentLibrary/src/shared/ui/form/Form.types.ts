import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

export type InputProps = {
  label?: string;
  /** helper text shown below the input (non-error) */
  helperText?: string;
  /** error message; when present component will set aria-invalid */
  error?: string;
  /** if true, component won't apply library styles so consumers can fully style it */
  unstyled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = {
  label?: string;
  rows?: number;
  helperText?: string;
  error?: string;
  unstyled?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export type SelectProps = {
  label?: string;
  optionList: string[];
  helperText?: string;
  error?: string;
  unstyled?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export type CheckboxProps = {
  label?: string;
  helperText?: string;
  error?: string;
  unstyled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
