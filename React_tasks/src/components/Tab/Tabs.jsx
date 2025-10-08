import React, { useState } from "react";
import { findActiveTab } from "../../@utils/utils";
import Tab from "./Tab";
import "../../styles/component/tabs.css";

const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  const tabsArray = React.Children.toArray(children);
  return (
    <div className="tabs-component">
      <div className={` tabs  ${className}`}>
        {tabsArray.map((child, i) =>
          React.cloneElement(<Tab>{child.props.label}</Tab>, {
            key: `tab-${i}`,
            currentTab: i,
            activeTab,
            setActiveTab,
          })
        )}
        {/* {children.map((item, i) => (
          <Tab
            key={`tab-${i}`}
            currentTab={i}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {item.props.label}
          </Tab>
        ))} */}
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
