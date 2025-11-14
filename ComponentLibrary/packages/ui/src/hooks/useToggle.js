import { useCallback, useState } from "react";
export function useToggle(initialValue) {
    if (initialValue === void 0) { initialValue = false; }
    var _a = useState(initialValue), value = _a[0], setValue = _a[1];
    var toggle = useCallback(function () { return setValue(function (prev) { return !prev; }); }, []);
    return [value, toggle];
}
