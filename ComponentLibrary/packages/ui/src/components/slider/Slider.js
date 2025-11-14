import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import styles from "./Slider.module.css";
var SliderContext = createContext(undefined);
var Slider = function (_a) {
    var children = _a.children, id = _a.id, _b = _a.initialValue, initialValue = _b === void 0 ? 50 : _b;
    var _c = useState(initialValue), value = _c[0], setValue = _c[1];
    return (_jsx(SliderContext.Provider, { value: { id: id, value: value, setValue: setValue }, children: _jsx("div", { className: styles.slider, children: children }) }));
};
export default Slider;
Slider.Label = function (_a) {
    var children = _a.children, htmlFor = _a.htmlFor;
    var context = useContext(SliderContext);
    if (!context)
        throw new Error("Slider.Label must be used inside an Slider component.");
    var value = context.value;
    return (_jsxs("label", { htmlFor: htmlFor, className: "input-label", children: [children, " ", value] }));
};
Slider.Field = function (_a) {
    var _b = _a.type, type = _b === void 0 ? "range" : _b, placeholder = _a.placeholder, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.step, step = _e === void 0 ? 1 : _e;
    var context = useContext(SliderContext);
    if (!context)
        throw new Error("Slider.Field must be used inside an Slider component.");
    var id = context.id, value = context.value, setValue = context.setValue;
    var handleChange = function (e) {
        setValue(parseInt(e.target.value, 10));
    };
    return (_jsx("input", { type: type, id: id, className: styles.inputField, value: value, onChange: handleChange, placeholder: placeholder, min: min, max: max, step: step }));
};
