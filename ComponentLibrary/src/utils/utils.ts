import type { ReactElement } from "react";

interface TabProps {
  active?: boolean;
}

export function findActiveTab(tabs?: ReactElement<TabProps>[]): number {
  if (!tabs || tabs.length === 0) return 0;
  return tabs?.reduce((accumulator, currentValue, i) => {
    if (currentValue?.props?.active) {
      return i;
    }
    return accumulator;
  }, 0);
}
