import type { ReactNode } from "react";

export type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
};