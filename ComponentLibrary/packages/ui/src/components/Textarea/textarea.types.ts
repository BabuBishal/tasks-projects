import { ReactNode, TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  children?: ReactNode;
  initialValue?: string;
  className?: string;
  disabled?: boolean;
};

export type TextareaContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
};
