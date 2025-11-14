import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Table.module.css";
var TableRoot = function (_a) {
    var children = _a.children, className = _a.className;
    return _jsx("table", { className: className !== null && className !== void 0 ? className : "", children: children });
};
var TableHeader = function (_a) {
    var children = _a.children;
    return (_jsx("thead", { className: styles.tableHeader, children: _jsx("tr", { className: styles.tableRow, children: children }) }));
};
var TableBody = function (_a) {
    var children = _a.children;
    return _jsx("tbody", { className: styles.tableBody, children: children });
};
var TableRow = function (_a) {
    var children = _a.children;
    return _jsx("tr", { className: styles.tr, children: children });
};
var TableHeaderCell = function (_a) {
    var children = _a.children;
    return _jsx("th", { className: styles.th, children: children });
};
var TableCell = function (_a) {
    var children = _a.children;
    return _jsx("td", { className: styles.td, children: children });
};
export var Table = Object.assign(TableRoot, {
    Header: TableHeader,
    HeaderCell: TableHeaderCell,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
});
export default Table;
