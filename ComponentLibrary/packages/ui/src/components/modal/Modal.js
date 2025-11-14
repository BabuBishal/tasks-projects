import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Modal.module.css";
import { Button } from "../button/Button";
var Modal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children, className = _a.className, overlayClassName = _a.overlayClassName;
    if (!isOpen) {
        return null;
    }
    return (_jsx("div", { className: "".concat(styles.overlay, " ").concat(isOpen ? styles.overlayOpen : "", " ").concat(overlayClassName || ""), onClick: onClose, children: _jsxs("div", { className: "".concat(styles.modal, " ").concat(isOpen ? styles.modalOpen : "", " ").concat(className || ""), onClick: function (e) { return e.stopPropagation(); }, children: [_jsx(Button, { unstyled: true, className: styles.closeButton, onClick: onClose, children: "\u00D7" }), children] }) }));
};
export default Modal;
