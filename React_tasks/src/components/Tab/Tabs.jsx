import { useState } from "react";
import { findActiveTab } from "../../@utils/utils";
import Tab from "./Tab";
import "../../styles/component/tabs.css";

const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState(findActiveTab(children));

  return (
    <div className="tabs-component">
      <div className={` tabs  ${className}`}>
        {children.map((item, i) => (
          <Tab
            key={`tab-${i}`}
            currentTab={i}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {item.props.label}
          </Tab>
        ))}
      </div>
      <div className="py-5">
        {children.map((item, i) => (
          <div
            key={`content-${i}`}
            className={i === activeTab ? "visible" : "hidden"}
          >
            {item?.props?.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
