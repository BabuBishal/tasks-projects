import { createContext, useContext, useState, ReactNode } from "react";
import "./select.css";
import { cn } from "@/utils/cn";
import { SelectContextType, SelectRootProps } from "./select.types";

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components must be used within Select.Root"
    );
  }
  return context;
}

export const Select = {
  Root: ({
    value: valueProp,
    onChange,
    children,
    className,
    unstyled,
  }: SelectRootProps) => {
    const [value, setValue] = useState<string | null>(valueProp || null);

    const handleChange = (val: string) => {
      setValue(val);
      onChange?.(val);
    };

    return (
      <SelectContext.Provider value={{ value, setValue: handleChange }}>
        <div
          className={cn(
            "ui-select-root",
            className,
            unstyled && "ui-select--unstyled"
          )}
        >
          {children}
        </div>
      </SelectContext.Provider>
    );
  },

  Trigger: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    const { value } = useSelectContext();
    return (
      <button className={cn("ui-select-trigger", className)} type="button">
        {value || children}
      </button>
    );
  },

  Option: ({
    children,
    value,
    className,
  }: {
    children: ReactNode;
    value: string;
    className?: string;
  }) => {
    const { setValue } = useSelectContext();
    return (
      <div
        className={cn("ui-select-option", className)}
        onClick={() => setValue(value)}
      >
        {children}
      </div>
    );
  },

  List: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => {
    return <div className={cn("ui-select-list", className)}>{children}</div>;
  },
};
