var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import styles from "./Select.module.css";
var Select = forwardRef(function (_a, ref) {
    var _b;
    var label = _a.label, optionList = _a.optionList, className = _a.className, id = _a.id, helperText = _a.helperText, error = _a.error, _c = _a.unstyled, unstyled = _c === void 0 ? false : _c, rest = __rest(_a, ["label", "optionList", "className", "id", "helperText", "error", "unstyled"]);
    var reactId = useId();
    var selectId = String((_b = id !== null && id !== void 0 ? id : label) !== null && _b !== void 0 ? _b : "select-".concat(reactId));
    var helpId = "".concat(selectId, "-help");
    var describedBy = error ? helpId : helperText ? helpId : undefined;
    var selectClasses = unstyled
        ? className !== null && className !== void 0 ? className : undefined
        : error
            ? "".concat(styles.input, " ").concat(styles.inputError, " ").concat(className !== null && className !== void 0 ? className : "").trim()
            : "".concat(styles.input, " ").concat(className !== null && className !== void 0 ? className : "").trim();
    return (_jsxs("div", { className: unstyled ? undefined : styles.inputContainer, children: [label && (_jsx("label", { className: unstyled ? undefined : styles.label, htmlFor: selectId, children: label })), _jsxs("select", __assign({ id: selectId, ref: ref, className: selectClasses, "aria-describedby": describedBy, "aria-invalid": error ? "true" : undefined }, rest, { children: [_jsx("option", { value: "", disabled: true, children: "Select an option" }), optionList === null || optionList === void 0 ? void 0 : optionList.map(function (option) { return (_jsx("option", { value: option, children: option }, option)); })] })), helperText && !error && (_jsx("div", { id: helpId, className: unstyled ? undefined : styles.helperText, children: helperText })), error && (_jsx("div", { id: helpId, className: unstyled ? undefined : styles.errorText, children: error }))] }));
});
Select.displayName = "Select";
export default Select;
