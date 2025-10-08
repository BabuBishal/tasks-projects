 export function findActiveTab(tabs) {
    return tabs.reduce((accumulator, currentValue, i) => {
      if (currentValue?.props?.active) {
        return i;
      }
      return accumulator;
    }, 0);
  }