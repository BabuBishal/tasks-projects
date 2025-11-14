import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState, } from "react";
import styles from "./Tabs.module.css";
import { cn } from "../../utils/cn";
var TabsContext = createContext(undefined);
var Tabs = function (_a) {
    var defaultValue = _a.defaultValue, children = _a.children, className = _a.className;
    var _b = useState(defaultValue), activeTab = _b[0], setActiveTab = _b[1];
    return (_jsx(TabsContext.Provider, { value: { activeTab: activeTab, setActiveTab: setActiveTab }, children: _jsx("div", { className: className, children: children }) }));
};
export var List = function (_a) {
    var children = _a.children;
    return (_jsx("div", { className: styles.tabList, children: children }));
};
export var Trigger = function (_a) {
    var value = _a.value, children = _a.children;
    var context = useContext(TabsContext);
    if (!context)
        throw new Error("Trigger must be used inside Tabs");
    var isActive = context.activeTab === value;
    var tabChange = useCallback(function () {
        context.setActiveTab(value);
    }, [value]);
    return (_jsx("button", { onClick: tabChange, className: cn(styles.tabTrigger, isActive && styles.active), children: children }));
};
export var Content = function (_a) {
    var value = _a.value, children = _a.children;
    var context = useContext(TabsContext);
    if (!context)
        throw new Error("Content must be used inside Tabs");
    // const isActive = context.activeTab === value;
    if (context.activeTab !== value)
        return null;
    return _jsx("div", { className: cn(styles.tabContent), children: children });
};
Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
export default Tabs;
