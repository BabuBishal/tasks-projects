import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Card.module.css";
var Card = function (_a) {
    var title = _a.title, content = _a.content;
    return (_jsxs("div", { className: styles.card, children: [_jsx("h4", { className: styles.cardTitle, children: title }), _jsx("div", { className: styles.cardContent, children: content })] }));
};
export default Card;
