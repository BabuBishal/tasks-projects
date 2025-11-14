import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Toggle.module.css";
import { cn } from "../../utils/cn";
var Toggle = function (_a) {
    var checkedText = _a.checkedText, label = _a.label, uncheckedText = _a.uncheckedText, checkedProp = _a.checked, onChange = _a.onChange;
    var _b = useState(false), internalChecked = _b[0], setInternalChecked = _b[1];
    var isControlled = checkedProp !== undefined;
    var checked = isControlled ? checkedProp : internalChecked;
    var handleToggle = function () {
        var newToggleState = !checked;
        if (!isControlled)
            setInternalChecked(newToggleState);
        onChange === null || onChange === void 0 ? void 0 : onChange(newToggleState);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn(styles.toggle, checked && styles.toggleChecked), onClick: handleToggle, children: [checkedText && _jsx("span", { children: checkedText }), uncheckedText && _jsx("span", { children: uncheckedText }), _jsx("div", { className: cn(styles.knob, checked && styles.knobChecked) })] }), label && _jsx("span", { className: styles.toggleLabel, children: label })] }));
};
export default Toggle;
