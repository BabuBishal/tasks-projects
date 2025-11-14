import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { TabsContextType, TabsProps } from "./Tabs.types";
import styles from "./Tabs.module.css";
import { cn } from "../../utils/cn";
const TabsContext = createContext<TabsContextType | undefined>(undefined);

const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const List = ({ children }: { children: ReactNode }) => (
  <div className={styles.tabList}>{children}</div>
);

export const Trigger = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Trigger must be used inside Tabs");

  const isActive = context.activeTab === value;

  const tabChange = useCallback(() => {
    context.setActiveTab(value);
  }, [value]);

  return (
    <button
      onClick={tabChange}
      className={cn(styles.tabTrigger, isActive && styles.active)}
    >
      {children}
    </button>
  );
};

export const Content = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Content must be used inside Tabs");

  // const isActive = context.activeTab === value;
  if (context.activeTab !== value) return null;

  return <div className={cn(styles.tabContent)}>{children}</div>;
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;
