import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../utils/cn";
import styles from "./Badges.module.css";
var Badge = function (_a) {
    var text = _a.text, variant = _a.variant, size = _a.size, className = _a.className, unstyled = _a.unstyled;
    return (_jsx("span", { className: cn(!unstyled && styles.badge, !unstyled && variant && styles[variant], !unstyled && size && styles[size], className && className), children: text }));
};
export default Badge;
