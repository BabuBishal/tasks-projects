import { ReactNode } from "react";

export type SelectContextType = {
  value: string | null;
  setValue: (val: string) => void;
};

export type SelectRootProps = {
  value?: string;
  onChange?: (val: string) => void;
  children: ReactNode;
  className?: string;
  unstyled?: boolean;
};
