import { ReactNode } from "react";

export type InputProps = {
  children: ReactNode;
  id: string;
  initialValue?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export type InputContextType = {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  placeholder?: string;
};
