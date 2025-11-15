import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { TabsContextType, TabsProps } from "./tabs.types";
import "./tabs.css";
import { cn } from "../../utils/cn";

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("tabs", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

/* LIST */
export const List = ({ children }: { children: ReactNode }) => (
  <div className="tabList">{children}</div>
);

/* TRIGGER */
export const Trigger = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Trigger must be used inside <Tabs>");

  const isActive = context.activeTab === value;

  const tabChange = useCallback(() => {
    context.setActiveTab(value);
  }, [value]);

  return (
    <button
      onClick={tabChange}
      className={cn("tabTrigger", isActive && "active")}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

/* CONTENT */
export const Content = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Content must be used inside <Tabs>");

  if (context.activeTab !== value) return null;

  return (
    <div className={cn("tabContent")} role="tabpanel">
      {children}
    </div>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;
