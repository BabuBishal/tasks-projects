import type { ReactNode } from "react";

export type AccordionProps = {
  children: ReactNode;
  defaultOpen?: string;
  className?: string;
};

export type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

export type AccordionItemProps = { value: string; children: ReactNode };
