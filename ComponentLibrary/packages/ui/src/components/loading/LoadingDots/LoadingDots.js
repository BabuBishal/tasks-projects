import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../../utils/cn";
import styles from "./LoadingDots.module.css";
var LoadingDots = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b;
    return (_jsxs("span", { className: cn(styles.loadingDots, className), children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }));
};
export default LoadingDots;
