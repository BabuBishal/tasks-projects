var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import styles from "./Toast.module.css";
var ToastContext = createContext(null);
function makeId(prefix) {
    if (prefix === void 0) { prefix = "toast"; }
    return "".concat(prefix, "-").concat(Math.random().toString(36).slice(2, 9));
}
export var ToastProvider = function (_a) {
    var children = _a.children;
    var _b = useState([]), toasts = _b[0], setToasts = _b[1];
    var timers = useRef({});
    var notify = useCallback(function (opts) {
        var _a, _b, _c, _d;
        var id = (_a = opts.id) !== null && _a !== void 0 ? _a : makeId();
        var toast = {
            id: id,
            title: (_b = opts.title) !== null && _b !== void 0 ? _b : "",
            description: (_c = opts.description) !== null && _c !== void 0 ? _c : "",
            type: (_d = opts.type) !== null && _d !== void 0 ? _d : "default",
            duration: typeof opts.duration === "number" ? opts.duration : 4000,
        };
        setToasts(function (s) { return __spreadArray([toast], s, true); });
        if (toast.duration > 0) {
            var t = window.setTimeout(function () {
                setToasts(function (s) { return s.filter(function (x) { return x.id !== id; }); });
                delete timers.current[id];
            }, toast.duration);
            timers.current[id] = t;
        }
        return id;
    }, []);
    var dismiss = useCallback(function (id) {
        setToasts(function (s) { return s.filter(function (t) { return t.id !== id; }); });
        var t = timers.current[id];
        if (t) {
            window.clearTimeout(t);
            delete timers.current[id];
        }
    }, []);
    // clear timers when unmounting provider
    useEffect(function () {
        return function () {
            Object.values(timers.current).forEach(function (t) { return t && window.clearTimeout(t); });
            timers.current = {};
        };
    }, []);
    var value = useMemo(function () { return ({ notify: notify, dismiss: dismiss }); }, [notify, dismiss]);
    return (_jsxs(ToastContext.Provider, { value: value, children: [children, _jsx("div", { className: styles.container, "aria-live": "polite", "aria-atomic": "true", children: toasts.map(function (t) { return (_jsx(ToastView, { toast: t, onClose: function () { return dismiss(t.id); } }, t.id)); }) })] }));
};
export var useToast = function () {
    var ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error("useToast must be used within a ToastProvider");
    return ctx;
};
function ToastView(_a) {
    var toast = _a.toast, onClose = _a.onClose;
    var title = toast.title, description = toast.description, type = toast.type, duration = toast.duration;
    var progressRef = useRef(null);
    useEffect(function () {
        if (!progressRef.current || duration <= 0)
            return;
        // animate width from 100% to 0 using CSS transform over duration
        var el = progressRef.current;
        // ensure the element starts at scaleX(1)
        el.style.transform = "scaleX(1)";
        // force layout so the browser registers the initial transform
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.offsetWidth;
        el.style.transition = "transform ".concat(duration, "ms linear");
        requestAnimationFrame(function () {
            el.style.transform = "scaleX(0)";
        });
    }, [duration]);
    var variantClass = (function () {
        switch (type) {
            case "success":
                return styles["variant-success"];
            case "info":
                return styles["variant-info"];
            case "warning":
                return styles["variant-warning"];
            case "destructive":
                return styles["variant-destructive"];
            default:
                return styles["variant-default"];
        }
    })();
    return (_jsxs("div", { className: "".concat(styles.toast, " ").concat(variantClass), role: "status", "aria-live": "polite", children: [_jsxs("div", { className: styles.content, children: [title && _jsx("div", { className: styles.title, children: title }), description && _jsx("div", { className: styles.description, children: description }), duration > 0 && (_jsx("div", { className: styles.progress, "aria-hidden": true, children: _jsx("div", { ref: progressRef, className: styles.progressBar }) }))] }), _jsx("button", { className: styles.close, onClick: onClose, "aria-label": "Close notification", children: "\u2715" })] }));
}
export default ToastProvider;
