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
import styles from "./Input.module.css";
var Input = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.type, type = _c === void 0 ? "text" : _c, label = _a.label, className = _a.className, _d = _a.placeholder, placeholder = _d === void 0 ? "" : _d, id = _a.id, helperText = _a.helperText, error = _a.error, _e = _a.unstyled, unstyled = _e === void 0 ? false : _e, rest = __rest(_a, ["type", "label", "className", "placeholder", "id", "helperText", "error", "unstyled"]);
    var reactId = useId();
    var inputId = String((_b = id !== null && id !== void 0 ? id : label) !== null && _b !== void 0 ? _b : "input-".concat(reactId));
    var helpId = "".concat(inputId, "-help");
    var describedBy = error ? helpId : helperText ? helpId : undefined;
    // when  users want full control of styles by passing unstyled prop, don't apply module classes
    var inputClasses = unstyled
        ? className !== null && className !== void 0 ? className : undefined
        : "".concat(styles.input, " ").concat(className !== null && className !== void 0 ? className : "").trim();
    var fieldClass = unstyled
        ? undefined
        : error
            ? "".concat(styles.inputField, " ").concat(styles.inputFieldError).trim()
            : styles.inputField;
    return (_jsxs("div", { className: unstyled ? undefined : styles.inputContainer, children: [label && (_jsx("label", { className: unstyled ? undefined : styles.label, htmlFor: inputId, children: label })), _jsx("div", { className: unstyled ? undefined : fieldClass, children: _jsx("input", __assign({ id: inputId, ref: ref, className: inputClasses, type: type, placeholder: placeholder, "aria-describedby": describedBy, "aria-invalid": error ? "true" : undefined }, rest)) }), helperText && !error && (_jsx("div", { id: helpId, className: unstyled ? undefined : styles.helperText, children: helperText })), error && (_jsx("div", { id: helpId, className: unstyled ? undefined : styles.errorText, children: error }))] }));
});
Input.displayName = "Input";
export default Input;
