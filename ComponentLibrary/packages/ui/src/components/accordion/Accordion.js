import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import styles from "./Accordion.module.css";
import { cn } from "../../utils/cn";
var AccordionContext = createContext(undefined);
export var Accordion = function (_a) {
    var children = _a.children, defaultOpen = _a.defaultOpen, className = _a.className;
    var _b = useState(defaultOpen !== null && defaultOpen !== void 0 ? defaultOpen : null), openItem = _b[0], setOpenItem = _b[1];
    var toggleItem = function (value) {
        setOpenItem(function (prev) { return (prev === value ? null : value); });
    };
    return (_jsx(AccordionContext.Provider, { value: { openItem: openItem, toggleItem: toggleItem }, children: _jsx("div", { className: className, children: children }) }));
};
var AccordionItemContext = createContext(undefined);
var Item = function (_a) {
    var value = _a.value, children = _a.children;
    return (_jsx(AccordionItemContext.Provider, { value: { value: value }, children: _jsx("div", { className: styles.accordionItem, children: children }) }));
};
var Header = function (_a) {
    var children = _a.children;
    var accordion = useContext(AccordionContext);
    var item = useContext(AccordionItemContext);
    if (!accordion || !item)
        throw new Error("Header must be used within Accordion.Item");
    var isOpen = accordion.openItem === item.value;
    return (_jsxs("button", { onClick: function () { return accordion.toggleItem(item.value); }, className: styles.accordionHeader, children: [_jsx("span", { children: children }), _jsx("span", { className: cn(styles.accordionIcon, isOpen && styles.open), children: "\u25BC" })] }));
};
var Content = function (_a) {
    var children = _a.children;
    var accordion = useContext(AccordionContext);
    var item = useContext(AccordionItemContext);
    if (!accordion || !item)
        throw new Error("Content must be used within Accordion.Item");
    var isOpen = accordion.openItem === item.value;
    return (_jsx("div", { className: cn(styles.accordionContent, isOpen && styles.open), children: _jsx("div", { className: styles.accordionBody, children: children }) }));
};
Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;
export default Accordion;
