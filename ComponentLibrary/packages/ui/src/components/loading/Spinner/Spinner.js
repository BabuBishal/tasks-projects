import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../../utils/cn";
import styles from "./Spinner.module.css";
var Spinner = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b;
    return _jsx("span", { className: cn(styles.spinner, className) });
};
export default Spinner;
