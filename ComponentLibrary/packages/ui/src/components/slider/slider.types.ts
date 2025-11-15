import { ReactNode } from "react";

export type SliderContextType = {
  id: string | number | undefined;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  disabled: boolean;
};

export type SliderProps = {
  children: ReactNode;
  id: string;
  initialValue?: number;
  className?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
};