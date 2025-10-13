import React, { useState, type ReactElement, type ReactNode } from "react";
// import Tab from "./Tab";
import "../../styles/component/tabs.css";
import { findActiveTab } from "../../utils/utils";
export type TabsProps = {
  children: ReactNode;
  className?: string;
}
const Tabs = ({ children, className }: TabsProps ) => {
  const tabsArray = React.Children.toArray(children) as ReactElement[];
  const [activeTab, setActiveTab] = useState(findActiveTab(tabsArray));
  return (
    <div className="tabs-component">
      <div className={` tabs  ${className}`}>
        {tabsArray.map((child, i) =>
          React.cloneElement(child, {
            key: `tab-${i}`,
            currentTab: i,
            activeTab,
            setActiveTab,
          })
        )}
       
      </div>
      <div className="py-5">
        {tabsArray.map((child, i) => (
          <div
            key={`content-${i}`}
            className={i === activeTab ? "visible" : "hidden"}
          >
            {child.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
